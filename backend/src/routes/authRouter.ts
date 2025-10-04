import express from 'express';
import { AuthController } from '../controllers/auth/authController.js';
import { container } from 'tsyringe';
import { validate } from '../middlewares/validate.js';

import {
  emailSchema,
  loginSchema,
  signupSchema,
  verifyOtpSchema,
} from '../utils/validationSchemas/authValidations.js';
import { OtpController } from '../controllers/auth/otpController.js';
import { GoogleAuthController } from '../controllers/auth/googleAuthController.js';
const authRouter = express.Router();

const authController = container.resolve(AuthController);
const otpController = container.resolve(OtpController);
const googleAuthController = container.resolve(GoogleAuthController);
authRouter.post('/signup', validate(signupSchema), authController.signup.bind(authController));
authRouter.post('/login', validate(loginSchema), authController.login.bind(authController));
authRouter.post('/otp', otpController.createOtp.bind(otpController));
authRouter.post(
  '/verify-otp',
  validate(verifyOtpSchema),
  otpController.verifyOtp.bind(otpController),
);
authRouter.post('/forgot-password', authController.forgotPassword.bind(authController));
authRouter.post('/reset-password', authController.resetPassword.bind(authController));

//google login
authRouter.post('/google', googleAuthController.googleLogin.bind(googleAuthController));

authRouter.post('/logout',authController.logout.bind(authController));

export default authRouter;
