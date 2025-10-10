import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { IFreelancerService } from './interfaces/IFreelancerServices.js';
import type { IFreelancerRepository } from '../../repositories/interfaces/IFreelancerRepository.js';
import {
  mapFreelancerToDTO,
  mapLanguageToDTO,
  mapUpdateLanguageDtoToLanguage,
  mapUpdateLanguageToDTO,
} from '../../mapper/freelancer.mapper.js';
import {
  GetFreelancerDTO,
  LanguageDTO,
  UpdateFreelancerProfileDTO,
} from '../../dto/freelancer.dto.js';
import { ERROR_MESSAGES } from '../../contants/errorConstants.js';
import { IFreelancerProfile, ILanguage } from '../../models/interfaces/IUserModel.js';
import { CreatePortfolioDto, PortfolioDto } from '../../dto/portfolio.dto.js';
import {
  mapCreatePortfolioDtoToPortfolio,
  mapPortfolioToPortfolioDto,
} from '../../mapper/portfolio.mapper.js';
import type { IPortfolioRepository } from '../../repositories/interfaces/IPortfolioRespository.js';
import { IPortfolio } from '../../models/interfaces/IPortfolioModel.js';

@injectable()
export class FreelancerService implements IFreelancerService {
  private _freelancerRepository: IFreelancerRepository;
  private _portfolioRepository: IPortfolioRepository;
  constructor(
    @inject('IFreelancerRepository') freelancerRepository: IFreelancerRepository,
    @inject('IPortfolioRepository') portfolioRepository: IPortfolioRepository,
  ) {
    this._freelancerRepository = freelancerRepository;
    this._portfolioRepository = portfolioRepository;
  }

  async getFreelancerData(id: string): Promise<GetFreelancerDTO> {
    try {
      const freelancerData = await this._freelancerRepository.getFreelancerById(id);

      if (!freelancerData || !freelancerData.freelancerProfile) {
        throw new AppError(ERROR_MESSAGES.FREELANCER.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const freelancerDto = mapFreelancerToDTO(freelancerData);

      return freelancerDto;
    } catch (error) {
      throw new AppError(ERROR_MESSAGES.FREELANCER.FETCH_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateFreelancerLanguage(
    id: string,
    updateData: ILanguage,
  ): Promise<Partial<IFreelancerProfile> | undefined> {
    const freelancerData = await this._freelancerRepository.getFreelancerById(id);

    if (!freelancerData?.freelancerProfile) {
      throw new AppError(ERROR_MESSAGES.FREELANCER.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const { freelancerProfile } = freelancerData;

    const languageNameArr = freelancerProfile.languages.map((lang) => lang.name);

    if (updateData?.name && languageNameArr.includes(updateData?.name)) {
      throw new AppError('You already have this language added.', HttpStatus.CONFLICT);
    }

    if (freelancerProfile.languages.length >= 3) {
      throw new AppError('You can only have 3 languages.', HttpStatus.CONFLICT);
    }

    const dto = mapUpdateLanguageDtoToLanguage(updateData);

    const result = await this._freelancerRepository.addLanguageToFreelancerProfile(id, dto);

    return { languages: mapUpdateLanguageToDTO(result!) };
  }

  async createPortfolio(id: string, portfolioData: CreatePortfolioDto): Promise<void> {
    const freelancerData = await this._freelancerRepository.getFreelancerById(id);

    if (!freelancerData || !freelancerData.freelancerProfile) {
      throw new AppError(ERROR_MESSAGES.FREELANCER.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const dto = mapCreatePortfolioDtoToPortfolio(id, portfolioData);
    const result = await this._portfolioRepository.createPortfolio(dto);
  }

  async getPortfolio(id: string): Promise<PortfolioDto[] | null> {
    const userId = id;
    const freelancerData = await this._freelancerRepository.getFreelancerById(userId);

    if (!freelancerData || !freelancerData.freelancerProfile) {
      throw new AppError(ERROR_MESSAGES.FREELANCER.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const result: IPortfolio[] | null = await this._portfolioRepository.getPortfolio(userId);

    const dto = result ? result.map(mapPortfolioToPortfolioDto) : null;

    return dto;
  }

  async getPortfolioDetail(
    freelancerId: string,
    portfolioId: string,
  ): Promise<PortfolioDto | null> {

    const freelancerData = await this._freelancerRepository.getFreelancerById(freelancerId);

    if (!freelancerData || !freelancerData.freelancerProfile) {
      throw new AppError(ERROR_MESSAGES.FREELANCER.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const result: IPortfolio | null = await this._portfolioRepository.getPortfolioDetail(freelancerId,portfolioId);

    const dto = result ? mapPortfolioToPortfolioDto(result) : null;

    return dto;
  }
}
