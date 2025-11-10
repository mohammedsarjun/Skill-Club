

export interface IClientProposalService {
  getAllProposal(clientId: string, queryFilters: Record<string, unknown>): Promise<void>;
}
