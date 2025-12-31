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
    hourlyRate: offer.hourlyRate,
    estimatedHoursPerWeek: offer.estimatedHoursPerWeek,
    milestones: offer.milestones?.map((milestone: OfferMilestone) => ({
      milestoneId: new Types.ObjectId(),
      title: milestone.title,
      amount: milestone.amount,
      expectedDelivery: milestone.expectedDelivery,
      status: 'pending_funding' as const,
      revisionsAllowed: typeof milestone.revisions === 'number' ? milestone.revisions : offer.revisions || 0,
    })),
    revisions: typeof offer.revisions === 'number' ? offer.revisions : 0,
    revisionAllowed: typeof offer.revisions === 'number' ? offer.revisions : 0,
    title: offer.title,
    description: offer.description,
    expectedStartDate: new Date(),
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
