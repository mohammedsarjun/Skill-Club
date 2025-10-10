import { CreatePortfolioDto } from "../dto/portfolio.dto.js";
import { IPortfolio } from "../models/interfaces/IPortfolioModel.js";
import { portfolioModel } from "../models/portfolioModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
import { IPortfolioRepository } from "./interfaces/IPortfolioRespository.js";




export class PortfolioRepository extends BaseRepository<IPortfolio> implements IPortfolioRepository {

    constructor(){
        super(portfolioModel)
    }

    async createPortfolio(portfolioData: CreatePortfolioDto): Promise<IPortfolio | null> {
        return super.create(portfolioData)
    }

    async getPortfolio(id: string): Promise<IPortfolio[] | null> {
        return super.findAll({freelancerId:id})
    }

    async getPortfolioDetail(freelancerId: string, portfolioId: string): Promise<IPortfolio | null> {
        return super.findOne({_id:portfolioId,freelancerId})
    }
  
}