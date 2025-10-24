var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { MESSAGES } from '../../contants/contants.js';
let UserSkillController = class UserSkillController {
  constructor(userSkillService) {
    this._userSkillService = userSkillService;
  }
  async getSuggestedSkills(req, res) {
    const { specialities } = req.query;
    const skills = await this._userSkillService.getSuggestedSkills(specialities);
    res.status(HttpStatus.OK).json({
      success: true,
      message: MESSAGES.SKILL.FETCH_SUCCESS,
      data: skills,
    });
  }
};
UserSkillController = __decorate(
  [
    injectable(),
    __param(0, inject('IUserSkillServices')),
    __metadata('design:paramtypes', [Object]),
  ],
  UserSkillController,
);
export { UserSkillController };
//# sourceMappingURL=userSkillController.js.map
