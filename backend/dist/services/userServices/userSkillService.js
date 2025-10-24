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
import { mapSkillModelToSpecialityDtoMinimal } from '../../mapper/skill.mappper.js';
let UserSkillServices = class UserSkillServices {
  constructor(skillRepository) {
    this._skillRepository = skillRepository;
  }
  async getSuggestedSkills(specialities) {
    console.log(specialities);
    const result = await this._skillRepository.getSuggestedSkills(specialities);
    // Map to DTO
    const dtoData = result ? result.map(mapSkillModelToSpecialityDtoMinimal) : null;
    return dtoData;
  }
};
UserSkillServices = __decorate(
  [injectable(), __param(0, inject('ISkillRepository')), __metadata('design:paramtypes', [Object])],
  UserSkillServices,
);
export { UserSkillServices };
//# sourceMappingURL=userSkillService.js.map
