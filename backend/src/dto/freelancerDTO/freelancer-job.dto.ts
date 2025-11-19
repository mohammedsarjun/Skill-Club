export interface FreelancerJobFiltersDto {
  searchQuery: string;
  selectedCategory: string;
  selectedSpecialty: string;
  selectedSkills: string[];
  rateType: string;
  minHourlyRate: string;
  maxHourlyRate: string;
  minFixedRate: string;
  maxFixedRate: string;
  selectedProposalRanges: string[];
  selectedCountry: string;
  selectedRating: string;
  page: number;
  limit: number;
}

export interface FreelancerJobDetailResponseDto {
  jobId: string;
  title: string;
  description: string;
  category: string;
  specialities: string[];
  skills: string[];
  rateType: 'hourly' | 'fixed';
  hourlyRate?: {
    min: number;
    max: number;
    currency?: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD' | 'JPY';
    hoursPerWeek: number;
    estimatedDuration: '1 To 3 Months' | '3 To 6 Months';
  } | null;
  fixedRate?: {
    min: number;
    currency?: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD' | 'JPY';
    max: number;
  } | null;
  hourlyRateCurrency?: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD' | 'JPY';
  proposalReceived: number;
  postedAt: string; // ISO date string
  client: {
    companyName: string;
    country: string;
    rating: number;
    totalJobsPosted: number;
  };
  status: string;
}

export interface FreelancerJobResponseDto {
  jobId: string;
  jobTitle: string;
  description: string;
  category: string;
  specialities: string[];
  skills: string[];
  jobRateType: 'hourly' | 'fixed';
  hourlyRate?: {
    min: number;
    max: number;
    hoursPerWeek?: number;
    estimatedDuration?: '1 To 3 Months' | '3 To 6 Months';
    currency?: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD' | 'JPY';
  } | null;
  fixedRate?: {
    min: number;
    max: number;
    currency?: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD' | 'JPY';
  } | null;
  hourlyRateCurrency?: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD' | 'JPY';
  totalProposalReceived: number;
  postedAt: string;
  client: {
    companyName: string;
    country: string;
    rating: number;
  };
}
