"use client";
import { useEffect, useState, useCallback } from "react";
import { FaVideo, FaEnvelope, FaComment, FaLock, FaComments, FaFolder } from "react-icons/fa";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { clientActionApi } from "@/api/action/ClientActionApi";
import Swal from "sweetalert2";
import { ContractHeader } from "./components/ContractHeader";
import { ContractTitleCard } from "./components/ContractTitleCard";
import { ContractMetrics } from "./components/ContractMetrics";
import { ContractBudget } from "./components/ContractBudget";
import { ContractDescription } from "./components/ContractDescription";
import { ContractMilestones } from "./components/ContractMilestones";
import { ContractCommunication } from "./components/ContractCommunication";
import { ContractReferences } from "./components/ContractReferences";
import { FreelancerCard } from "./components/FreelancerCard";
import { ActionButtons } from "./components/ActionButtons";
import { FundContractModal } from "./components/FundContractModal";
import { ClientDeliverablesView } from "./components/workspace/ClientDeliverablesView";
import { ClientMilestonesView } from "./components/workspace/ClientMilestonesView";
import { ClientTimesheetView } from "./components/workspace/ClientTimesheetView";
import { ChatPanel } from "./components/workspace/ChatPanel";
import { FilesTab } from "@/app/(freelancer)/freelancer/contracts/[contractId]/components/workspace/FilesTab";
import { IClientContractDetail } from "@/types/interfaces/IClientContractDetail";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  formatCurrency as formatCurrencyUtil,
  SupportedCurrency,
  convertCurrency,
} from "@/utils/currency";

