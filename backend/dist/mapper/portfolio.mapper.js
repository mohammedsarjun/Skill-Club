import mongoose from "mongoose";
export const mapCreatePortfolioDtoToPortfolio = (userId, data) => ({
    freelancerId: new mongoose.Types.ObjectId(userId),
    title: data.title,
    description: data.description,
    technologies: data.technologies,
    role: data.role,
    projectUrl: data.projectUrl,
    githubUrl: data.githubUrl,
    images: data.images,
    video: data.video
});
export const mapPortfolioToPortfolioDto = (data) => ({
    id: data._id.toString(),
    title: data.title,
    description: data.description,
    technologies: data.technologies,
    role: data.role,
    projectUrl: data.projectUrl,
    githubUrl: data.githubUrl,
    images: data.images,
    video: data.video
});
//# sourceMappingURL=portfolio.mapper.js.map