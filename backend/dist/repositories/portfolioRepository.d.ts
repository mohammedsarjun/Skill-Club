import { CreatePortfolioDto } from "../dto/portfolio.dto.js";
import { IPortfolio } from "../models/interfaces/IPortfolioModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
import { IPortfolioRepository } from "./interfaces/IPortfolioRespository.js";
export declare class PortfolioRepository extends BaseRepository<IPortfolio> implements IPortfolioRepository {
    constructor();
    createPortfolio(portfolioData: CreatePortfolioDto): Promise<IPortfolio | null>;
    getPortfolio(id: string): Promise<IPortfolio[] | null>;
    getPortfolioDetail(freelancerId: string, portfolioId: string): Promise<IPortfolio | null>;
}
//# sourceMappingURL=portfolioRepository.d.ts.map