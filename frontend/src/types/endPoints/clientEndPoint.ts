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
  getFreelancerDetail:(freelancerId:string)=>`/client/freelancers/${freelancerId}`
};

export default clientRouterEndPoints;
