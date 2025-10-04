import express from 'express';
import { container } from 'tsyringe';
import { authMiddleware, roleGuard } from '../middlewares/authMiddleware.js';
import { FreelancerController } from '../controllers/freelancer/freelancerController.js';
const freelancerRouter = express.Router();
const freelancerController = container.resolve(FreelancerController);
freelancerRouter.get("/me", authMiddleware, roleGuard("freelancer"), freelancerController.getFreelancerData.bind(freelancerController));
export default freelancerRouter;
//# sourceMappingURL=freelancerRouter.js.map