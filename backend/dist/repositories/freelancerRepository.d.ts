import { IUser } from "../models/interfaces/IUserModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
import { IFreelancerRepository } from "./interfaces/IFreelancerRepository.js";
export declare class FreelancerRepository extends BaseRepository<IUser> implements IFreelancerRepository {
    constructor();
    getFreelancerById(userId: string): Promise<IUser | null>;
}
//# sourceMappingURL=freelancerRepository.d.ts.map