import { IOtp } from "../../models/otpModel.js";
import BaseRepository from "../baseRepositories/baseRepository.js";
export interface IOtpRepository extends BaseRepository<IOtp>{
    findByEmail(email:string):Promise<IOtp|null>
    deleteByEmail(email:string):Promise<IOtp|null>
}