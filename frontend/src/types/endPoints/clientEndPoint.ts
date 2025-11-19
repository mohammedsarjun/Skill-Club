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
  saveFreelancer:(freelancerId:string)=>`/client/freelancers/${freelancerId}/save`,
  isFreelancerSaved:(freelancerId:string)=>`/client/freelancers/${freelancerId}/saved`,
  getSavedFreelancers: "/client/saved-freelancers",
  createOffer: "/client/offers",
  getOffers: "/client/offers",
  getOfferDetail: (offerId: string) => `/client/offers/${offerId}`,
  withdrawOffer: (offerId: string) => `/client/offers/${offerId}/withdraw`,
  getAllFreelancerPortfolio:(freelancerId:string)=>`/client/freelancers/${freelancerId}/portfolio`,
  getAllJobProposals:(jobId:string)=>`/client/jobs/${jobId}/proposals`,
  getProposalDetail:(proposalId:string)=>`/client/proposals/${proposalId}`,
  rejectProposal:(proposalId:string)=>`/client/proposals/${proposalId}/reject`,
};

export default clientRouterEndPoints;
