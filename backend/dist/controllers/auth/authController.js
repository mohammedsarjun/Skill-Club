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
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signup(req, res) {
        try {
            const { firstName, lastName, email, phone, password, agreement } = req.body;
            const user = await this.authService.signup({
                firstName,
                lastName,
                email,
                phone,
                password,
                agreement,
            });
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                },
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message + "erroey than", });
        }
    }
};
AuthController = __decorate([
    injectable(),
    __param(0, inject("IAuthService")),
    __metadata("design:paramtypes", [Object])
], AuthController);
export { AuthController };
//# sourceMappingURL=authController.js.map