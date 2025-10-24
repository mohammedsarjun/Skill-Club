import { portfolioModel } from '../models/portfolioModel.js';
import BaseRepository from './baseRepositories/baseRepository.js';
export class PortfolioRepository extends BaseRepository {
  constructor() {
    super(portfolioModel);
  }
  async createPortfolio(portfolioData) {
    return super.create(portfolioData);
  }
  async getPortfolio(id) {
    return super.findAll({ freelancerId: id });
  }
  async getPortfolioDetail(freelancerId, portfolioId) {
    return super.findOne({ _id: portfolioId, freelancerId });
  }
}
//# sourceMappingURL=portfolioRepository.js.map
