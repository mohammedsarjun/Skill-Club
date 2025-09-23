import { IUserServices } from "./interfaces/IUserServices.js";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
import { UserDto } from "../../dto/userDTO/user.dto.js";
import { IUser } from "../../models/interfaces/IUserModel.js";
export declare class userServices implements IUserServices {
    private userRepository;
    constructor(userRepository: IUserRepository);
    markUserVerified(id: string): Promise<void>;
    selectRole(id: string | undefined, role: string): Promise<UserDto>;
    createFreelancerProfile(id: string, freelancerData: Partial<IUser>): Promise<IUser>;
}
//# sourceMappingURL=userService.d.ts.map