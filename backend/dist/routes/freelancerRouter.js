import express from 'express';
import { container } from 'tsyringe';
import { authMiddleware, roleGuard } from '../middlewares/authMiddleware.js';
import { FreelancerController } from '../controllers/freelancer/freelancerController.js';
import { freelancerBlockMiddleware } from '../middlewares/freelancerBlockMiddleware.js';
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
export default freelancerRouter;
//# sourceMappingURL=freelancerRouter.js.map
