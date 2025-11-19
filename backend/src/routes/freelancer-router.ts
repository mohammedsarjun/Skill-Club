import express from 'express';

import { container } from 'tsyringe';
import { authMiddleware, roleGuard } from '../middlewares/auth-middleware';
import { FreelancerController } from '../controllers/freelancer/freelancer-controller';
import { freelancerBlockMiddleware } from '../middlewares/freelancer-block-middleware';
import { FreelancerCategoryController } from '../controllers/freelancer/freelancer-category-controller';
import { FreelancerSpecialityController } from '../controllers/freelancer/freelancer-speciality-controller';
import { FreelancerJobController } from '../controllers/freelancer/freelancer-job-controller';
import { FreelancerProposalController } from '../controllers/freelancer/freelancer-proposal-controller';
import { FreelancerOfferController } from '../controllers/freelancer/freelancer-offer-controller';
import { FreelancerSavedJobController } from '../controllers/freelancer/freelancer-saved-job-controller';
const freelancerRouter = express.Router();

const freelancerController = container.resolve(FreelancerController);
const freelancerCategoryController = container.resolve(FreelancerCategoryController);
const freelancerSpecialityController = container.resolve(FreelancerSpecialityController);
const freelancerJobController = container.resolve(FreelancerJobController);
const freelancerProposalController = container.resolve(FreelancerProposalController);
const freelancerOfferController = container.resolve(FreelancerOfferController);
const freelancerSavedJobController = container.resolve(FreelancerSavedJobController);
freelancerRouter.get(
  '/me',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerController.getFreelancerData.bind(freelancerController),
);
freelancerRouter.patch(
  '/profile/language',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerController.updateFreelancerLanguage.bind(freelancerController),
);
freelancerRouter.delete(
  '/profile/language',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerController.deleteFreelancerLanguage.bind(freelancerController),
);
freelancerRouter.patch(
  '/profile/description',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerController.updateFreelancerDescription.bind(freelancerController),
);

freelancerRouter.patch(
  '/profile/education',
  authMiddleware,

  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerController.addFreelancerEducation.bind(freelancerController),
);

freelancerRouter.patch(
  '/profile/hourlyRate',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerController.updateFreelancerHourlyRate.bind(freelancerController),
);
freelancerRouter.patch(
  '/profile/professionalRole',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerController.updateFreelancerProfessionalRole.bind(freelancerController),
);

freelancerRouter.delete(
  '/profile/education',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerController.deleteFreelancerEducation.bind(freelancerController),
);

freelancerRouter.delete(
  '/profile/portfolio',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerController.deleteFreelancerPortfolio.bind(freelancerController),
);

freelancerRouter.post(
  '/portfolio',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerController.createPortfolio.bind(freelancerController),
);

freelancerRouter.get(
  '/portfolio',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerController.getPortfolio.bind(freelancerController),
);
freelancerRouter.get(
  '/portfolio/detail',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerController.getPortfolioDetail.bind(freelancerController),
);
freelancerRouter.patch(
  '/profile/workHistory',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerController.updateFreelancerWorkHistory.bind(freelancerController),
);

freelancerRouter.delete(
  '/profile/workHistory',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerController.deleteFreelancerWorkHistory.bind(freelancerController),
);

freelancerRouter.get(
  '/categories',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerCategoryController.getAllCategories.bind(freelancerCategoryController),
);

freelancerRouter.get(
  '/specialities',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerSpecialityController.getSpecialityWithSkills.bind(freelancerSpecialityController),
);

freelancerRouter.get(
  '/jobs',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerJobController.getAllJobs.bind(freelancerJobController),
);

freelancerRouter.get(
  '/jobs/:jobId',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerJobController.getJobDetail.bind(freelancerJobController),
);

freelancerRouter.post(
  '/proposals',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerProposalController.createProposal.bind(freelancerProposalController),
);

freelancerRouter.get(
  '/jobs/:jobId/proposals',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerProposalController.getAllProposal.bind(freelancerProposalController),
);
// Offer routes
freelancerRouter.get(
  '/offers',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerOfferController.getAllOffers.bind(freelancerOfferController),
);
freelancerRouter.get(
  '/offers/:offerId',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerOfferController.getOfferDetail.bind(freelancerOfferController),
);

freelancerRouter.post(
  '/offers/:offerId/reject',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerOfferController.rejectOffer.bind(freelancerOfferController),
);

freelancerRouter.post(
  '/jobs/:jobId/save',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerSavedJobController.toggleSaveJob.bind(freelancerSavedJobController),
);

freelancerRouter.get(
  '/jobs/:jobId/saved',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerSavedJobController.isJobSaved.bind(freelancerSavedJobController),
);

freelancerRouter.get(
  '/saved-jobs',
  authMiddleware,
  roleGuard('freelancer'),
  freelancerBlockMiddleware,
  freelancerSavedJobController.getSavedJobs.bind(freelancerSavedJobController),
);

export default freelancerRouter;
