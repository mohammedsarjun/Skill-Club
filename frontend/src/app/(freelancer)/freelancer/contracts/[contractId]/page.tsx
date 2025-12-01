"use client";
import { useEffect, useState, useCallback } from 'react';
import { FaVideo, FaEnvelope, FaComment, FaLock, FaComments, FaFolder } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useParams, useRouter } from 'next/navigation';
import { freelancerActionApi } from '@/api/action/FreelancerActionApi';
import { ContractHeader } from './components/ContractHeader';
import { ContractTitleCard } from './components/ContractTitleCard';
import { ContractMetrics } from './components/ContractMetrics';
import { ContractBudget } from './components/ContractBudget';
import { ContractDescription } from './components/ContractDescription';
import { ContractMilestones } from './components/ContractMilestones';
import { ContractCommunication } from './components/ContractCommunication';
import { ContractReferences } from './components/ContractReferences';
import { ClientCard } from './components/ClientCard';
import { DeliverablesWorkspace } from './components/workspace/DeliverablesWorkspace';
import { MilestonesWorkspace } from './components/workspace/MilestonesWorkspace';
import { TimesheetWorkspace } from './components/workspace/TimesheetWorkspace';
import { ChatPanel } from './components/workspace/ChatPanel';
import { FilesTab } from './components/workspace/FilesTab';
import { IFreelancerContractDetail } from '@/types/interfaces/IFreelancerContractDetail';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  formatCurrency as formatCurrencyUtil,
  SupportedCurrency,
  convertCurrency,
} from '@/utils/currency';

