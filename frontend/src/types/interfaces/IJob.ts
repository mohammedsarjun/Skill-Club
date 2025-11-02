export interface IJob {
  jobId: string;
  jobTitle: string;
  companyName: string;
  category: {
    categoryName: string;
    categoryId: string;
  };
  budget: {
    rateType: string;
    min: number;
    max: number;
  };
  totalProposal: number;
  status: string;
}

export interface IJobQueryParams {
  search: string;
  page: number;
  limit: number;
  filters: {
    category?: string;
    status?:
      | "pending_verification"
      | "rejected"
      | "open"
      | "closed"
      | "archived"
      | "suspended";
  };
}

export interface JobDetailResponseDTO {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  category: {
    categoryName: string;
    categoryId: string;
  };
  specialities: {
    specialityId: string;
    specialityName: string;
  }[];
  skills: {
    skillId: string;
    skillName: string;
  }[];
  budget: {
    rateType: "hourly" | "fixed";
    min: number;
    max: number;
    hoursPerWeek?: number;
    estimatedDuration?: "1 To 3 Months" | "3 To 6 Months";
  };
  totalProposal: number;
  status:
    | "pending_verification"
    | "rejected"
    | "open"
    | "closed"
    | "archived"
    | "suspended";
  clientDetail: {
    clientId: string;
    companyName: string;
    companyLogo: string;
  };
  verifiedBy?: string;
  rejectedReason?: string;
  suspendedReason?: string;
}
