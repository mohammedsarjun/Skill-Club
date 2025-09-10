import { IUser } from "../../models/user.model.js";
import BaseRepository from "../baseRepositories/baseRepository.js";
export interface IUserRepository extends BaseRepository<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
}
//# sourceMappingURL=IUserRepository.d.ts.map