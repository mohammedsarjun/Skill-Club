const clientRouterEndPoints = {
  //me
  me: "/client/me",
  updateClient: "/client/update",
  getAllCategories: "/client/categories",
  getSpecialitiesWithSkills: "/client/specialities",
  createJob: "/client/jobs",
  getAllJobs: "/client/jobs",
  getJobDetail: (jobId:string)=>`/client/jobs/${jobId}`,
  updateJobDetail:(jobId:string)=>`/client/jobs/${jobId}`,
  closeJob: (jobId:string)=>`/client/jobs/${jobId}/close`,
  getAllFreelancers:"/client/freelancers",
  getFreelancerDetail:(freelancerId:string)=>`/client/freelancers/${freelancerId}`,
  createOffer: "/client/offers",
  getAllFreelancerPortfolio:(freelancerId:string)=>`/client/freelancers/${freelancerId}/portfolio`,
  getAllJobProposals:(jobId:string)=>`/client/jobs/${jobId}/proposals`,
  getProposalDetail:(proposalId:string)=>`/client/proposals/${proposalId}`,
};

export default clientRouterEndPoints;