function ContractDetails() {
  const [contractDetail, setContractDetail] = useState<IFreelancerContractDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'workspace'>('details');
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
      status: 'pending' | 'funded' | 'submitted' | 'approved' | 'paid';
    }[];
  }>({ currency: 'USD' });

  const params = useParams();
  const router = useRouter();
  const contractId = params.contractId;
  const preferredCurrency = (useSelector((s: RootState) => s.auth.user?.preferredCurrency) ||
    'USD') as SupportedCurrency;
  const currentUserId = useSelector((s: RootState) => s.auth.user?.userId) || '';

  const handleGoBack = useCallback(() => {
    router.push('/freelancer/contracts');
  }, [router]);

  const handleViewClientProfile = useCallback(() => {
    if (contractDetail?.client?.clientId) {
      router.push(`/freelancer/clients/${contractDetail.client.clientId}/profile`);
    }
  }, [contractDetail, router]);

  const handleWorkspaceClick = useCallback(() => {
    if (!contractDetail) return;
    if (contractDetail.status !== 'active') {
      Swal.fire({
        title: 'Workspace Locked',
        text: 'Contract is not active. Workspace is locked.',
        icon: 'info',
      });
    } else {
      setActiveTab('workspace');
    }
  }, [contractDetail]);

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
      const resp = await freelancerActionApi.getContractDetail(String(contractId));
      if (resp?.success && resp.data) {
        const d = resp.data;
        const mapped: IFreelancerContractDetail = {
          contractId: d.contractId,
          offerId: d.offerId,
          offerType: d.offerType,
          jobId: d.jobId,
          jobTitle: d.jobTitle,
          proposalId: d.proposalId,
          client: d.client
            ? {
                clientId: d.client.clientId,
                firstName: d.client.firstName,
                lastName: d.client.lastName,
                companyName: d.client.companyName,
                logo: d.client.logo,
                country: d.client.country,
              }
            : undefined,
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
                submittedAt: m.submittedAt,
                approvedAt: m.approvedAt,
              }))
            : [],
          timesheets: Array.isArray(d.timesheets)
            ? d.timesheets.map((t: any) => ({
                weekStart: t.weekStart,
                weekEnd: t.weekEnd,
                totalHours: t.totalHours,
                totalAmount: t.totalAmount,
                status: t.status,
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

  const handleSubmitDeliverable = useCallback(async (files: { fileName: string; fileUrl: string }[], message: string) => {
    try {
      const resp = await freelancerActionApi.submitDeliverable(contractId as string, { files, message });
      if (resp?.success) {
        await loadContractDetail();
        Swal.fire('Success', 'Deliverable submitted successfully', 'success');
      } else {
        Swal.fire('Error', resp?.message || 'Failed to submit deliverable', 'error');
      }
    } catch (error) {
      console.error('Error submitting deliverable:', error);
      Swal.fire('Error', 'Failed to submit deliverable', 'error');
    }
  }, [contractId, loadContractDetail]);

  const handleResubmitDeliverable = useCallback(async (deliverableId: string, files: { fileName: string; fileUrl: string }[], message: string) => {
    try {
      // TODO: Implement API call
      // await freelancerActionApi.resubmitDeliverable(contractId, deliverableId, files, message);
      Swal.fire('Success', 'Deliverable resubmitted successfully', 'success');
    } catch (error) {
      console.error('Error resubmitting deliverable:', error);
      Swal.fire('Error', 'Failed to resubmit deliverable', 'error');
    }
  }, [contractId]);

  const handleSubmitMilestoneDeliverable = useCallback(async (milestoneId: string, files: { fileName: string; fileUrl: string }[], message: string) => {
    try {
      // TODO: Implement API call
      // await freelancerActionApi.submitMilestoneDeliverable(contractId, milestoneId, files, message);
      Swal.fire('Success', 'Milestone deliverable submitted successfully', 'success');
    } catch (error) {
      console.error('Error submitting milestone deliverable:', error);
      Swal.fire('Error', 'Failed to submit milestone deliverable', 'error');
    }
  }, [contractId]);

  const handleSubmitTimesheet = useCallback(async (logs: { logId?: string; date: string; hours: number; description: string }[]) => {
    try {
      // TODO: Implement API call
      // await freelancerActionApi.submitTimesheet(contractId, logs);
      Swal.fire('Success', 'Timesheet submitted successfully', 'success');
    } catch (error) {
      console.error('Error submitting timesheet:', error);
      Swal.fire('Error', 'Failed to submit timesheet', 'error');
    }
  }, [contractId]);

  const handleSubmitHourLog = useCallback(async (log: { logId?: string; date: string; hours: number; description: string }) => {
    try {
      // TODO: Implement API call
      // await freelancerActionApi.submitHourLog(contractId, log);
      console.log('Hour log submitted:', log);
    } catch (error) {
      console.error('Error submitting hour log:', error);
    }
  }, [contractId]);

  const handleUploadFile = useCallback(async (file: { fileName: string; fileUrl: string; fileSize: number; fileType: string }) => {
    try {
      // TODO: Implement API call
      // await freelancerActionApi.uploadWorkspaceFile(contractId, file);
      Swal.fire('Success', 'File uploaded successfully', 'success');
    } catch (error) {
      console.error('Error uploading file:', error);
      Swal.fire('Error', 'Failed to upload file', 'error');
    }
  }, [contractId]);

  const handleDeleteFile = useCallback(async (fileId: string) => {
    try {
      // TODO: Implement API call
      // await freelancerActionApi.deleteWorkspaceFile(contractId, fileId);
      Swal.fire('Success', 'File deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting file:', error);
      Swal.fire('Error', 'Failed to delete file', 'error');
    }
  }, [contractId]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, _currency: string) =>
    formatCurrencyUtil(Number(amount || 0), converted.currency || preferredCurrency);

  const getCommunicationIcon = (method: string) => {
    switch (method) {
      case 'video_call':
        return <FaVideo />;
      case 'email':
        return <FaEnvelope />;
      case 'chat':
        return <FaComment />;
      default:
        return <FaComment />;
    }
  };

  const calculateTotalMilestones = () =>
    contractDetail?.milestones?.reduce((sum, m) => sum + m.amount, 0) || 0;

  useEffect(() => {
    let cancelled = false;
    let debounceTimer: ReturnType<typeof setTimeout>;

    debounceTimer = setTimeout(() => {
      if (!cancelled) {
        loadContractDetail();
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(debounceTimer);
    };
  }, [contractId, loadContractDetail]);

  useEffect(() => {
    let cancelled = false;
    const doConvert = async () => {
      if (!contractDetail) return;
      const srcCur = (contractDetail.currency || 'USD') as SupportedCurrency;
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
      {loading && <div className="max-w-7xl mx-auto px-6 py-8">Loading contract...</div>}
      {error && !loading && (
        <div className="max-w-7xl mx-auto px-6 py-8 text-red-600">{error}</div>
      )}
      {!loading && !error && contractDetail && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('details')}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === 'details'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Contract Details
              </button>
              <button
                onClick={handleWorkspaceClick}
                className={`flex-1 px-6 py-4 font-medium transition-colors relative ${
                  activeTab === 'workspace'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : contractDetail.status !== 'active'
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                disabled={contractDetail.status !== 'active'}
              >
                <span className="flex items-center justify-center gap-2">
                  Workspace
                  {contractDetail.status !== 'active' && (
                    <FaLock className="text-sm" />
                  )}
                </span>
              </button>
            </div>
          </div>

          {activeTab === 'details' && (
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
                    fundedAmount={converted.budget ?? contractDetail.fundedAmount}
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
                    hourlyRate={converted.hourlyRate ?? contractDetail.hourlyRate}
                    estimatedHoursPerWeek={contractDetail.estimatedHoursPerWeek}
                    budget={converted.budget ?? contractDetail.budget}
                    totalMilestones={converted.totalMilestones ?? calculateTotalMilestones()}
                    currency={converted.currency}
                    formatCurrency={formatCurrency}
                  />
                </div>

                <ContractDescription description={contractDetail.description} />

                <ContractMilestones
                  milestones={(converted.milestones ?? contractDetail.milestones) || []}
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
                  <ClientCard
                    client={contractDetail.client}
                    onViewProfile={handleViewClientProfile}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workspace' && (
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
                  <DeliverablesWorkspace
                    contractId={contractId as string}
                    currentDeliverables={(contractDetail.deliverables || []).map(d => ({
                      deliverableId: d.id,
                      submittedBy: d.submittedBy,
                      files: d.files,
                      message: d.message,
                      status: d.status,
                      version: d.version,
                      submittedAt: d.submittedAt,
                      approvedAt: d.approvedAt,
                      revisionNote: d.message,
                    }))}
                    onSubmitDeliverable={handleSubmitDeliverable}
                    onResubmitDeliverable={handleResubmitDeliverable}
                  />
                )}
                {activeWorkspaceTab === 'milestones' && contractDetail.paymentType === 'fixed_with_milestones' && (
                  <MilestonesWorkspace
                    contractId={contractId as string}
                    milestones={[]}
                    currency={getCurrencySymbol(contractDetail.currency)}
                    onSubmitMilestone={handleSubmitMilestoneDeliverable}
                  />
                )}
                {activeWorkspaceTab === 'timesheet' && contractDetail.paymentType === 'hourly' && (
                  <TimesheetWorkspace
                    contractId={contractId as string}
                    timesheets={[]}
                    hourlyRate={contractDetail.hourlyRate || 0}
                    currency={getCurrencySymbol(contractDetail.currency)}
                    onSubmitTimesheet={handleSubmitTimesheet}
                    onSubmitHourLog={handleSubmitHourLog}
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
                    currentUserId="freelancer123"
                    onUploadFile={handleUploadFile}
                    onDeleteFile={handleDeleteFile}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ContractDetails;
