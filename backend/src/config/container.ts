import { container } from "tsyringe";


//Week 1

//Auth
import { AuthService } from "../services/authServices/AuthService.js";
import type { IAuthService } from "../services/authServices/interfaces/IAuthService.js";

import { UserRepository } from "../repositories/UserRepository.js";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.js";

// Register service
container.register<IAuthService>("IAuthService", { useClass: AuthService });

// Register Repository
container.register<IUserRepository>("IUserRepository",{useClass:UserRepository})

// You can also register controllers if needed
// container.register<AuthController>(AuthController, { useClass: AuthController });
