import '../../config/container.js';
import { IFreelancerService } from './interfaces/IFreelancerServices.js';
import type { IFreelancerRepository } from '../../repositories/interfaces/IFreelancerRepository.js';
import { GetFreelancerDTO } from '../../dto/freelancer.dto.js';
import { IFreelancerProfile } from '../../models/interfaces/IUserModel.js';
import { CreatePortfolioDto, PortfolioDto } from '../../dto/portfolio.dto.js';
import type { IPortfolioRepository } from '../../repositories/interfaces/IPortfolioRespository.js';
export declare class FreelancerService implements IFreelancerService {
  private _freelancerRepository;
  private _portfolioRepository;
  constructor(
    freelancerRepository: IFreelancerRepository,
    portfolioRepository: IPortfolioRepository,
  );
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
  updateFreelancerDescription(
    freelancerId: string,
    descriptionData: {
      description: string;
    },
  ): Promise<string | null>;
  createPortfolio(id: string, portfolioData: CreatePortfolioDto): Promise<void>;
  getPortfolio(id: string): Promise<PortfolioDto[] | null>;
  getPortfolioDetail(freelancerId: string, portfolioId: string): Promise<PortfolioDto | null>;
}
//# sourceMappingURL=freelancerServices.d.ts.map
