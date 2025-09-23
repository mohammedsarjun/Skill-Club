// services/GoogleAuthService.ts
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { IGoogleAuthService } from "./interfaces/IGoogleAuthService.js";
import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


@injectable()
class GoogleAuthService implements IGoogleAuthService {

    private userRepository:IUserRepository
  constructor(@inject("IUserRepository") userRepository:IUserRepository) {
    this.userRepository=userRepository
  }

  async verifyToken(idToken: string) {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID as string,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error("Invalid Google token");

    // Check if user exists
    let user = await this.userRepository.findByEmail(payload.email!);
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
}

export default GoogleAuthService;
