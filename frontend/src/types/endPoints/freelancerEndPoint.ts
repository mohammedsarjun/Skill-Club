import { get } from "lodash";

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
  saveJob: (jobId: string) => `/freelancer/jobs/${jobId}/save`,
  isJobSaved: (jobId: string) => `/freelancer/jobs/${jobId}/saved`,
  getSavedJobs: () => `/freelancer/saved-jobs`,
  createProposal:'/freelancer/proposals',
  getMyProposals:(jobId:string)=> `/freelancer/jobs/${jobId}/proposals`,
  getOffers: '/freelancer/offers',
  getOfferDetail: (offerId: string) => `/freelancer/offers/${offerId}`,
  rejectOffer: (offerId: string) => `/freelancer/offers/${offerId}/reject`,
};

export default freelancerRouterEndPoints;
