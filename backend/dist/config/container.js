"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const category_repository_1 = require("../repositories/category-repository");
const speciality_repository_1 = require("../repositories/speciality-repository");
const skill_repository_1 = require("../repositories/skill-repository");
const portfolio_repository_1 = require("../repositories/portfolio-repository");
const action_verification_repository_1 = require("../repositories/action-verification-repository");
tsyringe_1.container.register('ICategoryRepository', { useClass: category_repository_1.CategoryRepository });
tsyringe_1.container.register('ISpecialityRepository', {
    useClass: speciality_repository_1.SpecialityRepository,
});
tsyringe_1.container.register('ISkillRepository', { useClass: skill_repository_1.SkillRepository });
tsyringe_1.container.register('IPortfolioRepository', { useClass: portfolio_repository_1.PortfolioRepository });
tsyringe_1.container.register('IActionVerificationRepository', {
    useClass: action_verification_repository_1.ActionVerificationRepository,
});
const auth_services_1 = require("../services/authServices/auth-services");
const otp_services_1 = require("../services/authServices/otp-services");
const user_repository_1 = require("../repositories/user-repository");
const otp_repository_1 = require("../repositories/otp-repository");
tsyringe_1.container.register('IAuthService', { useClass: auth_services_1.AuthService });
tsyringe_1.container.register('IOtpServices', { useClass: otp_services_1.OtpService });
tsyringe_1.container.register('IUserRepository', { useClass: user_repository_1.UserRepository });
tsyringe_1.container.register('IOtpRepository', { useClass: otp_repository_1.OtpRepository });
const google_auth_services_1 = __importDefault(require("../services/authServices/google-auth-services"));
tsyringe_1.container.register('IGoogleAuthService', { useClass: google_auth_services_1.default });
const user_services_1 = require("../services/userServices/user-services");
tsyringe_1.container.register('IUserServices', { useClass: user_services_1.userServices });
const admin_auth_services_1 = require("../services/adminServices/admin-auth-services");
tsyringe_1.container.register('IAdminAuthServices', { useClass: admin_auth_services_1.AdminAuthServices });
const admin_category_services_1 = require("../services/adminServices/admin-category-services");
const admin_category_repository_1 = require("../repositories/adminRepositories/admin-category-repository");
const admin_speciality_services_1 = require("../services/adminServices/admin-speciality-services");
const admin_speciality_repository_1 = require("../repositories/adminRepositories/admin-speciality-repository");
const admin_skill_services_1 = require("../services/adminServices/admin-skill-services");
const admin_skill_repository_1 = require("../repositories/adminRepositories/admin-skill-repository");
tsyringe_1.container.register('IAdminCategoryServices', {
    useClass: admin_category_services_1.AdminCategoryServices,
});
tsyringe_1.container.register('IAdminCategoryRepository', {
    useClass: admin_category_repository_1.AdminCategoryRepository,
});
tsyringe_1.container.register('IAdminSpecialityServices', {
    useClass: admin_speciality_services_1.AdminSpecialityServices,
});
tsyringe_1.container.register('IAdminSpecialityRepository', {
    useClass: admin_speciality_repository_1.AdminSpecialityRepository,
});
tsyringe_1.container.register('IAdminSkillServices', { useClass: admin_skill_services_1.AdminSkillServices });
tsyringe_1.container.register('IAdminSkillRepository', {
    useClass: admin_skill_repository_1.AdminSkillRepository,
});
const admin_user_services_1 = require("../services/adminServices/admin-user-services");
tsyringe_1.container.register('IAdminUserServices', { useClass: admin_user_services_1.AdminUserServices });
const freelancer_repository_1 = require("../repositories/freelancer-repository");
const freelancer_services_1 = require("../services/freelancerServices/freelancer-services");
tsyringe_1.container.register('IFreelancerService', { useClass: freelancer_services_1.FreelancerService });
tsyringe_1.container.register('IFreelancerRepository', {
    useClass: freelancer_repository_1.FreelancerRepository,
});
const client_services_1 = require("../services/clientServices/client-services");
const client_repository_1 = require("../repositories/client-repository");
tsyringe_1.container.register('IClientService', { useClass: client_services_1.ClientService });
tsyringe_1.container.register('IClientRepository', { useClass: client_repository_1.ClientRepository });
const user_category_services_1 = require("../services/userServices/user-category-services");
const user_speciality_services_1 = require("../services/userServices/user-speciality-services");
const user_skill_services_1 = require("../services/userServices/user-skill-services");
tsyringe_1.container.register('IUserCategoryServices', {
    useClass: user_category_services_1.userCategoryServices,
});
tsyringe_1.container.register('IUserSpecialityServices', {
    useClass: user_speciality_services_1.userSpecialityServices,
});
tsyringe_1.container.register('IUserSkillServices', { useClass: user_skill_services_1.UserSkillServices });
//# sourceMappingURL=container.js.map