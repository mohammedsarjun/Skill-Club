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
import { jwtService } from '../utils/jwt.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
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
authRouter.post(
  '/verify-password',
  authMiddleware,
  authController.verifyPassword.bind(authController),
);
authRouter.post("/action-verification",authMiddleware,authController.createActionVerification.bind(authController))

//google login
authRouter.post('/google', googleAuthController.googleLogin.bind(googleAuthController));

authRouter.post('/logout', authController.logout.bind(authController));

authRouter.post('/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const decoded = jwtService.verifyToken(refreshToken);

    const { iat, exp, nbf, ...payload } = decoded;
    console.log(payload);
    const newAccessToken = jwtService.createToken(payload, '15m');

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: 'Access token refreshed' });
  } catch (err) {
    res.sendStatus(403);
  }
});

export default authRouter;
