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
// services/GoogleAuthService.ts
import { OAuth2Client } from "google-auth-library";
import { inject, injectable } from "tsyringe";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
let GoogleAuthService = class GoogleAuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async verifyToken(idToken) {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload)
            throw new Error("Invalid Google token");
        // Check if user exists
        let user = await this.userRepository.findByEmail(payload.email);
        // // if (!user) {
        // //   // Create user if not exists
        // //   user = await this.userRepository.create({
        // //     email: payload.email!,
        // //     name: payload.name,
        // //     avatar: payload.picture,
        // //     googleId: payload.sub,
        // //   });
        // // }
        // // Generate JWT for your app
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        //   expiresIn: "7d",
        // });
        // return { user, token };
    }
};
GoogleAuthService = __decorate([
    injectable(),
    __param(0, inject("IUserRepository")),
    __metadata("design:paramtypes", [Object])
], GoogleAuthService);
export default GoogleAuthService;
//# sourceMappingURL=GoogleAuthService.js.map