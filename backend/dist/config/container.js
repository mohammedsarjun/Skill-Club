import { container } from "tsyringe";
//Week 1
//Auth
import { AuthService } from "../services/authServices/AuthService.js";
import { UserRepository } from "../repositories/UserRepository.js";
// Register service
container.register("IAuthService", { useClass: AuthService });
// Register Repository
container.register("IUserRepository", { useClass: UserRepository });
// You can also register controllers if needed
// container.register<AuthController>(AuthController, { useClass: AuthController });
//# sourceMappingURL=container.js.map