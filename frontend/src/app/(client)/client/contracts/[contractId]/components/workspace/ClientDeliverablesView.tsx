"use client";
import { useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaClock, FaFile } from 'react-icons/fa';
import { IDeliverable } from '@/types/interfaces/IContractWorkspace';

interface ClientDeliverablesViewProps {
  contractId: string;
  deliverables: IDeliverable[];
  onApproveDeliverable: (deliverableId: string) => Promise<void>;
  onRequestChanges: (deliverableId: string, note: string) => Promise<void>;
}

export const ClientDeliverablesView = ({
  contractId,
  deliverables,
  onApproveDeliverable,
  onRequestChanges,
}: ClientDeliverablesViewProps) => {
  const [revisionNote, setRevisionNote] = useState('');
  const [selectedDeliverableId, setSelectedDeliverableId] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <FaClock className="text-xs" />
            Awaiting Review
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="text-xs" />
            Approved
          </span>
        );
      case 'changes_requested':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
            <FaExclamationCircle className="text-xs" />
            Changes Requested
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {deliverables.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FaFile className="mx-auto text-5xl text-gray-300 mb-3" />
          <p className="text-gray-500">No deliverables submitted yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {deliverables.map((deliverable, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusBadge(deliverable.status)}
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    v{deliverable.version}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Submitted on {new Date(deliverable.submittedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  {deliverable.approvedAt && (
                    <p className="text-sm text-green-600 mt-1">
                      Approved on {new Date(deliverable.approvedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {deliverable.message && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Freelancer Note:</p>
                  <p className="text-gray-800">{deliverable.message}</p>
                </div>
              )}

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Files:</p>
                <div className="flex flex-wrap gap-2">
                  {deliverable.files.map((file, idx) => (
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

              {deliverable.status === 'submitted' && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  {selectedDeliverableId === deliverable.deliverableId ? (
                    <div className="space-y-3">
                      <textarea
                        value={revisionNote}
                        onChange={(e) => setRevisionNote(e.target.value)}
                        placeholder="Explain what changes are needed..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={async () => {
                            if (deliverable.deliverableId && revisionNote.trim()) {
                              await onRequestChanges(deliverable.deliverableId, revisionNote);
                              setRevisionNote('');
                              setSelectedDeliverableId(null);
                            }
                          }}
                          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          Submit Request
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDeliverableId(null);
                            setRevisionNote('');
                          }}
                          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => deliverable.deliverableId && onApproveDeliverable(deliverable.deliverableId)}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <FaCheckCircle />
                        Approve Deliverable
                      </button>
                      <button
                        onClick={() => setSelectedDeliverableId(deliverable.deliverableId || null)}
                        className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center gap-2"
                      >
                        <FaExclamationCircle />
                        Request Changes
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
