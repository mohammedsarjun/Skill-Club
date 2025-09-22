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
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async selectRole(req, res) {
        try {
            const { role } = req.body;
            const userId = req.user?.userId;
            const user = await this.userService.selectRole(userId, role);
            // Issue new JWT with updated roles
            const payload = { userId: user.userId, roles: user.roles };
            const accessToken = jwtService.createToken(payload, "15m");
            const refreshToken = jwtService.createToken(payload, "7d");
            res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
            res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.status(HttpStatus.OK).json({
                success: true,
                message: "Role Selected Successfully",
                data: user.roles,
            });
        }
        catch (error) {
            throw error;
        }
    }
};
UserController = __decorate([
    injectable(),
    __param(0, inject("IUserServices")),
    __metadata("design:paramtypes", [Object])
], UserController);
export { UserController };
//# sourceMappingURL=userController.js.map