"use client";
import { useEffect, useState, useCallback } from 'react';
import { FaVideo, FaEnvelope, FaComment } from 'react-icons/fa';
import { useParams, useRouter } from 'next/navigation';
import { clientActionApi } from '@/api/action/ClientActionApi';
import Swal from 'sweetalert2';
import { ContractHeader } from './components/ContractHeader';
import { ContractTitleCard } from './components/ContractTitleCard';
import { ContractMetrics } from './components/ContractMetrics';
import { ContractBudget } from './components/ContractBudget';
import { ContractDescription } from './components/ContractDescription';
import { ContractMilestones } from './components/ContractMilestones';
import { ContractCommunication } from './components/ContractCommunication';
import { ContractReferences } from './components/ContractReferences';
import { FreelancerCard } from './components/FreelancerCard';
import { ActionButtons } from './components/ActionButtons';
import { IClientContractDetail } from '@/types/interfaces/IClientContractDetail';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  formatCurrency as formatCurrencyUtil,
  SupportedCurrency,
  convertCurrency,
} from '@/utils/currency';

function ContractDetails() {
  const [contractDetail, setContractDetail] = useState<IClientContractDetail | null>(null);
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
    router.push('/client/contracts');
  }, [router]);

  const handleViewFreelancerProfile = useCallback(() => {
    if (contractDetail?.freelancer?.freelancerId) {
      router.push(`/client/freelancers/${contractDetail.freelancer.freelancerId}//profile`);
    }
  }, [contractDetail, router]);

  const handleFundContract = useCallback(() => {
    alert('Fund Contract functionality will be implemented soon');
  }, []);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelContract = useCallback(async () => {
    if (!contractId) return;
    try {
      const result = await Swal.fire({
        title: 'Cancel contract',
        text: 'Are you sure you want to cancel this contract?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel',
        cancelButtonText: 'No, keep it',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
          const resp = await clientActionApi.cancelContract(String(contractId));
          const ok = (resp as { success?: boolean } )?.success;
          if (!ok) {
            const msg = (resp as { message?: string })?.message || 'Failed to cancel contract';
            throw new Error(msg);
          }
          return (resp as { data?: unknown })?.data;
        },
      });

      if (result.isConfirmed) {
        setContractDetail((prev) => (prev ? { ...prev, status: 'cancelled' } : prev));
        await Swal.fire('Cancelled', 'Contract cancelled successfully', 'success');
      }
    } catch (e) {
      await Swal.fire('Error', (e as Error)?.message || 'Unexpected error while cancelling', 'error');
    } finally {
      setIsCancelling(false);
    }
  }, [contractId]);

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
        const resp = await clientActionApi.getContractDetail(String(contractId));
        if (cancelled) return;
        if (resp?.success && resp.data) {
          const d = resp.data;
          const mapped: IClientContractDetail = {
            contractId: d.contractId,
            offerId: d.offerId,
            offerType: d.offerType,
            jobId: d.jobId,
            jobTitle: d.jobTitle,
            proposalId: d.proposalId,
            freelancer: d.freelancer
              ? {
                  freelancerId: d.freelancer.freelancerId,
                  firstName: d.freelancer.firstName,
                  lastName: d.freelancer.lastName,
                  logo: d.freelancer.logo,
                  country: d.freelancer.country,
                  rating: d.freelancer.rating,
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
        </div>
      )}
    </>
  );
}

export default ContractDetails;
