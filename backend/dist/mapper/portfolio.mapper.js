"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPortfolioToPortfolioDto = exports.mapCreatePortfolioDtoToPortfolio = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mapCreatePortfolioDtoToPortfolio = (userId, data) => ({
    freelancerId: new mongoose_1.default.Types.ObjectId(userId),
    title: data.title,
    description: data.description,
    technologies: data.technologies,
    role: data.role,
    projectUrl: data.projectUrl,
    githubUrl: data.githubUrl,
    images: data.images,
    video: data.video,
});
exports.mapCreatePortfolioDtoToPortfolio = mapCreatePortfolioDtoToPortfolio;
const mapPortfolioToPortfolioDto = (data) => ({
    id: data._id.toString(),
    title: data.title,
    description: data.description,
    technologies: data.technologies,
    role: data.role,
    projectUrl: data.projectUrl,
    githubUrl: data.githubUrl,
    images: data.images,
    video: data.video,
});
exports.mapPortfolioToPortfolioDto = mapPortfolioToPortfolioDto;
//# sourceMappingURL=portfolio.mapper.js.map