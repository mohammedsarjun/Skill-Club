import { container } from "tsyringe";


//Week 1

//Auth
import { AuthService } from "../services/authServices/AuthService.js";
import type { IAuthService } from "../services/authServices/interfaces/IAuthService.js";
import { OtpService } from "../services/authServices/otpServices.js";
import { IOtpServices } from "../services/authServices/interfaces/IOtpService.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { OtpRepository } from "../repositories/otpRepository.js";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository.js";
import type { IOtpRepository } from "../repositories/interfaces/IOtpRepository.js";
// Register service
container.register<IAuthService>("IAuthService", { useClass: AuthService });
container.register<IOtpServices>("IOtpServices",{useClass:OtpService})
// Register Repository
container.register<IUserRepository>("IUserRepository",{useClass:UserRepository})
container.register<IOtpRepository>("IOtpRepository",{useClass:OtpRepository})

//Category and skills
import { AdminCategoryServices } from "../services/adminServices/adminCategoryServices.js";
import { IAdminCategoryServices } from "../services/adminServices/interfaces/IAdminCategoryServices.js";
import { AdminCategoryRepository } from "../repositories/adminRepositoies/adminCategoryRepository.js";
import { IAdminCategoryRepository } from "../repositories/adminRepositoies/interfaces/IAdminCategoryRepository.js";
import { IAdminSpecialityServices } from "../services/adminServices/interfaces/IAdminSpecialityServices.js";
import { AdminSpecialityServices } from "../services/adminServices/adminSpecialityServices.js";
import { IAdminSpecialityRepository } from "../repositories/adminRepositoies/interfaces/IAdminSpecialityRepository.js";
import { AdminSpecialityRepository } from "../repositories/adminRepositoies/adminSpecialityRepository.js";
//add category
container.register<IAdminCategoryServices>("IAdminCategoryServices",{useClass:AdminCategoryServices})
container.register<IAdminCategoryRepository>("IAdminCategoryRepository",{useClass:AdminCategoryRepository})

//Speciality
container.register<IAdminSpecialityServices>("IAdminSpecialityServices",{useClass:AdminSpecialityServices})
container.register<IAdminSpecialityRepository>("IAdminSpecialityRepository",{useClass:AdminSpecialityRepository})

