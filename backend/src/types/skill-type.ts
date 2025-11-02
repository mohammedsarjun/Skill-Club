import { ISkill } from 'src/models/interfaces/skill.model.interface';

export type ISkillWithPopulatedSpecialities = Omit<ISkill, 'specialities'> & {
  specialities: { _id: string; name: string }[];
};

export type PopulatedSkill = Omit<ISkill, 'specialities'> & {
  specialities: { _id: string; name: string }[];
};
