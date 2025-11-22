import { IOffer, OfferMilestone } from '../models/interfaces/offer.model.interface';
import { IContract } from '../models/interfaces/contract.model.interface';
import { Types } from 'mongoose';

export const mapOfferToContract = (offer: IOffer): Partial<IContract> => {
  return {
    offerId: offer._id as Types.ObjectId,
    clientId: offer.clientId,
    freelancerId: offer.freelancerId,
    jobId: offer.jobId,
    proposalId: offer.proposalId,
    paymentType: offer.paymentType,
    budget: offer.budget,
    budgetBaseUSD: offer.budgetBaseUSD,
    hourlyRate: offer.hourlyRate,
    hourlyRateBaseUSD: offer.hourlyRateBaseUSD,
    conversionRate: offer.conversionRate,
    estimatedHoursPerWeek: offer.estimatedHoursPerWeek,
    currency: offer.currency,
    milestones: offer.milestones?.map((milestone: OfferMilestone) => ({
      milestoneId: new Types.ObjectId(),
      title: milestone.title,
      amount: milestone.amount,
      amountBaseUSD: milestone.amountBaseUSD,
      expectedDelivery: milestone.expectedDelivery,
      status: 'pending' as const,
    })),
    title: offer.title,
    description: offer.description,
    expectedStartDate: offer.expectedStartDate,
    expectedEndDate: offer.expectedEndDate,
    referenceFiles: offer.referenceFiles,
    referenceLinks: offer.referenceLinks,
    communication: offer.communication,
    reporting: offer.reporting,
    status: 'pending_funding' as const,
    fundedAmount: 0,
    totalPaid: 0,
    balance: offer.budget || 0,
  };
};
