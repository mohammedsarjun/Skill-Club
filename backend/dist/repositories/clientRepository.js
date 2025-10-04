import { User } from "../models/userModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
export class ClientRepository extends BaseRepository {
    constructor() {
        super(User);
    }
    async getClientById(userId) {
        return super.findOne({ _id: userId, roles: "client" });
    }
    async updateClientById(userId, data) {
        return super.update(userId, data);
    }
}
//# sourceMappingURL=clientRepository.js.map