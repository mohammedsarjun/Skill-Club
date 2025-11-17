"use client";
import { useEffect, useState } from 'react';
import { FaVideo, FaEnvelope, FaComment } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { clientActionApi } from '@/api/action/ClientActionApi';
import { OfferHeader } from './components/OfferHeader';
import { OfferTitleCard } from './components/OfferTitleCard';
import { OfferMetrics } from './components/OfferMetrics';
import { OfferBudget } from './components/OfferBudget';
import { OfferDescription } from './components/OfferDescription';
import { OfferMilestones } from './components/OfferMilestones';
import { OfferCommunication } from './components/OfferCommunication';
import { OfferReferences } from './components/OfferReferences';
import { OfferTimeline } from './components/OfferTimeline';
import { useRouter } from 'next/navigation';

interface OfferMilestone { title: string; amount: number; expectedDelivery: string; }
interface OfferReferenceFile { fileName: string; fileUrl: string; }
interface OfferReferenceLink { description: string; link: string; }
interface OfferTimelineEvent { status: 'pending' | 'accepted' | 'rejected' | 'withdrawn' | 'expired'; at: string; note?: string; }
interface ClientInfo { companyName: string; rating: number; country: string; totalJobsPosted: number; }
interface OfferDetail {
  id: string;
  clientId: string;
  freelancerId: string;
  freelancer?: { freelancerId?: string; firstName?: string; lastName?: string; logo?: string; country?: string; rating?: number };
  jobId?: string;
  proposalId?: string;
  offerType: 'direct' | 'proposal';
  title: string;
  description: string;
  paymentType: 'fixed' | 'fixed_with_milestones' | 'hourly';
  budget?: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD' | 'JPY' | 'AED' | 'CHF';
  hourlyRate?: number;
  estimatedHoursPerWeek?: number;
  milestones?: OfferMilestone[];
  expectedStartDate: string;
  expectedEndDate: string;
  communication: {
    preferredMethod: 'chat' | 'video_call' | 'email' | 'mixed';
    meetingFrequency?: 'daily' | 'weekly' | 'monthly';
    meetingDayOfWeek?: string;
    meetingDayOfMonth?: number;
    meetingTimeUtc?: string;
  };
  reporting: {
    frequency: 'daily' | 'weekly' | 'monthly';
    dueTimeUtc: string;
    dueDayOfWeek?: string;
    dueDayOfMonth?: number;
    format: 'text_with_attachments' | 'text_only' | 'video';
  };
  referenceFiles: OfferReferenceFile[];
  referenceLinks: OfferReferenceLink[];
  expiresAt: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn' | 'expired';
  timeline: OfferTimelineEvent[];
  client: ClientInfo;
  jobTitle?: string;
}

