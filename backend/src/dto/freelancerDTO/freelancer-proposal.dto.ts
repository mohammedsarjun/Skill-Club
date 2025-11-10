export interface CreateProposalRequestDto{
  jobId: string
  hourlyRate?: number;                
  availableHoursPerWeek?: number;     
  proposedBudget?: number;            
  deadline?: Date;                    
  coverLetter: string;                

}