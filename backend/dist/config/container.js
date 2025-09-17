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
//Category and skills
import { AdminCategoryServices } from "../services/adminServices/adminCategoryServices.js";
import { AdminCategoryRepository } from "../repositories/adminRepositoies/adminCategoryRepository.js";
//add category
container.register("IAdminCategoryServices", { useClass: AdminCategoryServices });
container.register("IAdminCategoryRepository", { useClass: AdminCategoryRepository });
//# sourceMappingURL=container.js.map