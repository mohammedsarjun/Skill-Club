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
let AdminSkillController = class AdminSkillController {
    constructor(adminSkillServices) {
        this._adminSkillServices = adminSkillServices;
    }
    async addSkill(req, res) {
        const skillDto = req.body;
        const result = await this._adminSkillServices.addSkill(skillDto);
        res.status(HttpStatus.CREATED).json({
            success: true,
            message: MESSAGES.SKILL.CREATED,
            data: result,
        });
    }
    async getSkills(req, res) {
        const skillDto = {
            search: typeof req.query.search === 'string' ? req.query.search : '',
            page: Number(req?.query?.page) || 1,
            limit: Number(req?.query?.limit) || 10,
            mode: typeof req.query.mode === 'string' ? req.query.mode : '',
        };
        const result = await this._adminSkillServices.getSkills(skillDto);
        res.status(HttpStatus.OK).json({
            success: true,
            message: MESSAGES.SKILL.FETCH_SUCCESS,
            data: result,
        });
    }
    async editSkill(req, res) {
        const skillDto = req.body;
        const { id } = req.body;
        const result = await this._adminSkillServices.editSkill(id, skillDto);
        res.status(HttpStatus.OK).json({
            success: true,
            message: MESSAGES.SKILL.UPDATED,
            data: result,
        });
    }
};
AdminSkillController = __decorate([
    injectable(),
    __param(0, inject('IAdminSkillServices')),
    __metadata("design:paramtypes", [Object])
], AdminSkillController);
export { AdminSkillController };
//# sourceMappingURL=adminSkillController.js.map