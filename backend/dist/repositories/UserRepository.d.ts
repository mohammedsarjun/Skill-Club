import { IUser } from "../models/userModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
import { IUserRepository } from "./interfaces/IUserRepository.js";
export declare class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor();
    findByEmail(email: string): Promise<IUser | null>;
}
//# sourceMappingURL=userRepository.d.ts.map