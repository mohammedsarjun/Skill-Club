import { container } from 'tsyringe';

//Week 1

//category,speacility,skills Repository
import { ICategoryRepository } from '../repositories/interfaces/category-repository.interface';
import { CategoryRepository } from '../repositories/category-repository';
import { ISpecialityRepository } from '../repositories/interfaces/speciality-repository.interface';
import { SpecialityRepository } from '../repositories/speciality-repository';
import { ISkillRepository } from '../repositories/interfaces/skill-repository.interface';
import { SkillRepository } from '../repositories/skill-repository';
import { IPortfolioRepository } from '../repositories/interfaces/portfolio-respository.interface';
import { PortfolioRepository } from '../repositories/portfolio-repository';
import { IActionVerificationRepository } from '../repositories/interfaces/action-verification-repository.interface';
import { ActionVerificationRepository } from '../repositories/action-verification-repository';
import { IJobRepository } from '../repositories/interfaces/job-repository.interface';
import { JobRepository } from '../repositories/job-repository';
import { IClientRepository } from '../repositories/interfaces/client-repository.interface';
import { ClientRepository } from '../repositories/client-repository';
container.register<ICategoryRepository>('ICategoryRepository', { useClass: CategoryRepository });
container.register<ISpecialityRepository>('ISpecialityRepository', {
  useClass: SpecialityRepository,
});
container.register<ISkillRepository>('ISkillRepository', { useClass: SkillRepository });
container.register<IPortfolioRepository>('IPortfolioRepository', { useClass: PortfolioRepository });
container.register<IActionVerificationRepository>('IActionVerificationRepository', {
  useClass: ActionVerificationRepository,
});

container.register<IJobRepository>('IJobRepository', { useClass: JobRepository });
container.register<IClientRepository>('IClientRepository', { useClass: ClientRepository });
//Auth
import { AuthService } from '../services/authServices/auth-services';
import type { IAuthService } from '../services/authServices/interfaces/auth-services.interface';
import { OtpService } from '../services/authServices/otp-services';
import { IOtpServices } from '../services/authServices/interfaces/i-otp-services.interface';
import { UserRepository } from '../repositories/user-repository';
import { OtpRepository } from '../repositories/otp-repository';
import type { IUserRepository } from '../repositories/interfaces/user-repository.interface';
import type { IOtpRepository } from '../repositories/interfaces/otp-repository.interface';

// Register service
container.register<IAuthService>('IAuthService', { useClass: AuthService });
container.register<IOtpServices>('IOtpServices', { useClass: OtpService });
// Register Repository
container.register<IUserRepository>('IUserRepository', { useClass: UserRepository });
container.register<IOtpRepository>('IOtpRepository', { useClass: OtpRepository });

//GoogleAuth
import { IGoogleAuthService } from '../services/authServices/interfaces/google-auth-services.interface';
import GoogleAuthService from '../services/authServices/google-auth-services';
container.register<IGoogleAuthService>('IGoogleAuthService', { useClass: GoogleAuthService });

//User
import { userServices } from '../services/userServices/user-services';
import { IUserServices } from '../services/userServices/interfaces/user-services.interface';

container.register<IUserServices>('IUserServices', { useClass: userServices });

//Admin

//AdminAuth
import { IAdminAuthServices } from '../services/adminServices/interfaces/admin-auth-services.interface';
import { AdminAuthServices } from '../services/adminServices/admin-auth-services';
container.register<IAdminAuthServices>('IAdminAuthServices', { useClass: AdminAuthServices });

//Category and skills
import { AdminCategoryServices } from '../services/adminServices/admin-category-services';
import { IAdminCategoryServices } from '../services/adminServices/interfaces/admin-category-services.interface';
import { AdminCategoryRepository } from '../repositories/adminRepositories/admin-category-repository';
import { IAdminCategoryRepository } from '../repositories/adminRepositories/interfaces/admin-category-repository.interface';
import { IAdminSpecialityServices } from '../services/adminServices/interfaces/admin-speciality-services.interface';
import { AdminSpecialityServices } from '../services/adminServices/admin-speciality-services';
import { IAdminSpecialityRepository } from '../repositories/adminRepositories/interfaces/admin-speciality-repository.interface';
import { AdminSpecialityRepository } from '../repositories/adminRepositories/admin-speciality-repository';

import { IAdminSkillServices } from '../services/adminServices/interfaces/admin-skill-services.interface';
import { AdminSkillServices } from '../services/adminServices/admin-skill-services';
import { IAdminSkillRepository } from '../repositories/adminRepositories/interfaces/admin-skill-repository.interface';
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
import { IAdminUserServices } from '../services/adminServices/interfaces/admin-user-services.interface';

container.register<IAdminUserServices>('IAdminUserServices', { useClass: AdminUserServices });

//Freelancer
import { IFreelancerRepository } from '../repositories/interfaces/freelancer-repository.interface';
import { FreelancerRepository } from '../repositories/freelancer-repository';
import { IFreelancerService } from '../services/freelancerServices/interfaces/freelancer-services.interface';
import { FreelancerService } from '../services/freelancerServices/freelancer-services';

container.register<IFreelancerService>('IFreelancerService', { useClass: FreelancerService });
container.register<IFreelancerRepository>('IFreelancerRepository', {
  useClass: FreelancerRepository,
});

//Client

import { IClientService } from '../services/clientServices/interfaces/client-services.interface';
import { ClientService } from '../services/clientServices/client-services';

container.register<IClientService>('IClientService', { useClass: ClientService });

//user category ,speciality,skills
import { IUserCategoryServices } from '../services/userServices/interfaces/user-category-services.interface';
import { userCategoryServices } from '../services/userServices/user-category-services';
import { IUserSpecialityServices } from '../services/userServices/interfaces/user-speciality-services.interface';
import { userSpecialityServices } from '../services/userServices/user-speciality-services';
import { IUserSkillServices } from '../services/userServices/interfaces/user-skill-services.interface';
import { UserSkillServices } from '../services/userServices/user-skill-services';

container.register<IUserCategoryServices>('IUserCategoryServices', {
  useClass: userCategoryServices,
});
container.register<IUserSpecialityServices>('IUserSpecialityServices', {
  useClass: userSpecialityServices,
});
container.register<IUserSkillServices>('IUserSkillServices', { useClass: UserSkillServices });

//Week 2

//admin
//admin job management
import { IAdminJobService } from '../services/adminServices/interfaces/admin-job-service.interface';
import { AdminJobService } from '../services/adminServices/admin-job-service';

container.register<IAdminJobService>('IAdminJobService', {
  useClass: AdminJobService,
});

//client job management
import { IClientJobService } from '../services/clientServices/interfaces/client-job-service.interface';
import { ClientJobService } from '../services/clientServices/client-job-service';

container.register<IClientJobService>('IClientJobService', {
  useClass: ClientJobService,
});

//client category management
import { IClientCategoryService } from '../services/clientServices/interfaces/client-category-service.interface';
import { ClientCategoryService } from '../services/clientServices/client-category-service';

container.register<IClientCategoryService>('IClientCategoryService', {
  useClass: ClientCategoryService,
});

//client speciality management
import { IClientSpecialityService } from '../services/clientServices/interfaces/client-speciality-service.interface';
import { ClientSpecialityService } from '../services/clientServices/client-speciality-service';

container.register<IClientSpecialityService>('IClientSpecialityService', {
  useClass: ClientSpecialityService,
});
