var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { injectable } from "tsyringe";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import { ERROR_MESSAGES } from "../../contants/errorConstants.js";
let AdminAuthServices = class AdminAuthServices {
    constructor() {
    }
    login(adminData) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (adminEmail != adminData?.email || adminPassword != adminData?.password)
            throw new AppError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }
};
AdminAuthServices = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], AdminAuthServices);
export { AdminAuthServices };
//# sourceMappingURL=adminAuthServices.js.map