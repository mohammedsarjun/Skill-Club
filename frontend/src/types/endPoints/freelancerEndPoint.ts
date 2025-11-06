const freelancerRouterEndPoints = {
  //me
  me: "/freelancer/me",
  updateLanguage: "/freelancer/profile/language",
  deleteLanguage: "/freelancer/profile/language",
  deleteEducation: "/freelancer/profile/education",
  deletePortfolio: "/freelancer/profile/portfolio",
  deleteWorkHistory: "/freelancer/profile/workHistory",
  updateDescription: "/freelancer/profile/description",
  updateProfessionalRole: "/freelancer/profile/professionalRole",
  updateHourlyRate: "/freelancer/profile/hourlyRate",
  updateEducation: "/freelancer/profile/education",
  updateWorkHistory: "/freelancer/profile/workHistory",
  createPortfolio: "/freelancer/portfolio",
  getPortfolio: "/freelancer/portfolio",
  getPortfolioDetails: "/freelancer/portfolio/detail",
  getAllCategories: "/freelancer/categories",
  getSpecialitiesWithSkills: "/freelancer/specialities",
  getJobs: "/freelancer/jobs",
  getJobDetail:(jobId:string)=> `/freelancer/jobs/${jobId}`,
};

export default freelancerRouterEndPoints;
