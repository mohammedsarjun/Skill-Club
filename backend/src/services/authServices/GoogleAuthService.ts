// services/GoogleAuthService.ts
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { IGoogleAuthService } from "./interfaces/IGoogleAuthService.js";
import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
import { mapCreateUserDtoToUserModel } from "../../mapper/authMapper/auth.mapper.js";
import { mapCreateGoogleUserDtoToUserModel } from "../../mapper/authMapper/googleAuth.mapper.js";
import { mapUserModelToUserDto } from "../../mapper/userMapper/user.mapper.js";
import { UserDto } from "../../dto/userDTO/user.dto.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


@injectable()
class GoogleAuthService implements IGoogleAuthService {

    private _userRepository:IUserRepository
  constructor(@inject("IUserRepository") userRepository:IUserRepository) {
    this._userRepository=userRepository
  }

  async verifyToken(idToken: string):Promise<UserDto> {
      // Verify token
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID!, // must match your Google client ID
      });

      // Extract payload
      const payload = ticket.getPayload();

      // Example: get user info
    
      const { sub, email, given_name, picture,family_name } = payload!;

      let user = await this._userRepository.findOne({ email });

  if (user) {
    // ✅ Login flow
    // issue JWT/session for existing user
    // res.json({ status: "login", user });

  } else {
    // ✅ Signup flow
    const googleUserDto=  mapCreateGoogleUserDtoToUserModel({sub,email:payload?.email!,given_name:given_name?given_name:"",family_name:family_name?family_name:"",picture:picture?picture:""})
    user = await this._userRepository.create(googleUserDto);
  }

  return mapUserModelToUserDto(user)

}

}

export default GoogleAuthService;
