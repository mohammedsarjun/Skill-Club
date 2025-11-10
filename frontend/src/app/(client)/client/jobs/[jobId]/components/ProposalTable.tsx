
import React, { useState } from "react";
import GenericTable, { Column, Filter } from "@/components/admin/Table";
import ViewProposalDialog from "./ProposalDialog";

// ===== Type Definitions =====
export interface Proposal {
  id: number;
  freelancerName: string;
  proposalDate: string;
  rateType: "hourly" | "fixed";
  hourlyRate?: number;
  fixedRate?: number;
  status: "pending" | "approved" | "rejected" | "under_review";
  coverLetter?: string;
  estimatedDuration?: string;
  skills?: string[];
}

// ===== Modal Components =====
interface ViewModalProps {
  proposal: Proposal | null;
  onClose: () => void;
}



// ===== Main Component =====
export default function ProposalManagementTable() {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  // Sample data
  const proposalsData: Proposal[] = [
    {
      id: 1,
      freelancerName: "Sarah Johnson",
      proposalDate: "2025-11-05",
      rateType: "hourly",
      hourlyRate: 85,
      status: "pending",
      coverLetter: "I have 5 years of experience in React development and have worked on multiple large-scale applications. I'm confident I can deliver high-quality work for your project.",
      estimatedDuration: "2-3 weeks",
      skills: ["React", "TypeScript", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      freelancerName: "Michael Chen",
      proposalDate: "2025-11-04",
      rateType: "fixed",
      fixedRate: 3500,
      status: "approved",
      coverLetter: "I specialize in full-stack development and have successfully completed 50+ projects. I can start immediately and deliver within the timeline.",
      estimatedDuration: "1 month",
      skills: ["Vue.js", "Python", "Django", "PostgreSQL"],
    },
    {
      id: 3,
      freelancerName: "Emily Rodriguez",
      proposalDate: "2025-11-03",
      rateType: "hourly",
      hourlyRate: 95,
      status: "under_review",
      coverLetter: "As a senior developer with expertise in modern web technologies, I'm excited about this opportunity. My portfolio includes similar projects.",
      estimatedDuration: "3-4 weeks",
      skills: ["Angular", "Java", "Spring Boot", "AWS"],
    },
    {
      id: 4,
      freelancerName: "David Kim",
      proposalDate: "2025-11-02",
      rateType: "fixed",
      fixedRate: 2800,
      status: "rejected",
      coverLetter: "I have a strong background in web development and can bring value to your project with my technical skills and experience.",
      estimatedDuration: "3 weeks",
      skills: ["React", "Node.js", "Express", "MySQL"],
    },
    {
      id: 5,
      freelancerName: "Lisa Thompson",
      proposalDate: "2025-11-01",
      rateType: "hourly",
      hourlyRate: 75,
      status: "pending",
      coverLetter: "I'm a dedicated developer who pays attention to detail and delivers clean, maintainable code. I'd love to work on this project.",
      estimatedDuration: "2 weeks",
      skills: ["React", "Redux", "REST APIs", "Git"],
    },
    {
      id: 6,
      freelancerName: "James Wilson",
      proposalDate: "2025-10-30",
      rateType: "fixed",
      fixedRate: 4200,
      status: "approved",
      coverLetter: "With 8 years of industry experience, I can provide comprehensive solutions that meet your requirements and exceed expectations.",
      estimatedDuration: "5-6 weeks",
      skills: ["React", "Next.js", "GraphQL", "Docker"],
    },
  ];

  // Define columns with custom rate rendering
  const columns: Column<Proposal>[] = [
    { key: "freelancerName", label: "Freelancer Name" },
    {
      key: "proposalDate",
      label: "Proposal Date",
    },
    {
      key: "rateType",
      label: "Rate",
    },
    { key: "status", label: "Status" },
  ];

  // Define filters
  const filters: Filter[] = [
    {
      key: "status",
      label: "Filter by Status",
      options: [
        { id: "", name: "All" },
        { id: "pending", name: "Pending" },
        { id: "approved", name: "Approved" },
        { id: "rejected", name: "Rejected" },
        { id: "under_review", name: "Under Review" },
      ],
    },
  ];

  // Transform data to add a formatted rate column
  const transformedData = proposalsData.map((proposal) => ({
    ...proposal,
    rateType:
      proposal.rateType === "hourly"
        ? `$${proposal.hourlyRate}/hr`
        : `$${proposal.fixedRate?.toLocaleString()} (Fixed)`,
    proposalDate: new Date(proposal.proposalDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  }));

  const handleView = (proposal: Proposal) => {
    // Find the original proposal with all details
    const fullProposal = proposalsData.find((p) => p.id === proposal.id);

    setSelectedProposal(fullProposal || null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <GenericTable<Proposal>
        title="Proposal Management"
        columns={columns}
        data={transformedData}
        filters={filters}
        onView={handleView}
        viewOnly={true}
        pageSize={10}
        searchKeys={["freelancerName"]}
        badgeKeys={["status"]}
        badgeColors={{
          pending: "#f59e0b",
          approved: "#10b981",
          rejected: "#ef4444",
          under_review: "#3b82f6",
        }}
      />

      {selectedProposal && (
        <ViewProposalDialog
          proposalId={"proposal_005"}
          onClose={() => setSelectedProposal(null)}
          onAccept={()=>{}}
          onMessage={()=>{}}
          onReject={()=>{}}
          isOpen={true}
        />

      )}
    </div>
  );
}