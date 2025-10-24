import express from 'express';

import { container } from 'tsyringe';
import { authMiddleware, roleGuard } from '../middlewares/auth-middleware';
import { FreelancerController } from '../controllers/freelancer/freelancer-controller';
import { freelancerBlockMiddleware } from '../middlewares/freelancer-block-middleware';
const freelancerRouter = express.Router();

const freelancerController = container.resolve(FreelancerController);

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

export default freelancerRouter;
