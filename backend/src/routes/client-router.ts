import express from 'express';

import { container } from 'tsyringe';
import { authMiddleware, roleGuard } from '../middlewares/auth-middleware';

import { ClientController } from '../controllers/client/client-controller';
import { clientBlockMiddleware } from '../middlewares/client-block-middleware';
import { ClientJobController } from '../controllers/client/client-job-controller';
import { ClientCategoryController } from '../controllers/client/client-category-controller';
import { ClientSpecialityController } from '../controllers/client/client-speciality-controller';
import { ClientFreelancerController } from '../controllers/client/client-freelancer-controller';
import { ClientProposalController } from '../controllers/client/client-proposal-controller';
import { ClientOfferController } from '../controllers/client/client-offer-controller';
import { ClientSavedFreelancerController } from '../controllers/client/client-saved-freelancer-controller';
const clientRouter = express.Router();

const clientController = container.resolve(ClientController);
const clientJobController = container.resolve(ClientJobController);
const clientCategoryController = container.resolve(ClientCategoryController);
const clientSpecialityController = container.resolve(ClientSpecialityController);
const clientFreelancerController = container.resolve(ClientFreelancerController);
const clientProposalController = container.resolve(ClientProposalController);
const clientOfferController = container.resolve(ClientOfferController);
const clientSavedFreelancerController = container.resolve(ClientSavedFreelancerController);
clientRouter.get(
  '/me',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientController.getClientData.bind(clientController),
);
clientRouter.patch(
  '/update',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientController.updateClient.bind(clientController),
);

clientRouter.post(
  '/jobs',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientJobController.createJob.bind(clientJobController),
);

clientRouter.get(
  '/categories',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientCategoryController.getAllCategories.bind(clientCategoryController),
);

clientRouter.get(
  '/specialities',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientSpecialityController.getSpecialityWithSkills.bind(clientSpecialityController),
);

clientRouter.get(
  '/jobs',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientJobController.getAllJobs.bind(clientJobController),
);

clientRouter.get(
  '/jobs/:jobId',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientJobController.getJobDetail.bind(clientJobController),
);

clientRouter.put(
  '/jobs/:jobId',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientJobController.updateJobDetail.bind(clientJobController),
);

clientRouter.patch(
  '/jobs/:jobId/close',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientJobController.closeJob.bind(clientJobController),
);

clientRouter.get(
  '/freelancers',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientFreelancerController.getAllFreelancers.bind(clientFreelancerController),
);

clientRouter.get(
  '/freelancers/:freelancerId',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientFreelancerController.getFreelancerDetail.bind(clientFreelancerController),
);

clientRouter.get(
  '/freelancers/:freelancerId/portfolio',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientFreelancerController.getFreelancerPortfolio.bind(clientFreelancerController),
);

clientRouter.get(
  '/jobs/:jobId/proposals',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientProposalController.getAllProposal.bind(clientProposalController),
);

clientRouter.get(
  '/proposals/:proposalId',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientProposalController.getProposalDetail.bind(clientProposalController),
);

// Offer routes
clientRouter.get(
  '/offers',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientOfferController.getAllOffers.bind(clientOfferController),
);

clientRouter.get(
  '/offers/:offerId',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientOfferController.getOfferDetail.bind(clientOfferController),
);

clientRouter.get(
  '/offers/:offerId',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientOfferController.getOfferDetail.bind(clientOfferController),
);


clientRouter.post(
  '/offers',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientOfferController.createOffer.bind(clientOfferController),
);

clientRouter.post(
  '/freelancers/:freelancerId/save',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientSavedFreelancerController.toggleSaveFreelancer.bind(clientSavedFreelancerController),
);

clientRouter.get(
  '/freelancers/:freelancerId/saved',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientSavedFreelancerController.isFreelancerSaved.bind(clientSavedFreelancerController),
);

clientRouter.get(
  '/saved-freelancers',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientSavedFreelancerController.getSavedFreelancers.bind(clientSavedFreelancerController),
);

export default clientRouter;
