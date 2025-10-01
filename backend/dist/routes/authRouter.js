import express from 'express';
import { AuthController } from '../controllers/auth/authController.js';
import { container } from 'tsyringe';
import { validate } from '../middlewares/validate.js';
import { loginSchema, signupSchema, verifyOtpSchema, } from '../utils/validationSchemas/authValidations.js';
import { OtpController } from '../controllers/auth/otpController.js';
import { GoogleAuthController } from '../controllers/auth/googleAuthController.js';
const authRouter = express.Router();
const authController = container.resolve(AuthController);
const otpController = container.resolve(OtpController);
const googleAuthController = container.resolve(GoogleAuthController);
authRouter.post('/signup', validate(signupSchema), authController.signup.bind(authController));
authRouter.post('/login', validate(loginSchema), authController.login.bind(authController));
authRouter.post('/otp', otpController.createOtp.bind(otpController));
authRouter.post('/verify-otp', validate(verifyOtpSchema), otpController.verifyOtp.bind(otpController));
authRouter.post('/forgot-password', authController.forgotPassword.bind(authController));
authRouter.post('/reset-password', authController.resetPassword.bind(authController));
//google login
authRouter.post('/google', googleAuthController.googleLogin.bind(googleAuthController));
authRouter.post('/logout', (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax'),
        path: '/',
    };
    // Clear both cookies
    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
    // Double insurance: explicitly overwrite with expired values
    res.cookie('accessToken', '', { ...cookieOptions, expires: new Date(0) });
    res.cookie('refreshToken', '', { ...cookieOptions, expires: new Date(0) });
    return res.status(200).json({ message: 'Logged out successfully' });
});
export default authRouter;
//# sourceMappingURL=authRouter.js.map