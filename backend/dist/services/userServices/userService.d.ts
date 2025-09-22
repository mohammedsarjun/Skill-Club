import { IUserServices } from "./interfaces/IUserServices.js";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
import { SelectRoleDto } from "../../dto/userDTO/user.dto.js";
export declare class userServices implements IUserServices {
    private userRepository;
    constructor(userRepository: IUserRepository);
    markUserVerified(id: string): Promise<void>;
    selectRole(id: string | undefined, role: string): Promise<SelectRoleDto>;
}
//# sourceMappingURL=userService.d.ts.map