function ContractDetails() {
  const [contractDetail, setContractDetail] =
    useState<IClientContractDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "workspace">(
    "details"
  );
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'deliverables' | 'milestones' | 'timesheet' | 'chat' | 'files'>('deliverables');
  const [converted, setConverted] = useState<{
    currency: SupportedCurrency;
    hourlyRate?: number;
    budget?: number;
    totalMilestones?: number;
    milestones?: {
      milestoneId: string;
      title: string;
      amount: number;
      expectedDelivery: string;
      status: "pending" | "funded" | "submitted" | "approved" | "paid";
    }[];
  }>({ currency: "USD" });

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const contractId = params.contractId;
  const preferredCurrency = (useSelector(
    (s: RootState) => s.auth.user?.preferredCurrency
  ) || "USD") as SupportedCurrency;
  const currentUserId = useSelector((s: RootState) => s.auth.user?.userId) || '';



  const handleGoBack = useCallback(() => {
    router.push("/client/contracts");
  }, [router]);

  const handleViewFreelancerProfile = useCallback(() => {
    if (contractDetail?.freelancer?.freelancerId) {
      router.push(
        `/client/freelancers/${contractDetail.freelancer.freelancerId}//profile`
      );
    }
  }, [contractDetail, router]);

  const handleFundContract = useCallback(() => {
    setIsFundModalOpen(true);
  }, []);

  const handleFundSuccess = useCallback(async () => {
    const resp = await clientActionApi.getContractDetail(String(contractId));
    if (resp?.success && resp.data) {
      const d = resp.data;
      setContractDetail({
        contractId: d.contractId,
        offerId: d.offerId,
        offerType: d.offerType,
        jobId: d.jobId,
        jobTitle: d.jobTitle,
        title: d.title,
        description: d.description,
        expectedStartDate: d.expectedStartDate,
        expectedEndDate: d.expectedEndDate,
        paymentType: d.paymentType,
        budget: d.budget,
        hourlyRate: d.hourlyRate,
        estimatedHoursPerWeek: d.estimatedHoursPerWeek,
        currency: d.currency || "USD",
        freelancer: d.freelancer,
        milestones: Array.isArray(d.milestones)
          ? d.milestones.map(
              (m: {
                milestoneId: string;
                title: string;
                amount: number;
                expectedDelivery: string;
                status:
                  | "pending"
                  | "funded"
                  | "submitted"
                  | "approved"
                  | "paid";
              }) => ({
                milestoneId: m.milestoneId,
                title: m.title,
                amount: m.amount,
                expectedDelivery: m.expectedDelivery,
                status: m.status,
              })
            )
          : [],
        referenceFiles: Array.isArray(d.referenceFiles)
          ? d.referenceFiles.map(
              (f: { fileName: string; fileUrl: string }) => ({
                fileName: f.fileName,
                fileUrl: f.fileUrl,
              })
            )
          : [],
        referenceLinks: Array.isArray(d.referenceLinks)
          ? d.referenceLinks.map(
              (l: { description: string; link: string }) => ({
                description: l.description,
                link: l.link,
              })
            )
          : [],
        communication: d.communication
          ? {
              preferredMethod: d.communication.preferredMethod,
              meetingFrequency: d.communication.meetingFrequency,
              meetingDayOfWeek: d.communication.meetingDayOfWeek,
              meetingDayOfMonth: d.communication.meetingDayOfMonth,
              meetingTimeUtc: d.communication.meetingTimeUtc,
            }
          : undefined,
        reporting: d.reporting
          ? {
              frequency: d.reporting.frequency,
              dueTimeUtc: d.reporting.dueTimeUtc,
              dueDayOfWeek: d.reporting.dueDayOfWeek,
              dueDayOfMonth: d.reporting.dueDayOfMonth,
              format: d.reporting.format,
            }
          : undefined,
        status: d.status,
        fundedAmount: d.fundedAmount || 0,
        totalPaid: d.totalPaid || 0,
        balance: d.balance || 0,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      });
    }
  }, [contractId]);

  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const paymentStatus = searchParams.get("payment");
    if (paymentStatus === "success") {
      Swal.fire({
        title: "Payment Successful!",
        text: "Your payment has been verified. The contract is now active.",
        icon: "success",
        confirmButtonText: "Continue",
      }).then(() => {
        handleFundSuccess();
        router.replace(`/client/contracts/${contractId}`);
      });
    } else if (paymentStatus === "cancelled" || paymentStatus === "failed") {
      Swal.fire({
        title: "Payment Failed",
        text: "Your payment was not completed. Please retry to activate the contract.",
        icon: "error",
        confirmButtonText: "Retry",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsFundModalOpen(true);
        }
        router.replace(`/client/contracts/${contractId}`);
      });
    }
  }, [searchParams, contractId, router, handleFundSuccess]);

  const handleCancelContract = useCallback(async () => {
    if (!contractId) return;
    try {
      const result = await Swal.fire({
        title: "Cancel contract",
        text: "Are you sure you want to cancel this contract?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel",
        cancelButtonText: "No, keep it",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
          const resp = await clientActionApi.cancelContract(String(contractId));
          const ok = (resp as { success?: boolean })?.success;
          if (!ok) {
            const msg =
              (resp as { message?: string })?.message ||
              "Failed to cancel contract";
            throw new Error(msg);
          }
          return (resp as { data?: unknown })?.data;
        },
      });

      if (result.isConfirmed) {
        setContractDetail((prev) =>
          prev ? { ...prev, status: "cancelled" } : prev
        );
        await Swal.fire(
          "Cancelled",
          "Contract cancelled successfully",
          "success"
        );
      }
    } catch (e) {
      await Swal.fire(
        "Error",
        (e as Error)?.message || "Unexpected error while cancelling",
        "error"
      );
    } finally {
      setIsCancelling(false);
    }
  }, [contractId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number, _currency: string) =>
    formatCurrencyUtil(
      Number(amount || 0),
      converted.currency || preferredCurrency
    );

  const getCommunicationIcon = (method: string) => {
    switch (method) {
      case "video_call":
        return <FaVideo />;
      case "email":
        return <FaEnvelope />;
      case "chat":
        return <FaComment />;
      default:
        return <FaComment />;
    }
  };

  const calculateTotalMilestones = () =>
    contractDetail?.milestones?.reduce((sum, m) => sum + m.amount, 0) || 0;

  const handleWorkspaceTabClick = useCallback((tab: 'deliverables' | 'milestones' | 'timesheet' | 'chat' | 'files') => {
    if (contractDetail?.status !== 'active') {
      Swal.fire({
        icon: 'warning',
        title: 'Workspace Locked',
        text: 'The workspace is only available when the contract is active.',
      });
      return;
    }
    setActiveWorkspaceTab(tab);
  }, [contractDetail?.status]);

  useEffect(() => {
    if (activeTab === 'workspace' && contractDetail) {
      // Set default workspace tab based on payment type
      if (contractDetail.paymentType === 'fixed') {
        setActiveWorkspaceTab('deliverables');
      } else if (contractDetail.paymentType === 'fixed_with_milestones') {
        setActiveWorkspaceTab('milestones');
      } else if (contractDetail.paymentType === 'hourly') {
        setActiveWorkspaceTab('timesheet');
      }
    }
  }, [activeTab, contractDetail]);

  const getCurrencySymbol = useCallback((currency: string) => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹',
    };
    return symbols[currency] || currency;
  }, []);

  const loadContractDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await clientActionApi.getContractDetail(String(contractId));
      if (resp?.success && resp.data) {
        const d = resp.data;
        const mapped: IClientContractDetail = {
          contractId: d.contractId,
          offerId: d.offerId,
          offerType: d.offerType,
          jobId: d.jobId,
          jobTitle: d.jobTitle,
          proposalId: d.proposalId,
          freelancer: d.freelancer,
          paymentType: d.paymentType,
          budget: d.budget,
          budgetBaseUSD: d.budgetBaseUSD,
          hourlyRate: d.hourlyRate,
          hourlyRateBaseUSD: d.hourlyRateBaseUSD,
          conversionRate: d.conversionRate,
          estimatedHoursPerWeek: d.estimatedHoursPerWeek,
          currency: d.currency,
          milestones: Array.isArray(d.milestones)
            ? d.milestones.map((m: any) => ({
                milestoneId: m.milestoneId,
                title: m.title,
                amount: m.amount,
                expectedDelivery: m.expectedDelivery,
                status: m.status,
              }))
            : [],
          deliverables: Array.isArray(d.deliverables)
            ? d.deliverables.map((dlv: any) => ({
                id: dlv.id,
                submittedBy: dlv.submittedBy,
                files: dlv.files,
                message: dlv.message,
                status: dlv.status,
                version: dlv.version,
                submittedAt: dlv.submittedAt,
                approvedAt: dlv.approvedAt,
              }))
            : [],
          title: d.title,
          description: d.description,
          expectedStartDate: d.expectedStartDate,
          expectedEndDate: d.expectedEndDate,
          referenceFiles: Array.isArray(d.referenceFiles)
            ? d.referenceFiles.map((f: any) => ({
                fileName: f.fileName,
                fileUrl: f.fileUrl,
              }))
            : [],
          referenceLinks: Array.isArray(d.referenceLinks)
            ? d.referenceLinks.map((l: any) => ({
                description: l.description,
                link: l.link,
              }))
            : [],
          communication: d.communication,
          reporting: d.reporting,
          status: d.status,
          fundedAmount: d.fundedAmount || 0,
          totalPaid: d.totalPaid || 0,
          balance: d.balance || 0,
          createdAt: d.createdAt,
          updatedAt: d.updatedAt,
        };
        setContractDetail(mapped);
      } else {
        setError(resp?.message || 'Failed to load contract details');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [contractId]);

  const handleApproveDeliverable = useCallback(async (deliverableId: string) => {
    try {
      const resp = await clientActionApi.approveDeliverable(contractId as string, { deliverableId });
      if (resp?.success) {
        await loadContractDetail();
        Swal.fire('Success', 'Deliverable approved successfully', 'success');
      } else {
        Swal.fire('Error', resp?.message || 'Failed to approve deliverable', 'error');
      }
    } catch (error) {
      console.error('Error approving deliverable:', error);
      Swal.fire('Error', 'Failed to approve deliverable', 'error');
    }
  }, [contractId, loadContractDetail]);

  const handleRequestChanges = useCallback(async (deliverableId: string, note: string) => {
    try {
      const resp = await clientActionApi.requestDeliverableChanges(contractId as string, { deliverableId, message: note });
      if (resp?.success) {
        await loadContractDetail();
        Swal.fire('Success', 'Change request sent to freelancer', 'success');
      } else {
        Swal.fire('Error', resp?.message || 'Failed to request changes', 'error');
      }
    } catch (error) {
      console.error('Error requesting changes:', error);
      Swal.fire('Error', 'Failed to request changes', 'error');
    }
  }, [contractId, loadContractDetail]);

  const handleApproveMilestone = useCallback(async (milestoneId: string) => {
    try {
      // TODO: Implement API call
      // await clientActionApi.approveMilestone(contractId, milestoneId);
      Swal.fire('Success', 'Milestone approved and payment released', 'success');
    } catch (error) {
      console.error('Error approving milestone:', error);
      Swal.fire('Error', 'Failed to approve milestone', 'error');
    }
  }, [contractId]);

  const handleApproveTimesheet = useCallback(async (weekStart: string) => {
    try {
      // TODO: Implement API call
      // await clientActionApi.approveTimesheet(contractId, weekStart);
      Swal.fire('Success', 'Timesheet approved', 'success');
    } catch (error) {
      console.error('Error approving timesheet:', error);
      Swal.fire('Error', 'Failed to approve timesheet', 'error');
    }
  }, [contractId]);

  useEffect(() => {
    let cancelled = false;
    let debounceTimer: ReturnType<typeof setTimeout>;

    debounceTimer = setTimeout(() => {
      if (!cancelled) loadContractDetail();
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(debounceTimer);
    };
  }, [loadContractDetail]);

  useEffect(() => {
    let cancelled = false;
    const doConvert = async () => {
      if (!contractDetail) return;
      const srcCur = (contractDetail.currency || "USD") as SupportedCurrency;
      const tgtCur = preferredCurrency as SupportedCurrency;

      try {
        const [hr, bdg, msConverted] = await Promise.all([
          contractDetail.hourlyRate != null
            ? convertCurrency(contractDetail.hourlyRate, srcCur, tgtCur)
            : Promise.resolve(undefined),
          contractDetail.budget != null
            ? convertCurrency(contractDetail.budget, srcCur, tgtCur)
            : Promise.resolve(undefined),
          Array.isArray(contractDetail.milestones)
            ? Promise.all(
                contractDetail.milestones.map(async (m) => ({
                  ...m,
                  amount: await convertCurrency(m.amount || 0, srcCur, tgtCur),
                }))
              )
            : Promise.resolve(undefined),
        ]);

        const totalMs = Array.isArray(msConverted)
          ? msConverted.reduce((s, m) => s + (m.amount || 0), 0)
          : undefined;

        if (!cancelled) {
          setConverted({
            currency: tgtCur,
            hourlyRate: hr,
            budget: bdg,
            milestones: msConverted,
            totalMilestones: totalMs,
          });
        }
      } catch {
        if (!cancelled) {
          setConverted({ currency: srcCur as SupportedCurrency });
        }
      }
    };
    doConvert();
    return () => {
      cancelled = true;
    };
  }, [contractDetail, preferredCurrency]);

  return (
    <>
      <ContractHeader onGoBack={handleGoBack} />
      {loading && (
        <div className="max-w-7xl mx-auto px-6 py-8">Loading contract...</div>
      )}
      {error && !loading && (
        <div className="max-w-7xl mx-auto px-6 py-8 text-red-600">{error}</div>
      )}
      {!loading && !error && contractDetail && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("details")}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === "details"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Contract Details
              </button>
              <button
                onClick={() => {
                  if (contractDetail.status === "pending_funding") {
                    Swal.fire({
                      title: "Workspace Locked",
                      text: "Please fund the contract to access the workspace.",
                      icon: "info",
                    });
                  } else {
                    setActiveTab("workspace");
                  }
                }}
                className={`flex-1 px-6 py-4 font-medium transition-colors relative ${
                  activeTab === "workspace"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : contractDetail.status === "pending_funding"
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                disabled={contractDetail.status === "pending_funding"}
              >
                <span className="flex items-center justify-center gap-2">
                  Workspace
                  {contractDetail.status === "pending_funding" && (
                    <FaLock className="text-sm" />
                  )}
                </span>
              </button>
            </div>
          </div>

          {activeTab === "details" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ContractTitleCard
                  contractId={contractDetail.contractId}
                  title={contractDetail.title}
                  status={contractDetail.status}
                  offerType={contractDetail.offerType}
                  jobTitle={contractDetail.jobTitle}
                />

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <ContractMetrics
                    startDate={contractDetail.expectedStartDate}
                    endDate={contractDetail.expectedEndDate}
                    paymentType={contractDetail.paymentType}
                    fundedAmount={
                      converted.budget ?? contractDetail.fundedAmount
                    }
                    totalPaid={converted.budget ?? contractDetail.totalPaid}
                    balance={converted.budget ?? contractDetail.balance}
                    currency={converted.currency}
                    formatDate={formatDate}
                    formatCurrency={formatCurrency}
                  />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <ContractBudget
                    paymentType={contractDetail.paymentType}
                    hourlyRate={
                      converted.hourlyRate ?? contractDetail.hourlyRate
                    }
                    estimatedHoursPerWeek={contractDetail.estimatedHoursPerWeek}
                    budget={converted.budget ?? contractDetail.budget}
                    totalMilestones={
                      converted.totalMilestones ?? calculateTotalMilestones()
                    }
                    currency={converted.currency}
                    formatCurrency={formatCurrency}
                  />
                </div>

                <ContractDescription description={contractDetail.description} />

                <ContractMilestones
                  milestones={
                    (converted.milestones ?? contractDetail.milestones) || []
                  }
                  currency={converted.currency}
                  formatDate={formatDate}
                  formatCurrency={formatCurrency}
                />

                <ContractCommunication
                  communication={contractDetail.communication}
                  reporting={contractDetail.reporting}
                  getCommunicationIcon={getCommunicationIcon}
                />

                <ContractReferences
                  referenceFiles={contractDetail.referenceFiles}
                  referenceLinks={contractDetail.referenceLinks}
                />
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-6 space-y-6">
                  <ActionButtons
                    status={contractDetail.status}
                    onFundContract={handleFundContract}
                    onCancelContract={handleCancelContract}
                    isProcessing={isCancelling}
                  />

                  <FreelancerCard
                    freelancer={contractDetail.freelancer}
                    onViewProfile={handleViewFreelancerProfile}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "workspace" && (
            <div>
              <div className="flex gap-4 mb-6 border-b border-gray-200 pb-4">
                {contractDetail.paymentType === 'fixed' && (
                  <button
                    onClick={() => handleWorkspaceTabClick('deliverables')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeWorkspaceTab === 'deliverables'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Deliverables
                  </button>
                )}
                {contractDetail.paymentType === 'fixed_with_milestones' && (
                  <button
                    onClick={() => handleWorkspaceTabClick('milestones')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeWorkspaceTab === 'milestones'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Milestones
                  </button>
                )}
                {contractDetail.paymentType === 'hourly' && (
                  <button
                    onClick={() => handleWorkspaceTabClick('timesheet')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeWorkspaceTab === 'timesheet'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Timesheet
                  </button>
                )}
                <button
                  onClick={() => handleWorkspaceTabClick('chat')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    activeWorkspaceTab === 'chat'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FaComments />
                  Chat
                </button>
                <button
                  onClick={() => handleWorkspaceTabClick('files')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    activeWorkspaceTab === 'files'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FaFolder />
                  Files
                </button>
              </div>

              <div>
                {activeWorkspaceTab === 'deliverables' && contractDetail.paymentType === 'fixed' && (
                  <ClientDeliverablesView
                    contractId={contractId as string}
                    deliverables={(contractDetail.deliverables || []).map(d => ({
                      deliverableId: d.id,
                      submittedBy: d.submittedBy,
                      files: d.files,
                      message: d.message,
                      status: d.status,
                      version: d.version,
                      submittedAt: d.submittedAt,
                      approvedAt: d.approvedAt,
                    }))}
                    onApproveDeliverable={handleApproveDeliverable}
                    onRequestChanges={handleRequestChanges}
                  />
                )}
                {activeWorkspaceTab === 'milestones' && contractDetail.paymentType === 'fixed_with_milestones' && (
                  <ClientMilestonesView
                    contractId={contractId as string}
                    milestones={[]}
                    currencySymbol={getCurrencySymbol(contractDetail.currency)}
                    onApproveMilestone={handleApproveMilestone}
                  />
                )}
                {activeWorkspaceTab === 'timesheet' && contractDetail.paymentType === 'hourly' && (
                  <ClientTimesheetView
                    contractId={contractId as string}
                    timesheets={[]}
                    hourlyRate={contractDetail.hourlyRate || 0}
                    currencySymbol={getCurrencySymbol(contractDetail.currency)}
                    onApproveTimesheet={handleApproveTimesheet}
                  />
                )}
                {activeWorkspaceTab === 'chat' && (
                  <ChatPanel
                    contractId={contractId as string}
                    currentUserId={currentUserId}
                  />
                )}
                {activeWorkspaceTab === 'files' && (
                  <FilesTab
                    contractId={contractId as string}
                    files={[]}
                    currentUserId="client123"
                    onUploadFile={async (file: { fileName: string; fileUrl: string; fileSize: number; fileType: string }) => {
                      try {
                        console.log('File uploaded:', file);
                        Swal.fire('Success', 'File uploaded successfully', 'success');
                      } catch (error) {
                        console.error('Error uploading file:', error);
                        Swal.fire('Error', 'Failed to upload file', 'error');
                      }
                    }}
                    onDeleteFile={async (fileId: string) => {
                      try {
                        console.log('File deleted:', fileId);
                        Swal.fire('Success', 'File deleted successfully', 'success');
                      } catch (error) {
                        console.error('Error deleting file:', error);
                        Swal.fire('Error', 'Failed to delete file', 'error');
                      }
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {contractDetail && (
        <FundContractModal
          isOpen={isFundModalOpen}
          onClose={() => setIsFundModalOpen(false)}
          contractId={contractId as string}
          amount={
            contractDetail.paymentType === "hourly" &&
            contractDetail.hourlyRate &&
            contractDetail.estimatedHoursPerWeek
              ? contractDetail.hourlyRate * contractDetail.estimatedHoursPerWeek
              : contractDetail.budget || 0
          }
          paymentType={contractDetail.paymentType}
          onSuccess={handleFundSuccess}
        />
      )}
    </>
  );
}

export default ContractDetails;
