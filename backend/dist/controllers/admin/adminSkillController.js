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
import { mapCreateSkillDtoToSkillModel, mapSkillQuery, mapUpdateSkillDtoToSkillModel, } from '../../mapper/adminMapper/skill.mapper.js';
let AdminSkillController = class AdminSkillController {
    constructor(adminSkillServices) {
        this._adminSkillServices = adminSkillServices;
    }
    async addSkill(req, res) {
        try {
            const dto = mapCreateSkillDtoToSkillModel(req.body);
            const result = await this._adminSkillServices.addSkill(dto);
            res.status(HttpStatus.CREATED).json({
                success: true,
                message: 'Skill created successfully',
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getSkills(req, res) {
        try {
            const dto = mapSkillQuery(req.query);
            const result = await this._adminSkillServices.getSkills(dto);
            res.status(HttpStatus.OK).json({
                success: true,
                message: 'Skills Fetched successfully',
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async editSkill(req, res) {
        try {
            const dto = mapUpdateSkillDtoToSkillModel(req.body);
            const { id } = req.body;
            const result = await this._adminSkillServices.editSkill(id, dto);
            res.status(HttpStatus.OK).json({
                success: true,
                message: 'Skills Updated successfully',
                data: result,
            });
        }
        catch (error) {
            throw error;
        }
    }
};
AdminSkillController = __decorate([
    injectable(),
    __param(0, inject('IAdminSkillServices')),
    __metadata("design:paramtypes", [Object])
], AdminSkillController);
export { AdminSkillController };
//# sourceMappingURL=adminSkillController.js.map