import express from 'express'
import { AuthController } from '../controllers/auth/authController.js'
import { container } from "tsyringe";
import { validate } from '../middlewares/validate.js';
import { signupSchema,verifyOtpSchema } from '../utils/validationSchemas/authValidations.js';
import { OtpController } from '../controllers/auth/otpController.js';
const authRouter = express.Router()

const authController=container.resolve(AuthController)
const otpController=container.resolve(OtpController)
authRouter.post("/signup",validate(signupSchema),authController.signup.bind(authController))
authRouter.post("/otp",otpController.createOtp.bind(otpController))
authRouter.post("/verify-otp",validate(verifyOtpSchema),otpController.verifyOtp.bind(otpController))

export default authRouter