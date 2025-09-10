import { User } from "../models/user.model.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
export class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }
    // Find user by email
    async findByEmail(email) {
        return await User.findOne({ email });
    }
}
//# sourceMappingURL=UserRepository.js.map