export interface SubmitWorklogDTO {
  contractId: string;
  milestoneId?: string;
  duration: number;
  files: { fileName: string; fileUrl: string }[];
  description?: string;
}

export interface WorklogResponseDTO {
  worklogId: string;
  contractId: string;
  milestoneId?: string;
  freelancerId: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  files: { fileName: string; fileUrl: string }[];
  description?: string;
  status: 'submitted' | 'approved' | 'rejected';
  createdAt: Date;
}
