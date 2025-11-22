import { ContractStatus } from '../../models/interfaces/contract.model.interface';

export interface FreelancerContractQueryParamsDTO {
  search?: string;
  page?: number;
  limit?: number;
  filters: {
    status?: ContractStatus;
  };
}

export interface FreelancerContractListItemDTO {
  id: string;
  contractId: string;
  title: string;
  paymentType: 'fixed' | 'fixed_with_milestones' | 'hourly';
  budget?: number;
  hourlyRate?: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD' | 'JPY';
  status: string;
  createdAt: Date;
  client?: {
    clientId: string;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    logo?: string;
  };
}

export interface FreelancerContractListResultDTO {
  items: FreelancerContractListItemDTO[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}
