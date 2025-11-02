"use client";
import { useState, useEffect } from "react";
import {
  FaBuilding,
  FaClock,
  FaDollarSign,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimes,
  FaFileAlt,
  FaUsers,
  FaStar,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/Dialog";
import SkillsList from "@/components/jobDetail/SkillsList";
import BudgetGrid from "@/components/jobDetail/BudgetGrid";
import ClientCard from "@/components/jobDetail/ClientCard";
import ProposalModal from "@/components/jobDetail/ProposalModal";
import Button from "@/components/ui/Button";
import { clientActionApi } from "@/api/action/ClientActionApi";
import { useParams, useRouter } from "next/navigation";
import { JobData } from "@/types/interfaces/IClient";
import { JobDetailResponseDTO } from "@/types/interfaces/IJob";
import { useSwal } from "@/custom-hooks/useSwal";

const mockJobData = {
  jobId: "JOB-12345",
  jobTitle: "Senior Full Stack Developer",
  jobDescription:
    "We are seeking an experienced Full Stack Developer to join our team and help build a scalable web application. The ideal candidate will have strong experience with React, Node.js, and PostgreSQL. You will be responsible for developing new features, optimizing existing code, and collaborating with our design team to create exceptional user experiences.",
  category: { categoryId: "CAT-001", categoryName: "Web Development" },
  specialities: [
    { specialityId: "SPEC-001", specialityName: "Frontend Development" },
    { specialityId: "SPEC-002", specialityName: "Backend Development" },
  ],
  skills: [
    { skillId: "SKILL-001", skillName: "React" },
    { skillId: "SKILL-002", skillName: "Node.js" },
    { skillId: "SKILL-003", skillName: "PostgreSQL" },
    { skillId: "SKILL-004", skillName: "TypeScript" },
    { skillId: "SKILL-005", skillName: "REST APIs" },
  ],
  budget: {
    rateType: "hourly",
    min: 50,
    max: 85,
    hoursPerWeek: 40,
    estimatedDuration: "3 To 6 Months",
  },
  status: "pending_verification",
  clientDetail: {
    clientId: "CLIENT-789",
    companyName: "TechCorp Solutions",
    companyLogo:
      "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
};

const mockProposals = [
  {
    proposalId: "PROP-001",
    freelancerName: "John Doe",
    freelancerAvatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
    freelancerEmail: "john.doe@example.com",
    freelancerPhone: "+1 234 567 8900",
    freelancerLocation: "San Francisco, CA",
    rating: 4.8,
    totalJobs: 47,
    bidAmount: 75,
    estimatedDuration: "4 months",
    coverLetter:
      "I have over 8 years of experience in full-stack development with expertise in React, Node.js, and PostgreSQL. I have successfully delivered similar projects and would love to bring my skills to your team.",
    submittedAt: "2024-01-15T10:30:00Z",
    status: "pending",
  },
  {
    proposalId: "PROP-002",
    freelancerName: "Sarah Smith",
    freelancerAvatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
    freelancerEmail: "sarah.smith@example.com",
    freelancerPhone: "+1 234 567 8901",
    freelancerLocation: "New York, NY",
    rating: 4.9,
    totalJobs: 62,
    bidAmount: 80,
    estimatedDuration: "3-5 months",
    coverLetter:
      "With a strong background in building scalable web applications, I am confident I can exceed your expectations. My portfolio includes several enterprise-level projects.",
    submittedAt: "2024-01-16T14:20:00Z",
    status: "pending",
  },
  {
    proposalId: "PROP-003",
    freelancerName: "Michael Chen",
    freelancerAvatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100",
    freelancerEmail: "michael.chen@example.com",
    freelancerPhone: "+1 234 567 8902",
    freelancerLocation: "Austin, TX",
    rating: 4.7,
    totalJobs: 35,
    bidAmount: 70,
    estimatedDuration: "4-6 months",
    coverLetter:
      "I specialize in creating efficient and maintainable code. My experience with TypeScript and modern frameworks makes me a great fit for this role.",
    submittedAt: "2024-01-17T09:15:00Z",
    status: "pending",
  },
];

function JobDetailPage() {
  const [activeTab, setActiveTab] = useState<"details" | "proposals">(
    "details"
  );
  const [job, setJob] = useState<JobDetailResponseDTO>();
  const [proposals, setProposals] = useState(mockProposals);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<
    (typeof mockProposals)[0] | null
  >(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const jobIdParam = (params as any)?.jobId as string | undefined;
  useEffect(() => {
    const fetchJobDetail = async () => {
      setIsLoading(true);
      try {
        const jobResponse = await clientActionApi.getJobDetail(
          jobIdParam as string
        );

        if (jobResponse.success) {
          setJob(jobResponse.data);
        }

        setProposals(mockProposals);
      } catch (err) {
        console.error("Failed to fetch job details", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetail();
  }, [jobIdParam]);

  const handleCloseJob=()=>{
    useSwal
  }
  const handleViewProposal = (proposal: (typeof mockProposals)[0]) => {
    setSelectedProposal(proposal);
    setShowProposalModal(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex items-start gap-4 w-full">
              <img
                src={
                  job?.clientDetail?.companyLogo ||
                  "https://via.placeholder.com/150"
                }
                alt={job?.clientDetail?.companyName || "Company"}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-gray-200 bg-white shadow-sm"
              />
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
                    {job?.category?.categoryName || "N/A"}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                    {job?.status === "pending_verification"
                      ? "Pending Review"
                      : job?.status.replace("_", " ")}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {job?.jobTitle}
                </h1>
                <div className="flex flex-wrap items-center text-gray-600 text-sm gap-2">
                  <div className="flex items-center">
                    <FaBuilding className="w-4 h-4 mr-1.5" />
                    <span className="font-medium">
                      {job?.clientDetail?.companyName || "N/A"}
                    </span>
                  </div>
                  <span className="hidden sm:inline text-gray-300">•</span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    Job ID: {job?.jobId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("details")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "details"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FaFileAlt className="w-4 h-4" />
                Job Details
              </div>
            </button>
            <button
              onClick={() => setActiveTab("proposals")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "proposals"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FaUsers className="w-4 h-4" />
                Proposals ({proposals.length})
              </div>
            </button>
          </div>
        </div>

        {activeTab === "details" ? (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-6">
              {/* Rejection / Suspension Reason */}
              {(job?.status === "rejected" || job?.status === "suspended") && (
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                      job?.status === "rejected"
                        ? "bg-red-100 text-red-700 border border-red-300"
                        : "bg-orange-100 text-orange-700 border border-orange-300"
                    }`}
                  >
                    {job?.status === "rejected"
                      ? `Rejected: ${
                          job?.rejectedReason || "No reason provided"
                        }`
                      : `Suspended: ${
                          job?.suspendedReason || "No reason provided"
                        }`}
                  </span>
                </div>
              )}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Job Description
                </h2>
                <p className="text-gray-700 leading-relaxed break-words overflow-hidden break-all whitespace-pre-wrap">
                  {job?.jobDescription}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <SkillsList
                  skills={job?.skills}
                  specialities={job?.specialities}
                />
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <BudgetGrid budget={job?.budget} />
              </div>

              {/* Action Buttons (Edit + Close) */}
              {["open", "pending_verification"].includes(job?.status!) && (
                <div className="pt-5 border-t border-gray-100 flex justify-end gap-3">
                  {job?.status === "pending_verification" && (
                    <button
                      className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition"
                      onClick={() =>
                        router.push(`/client/jobs/edit/${jobIdParam}`)
                      }
                    >
                      Edit Job Post
                    </button>
                  )}

                  <button
                    className="px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg shadow hover:bg-red-700 transition flex items-center gap-2"
                    onClick={()=>handleCloseJob()}
                  >
                    Close Job
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Freelancer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Bid Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {proposals.map((proposal) => (
                    <tr
                      key={proposal.proposalId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={proposal.freelancerAvatar}
                            alt={proposal.freelancerName}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {proposal.freelancerName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {proposal.totalJobs} jobs
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <FaStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {proposal.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-900">
                          ${proposal.bidAmount}/hr
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700">
                          {proposal.estimatedDuration}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-gray-600">
                          {formatDate(proposal.submittedAt)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                          {proposal.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewProposal(proposal)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {proposals.length === 0 && (
              <div className="text-center py-12">
                <FaUsers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No proposals submitted yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDetailPage;
