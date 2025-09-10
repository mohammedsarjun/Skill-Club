import express from 'express'
import { AuthController } from '../controllers/auth/authController.js'
import { container } from "tsyringe";
import { validate } from '../middlewares/validate.js';
import { signupSchema } from '../utils/authValidations.js';
const authRouter = express.Router()

const authController=container.resolve(AuthController)
authRouter.post("/signup",validate(signupSchema),authController.signup.bind(authController))


export default authRouter