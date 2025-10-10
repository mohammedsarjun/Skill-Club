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
import { HttpStatus } from '../../enums/http-status.enum.js';
import { MESSAGES } from '../../contants/contants.js';
let FreelancerController = class FreelancerController {
    constructor(freelancerService) {
        this._freelancerService = freelancerService;
    }
    async getFreelancerData(req, res) {
        try {
            const userId = req.user?.userId;
            const result = await this._freelancerService.getFreelancerData(userId);
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.Freelancer.FETCH_SUCCESS,
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async updateFreelancerLanguage(req, res) {
        try {
            const userId = req.user?.userId;
            const result = await this._freelancerService.updateFreelancerLanguage(userId, req.body);
            res.status(HttpStatus.OK).json({
                success: true,
                message: MESSAGES.Freelancer.UPDATED,
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async createPortfolio(req, res) {
        try {
            const userId = req.user?.userId;
            const portfolioData = req.body.portfolioData;
            const result = await this._freelancerService.createPortfolio(userId, portfolioData);
            res.status(HttpStatus.OK).json({
                success: true,
                message: 'Portfolio Created',
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getPortfolio(req, res) {
        try {
            const userId = req.user?.userId;
            const result = await this._freelancerService.getPortfolio(userId);
            res.status(HttpStatus.OK).json({
                success: true,
                message: 'Portfolio Fetched Succcessfully',
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getPortfolioDetail(req, res) {
        try {
            const userId = req.user?.userId;
            const { portfolioId } = req.query;
            const result = await this._freelancerService.getPortfolioDetail(userId, portfolioId);
            res.status(HttpStatus.OK).json({
                success: true,
                message: 'Portfolio Fetched Succcessfully',
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
    }
};
FreelancerController = __decorate([
    injectable(),
    __param(0, inject('IFreelancerService')),
    __metadata("design:paramtypes", [Object])
], FreelancerController);
export { FreelancerController };
//# sourceMappingURL=freelancerController.js.map