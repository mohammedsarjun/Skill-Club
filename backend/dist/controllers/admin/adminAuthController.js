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
let AdminAuthController = class AdminAuthController {
    constructor(adminAuthServices) {
        this.adminAuthServices = adminAuthServices;
    }
    async login(req, res) {
        const result = this.adminAuthServices.login(req.body);
        const payload = { userId: 'admin_1', roles: ['admin'], activeRole: 'admin' };
        const accessToken = jwtService.createToken(payload, jwtConfig.accessTokenMaxAge);
        const refreshToken = jwtService.createToken(payload, jwtConfig.refreshTokenMaxAge);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: jwtConfig.accessTokenMaxAge * 1000,
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: jwtConfig.refreshTokenMaxAge * 1000,
        });
        res.status(HttpStatus.OK).json({
            success: true,
            message: MESSAGES.AUTH.LOGIN_SUCCESS,
            data: payload,
        });
    }
    async logout(req, res) {
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
        res.status(HttpStatus.OK).json({ message: MESSAGES.AUTH.LOGOUT_SUCCESS });
    }
    async me(req, res) {
        res.status(HttpStatus.OK).json({
            success: true,
            message: MESSAGES.ADMIN.VERIFIED,
            data: req.user,
        });
    }
};
AdminAuthController = __decorate([
    injectable(),
    __param(0, inject('IAdminAuthServices')),
    __metadata("design:paramtypes", [Object])
], AdminAuthController);
export { AdminAuthController };
//# sourceMappingURL=adminAuthController.js.map