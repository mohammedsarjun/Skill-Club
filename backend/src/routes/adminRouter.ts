import express from 'express'
import { AuthController } from '../controllers/auth/authController.js'
import { container } from "tsyringe";
import { validate } from '../middlewares/validate.js';
import { signupSchema } from '../utils/authValidations.js';
const adminRouter = express.Router()

const authController=container.resolve(AuthController)
adminRouter.post("/categories",authController.signup.bind(authController))


export default adminRouter