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
const clientRouter = express.Router();

const clientController = container.resolve(ClientController);
const clientJobController = container.resolve(ClientJobController);
const clientCategoryController = container.resolve(ClientCategoryController);
const clientSpecialityController = container.resolve(ClientSpecialityController);
const clientFreelancerController = container.resolve(ClientFreelancerController);
const clientProposalController = container.resolve(ClientProposalController);
const clientOfferController = container.resolve(ClientOfferController);
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

clientRouter.post(
  '/offers',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientOfferController.createOffer.bind(clientOfferController),
);

export default clientRouter;
