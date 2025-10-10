import mongoose from "mongoose";
import { CreatePortfolioDto, PortfolioDto } from "../dto/portfolio.dto.js";
import { IPortfolio } from "../models/interfaces/IPortfolioModel.js";

export const mapCreatePortfolioDtoToPortfolio = (userId:string,data: CreatePortfolioDto): CreatePortfolioDto => ({
  freelancerId:new mongoose.Types.ObjectId(userId),
  title: data.title,
  description: data.description,
  technologies:data.technologies,
  role:data.role,
  projectUrl:data.projectUrl,
  githubUrl:data.githubUrl,
  images:data.images,
  video:data.video
});

export const mapPortfolioToPortfolioDto = (data: IPortfolio): PortfolioDto => ({ 
  id:data._id.toString(),
  title: data.title,
  description: data.description,
  technologies:data.technologies,
  role:data.role,
  projectUrl:data.projectUrl,
  githubUrl:data.githubUrl,
  images:data.images,
  video:data.video
});

