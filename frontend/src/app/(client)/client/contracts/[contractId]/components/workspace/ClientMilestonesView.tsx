"use client";
import { useState } from 'react';
import { FaCheckCircle, FaClock, FaWallet, FaFile } from 'react-icons/fa';
import { IMilestoneDeliverable } from '@/types/interfaces/IContractWorkspace';

interface Milestone {
  milestoneId?: string;
  title: string;
  description: string;
  amount: number;
  status: 'pending' | 'funded' | 'submitted' | 'approved' | 'paid';
  deliverable?: IMilestoneDeliverable;
}

interface ClientMilestonesViewProps {
  contractId: string;
  milestones: Milestone[];
  currencySymbol: string;
  onApproveMilestone: (milestoneId: string) => Promise<void>;
}

export const ClientMilestonesView = ({
  contractId,
  milestones,
  currencySymbol,
  onApproveMilestone,
}: ClientMilestonesViewProps) => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Pending</span>;
      case 'funded':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Funded</span>;
      case 'submitted':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Awaiting Review</span>;
      case 'approved':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Approved</span>;
      case 'paid':
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Paid</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            onClick={() => milestone.deliverable && setSelectedMilestone(milestone)}
            className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all ${
              milestone.deliverable
                ? 'border-blue-200 hover:border-blue-400 cursor-pointer hover:shadow-lg'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
              {getStatusBadge(milestone.status)}
            </div>
            <p className="text-sm text-gray-600 mb-4">{milestone.description}</p>
            <div className="flex items-center gap-2 text-lg font-bold text-blue-600">
              <FaWallet />
              {currencySymbol}{milestone.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {selectedMilestone && selectedMilestone.deliverable && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMilestone.title}</h2>
              <p className="text-gray-600">{selectedMilestone.description}</p>
            </div>
            <button
              onClick={() => setSelectedMilestone(null)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Milestone Amount:</span>
            <span className="text-xl font-bold text-blue-600">
              {currencySymbol}{selectedMilestone.amount.toLocaleString()}
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Deliverable</h3>
              {getStatusBadge(selectedMilestone.status)}
            </div>
            {selectedMilestone.deliverable.deliverable && (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  Submitted on {new Date(selectedMilestone.deliverable.deliverable.submittedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>

                {selectedMilestone.deliverable.deliverable.message && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">Freelancer Note:</p>
                    <p className="text-gray-800">{selectedMilestone.deliverable.deliverable.message}</p>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Files:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMilestone.deliverable.deliverable.files.map((file: { fileName: string; fileUrl: string }, idx: number) => (
                      <a
                        key={idx}
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-sm transition-colors"
                      >
                        <FaFile className="text-blue-600" />
                        <span className="text-blue-800">{file.fileName}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}

            {selectedMilestone.status === 'submitted' && (
              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={() => selectedMilestone.milestoneId && onApproveMilestone(selectedMilestone.milestoneId)}
                  className="w-full px-6 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  <FaCheckCircle />
                  Approve & Release Payment ({currencySymbol}{selectedMilestone.amount.toLocaleString()})
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Payment will be released from escrow to the freelancer
                </p>
              </div>
            )}

            {selectedMilestone.status === 'approved' && (
              <div className="border-t border-gray-200 pt-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <FaCheckCircle className="inline-block text-green-600 text-2xl mb-2" />
                  <p className="text-green-800 font-medium">Milestone Approved</p>
                  <p className="text-sm text-green-600 mt-1">Payment has been released</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
