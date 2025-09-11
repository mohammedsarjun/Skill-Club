import { otpModel } from "../models/otpModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
export class OtpRepository extends BaseRepository {
    constructor() {
        super(otpModel);
    }
    async findByEmail(email) {
        const response = await this.model.findOne({ email });
        return response;
    }
    async deleteByEmail(email) {
        await this.model.deleteOne({ email });
        return null;
    }
}
//# sourceMappingURL=otpRepository.js.map