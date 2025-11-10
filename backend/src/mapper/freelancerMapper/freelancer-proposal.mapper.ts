import { Types } from "mongoose";
import { CreateProposalRequestDto } from "../../dto/freelancerDTO/freelancer-proposal.dto";
import { ProposalDetail } from "../../models/interfaces/proposal.model.interface";

export function mapCreateProposalRequestDtoToProposalModel(createProposalRequestDto: CreateProposalRequestDto,rateType:"hourly"|"fixed",freelancerId:string): ProposalDetail {
  return {
      freelancerId: new Types.ObjectId(freelancerId),      
      jobId:new Types.ObjectId(createProposalRequestDto.jobId),          
      hourlyRate: rateType=="hourly"?createProposalRequestDto.hourlyRate:undefined,              
      availableHoursPerWeek:rateType=="hourly"?createProposalRequestDto.availableHoursPerWeek:undefined,    
      proposedBudget: rateType=="fixed"?createProposalRequestDto.proposedBudget:undefined,           
      deadline: rateType=="fixed"?createProposalRequestDto.deadline:undefined,              
      coverLetter: createProposalRequestDto.coverLetter,
      status:"pending_verification"
}
}
