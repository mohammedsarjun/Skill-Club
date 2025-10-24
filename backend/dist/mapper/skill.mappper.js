'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.mapSkillModelToSpecialityDtoMinimal = void 0;
const mapSkillModelToSpecialityDtoMinimal = (skill) => {
  return {
    value: skill._id.toString(),
    label: skill.name,
  };
};
exports.mapSkillModelToSpecialityDtoMinimal = mapSkillModelToSpecialityDtoMinimal;
//# sourceMappingURL=skill.mappper.js.map
