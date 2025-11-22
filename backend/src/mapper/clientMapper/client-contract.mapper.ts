import { IContract } from '../../models/interfaces/contract.model.interface';
import { ClientContractDetailDTO } from '../../dto/clientDTO/client-contract.dto';

function docIdToString(id: unknown): string | undefined {
  if (!id) return undefined;
  if (typeof id === 'string') return id;
  if (
    typeof id === 'object' &&
    id !== null &&
    'toString' in id &&
    typeof (id as { toString: unknown }).toString === 'function'
  ) {
    return (id as { toString(): string }).toString();
  }
  return undefined;
}

export const mapContractModelToClientContractDetailDTO = (
  contract: IContract,
): ClientContractDetailDTO => {
  const rawObj = contract as unknown as Record<string, unknown>;

  const freelancerPopulated = rawObj.freelancerId as unknown as {
    _id?: unknown;
    firstName?: string;
    lastName?: string;
    logo?: string;
    country?: string;
    rating?: number;
  };
  const jobPopulated = rawObj.jobId as unknown as { _id?: unknown; title?: string };
  const offerPopulated = rawObj.offerId as unknown as { _id?: unknown; offerType?: 'direct' | 'proposal' };

  return {
    contractId: contract.contractId,
    offerId: docIdToString(contract.offerId) || '',
    offerType: offerPopulated?.offerType,
    jobId: contract.jobId ? docIdToString(contract.jobId) : undefined,
    jobTitle: jobPopulated?.title,
    proposalId: contract.proposalId ? docIdToString(contract.proposalId) : undefined,

    freelancer: freelancerPopulated
      ? {
          freelancerId: docIdToString(freelancerPopulated._id) || '',
          firstName: freelancerPopulated.firstName,
          lastName: freelancerPopulated.lastName,
          logo: freelancerPopulated.logo,
          country: freelancerPopulated.country,
          rating: freelancerPopulated.rating,
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

    milestones: contract.milestones?.map((m) => ({
      milestoneId: docIdToString(m.milestoneId) || '',
      title: m.title,
      amount: m.amount,
      amountBaseUSD: m.amountBaseUSD,
      expectedDelivery: m.expectedDelivery,
      status: m.status,
      submittedAt: m.submittedAt,
      approvedAt: m.approvedAt,
    })),

    title: contract.title,
    description: contract.description,
    expectedStartDate: contract.expectedStartDate,
    expectedEndDate: contract.expectedEndDate,
    referenceFiles: contract.referenceFiles || [],
    referenceLinks: contract.referenceLinks || [],

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
};
