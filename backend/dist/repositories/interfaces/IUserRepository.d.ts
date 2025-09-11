import { IUser } from "../../models/userModel.js";
import BaseRepository from "../baseRepositories/baseRepository.js";
export interface IUserRepository extends BaseRepository<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
}
//# sourceMappingURL=IUserRepository.d.ts.map