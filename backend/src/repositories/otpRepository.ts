import { otpModel } from "../models/otpModel.js";
import { IOtp } from "../models/interfaces/IOtpModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
import type { IOtpRepository } from "./interfaces/IOtpRepository.js";


export class OtpRepository extends BaseRepository<IOtp> implements IOtpRepository {

    constructor(){
        super(otpModel)
    }
    async findByEmail(email: string): Promise<IOtp | null> {
        const response=await this.model.findOne({email})
        return response
    }
   async deleteByEmail(email: string): Promise<IOtp | null> {
        await this.model.deleteOne({email})
        return null
    }
}