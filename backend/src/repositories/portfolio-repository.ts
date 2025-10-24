import { CreatePortfolioDto } from '../dto/portfolio.dto';
import { IPortfolio } from '../models/interfaces/i-portfolio.model';
import { portfolioModel } from '../models/portfolio.model';
import BaseRepository from './baseRepositories/base-repository';
import { IPortfolioRepository } from './interfaces/i-portfolio-respository';

export class PortfolioRepository
  extends BaseRepository<IPortfolio>
  implements IPortfolioRepository
{
  constructor() {
    super(portfolioModel);
  }

  async createPortfolio(portfolioData: CreatePortfolioDto): Promise<IPortfolio | null> {
    return super.create(portfolioData);
  }

  async getPortfolioByFreelancerId(freelancerId: string): Promise<IPortfolio[] | null> {
    return super.findAll({ freelancerId });
  }

  async getFreelancerPortfolioById(
    freelancerId: string,
    portfolioId: string,
  ): Promise<IPortfolio | null> {
    return super.findOne({ _id: portfolioId, freelancerId });
  }

  async getPortfolioDetail(freelancerId: string, portfolioId: string): Promise<IPortfolio | null> {
    return super.findOne({ _id: portfolioId, freelancerId });
  }

  async deletePortfolio(portfolioId: string): Promise<IPortfolio | null> {
    return super.delete(portfolioId);
  }
}
