import { IContract } from '../../models/interfaces/contract.model.interface';
import { FreelancerContractDetailDTO } from '../../dto/freelancerDTO/freelancer-contract.dto';

export function mapContractToFreelancerDetailDTO(contract: IContract): FreelancerContractDetailDTO {
  return {
    contractId: contract.contractId,
    offerId: contract.offerId?.toString() || '',
    offerType: (contract.offerId as unknown as { offerType?: 'direct' | 'proposal' })?.offerType,
    jobId: contract.jobId?.toString(),
    jobTitle: (contract.jobId as unknown as { title?: string })?.title,
    proposalId: contract.proposalId?.toString(),
    
    client: contract.clientId
      ? {
          clientId: (contract.clientId as unknown as { _id: string })._id || '',
          firstName: (contract.clientId as unknown as { firstName?: string }).firstName,
          lastName: (contract.clientId as unknown as { lastName?: string }).lastName,
          companyName: (contract.clientId as unknown as { companyName?: string }).companyName,
          logo: (contract.clientId as unknown as { logo?: string }).logo,
          country: (contract.clientId as unknown as { country?: string }).country,
        }
      : undefined,

    paymentType: contract.paymentType,
    budget: contract.budget,
    budgetBaseUSD: contract.budgetBaseUSD,
    hourlyRate: contract.hourlyRate,
    hourlyRateBaseUSD: contract.hourlyRateBaseUSD,
    conversionRate: contract.conversionRate,
    estimatedHoursPerWeek: contract.estimatedHoursPerWeek,
    currency: contract.currency,

    milestones: contract.milestones?.map((milestone) => ({
      milestoneId: milestone.milestoneId?.toString() || '',
      title: milestone.title,
      amount: milestone.amount,
      amountBaseUSD: milestone.amountBaseUSD,
      expectedDelivery: milestone.expectedDelivery,
      status: milestone.status,
      submittedAt: milestone.submittedAt,
      approvedAt: milestone.approvedAt,
    })),

    timesheets: contract.timesheets?.map((timesheet) => ({
      weekStart: timesheet.weekStart,
      weekEnd: timesheet.weekEnd,
      totalHours: timesheet.totalHours,
      totalAmount: timesheet.totalAmount,
      status: timesheet.status,
    })),

    deliverables: contract.deliverables?.map((deliverable) => ({
      submittedBy: deliverable.submittedBy?.toString() || '',
      files: deliverable.files,
      message: deliverable.message,
      status: deliverable.status,
      submittedAt: deliverable.submittedAt,
      approvedAt: deliverable.approvedAt,
    })),

    title: contract.title,
    description: contract.description,
    expectedStartDate: contract.expectedStartDate,
    expectedEndDate: contract.expectedEndDate,
    referenceFiles: contract.referenceFiles,
    referenceLinks: contract.referenceLinks,
    
    communication: contract.communication
      ? {
          preferredMethod: contract.communication.preferredMethod,
          meetingFrequency: contract.communication.meetingFrequency,
          meetingDayOfWeek: contract.communication.meetingDayOfWeek,
          meetingDayOfMonth: contract.communication.meetingDayOfMonth,
          meetingTimeUtc: contract.communication.meetingTimeUtc,
        }
      : undefined,
    
    reporting: contract.reporting
      ? {
          frequency: contract.reporting.frequency,
          dueTimeUtc: contract.reporting.dueTimeUtc,
          dueDayOfWeek: contract.reporting.dueDayOfWeek,
          dueDayOfMonth: contract.reporting.dueDayOfMonth,
          format: contract.reporting.format,
        }
      : undefined,

    status: contract.status,
    fundedAmount: contract.fundedAmount,
    totalPaid: contract.totalPaid,
    balance: contract.balance,
    
    createdAt: contract.createdAt,
    updatedAt: contract.updatedAt,
  };
}
