import { CreatePortfolioDto } from "../../dto/portfolio.dto.js";
import { IPortfolio } from "../../models/interfaces/IPortfolioModel.js";
import BaseRepository from "../baseRepositories/baseRepository.js";
export interface IPortfolioRepository extends BaseRepository<IPortfolio> {
    createPortfolio(portfolioData: CreatePortfolioDto): Promise<IPortfolio | null>;
    getPortfolio(id: string): Promise<IPortfolio[] | null>;
    getPortfolioDetail(freelancerId: string, portfolioId: string): Promise<IPortfolio | null>;
}
//# sourceMappingURL=IPortfolioRespository.d.ts.map