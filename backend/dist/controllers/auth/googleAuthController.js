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
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { injectable, inject } from "tsyringe";
let GoogleAuthController = class GoogleAuthController {
    constructor(googleAuthService) {
        this.googleAuthService = googleAuthService;
    }
    async googleLogin(req, res) {
        const { idToken } = req.body;
        if (!idToken)
            throw new AppError("Token missing", HttpStatus.BAD_REQUEST);
        try {
            const result = await this.googleAuthService.verifyToken(idToken);
            res.json(result);
        }
        catch (err) {
            res.status(401).json({ message: err.message });
        }
    }
};
GoogleAuthController = __decorate([
    injectable(),
    __param(0, inject("IGoogleAuthService")),
    __metadata("design:paramtypes", [Object])
], GoogleAuthController);
export { GoogleAuthController };
//# sourceMappingURL=googleAuthController.js.map