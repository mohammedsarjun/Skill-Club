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
import { mapClientDtoToUserModel, mapFreelancerDtoToUserModel, } from '../../mapper/userMapper/user.mapper.js';
import { MESSAGES } from '../../contants/contants.js';
let UserController = class UserController {
    constructor(userService) {
        this._userService = userService;
    }
    async selectRole(req, res) {
        try {
            const { role } = req.body;
            const userId = req.user?.userId;
            const user = await this._userService.selectRole(userId, role);
            // Issue new JWT with updated roles
            const payload = user;
            const accessToken = jwtService.createToken(payload, '15m');
            const refreshToken = jwtService.createToken(payload, '7d');
            res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.USER.ROLE_SELECTED,
                data: user,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async me(req, res) {
        try {
            const userId = req.user?.userId;
            const user = await this._userService.me(userId);
            const payload = user;
            const accessToken = jwtService.createToken(payload, '15m');
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // 🔹 must be false on localhost (no HTTPS)
                sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
                maxAge: 15 * 60 * 1000,
            });
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.USER.VERIFIED,
                data: user,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async createFreelancerProfile(req, res) {
        try {
            const userId = req.user?.userId;
            const dto = mapFreelancerDtoToUserModel(req.body);
            const user = await this._userService.createFreelancerProfile(userId, dto);
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.Freelancer.UPDATED,
                data: user,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async createClientProfile(req, res) {
        try {
            const userId = req.user.userId;
            const dto = mapClientDtoToUserModel(req.body);
            const user = await this._userService.createClientProfile(userId, dto);
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.CLIENT.UPDATED,
                data: user,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async switchRole(req, res) {
        try {
            const userId = req.user.userId;
            const user = await this._userService.switchRole(userId);
            const payload = user;
            const accessToken = jwtService.createToken(payload, '15m');
            const refreshToken = jwtService.createToken(payload, '7d');
            console.log(user);
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // 🔹 must be false on localhost (no HTTPS)
                sameSite: 'lax', // 🔹 "strict" blocks cross-site cookies
                maxAge: 15 * 60 * 1000,
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.USER.ROLE_SWITCHED,
                data: user,
            });
        }
        catch (error) {
            throw error;
        }
    }
};
UserController = __decorate([
    injectable(),
    __param(0, inject('IUserServices')),
    __metadata("design:paramtypes", [Object])
], UserController);
export { UserController };
//# sourceMappingURL=userController.js.map