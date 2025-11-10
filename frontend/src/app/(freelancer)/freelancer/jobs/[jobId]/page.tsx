"use client";
import { freelancerActionApi } from "@/api/action/FreelancerActionApi";
import { FreelancerJobDetailResponse } from "@/types/interfaces/IJob";
import { useParams } from "next/navigation";
import React, { JSX, useEffect, useState } from "react";
import {
  FaBriefcase,
  FaDollarSign,
  FaMapMarkerAlt,
  FaStar,
  FaClock,
  FaFileAlt,
  FaGlobe,
  FaCalendar,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaHeart,
  FaShare,
  FaFlag,
  FaUser,
  FaChartLine,
} from "react-icons/fa";
import ProposalFormModal from "./components/ProposalModal";
import { ICreateProposal } from "@/types/interfaces/IProposal";
import toast from "react-hot-toast";

// TypeScript Interfaces
interface HourlyRate {
  min: number;
  max: number;
  hoursPerWeek: number;
  estimatedDuration: "1 To 3 Months" | "3 To 6 Months";
}

interface FixedRate {
  min: number;
  max: number;
}

interface Client {
  name: string;
  country: string;
  rating: number;
  totalJobsPosted: number;
}

type JobStatus =
  | "pending_verification"
  | "rejected"
  | "open"
  | "closed"
  | "archived"
  | "suspended";
type RateType = "hourly" | "fixed";

interface JobDetailResponse {
  jobId: string;
  title: string;
  description: string;
  category: string;
  specialities: string[];
  skills: string[];
  rateType: RateType;
  hourlyRate?: HourlyRate | null;
  fixedRate?: FixedRate | null;
  status: JobStatus;
  proposalReceived: number;
  postedAt: string;
  client: Client;
}

interface StatusConfig {
  bg: string;
  text: string;
  label: string;
}

// Sample job detail data
// const jobDetail: JobDetailResponse = {
//   jobId: "job-12345",
//   title: "Full Stack Web Application Development",
//   description: `We are seeking an experienced full-stack developer to build a comprehensive web application from the ground up. This project involves creating a scalable, modern web platform with both frontend and backend components.

// **Project Overview:**
// The application will serve as a comprehensive management system for our growing business operations. We need someone who can handle everything from database design to user interface implementation.

// **Key Responsibilities:**
// - Design and implement a scalable architecture using modern frameworks
// - Develop RESTful APIs for seamless frontend-backend communication
// - Create responsive and intuitive user interfaces
// - Implement real-time features using WebSocket technology
// - Integrate third-party services and payment gateways
// - Write clean, maintainable, and well-documented code
// - Perform thorough testing and debugging
// - Deploy and maintain the application on cloud infrastructure

// **Technical Requirements:**
// - Strong proficiency in React.js and modern JavaScript (ES6+)
// - Extensive experience with Node.js and Express.js
// - Deep understanding of MongoDB and database design
// - Experience with AWS services (EC2, S3, Lambda, etc.)
// - Knowledge of TypeScript and its benefits
// - Familiarity with Git version control
// - Understanding of security best practices
// - Experience with CI/CD pipelines

// **What We're Looking For:**
// - Proven track record of delivering complex web applications
// - Strong problem-solving and analytical skills
// - Excellent communication skills and ability to work independently
// - Attention to detail and commitment to quality
// - Portfolio showcasing previous full-stack projects

// **Project Timeline:**
// We're looking to start immediately and expect the project to take approximately 3-4 months for the initial version. There will be ongoing maintenance and feature additions after the initial launch.

