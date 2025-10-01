import { IGoogleAuthService } from "./interfaces/IGoogleAuthService.js";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
declare class GoogleAuthService implements IGoogleAuthService {
    private _userRepository;
    constructor(userRepository: IUserRepository);
    verifyToken(idToken: string): Promise<import("../../models/interfaces/IUserModel.js").IUser>;
}
export default GoogleAuthService;
//# sourceMappingURL=GoogleAuthService.d.ts.map