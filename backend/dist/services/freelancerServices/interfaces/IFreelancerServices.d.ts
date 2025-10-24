import { GetFreelancerDTO } from '../../../dto/freelancer.dto.js';
import { CreatePortfolioDto, PortfolioDto } from '../../../dto/portfolio.dto.js';
import { IFreelancerProfile } from '../../../models/interfaces/IUserModel.js';
export interface IFreelancerService {
  getFreelancerData(id: string): Promise<GetFreelancerDTO>;
  updateFreelancerLanguage(
    id: string,
    updateData: {
      language: {
        name: string;
        proficiency: string;
      };
    },
  ): Promise<Partial<IFreelancerProfile> | undefined>;
  deleteFreelancerLanguage(id: string, languageData: string): Promise<void>;
  createPortfolio(id: string, portfolioData: CreatePortfolioDto): Promise<void>;
  getPortfolio(id: string): Promise<PortfolioDto[] | null>;
  getPortfolioDetail(freelancerId: string, portfolioId: string): Promise<PortfolioDto | null>;
  updateFreelancerDescription(
    freelancerId: string,
    descriptionData: {
      description: string;
    },
  ): Promise<string | null>;
}
//# sourceMappingURL=IFreelancerServices.d.ts.map
