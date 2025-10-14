var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { mapFreelancerToDTO, mapUpdateLanguageDtoToLanguage, mapUpdateLanguageToDTO, } from '../../mapper/freelancer.mapper.js';
import { ERROR_MESSAGES } from '../../contants/errorConstants.js';
import { mapCreatePortfolioDtoToPortfolio, mapPortfolioToPortfolioDto, } from '../../mapper/portfolio.mapper.js';
let FreelancerService = class FreelancerService {
    constructor(freelancerRepository, portfolioRepository) {
        this._freelancerRepository = freelancerRepository;
        this._portfolioRepository = portfolioRepository;
    }
    async getFreelancerData(id) {
        try {
            const freelancerData = await this._freelancerRepository.getFreelancerById(id);
            if (!freelancerData || !freelancerData.freelancerProfile) {
                throw new AppError(ERROR_MESSAGES.FREELANCER.NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            console.log(freelancerData);
            const freelancerDto = mapFreelancerToDTO(freelancerData);
            return freelancerDto;
        }
        catch (error) {
            throw new AppError(ERROR_MESSAGES.FREELANCER.FETCH_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateFreelancerLanguage(id, updateData) {
        const freelancerData = await this._freelancerRepository.getFreelancerById(id);
        if (!freelancerData?.freelancerProfile) {
            throw new AppError(ERROR_MESSAGES.FREELANCER.NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        const { freelancerProfile } = freelancerData;
        const languageNameArr = freelancerProfile.languages.map((lang) => lang.name);
        if (updateData?.language?.name && languageNameArr.includes(updateData?.language?.name)) {
            throw new AppError('You already have this language added.', HttpStatus.CONFLICT);
        }
        if (freelancerProfile.languages.length >= 3) {
            throw new AppError('You can only have 3 languages.', HttpStatus.CONFLICT);
        }
        const dto = mapUpdateLanguageDtoToLanguage(updateData?.language);
        const result = await this._freelancerRepository.addLanguageToFreelancerProfile(id, dto);
        return { languages: mapUpdateLanguageToDTO(result) };
    }
    async deleteFreelancerLanguage(id, languageData) {
        const freelancerData = await this._freelancerRepository.getFreelancerById(id);
        if (!freelancerData?.freelancerProfile) {
            throw new AppError(ERROR_MESSAGES.FREELANCER.NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        const { freelancerProfile } = freelancerData;
        const languageNameArr = freelancerProfile.languages.map((lang) => lang.name);
        if (!languageData && !languageNameArr.includes(languageData)) {
            throw new AppError('Language Not Found', HttpStatus.NOT_FOUND);
        }
        if (languageData == 'English') {
            throw new AppError('You cannot delete English because it is the default language.', HttpStatus.BAD_REQUEST);
        }
        await this._freelancerRepository.deleteLanguageFromFreelancerProfile(id, languageData);
    }
    async updateFreelancerDescription(freelancerId, descriptionData) {
        const freelancerData = await this._freelancerRepository.getFreelancerById(freelancerId);
        if (!freelancerData?.freelancerProfile) {
            throw new AppError(ERROR_MESSAGES.FREELANCER.NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        const user = await this._freelancerRepository.updateFreelancerProfile(freelancerId, { "freelancerProfile.bio": descriptionData.description });
        const bio = user?.freelancerProfile?.bio || null;
        return bio;
    }
    async createPortfolio(id, portfolioData) {
        const freelancerData = await this._freelancerRepository.getFreelancerById(id);
        if (!freelancerData || !freelancerData.freelancerProfile) {
            throw new AppError(ERROR_MESSAGES.FREELANCER.NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        const dto = mapCreatePortfolioDtoToPortfolio(id, portfolioData);
        const result = await this._portfolioRepository.createPortfolio(dto);
    }
    async getPortfolio(id) {
        const userId = id;
        const freelancerData = await this._freelancerRepository.getFreelancerById(userId);
        if (!freelancerData || !freelancerData.freelancerProfile) {
            throw new AppError(ERROR_MESSAGES.FREELANCER.NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        const result = await this._portfolioRepository.getPortfolio(userId);
        const dto = result ? result.map(mapPortfolioToPortfolioDto) : null;
        return dto;
    }
    async getPortfolioDetail(freelancerId, portfolioId) {
        const freelancerData = await this._freelancerRepository.getFreelancerById(freelancerId);
        if (!freelancerData || !freelancerData.freelancerProfile) {
            throw new AppError(ERROR_MESSAGES.FREELANCER.NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        const result = await this._portfolioRepository.getPortfolioDetail(freelancerId, portfolioId);
        const dto = result ? mapPortfolioToPortfolioDto(result) : null;
        return dto;
    }
};
FreelancerService = __decorate([
    injectable(),
    __param(0, inject('IFreelancerRepository')),
    __param(1, inject('IPortfolioRepository')),
    __metadata("design:paramtypes", [Object, Object])
], FreelancerService);
export { FreelancerService };
//# sourceMappingURL=freelancerServices.js.map