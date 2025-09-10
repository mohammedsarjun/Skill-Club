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
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async signup(userData) {
        const result = await this.userRepository.create(userData);
        console.log(result);
        return Promise.resolve();
    }
    login(userData) {
        return Promise.resolve();
    }
};
AuthService = __decorate([
    injectable(),
    __param(0, inject("IUserRepository")),
    __metadata("design:paramtypes", [Object])
], AuthService);
export { AuthService };
//# sourceMappingURL=AuthService.js.map