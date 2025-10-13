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
import { HttpStatus } from '../../enums/http-status.enum.js';
import { injectable, inject } from 'tsyringe';
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import dotenv from 'dotenv';
import { jwtService } from '../../utils/jwt.js';
import { jwtConfig } from '../../config/jwt.config.js';
import { MESSAGES } from '../../contants/contants.js';
dotenv.config();
let GoogleAuthController = class GoogleAuthController {
    constructor(googleAuthService, userService) {
        this._googleAuthService = googleAuthService;
        this._userService = userService;
    }
    async googleLogin(req, res) {
        const { idToken } = req.body;
        const user = await this._googleAuthService.verifyToken(idToken);
        await this._userService.markUserVerified(user.userId);
        // 🔹 Create tokens
        const payload = user;
        const accessToken = jwtService.createToken(payload, jwtConfig.accessTokenMaxAge);
        const refreshToken = jwtService.createToken(payload, jwtConfig.refreshTokenMaxAge);
        res.cookie('accessToken', accessToken, {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production', // 🔹 must be false on localhost (no HTTPS)
            sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
            maxAge: jwtConfig.accessTokenMaxAge * 1000
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: jwtConfig.refreshTokenMaxAge * 1000
        });
        res.status(HttpStatus.OK).json({
            success: true,
            message: MESSAGES.AUTH.LOGIN_SUCCESS,
            data: user,
        });
    }
};
GoogleAuthController = __decorate([
    injectable(),
    __param(0, inject('IGoogleAuthService')),
    __param(1, inject('IUserServices')),
    __metadata("design:paramtypes", [Object, Object])
], GoogleAuthController);
export { GoogleAuthController };
//# sourceMappingURL=googleAuthController.js.map