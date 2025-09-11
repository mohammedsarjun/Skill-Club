import { container } from "tsyringe";


//Week 1

//Auth
import { AuthService } from "../services/authServices/authService.js";
import type { IAuthService } from "../services/authServices/interfaces/IAuthService.js";
import { OtpService } from "../services/authServices/otpServices.js";
import { IOtpServices } from "../services/authServices/interfaces/IOtpService.js";
import { UserRepository } from "../repositories/userRepository.js";
import { OtpRepository } from "../repositories/otpRepository.js";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.js";
import type { IOtpRepository } from "../repositories/interfaces/IOtpRepository.js";
// Register service
container.register<IAuthService>("IAuthService", { useClass: AuthService });
container.register<IOtpServices>("IOtpServices",{useClass:OtpService})
// Register Repository
container.register<IUserRepository>("IUserRepository",{useClass:UserRepository})
container.register<IOtpRepository>("IOtpRepository",{useClass:OtpRepository})
// You can also register controllers if needed
// container.register<AuthController>(AuthController, { useClass: AuthController });
