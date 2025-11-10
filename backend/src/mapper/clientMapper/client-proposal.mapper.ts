import { ProposalQueryParamsDTO } from 'src/dto/clientDTO/client-proposal.dto';

type ProposalStatus = 'pending_verification' | 'accepted' | 'rejected';

type RawFilters = {
  status?: ProposalStatus;
};

export const mapRawQueryFiltersToProposalQueryParamsDTO = (
  rawQuery: Record<string, unknown>,
): ProposalQueryParamsDTO => {
  let filters: RawFilters = {};

  if (typeof rawQuery.filters === 'string') {
    try {
      const parsed = JSON.parse(rawQuery.filters);
      if (typeof parsed === 'object' && parsed !== null) {
        filters = parsed as RawFilters;
      }
    } catch {
      filters = {};
    }
  } else if (typeof rawQuery.filters === 'object' && rawQuery.filters !== null) {
    filters = rawQuery.filters as RawFilters;
  }

  const allowedStatuses: readonly ProposalStatus[] = [
    'pending_verification',
    'accepted',
    'rejected',
  ];

  const status = filters.status && allowedStatuses.includes(filters.status)
    ? filters.status
    : undefined;

  return {
    search: typeof rawQuery.search === 'string' ? rawQuery.search : undefined,
    page: Number(rawQuery.page) > 0 ? Number(rawQuery.page) : 1,
    limit: Number(rawQuery.limit) > 0 ? Number(rawQuery.limit) : 10,
    filters: { status },
  };
};
