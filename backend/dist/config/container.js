import { container } from "tsyringe";
//Week 1
//Auth
import { AuthService } from "../services/authServices/AuthService.js";
import { OtpService } from "../services/authServices/otpServices.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { OtpRepository } from "../repositories/otpRepository.js";
// Register service
container.register("IAuthService", { useClass: AuthService });
container.register("IOtpServices", { useClass: OtpService });
// Register Repository
container.register("IUserRepository", { useClass: UserRepository });
container.register("IOtpRepository", { useClass: OtpRepository });
container.register("IGoogleAuthService", { useClass: GoogleAuthService });
//User
import { userServices } from "../services/userServices/userService.js";
container.register("IUserServices", { useClass: userServices });
//Admin
//AdminAuth
container.register("IAdminAuthServices", { useClass: AdminAuthServices });
//Category and skills
import { AdminCategoryServices } from "../services/adminServices/adminCategoryServices.js";
import { AdminCategoryRepository } from "../repositories/adminRepositories/adminCategoryRepository.js";
import { AdminSpecialityServices } from "../services/adminServices/adminSpecialityServices.js";
import { AdminSpecialityRepository } from "../repositories/adminRepositories/adminSpecialityRepository.js";
import GoogleAuthService from "../services/authServices/GoogleAuthService.js";
import { AdminAuthServices } from "../services/adminServices/adminAuthServices.js";
import { AdminSkillServices } from "../services/adminServices/adminSkillServices.js";
import { AdminSkillRepository } from "../repositories/adminRepositories/adminSkillRepository.js";
;
//add category
container.register("IAdminCategoryServices", { useClass: AdminCategoryServices });
container.register("IAdminCategoryRepository", { useClass: AdminCategoryRepository });
//Speciality
container.register("IAdminSpecialityServices", { useClass: AdminSpecialityServices });
container.register("IAdminSpecialityRepository", { useClass: AdminSpecialityRepository });
//Skills
container.register("IAdminSkillServices", { useClass: AdminSkillServices });
container.register("IAdminSkillRepository", { useClass: AdminSkillRepository });
//AdminUser
import { AdminUserServices } from "../services/adminServices/adminUserServices.js";
container.register("IAdminUserServices", { useClass: AdminUserServices });
import { FreelancerRepository } from "../repositories/freelancerRepository.js";
import { FreelancerService } from "../services/freelancerServices/freelancerServices.js";
container.register("IFreelancerService", { useClass: FreelancerService });
container.register("IFreelancerRepository", { useClass: FreelancerRepository });
import { ClientService } from "../services/clientServices/clientServices.js";
import { ClientRepository } from "../repositories/clientRepository.js";
container.register("IClientService", { useClass: ClientService });
container.register("IClientRepository", { useClass: ClientRepository });
//# sourceMappingURL=container.js.map