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
import { mapCreateGoogleUserDtoToUserModel } from "../../mapper/authMapper/googleAuth.mapper.js";
import { mapUserModelToUserDto } from "../../mapper/userMapper/user.mapper.js";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
let GoogleAuthService = class GoogleAuthService {
    constructor(userRepository) {
        this._userRepository = userRepository;
    }
    async verifyToken(idToken) {
        // Verify token
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID, // must match your Google client ID
        });
        // Extract payload
        const payload = ticket.getPayload();
        // Example: get user info
        const { sub, email, given_name, picture, family_name } = payload;
        let user = await this._userRepository.findOne({ email });
        if (user) {
            // ✅ Login flow
            // issue JWT/session for existing user
            // res.json({ status: "login", user });
        }
        else {
            // ✅ Signup flow
            const googleUserDto = mapCreateGoogleUserDtoToUserModel({ sub, email: payload?.email, given_name: given_name ? given_name : "", family_name: family_name ? family_name : "", picture: picture ? picture : "" });
            user = await this._userRepository.create(googleUserDto);
        }
        return mapUserModelToUserDto(user);
    }
};
GoogleAuthService = __decorate([
    injectable(),
    __param(0, inject("IUserRepository")),
    __metadata("design:paramtypes", [Object])
], GoogleAuthService);
export default GoogleAuthService;
//# sourceMappingURL=GoogleAuthService.js.map