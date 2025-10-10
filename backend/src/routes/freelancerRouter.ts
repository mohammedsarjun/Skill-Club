import express from 'express'

import { container } from 'tsyringe'
import { authMiddleware, roleGuard } from '../middlewares/authMiddleware.js'
import { FreelancerController } from '../controllers/freelancer/freelancerController.js'
import { validate } from '../middlewares/validate.js'
import { portfolioSchema } from '../utils/validationSchemas/validations.js'
const freelancerRouter = express.Router()

const freelancerController = container.resolve(FreelancerController)

freelancerRouter.get("/me",authMiddleware,roleGuard("freelancer"),freelancerController.getFreelancerData.bind(freelancerController))
freelancerRouter.patch("/profile/language",authMiddleware,roleGuard("freelancer"),freelancerController.updateFreelancerLanguage.bind(freelancerController))
freelancerRouter.post("/portfolio",authMiddleware,roleGuard("freelancer"),validate(portfolioSchema),freelancerController.createPortfolio.bind(freelancerController))
freelancerRouter.get("/portfolio",authMiddleware,roleGuard("freelancer"),freelancerController.getPortfolio.bind(freelancerController))
freelancerRouter.get("/portfolio/detail",authMiddleware,roleGuard("freelancer"),freelancerController.getPortfolioDetail.bind(freelancerController))
export default freelancerRouter