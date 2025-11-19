import { currencyApi } from "@/api/currencyApi";

export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD' | 'JPY';

export const SUPPORTED_CURRENCIES: SupportedCurrency[] = ['USD','EUR','GBP','INR','AUD','CAD','SGD','JPY'];

export const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  AUD: 'A$',
  CAD: 'C$',
  SGD: 'S$',
  JPY: '¥',
};

type RatesCache = {
  [currency in SupportedCurrency]?: number;
} & { fetchedAt?: number };

const STORAGE_KEY = 'fx_rates_v1';
const CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours
let inMemoryCache: RatesCache | null = null;

async function fetchRates(): Promise<RatesCache> {
  // Try to use in-memory cache first
  if (inMemoryCache && inMemoryCache.fetchedAt && Date.now() - inMemoryCache.fetchedAt < CACHE_TTL) {
    return inMemoryCache;
  }

  // Try localStorage cache
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw) as RatesCache;
      if (parsed.fetchedAt && Date.now() - parsed.fetchedAt < CACHE_TTL) {
        inMemoryCache = parsed;
        return parsed;
      }
    }
  } catch (e) {
    // ignore storage errors
  }

  // Fetch from exchangerate.host using USD as base, then invert rates to USD per unit
  const supported = ['USD','EUR','GBP','INR','AUD','CAD','SGD','JPY'].join(',');
  const url = `https://api.exchangerate.host/latest?base=USD&symbols=${supported}`;
  try {
    const resp = await fetch(url, { cache: 'no-store' });
    if (!resp.ok) throw new Error('FX fetch failed');
    const json = await resp.json();
    // json.rates: { EUR: 0.91, GBP: 0.79, ... } meaning 1 USD = 0.91 EUR
    const ratesBaseUsd: Record<string, number> = json.rates || {};

    const result: RatesCache = { fetchedAt: Date.now() };
    // USD per 1 unit of currency = 1 / (1 USD in that currency)
    for (const cur of ['USD','EUR','GBP','INR','AUD','CAD','SGD','JPY']) {
      if (cur === 'USD') {
        result['USD'] = 1;
      } else {
        const usdToCur = ratesBaseUsd[cur];
        result[cur as SupportedCurrency] = usdToCur ? 1 / usdToCur : undefined;
      }
    }

    inMemoryCache = result;
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
      }
    } catch (e) {
      // ignore
    }

    return result;
  } catch (e) {
    // If fetch fails, try to return whatever cache we have, or sensible fallbacks
    if (inMemoryCache && inMemoryCache.fetchedAt) return inMemoryCache;
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as RatesCache;
        if (parsed.fetchedAt) return parsed;
      }
    } catch {}

    // Fallback static rates (approximate) to avoid blocking UX
    const fallback: RatesCache = {
      fetchedAt: Date.now(),
      USD: 1,
      EUR: 1.05,
      GBP: 1.25,
      INR: 0.012,
      AUD: 0.65,
      CAD: 0.73,
      SGD: 0.74,
      JPY: 0.0069,
    };
    inMemoryCache = fallback;
    return fallback;
  }
}

export async function getUsdRateFor(currency: SupportedCurrency | string): Promise<number> {
  const cur = (currency || 'USD').toString().toUpperCase() as SupportedCurrency;
  const rates = await fetchRates();
  const v = rates[cur];
  if (typeof v === 'number') return v;
  // default to 1 (USD)
  return 1;
}

export async function convertCurrency(amount: number, from: SupportedCurrency | string, to: SupportedCurrency | string): Promise<number> {
  if (amount == null || isNaN(Number(amount))) return 0;
  const f = (from || 'USD').toString().toUpperCase();
  const t = (to || 'USD').toString().toUpperCase();
  if (f === t) return Number(amount);

 

    const response = await currencyApi.getRate(f);
    const rates = response?.data?.rates as Record<string, number> | undefined;
    const rateFt = rates?.[t]; 
    if (typeof rateFt === 'number') {
      return Number(amount) * rateFt;
    }



  try {
    const usdPerFrom = await getUsdRateFor(f);
    const usdPerTo = await getUsdRateFor(t);
    const amountUsd = Number(amount) * usdPerFrom;
    const converted = amountUsd / (usdPerTo || 1);
    return converted;
  } catch (_) {
    return Number(amount);
  }
}

export function formatCurrency(amount: number, currency: SupportedCurrency | string = 'USD') {
  try {
    const cur = (currency || 'USD').toString().toUpperCase();
    // Some currencies (JPY) usually show no decimals
    const options: Intl.NumberFormatOptions = { style: 'currency', currency: cur };
    return new Intl.NumberFormat(undefined, options).format(Number(amount || 0));
  } catch (e) {
    return `${currency} ${Number(amount || 0).toFixed(2)}`;
  }
}