function OfferDetails() {
  const [offerDetail, setOfferDetail] = useState<OfferDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // No accept/reject modals for client detail; withdraw only
  const params = useParams();
  const offerId = params.offerId;
  const router = useRouter();
  const handleGoBack = () => {
    console.log('Navigate back to offers list');
  };

  const handleViewClientProfile = () => {
    console.log('Navigate to client profile');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      INR: '₹',
      USD: '$',
      EUR: '€',
      GBP: '£',
    };
    return `${symbols[currency] || currency}${amount.toLocaleString()}`;
  };

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

  const calculateTotalMilestones = () => (
    offerDetail?.milestones?.reduce((sum, m) => sum + m.amount, 0) || 0
  );

  const getDaysUntilExpiry = () => {
    if (!offerDetail?.expiresAt) return 0;
    const now = new Date();
    const expiry = new Date(offerDetail.expiresAt);
    const diffTime = expiry.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await clientActionApi.getOfferDetail(String(offerId));
        if (cancelled) return;
        if (resp?.success && resp.data) {
          const d = resp.data;
          const mapped: OfferDetail = {
            id: d.offerId,
            clientId: d.clientId ?? '',
            freelancerId: d.freelancer?.freelancerId ?? d.freelancerId ?? '',
            freelancer: d.freelancer ? { freelancerId: d.freelancer.freelancerId, firstName: d.freelancer.firstName, lastName: d.freelancer.lastName, logo: d.freelancer.logo, country: d.freelancer.country, rating: d.freelancer.rating } : undefined,
            jobId: d.jobId,
            proposalId: d.proposalId,
            offerType: d.offerType ?? 'direct',
            title: d.title,
            description: d.description ?? '',
            paymentType: d.paymentType,
            budget: d.budget,
            currency: d.currency ?? 'USD',
            hourlyRate: d.hourlyRate,
            estimatedHoursPerWeek: d.estimatedHoursPerWeek,
            milestones: Array.isArray(d.milestones) ? d.milestones.map((m: any) => ({ title: m.title, amount: m.amount, expectedDelivery: m.expectedDelivery })) : [],
            expectedStartDate: d.expectedStartDate ?? '',
            expectedEndDate: d.expectedEndDate ?? '',
            communication: d.communication ? {
              preferredMethod: d.communication.preferredMethod,
              meetingFrequency: d.communication.meetingFrequency,
              meetingDayOfWeek: d.communication.meetingDayOfWeek,
              meetingDayOfMonth: d.communication.meetingDayOfMonth,
              meetingTimeUtc: d.communication.meetingTimeUtc,
            } : { preferredMethod: 'chat' },
            reporting: d.reporting ? {
              frequency: d.reporting.frequency,
              dueTimeUtc: d.reporting.dueTimeUtc,
              dueDayOfWeek: d.reporting.dueDayOfWeek,
              dueDayOfMonth: d.reporting.dueDayOfMonth,
              format: d.reporting.format,
            } : { frequency: 'weekly', dueTimeUtc: '', format: 'text_only' },
            referenceFiles: Array.isArray(d.referenceFiles) ? d.referenceFiles.map((f: any) => ({ fileName: f.fileName, fileUrl: f.fileUrl })) : [],
            referenceLinks: Array.isArray(d.referenceLinks) ? d.referenceLinks.map((l: any) => ({ description: l.description, link: l.link })) : [],
            expiresAt: d.expiresAt,
            status: d.status,
            timeline: Array.isArray(d.timeline) ? d.timeline.map((t: any) => ({ status: t.status, at: t.at, note: t.note })) : [],
            client: { companyName: d.clientCompanyName ?? d.client?.companyName ?? '', rating: d.client?.rating ?? 0, country: d.client?.country ?? '', totalJobsPosted: d.clientTotalJobsPosted ?? d.client?.totalJobsPosted ?? 0 },
            jobTitle: d.jobTitle,
          };
      
          setOfferDetail(mapped);
        } else {
          setError(resp?.message || 'Failed to load offer');
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Unexpected error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [offerId]);

  return (
    <>
      <OfferHeader onGoBack={handleGoBack} />
      {loading && <div className="max-w-7xl mx-auto px-6 py-8">Loading offer...</div>}
      {error && !loading && <div className="max-w-7xl mx-auto px-6 py-8 text-red-600">{error}</div>}
      {!loading && !error && offerDetail && (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <OfferTitleCard
              title={offerDetail.title}
              offerType={offerDetail.offerType}
              status={offerDetail.status}
              jobTitle={offerDetail.jobTitle}
              proposalId={offerDetail.proposalId}
            />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <OfferMetrics
                startDate={offerDetail.expectedStartDate}
                endDate={offerDetail.expectedEndDate}
                paymentType={offerDetail.paymentType}
                daysUntilExpiry={getDaysUntilExpiry()}
                formatDate={formatDate}
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <OfferBudget
                paymentType={offerDetail.paymentType}
                hourlyRate={offerDetail.hourlyRate}
                estimatedHoursPerWeek={offerDetail.estimatedHoursPerWeek}
                budget={offerDetail.budget}
                totalMilestones={calculateTotalMilestones()}
                currency={offerDetail.currency}
                formatCurrency={formatCurrency}
              />
            </div>

            <OfferDescription description={offerDetail.description} />

            <OfferMilestones
              milestones={offerDetail.milestones || []}
              currency={offerDetail.currency}
              formatDate={formatDate}
              formatCurrency={formatCurrency}
            />

            <OfferCommunication
              communication={offerDetail.communication}
              reporting={offerDetail.reporting}
              getCommunicationIcon={getCommunicationIcon}
            />

            <OfferReferences
              referenceFiles={offerDetail.referenceFiles}
              referenceLinks={offerDetail.referenceLinks}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white rounded-xl shadow p-4 border">
                <div className="flex items-center gap-4">
                  <img src={offerDetail.freelancer?.logo ?? '/images/default-avatar.png'} alt="freelancer logo" className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <div className="text-lg font-semibold">{(offerDetail.freelancer?.firstName || '') + ' ' + (offerDetail.freelancer?.lastName || '')}</div>
                    <div className="text-sm text-gray-500">{offerDetail.freelancer?.country ?? '-'}</div>
                    <div className="text-sm text-yellow-600">Rating: {offerDetail.freelancer?.rating ?? '—'}</div>
                    <a onClick={() => router.push(`/client/freelancers/${offerDetail?.freelancer?.freelancerId}/profile`)} className="text-sm text-blue-600 underline mt-1 block">View full profile</a>
                  </div>
                </div>
                <div className="mt-4">
                  <button onClick={() => {
                    // withdraw action (demo): update local status
                    setOfferDetail(prev => prev ? { ...prev, status: 'withdrawn' } : prev);
                  }} className="w-full px-4 py-2 bg-yellow-500 text-white rounded">Withdraw Offer</button>
                </div>
              </div>

              <OfferTimeline
                timeline={offerDetail.timeline}
                formatDate={formatDate}
              />
            </div>
          </div>
        </div>
      </div>
      )}

      {/* No accept/reject modals for client view; withdraw is handled inline above */}
    </>
  );
}

export default OfferDetails;
