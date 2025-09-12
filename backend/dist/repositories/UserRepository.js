import { User } from "../models/userModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
export class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }
    // Find user by email
    async findByEmail(email) {
        return await this.model.findOne({ email });
    }
}
//# sourceMappingURL=UserRepository.js.map