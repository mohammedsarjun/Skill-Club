var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { jwtService } from '../../utils/jwt.js';
import { jwtConfig } from '../../config/jwt.config.js';
import { MESSAGES } from '../../contants/contants.js';
let AuthController = class AuthController {
    constructor(authService, otpService) {
        this._authService = authService;
        this._otpService = otpService;
    }
    async signup(req, res) {
        try {
            const user = await this._authService.signup(req.body);
            console.log("successfully created");
            res.status(HttpStatus.CREATED).json({
                success: true,
                message: MESSAGES.USER.CREATED,
                data: user,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async login(req, res) {
        try {
            const user = await this._authService.login(req.body);
            // Generate JWT token
            // 🔹 Create tokens
            const payload = user;
            const accessToken = jwtService.createToken(payload, jwtConfig.accessTokenMaxAge);
            const refreshToken = jwtService.createToken(payload, jwtConfig.refreshTokenMaxAge);
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: false, // 🔹 must be false on localhost (no HTTPS)
                sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
                maxAge: jwtConfig.accessTokenMaxAge * 1000
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: jwtConfig.refreshTokenMaxAge
            });
            res.status(HttpStatus.OK).json({
                message: MESSAGES.AUTH.LOGIN_SUCCESS,
                success: true,
                data: user,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async logout(req, res) {
        try {
            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax'),
                path: '/',
            };
            // Clear both cookies
            res.clearCookie('accessToken', cookieOptions);
            res.clearCookie('refreshToken', cookieOptions);
            res.status(HttpStatus.OK).json({ message: MESSAGES.AUTH.LOGOUT_SUCCESS });
        }
        catch (err) {
            throw err;
        }
    }
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const user = await this._authService.forgotPassword(email);
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.AUTH.RESET_LINK_SENT,
                data: user,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async resetPassword(req, res) {
        try {
            const { token, password } = req.body.resetData;
            const user = await this._authService.resetPassword(token, password);
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.AUTH.PASSWORD_CHANGED,
                data: user,
            });
        }
        catch (error) {
            throw error;
        }
    }
};
AuthController = __decorate([
    injectable(),
    __param(0, inject('IAuthService')),
    __param(1, inject('IOtpServices')),
    __metadata("design:paramtypes", [Object, Object])
], AuthController);
export { AuthController };
//# sourceMappingURL=authController.js.map