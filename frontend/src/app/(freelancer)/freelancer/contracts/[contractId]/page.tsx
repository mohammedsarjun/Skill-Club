"use client";
import { useEffect, useState, useCallback } from 'react';
import { FaVideo, FaEnvelope, FaComment } from 'react-icons/fa';
import { useParams, useRouter } from 'next/navigation';
import { freelancerActionApi } from '@/api/action/FreelancerActionApi';
import Swal from 'sweetalert2';
import { ContractHeader } from './components/ContractHeader';
import { ContractTitleCard } from './components/ContractTitleCard';
import { ContractMetrics } from './components/ContractMetrics';
import { ContractBudget } from './components/ContractBudget';
import { ContractDescription } from './components/ContractDescription';
import { ContractMilestones } from './components/ContractMilestones';
import { ContractCommunication } from './components/ContractCommunication';
import { ContractReferences } from './components/ContractReferences';
import { ClientCard } from './components/ClientCard';
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

  const handleGoBack = useCallback(() => {
    router.push('/freelancer/contracts');
  }, [router]);

  const handleViewClientProfile = useCallback(() => {
    if (contractDetail?.client?.clientId) {
      router.push(`/freelancer/clients/${contractDetail.client.clientId}/profile`);
    }
  }, [contractDetail, router]);

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
    let debounceTimer: NodeJS.Timeout;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await freelancerActionApi.getContractDetail(String(contractId));
        if (cancelled) return;
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
              ? d.milestones.map((m: {
                  milestoneId: string;
                  title: string;
                  amount: number;
                  expectedDelivery: string;
                  status: 'pending' | 'funded' | 'submitted' | 'approved' | 'paid';
                  submittedAt?: string;
                  approvedAt?: string;
                }) => ({
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
              ? d.timesheets.map((t: {
                  weekStart: string;
                  weekEnd: string;
                  totalHours: number;
                  totalAmount: number;
                  status: 'pending' | 'approved' | 'paid';
                }) => ({
                  weekStart: t.weekStart,
                  weekEnd: t.weekEnd,
                  totalHours: t.totalHours,
                  totalAmount: t.totalAmount,
                  status: t.status,
                }))
              : [],
            deliverables: Array.isArray(d.deliverables)
              ? d.deliverables.map((dlv: {
                  submittedBy: string;
                  files: { fileName: string; fileUrl: string }[];
                  message?: string;
                  status: 'submitted' | 'approved' | 'changes_requested';
                  submittedAt: string;
                  approvedAt?: string;
                }) => ({
                  submittedBy: dlv.submittedBy,
                  files: dlv.files,
                  message: dlv.message,
                  status: dlv.status,
                  submittedAt: dlv.submittedAt,
                  approvedAt: dlv.approvedAt,
                }))
              : [],
            title: d.title,
            description: d.description,
            expectedStartDate: d.expectedStartDate,
            expectedEndDate: d.expectedEndDate,
            referenceFiles: Array.isArray(d.referenceFiles)
              ? d.referenceFiles.map((f: { fileName: string; fileUrl: string }) => ({
                  fileName: f.fileName,
                  fileUrl: f.fileUrl,
                }))
              : [],
            referenceLinks: Array.isArray(d.referenceLinks)
              ? d.referenceLinks.map((l: { description: string; link: string }) => ({
                  description: l.description,
                  link: l.link,
                }))
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
          };
          setContractDetail(mapped);
        } else {
          setError(resp?.message || 'Failed to load contract');
        }
      } catch (e) {
        if (!cancelled) setError((e as Error)?.message || 'Unexpected error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    debounceTimer = setTimeout(() => {
      load();
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(debounceTimer);
    };
  }, [contractId]);

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
        </div>
      )}
    </>
  );
}

export default ContractDetails;
