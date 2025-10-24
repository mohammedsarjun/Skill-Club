import { container } from 'tsyringe';

//Week 1

//category,speacility,skills Repository
import { ICategoryRepository } from '../repositories/interfaces/i-category-repository';
import { CategoryRepository } from '../repositories/category-repository';
import { ISpecialityRepository } from '../repositories/interfaces/i-speciality-repository';
import { SpecialityRepository } from '../repositories/speciality-repository';
import { ISkillRepository } from '../repositories/interfaces/i-skill-repository';
import { SkillRepository } from '../repositories/skill-repository';
import { IPortfolioRepository } from '../repositories/interfaces/i-portfolio-respository';
import { PortfolioRepository } from '../repositories/portfolio-repository';
import { IActionVerificationRepository } from '../repositories/interfaces/i-action-verification-repository';
import { ActionVerificationRepository } from '../repositories/action-verification-repository';
container.register<ICategoryRepository>('ICategoryRepository', { useClass: CategoryRepository });
container.register<ISpecialityRepository>('ISpecialityRepository', {
  useClass: SpecialityRepository,
});
container.register<ISkillRepository>('ISkillRepository', { useClass: SkillRepository });
container.register<IPortfolioRepository>('IPortfolioRepository', { useClass: PortfolioRepository });
container.register<IActionVerificationRepository>('IActionVerificationRepository', {
  useClass: ActionVerificationRepository,
});
//Auth
import { AuthService } from '../services/authServices/auth-services';
import type { IAuthService } from '../services/authServices/interfaces/i-auth-services';
import { OtpService } from '../services/authServices/otp-services';
import { IOtpServices } from '../services/authServices/interfaces/i-otp-services';
import { UserRepository } from '../repositories/user-repository';
import { OtpRepository } from '../repositories/otp-repository';
import type { IUserRepository } from '../repositories/interfaces/i-user-repository';
import type { IOtpRepository } from '../repositories/interfaces/i-otp-repository';

// Register service
container.register<IAuthService>('IAuthService', { useClass: AuthService });
container.register<IOtpServices>('IOtpServices', { useClass: OtpService });
// Register Repository
container.register<IUserRepository>('IUserRepository', { useClass: UserRepository });
container.register<IOtpRepository>('IOtpRepository', { useClass: OtpRepository });

//GoogleAuth
import { IGoogleAuthService } from '../services/authServices/interfaces/i-google-auth-services';
import GoogleAuthService from '../services/authServices/google-auth-services';
container.register<IGoogleAuthService>('IGoogleAuthService', { useClass: GoogleAuthService });

//User
import { userServices } from '../services/userServices/user-services';
import { IUserServices } from '../services/userServices/interfaces/i-user-services';

container.register<IUserServices>('IUserServices', { useClass: userServices });

//Admin

//AdminAuth
import { IAdminAuthServices } from '../services/adminServices/interfaces/i-admin-auth-services';
import { AdminAuthServices } from '../services/adminServices/admin-auth-services';
container.register<IAdminAuthServices>('IAdminAuthServices', { useClass: AdminAuthServices });

//Category and skills
import { AdminCategoryServices } from '../services/adminServices/admin-category-services';
import { IAdminCategoryServices } from '../services/adminServices/interfaces/i-admin-category-services';
import { AdminCategoryRepository } from '../repositories/adminRepositories/admin-category-repository';
import { IAdminCategoryRepository } from '../repositories/adminRepositories/interfaces/i-admin-category-repository';
import { IAdminSpecialityServices } from '../services/adminServices/interfaces/i-admin-speciality-services';
import { AdminSpecialityServices } from '../services/adminServices/admin-speciality-services';
import { IAdminSpecialityRepository } from '../repositories/adminRepositories/interfaces/i-admin-speciality-repository';
import { AdminSpecialityRepository } from '../repositories/adminRepositories/admin-speciality-repository';

import { IAdminSkillServices } from '../services/adminServices/interfaces/i-admin-skill-services';
import { AdminSkillServices } from '../services/adminServices/admin-skill-services';
import { IAdminSkillRepository } from '../repositories/adminRepositories/interfaces/i-admin-skill-repository';
import { AdminSkillRepository } from '../repositories/adminRepositories/admin-skill-repository';

//add category
container.register<IAdminCategoryServices>('IAdminCategoryServices', {
  useClass: AdminCategoryServices,
});
container.register<IAdminCategoryRepository>('IAdminCategoryRepository', {
  useClass: AdminCategoryRepository,
});

//Speciality
container.register<IAdminSpecialityServices>('IAdminSpecialityServices', {
  useClass: AdminSpecialityServices,
});
container.register<IAdminSpecialityRepository>('IAdminSpecialityRepository', {
  useClass: AdminSpecialityRepository,
});

//Skills
container.register<IAdminSkillServices>('IAdminSkillServices', { useClass: AdminSkillServices });
container.register<IAdminSkillRepository>('IAdminSkillRepository', {
  useClass: AdminSkillRepository,
});
//AdminUser
import { AdminUserServices } from '../services/adminServices/admin-user-services';
import { IAdminUserServices } from '../services/adminServices/interfaces/i-admin-user-services';

container.register<IAdminUserServices>('IAdminUserServices', { useClass: AdminUserServices });

//Freelancer
import { IFreelancerRepository } from '../repositories/interfaces/i-freelancer-repository';
import { FreelancerRepository } from '../repositories/freelancer-repository';
import { IFreelancerService } from '../services/freelancerServices/interfaces/i-freelancer-services';
import { FreelancerService } from '../services/freelancerServices/freelancer-services';

container.register<IFreelancerService>('IFreelancerService', { useClass: FreelancerService });
container.register<IFreelancerRepository>('IFreelancerRepository', {
  useClass: FreelancerRepository,
});

//Client

import { IClientService } from '../services/clientServices/interfaces/i-client-services';
import { ClientService } from '../services/clientServices/client-services';
import { IClientRepository } from '../repositories/interfaces/i-client-repository';
import { ClientRepository } from '../repositories/client-repository';

container.register<IClientService>('IClientService', { useClass: ClientService });
container.register<IClientRepository>('IClientRepository', { useClass: ClientRepository });

//user category ,speciality,skills
import { IUserCategoryServices } from '../services/userServices/interfaces/i-user-category-services';
import { userCategoryServices } from '../services/userServices/user-category-services';
import { IUserSpecialityServices } from '../services/userServices/interfaces/i-user-speciality-services';
import { userSpecialityServices } from '../services/userServices/user-speciality-services';
import { IUserSkillServices } from '../services/userServices/interfaces/i-user-skill-services';
import { UserSkillServices } from '../services/userServices/user-skill-services';

container.register<IUserCategoryServices>('IUserCategoryServices', {
  useClass: userCategoryServices,
});
container.register<IUserSpecialityServices>('IUserSpecialityServices', {
  useClass: userSpecialityServices,
});
container.register<IUserSkillServices>('IUserSkillServices', { useClass: UserSkillServices });
