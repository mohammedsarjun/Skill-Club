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


//GoogleAuth
import { IGoogleAuthService } from "../services/authServices/interfaces/IGoogleAuthService.js";
container.register<IGoogleAuthService>("IGoogleAuthService",{useClass:GoogleAuthService})

//User
import { userServices } from "../services/userServices/userService.js";
import { IUserServices } from "../services/userServices/interfaces/IUserServices.js";
container.register<IUserServices>("IUserServices", { useClass: userServices });

//Admin

//AdminAuth
container.register<IAdminAuthServices>("IAdminAuthServices",{useClass:AdminAuthServices})

//Category and skills
import { AdminCategoryServices } from "../services/adminServices/adminCategoryServices.js";
import { IAdminCategoryServices } from "../services/adminServices/interfaces/IAdminCategoryServices.js";
import { AdminCategoryRepository } from "../repositories/adminRepositories/adminCategoryRepository.js";
import { IAdminCategoryRepository } from "../repositories/adminRepositories/interfaces/IAdminCategoryRepository.js";
import { IAdminSpecialityServices } from "../services/adminServices/interfaces/IAdminSpecialityServices.js";
import { AdminSpecialityServices } from "../services/adminServices/adminSpecialityServices.js";
import { IAdminSpecialityRepository } from "../repositories/adminRepositories/interfaces/IAdminSpecialityRepository.js";
import { AdminSpecialityRepository } from "../repositories/adminRepositories/adminSpecialityRepository.js";
import GoogleAuthService from "../services/authServices/GoogleAuthService.js";
import { IAdminAuthServices } from "../services/adminServices/interfaces/IAdminAuthServices.js";
import { AdminAuthServices } from "../services/adminServices/adminAuthServices.js";
import { IAdminSkillServices } from "../services/adminServices/interfaces/IAdminSkillServices.js";
import { AdminSkillServices } from "../services/adminServices/adminSkillServices.js"
import { IAdminSkillRepository } from "../repositories/adminRepositories/interfaces/IAdminSkillRepository.js";
import { AdminSkillRepository } from "../repositories/adminRepositories/adminSkillRepository.js";;
//add category
container.register<IAdminCategoryServices>("IAdminCategoryServices",{useClass:AdminCategoryServices})
container.register<IAdminCategoryRepository>("IAdminCategoryRepository",{useClass:AdminCategoryRepository})

//Speciality
container.register<IAdminSpecialityServices>("IAdminSpecialityServices",{useClass:AdminSpecialityServices})
container.register<IAdminSpecialityRepository>("IAdminSpecialityRepository",{useClass:AdminSpecialityRepository})

//Skills
container.register<IAdminSkillServices>("IAdminSkillServices",{useClass:AdminSkillServices})
container.register<IAdminSkillRepository>("IAdminSkillRepository",{useClass:AdminSkillRepository})
//AdminUser
import { AdminUserServices } from "../services/adminServices/adminUserServices.js";
import { IAdminUserServices } from "../services/adminServices/interfaces/IAdminUserServices.js";




container.register<IAdminUserServices>("IAdminUserServices",{useClass:AdminUserServices})


//Freelancer
import { IFreelancerRepository } from "../repositories/interfaces/IFreelancerRepository.js";
import { FreelancerRepository } from "../repositories/freelancerRepository.js";
import { IFreelancerService } from "../services/freelancerServices/interfaces/IFreelancerServices.js";
import { FreelancerService } from "../services/freelancerServices/freelancerServices.js";
container.register<IFreelancerService>("IFreelancerService",{useClass:FreelancerService})
container.register<IFreelancerRepository>("IFreelancerRepository",{useClass:FreelancerRepository})

//Client

import { IClientService } from "../services/clientServices/interfaces/IClientServices.js";
import { ClientService } from "../services/clientServices/clientServices.js";
import { IClientRepository } from "../repositories/interfaces/IClientRepository.js";
import { ClientRepository } from "../repositories/clientRepository.js";
container.register<IClientService>("IClientService",{useClass:ClientService})
container.register<IClientRepository>("IClientRepository",{useClass:ClientRepository})