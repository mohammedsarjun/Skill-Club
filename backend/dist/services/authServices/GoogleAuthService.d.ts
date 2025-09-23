import { IGoogleAuthService } from "./interfaces/IGoogleAuthService.js";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
declare class GoogleAuthService implements IGoogleAuthService {
    private userRepository;
    constructor(userRepository: IUserRepository);
    verifyToken(idToken: string): Promise<void>;
}
export default GoogleAuthService;
//# sourceMappingURL=GoogleAuthService.d.ts.map