// **Communication:**
// We prefer daily updates and weekly progress meetings. You should be comfortable using project management tools like Jira or Trello and communication platforms like Slack.`,
//   category: "Web Development",
//   specialities: ["Full Stack Development", "Backend Development", "Frontend Development"],
//   skills: ["React", "Node.js", "MongoDB", "AWS", "TypeScript", "Express.js", "REST API"],
//   rateType: "hourly",
//   hourlyRate: {
//     min: 50,
//     max: 100,
//     hoursPerWeek: 40,
//     estimatedDuration: "3 To 6 Months",
//   },
//   fixedRate: null,
//   status: "open",
//   proposalReceived: 28,
//   postedAt: "2024-11-01T10:30:00Z",
//   client: {
//     name: "TechVenture Solutions",
//     country: "United States",
//     rating: 4.9,
//     totalJobsPosted: 47,
//   },
// };

const JobDetailPage: React.FC = () => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);
  const [bidAmount, setBidAmount] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [deliveryTime, setDeliveryTime] = useState<string>("1-2 weeks");
  const [jobDetail, setJobDetail] = useState<FreelancerJobDetailResponse>();
  const params = useParams();
  const { jobId } = params;
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: JobStatus): JSX.Element => {
    const statusConfig: Record<JobStatus, StatusConfig> = {
      open: { bg: "bg-green-100", text: "text-green-700", label: "Open" },
      closed: { bg: "bg-gray-100", text: "text-gray-700", label: "Closed" },
      pending_verification: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        label: "Pending",
      },
      rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
      archived: { bg: "bg-gray-100", text: "text-gray-700", label: "Archived" },
      suspended: {
        bg: "bg-orange-100",
        text: "text-orange-700",
        label: "Suspended",
      },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`${config.bg} ${config.text} px-4 py-1.5 rounded-full text-sm font-semibold`}
      >
        {config.label}
      </span>
    );
  };

  const handleSubmitProposal = (): void => {
    console.log("Submitting proposal:", {
      bidAmount,
      coverLetter,
      deliveryTime,
    });
    setShowProposalModal(false);
  };

  const handleSaveJob = (): void => {
    setIsSaved(!isSaved);
  };

  const handleShareJob = (): void => {
    console.log("Sharing job:", jobDetail?.jobId);
  };

  const handleReportJob = (): void => {
    console.log("Reporting job:", jobDetail?.jobId);
  };

  const handleViewClientProfile = (): void => {
    console.log("Viewing client profile:", jobDetail?.client.companyName);
  };

  const handleGoBack = (): void => {
    console.log("Going back to job listings");
  };

  useEffect(() => {
    async function fetchJobDetail() {
      const jobDetailResponse = await freelancerActionApi.getJobDetail(
        jobId as string
      );
      const jobDetail = jobDetailResponse.data;

      setJobDetail({
        jobId: jobId as string,
        title: jobDetail.title,
        description: jobDetail.description,
        category: jobDetail.category,
        specialities: jobDetail.specialities,
        skills: jobDetail.skills,
        rateType: jobDetail.rateType,
        hourlyRate:
          jobDetail.rateType == "hourly" ? jobDetail.hourlyRate : null,
        fixedRate: jobDetail.rateType == "fixed" ? jobDetail.fixedRate : null,
        proposalReceived: jobDetail.proposalReceived,
        postedAt: jobDetail.postedAt,
        client: {
          companyName: jobDetail.client.companyName,
          country: jobDetail.client.country,
          rating: jobDetail.client.rating,
          totalJobsPosted: jobDetail.client.totalJobsPosted,
        },
      });
      console.log(jobDetail);
    }



    fetchJobDetail();
  }, []);


  async function handleProposalSubmit(submittedData:any):Promise<void>{
    submittedData.jobId=jobId
    const response=await freelancerActionApi.createProposal(submittedData)
    if(response.success){
      toast.success(response.message)
    }else{
      toast.error(response.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#108A00] transition-colors mb-4"
          >
            <FaArrowLeft />
            <span className="font-medium">Back to Job Listings</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {jobDetail?.title}
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCalendar className="text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Posted</div>
                    <div className="font-semibold text-gray-900">
                      {formatDate(jobDetail?.postedAt!)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaFileAlt className="text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Proposals</div>
                    <div className="font-semibold text-gray-900">
                      {jobDetail?.proposalReceived}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Location</div>
                    <div className="font-semibold text-gray-900">
                      {jobDetail?.client.country}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock className="text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="font-semibold text-gray-900">
                      {jobDetail?.hourlyRate?.estimatedDuration || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rate Information */}
              <div className="bg-gradient-to-r from-[#108A00]/10 to-green-50 rounded-lg p-6 border border-[#108A00]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">
                      {jobDetail?.rateType === "hourly"
                        ? "Hourly Rate"
                        : "Fixed Budget"}
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      ₹{jobDetail?.fixedRate?.min || jobDetail?.hourlyRate?.min}{""}
                      -₹
                      {jobDetail?.hourlyRate?.max || jobDetail?.fixedRate?.max}
                      {jobDetail?.rateType === "hourly" && (
                        <span className="text-lg">/hr</span>
                      )}
                    </div>
                  </div>
                  {jobDetail?.hourlyRate && (
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-600">
                        Hours per week
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {jobDetail.hourlyRate.hoursPerWeek}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaBriefcase className="text-[#108A00]" />
                Job Description
              </h2>
              <div className="prose max-w-none text-gray-700 whitespace-pre-line leading-relaxed"
              dangerouslySetInnerHTML={{ __html: jobDetail?.description!}}>

              </div>

            
            </div>

            {/* Skills & Specialties */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Required Skills & Expertise
              </h2>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">
                  Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {jobDetail?.specialities.map(
                    (specialty: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {jobDetail?.skills.map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#108A00] hover:text-white transition-colors cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <button
                  onClick={() => setShowProposalModal(true)}
                  className="w-full bg-[#108A00] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#0d7000] transition-colors mb-3 shadow-lg shadow-[#108A00]/20"
                >
                  Submit Proposal
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleSaveJob}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
                      isSaved
                        ? "bg-red-50 text-red-600 border-2 border-red-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <FaHeart className={isSaved ? "fill-current" : ""} />
                    {isSaved ? "Saved" : "Save"}
                  </button>
                  <button
                    onClick={handleShareJob}
                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <FaShare />
                    Share
                  </button>
                </div>
                <button
                  onClick={handleReportJob}
                  className="w-full flex items-center justify-center gap-2 text-gray-600 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors mt-3"
                >
                  <FaFlag />
                  Report Job
                </button>
              </div>

              {/* Client Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaUser className="text-[#108A00]" />
                  About the Client
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      Client Name
                    </div>
                    <div className="font-semibold text-gray-900">
                      {jobDetail?.client.companyName}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-3 border-y border-gray-100">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="font-bold text-gray-900">
                        {jobDetail?.client.rating}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">Client Rating</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Location</div>
                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                      <FaMapMarkerAlt className="text-gray-400" size={14} />
                      {jobDetail?.client.country}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      Jobs Posted
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                      <FaChartLine className="text-gray-400" size={14} />
                      {jobDetail?.client.totalJobsPosted} jobs
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleViewClientProfile}
                  className="w-full mt-6 border-2 border-[#108A00] text-[#108A00] px-4 py-3 rounded-lg font-semibold hover:bg-[#108A00] hover:text-white transition-colors"
                >
                  View Client Profile
                </button>
              </div>

              {/* Job Stats */}
              <div className="bg-gradient-to-br from-[#108A00] to-green-700 rounded-xl shadow-lg p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Job Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Proposals</span>
                    <span className="font-bold text-xl">
                      {jobDetail?.proposalReceived}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Last viewed</span>
                    <span className="font-semibold">2 hours ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Interviewing</span>
                    <span className="font-semibold">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proposal Modal */}
      {showProposalModal && (
        <ProposalFormModal jobType={jobDetail?.rateType as "hourly"|"fixed"} onSubmit={handleProposalSubmit} onClose={()=>{setShowProposalModal(false)}} />
      )}
    </div>
  );
};

export default JobDetailPage;
