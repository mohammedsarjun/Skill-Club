export interface ProposalQueryParamsDTO {
  search?: string;
  page?: number;
  limit?: number;
  filters: {
    status?:
      | 'pending_verification'
      | 'accepted'
      | 'rejected'
  };
}