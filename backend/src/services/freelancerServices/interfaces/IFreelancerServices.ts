import { GetFreelancerDTO, UpdateFreelancerProfileDTO } from '../../../dto/freelancer.dto.js';
import { CreatePortfolioDto, PortfolioDto } from '../../../dto/portfolio.dto.js';
import { IFreelancerProfile, ILanguage, IUser } from '../../../models/interfaces/IUserModel.js';
export interface IFreelancerService {
  getFreelancerData(id: string): Promise<GetFreelancerDTO>;
  updateFreelancerLanguage(id:string,updateData:ILanguage):Promise<Partial<IFreelancerProfile> | undefined>;
  createPortfolio(id:string,portfolioData:CreatePortfolioDto):Promise<void>
  getPortfolio(id:string):Promise<PortfolioDto[]|null>
   getPortfolioDetail(freelancerId:string,portfolioId:string):Promise<PortfolioDto|null>
}
