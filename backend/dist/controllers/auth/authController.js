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
import { injectable, inject } from "tsyringe";
import "../../config/container.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { jwtService } from "../../utils/jwt.js";
let AuthController = class AuthController {
    constructor(authService, otpService) {
        this.authService = authService;
        this.otpService = otpService;
    }
    async signup(req, res) {
        try {
            const user = await this.authService.signup(req.body);
            res.status(HttpStatus.CREATED).json({
                success: true,
                message: "User created successfully",
                data: user,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async login(req, res) {
        try {
            const user = await this.authService.login(req.body);
            // Generate JWT token
            // 🔹 Create tokens
            const payload = user;
            const accessToken = jwtService.createToken(payload, "15m");
            const refreshToken = jwtService.createToken(payload, "7d");
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false, // 🔹 must be false on localhost (no HTTPS)
                sameSite: "lax", // 🔹 "strict" blocks cross-site cookies
                maxAge: 15 * 60 * 1000,
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(HttpStatus.OK).json({
                success: true,
                message: "User Logged In successfully",
                data: user,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const user = await this.authService.forgotPassword(email);
            res.status(HttpStatus.OK).json({
                success: true,
                message: "Reset link sent to your email.",
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
            const user = await this.authService.resetPassword(token, password);
            res.status(HttpStatus.OK).json({
                success: true,
                message: "Password Changed Successfully.",
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
    __param(0, inject("IAuthService")),
    __param(1, inject("IOtpServices")),
    __metadata("design:paramtypes", [Object, Object])
], AuthController);
export { AuthController };
//# sourceMappingURL=authController.js.map