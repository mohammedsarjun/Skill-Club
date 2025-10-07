import { User } from "../models/userModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
export class FreelancerRepository extends BaseRepository {
    constructor() {
        super(User);
    }
    async getFreelancerById(userId) {
        return this.findOne({ _id: userId, roles: "freelancer" });
    }
}
//# sourceMappingURL=freelancerRepository.js.map