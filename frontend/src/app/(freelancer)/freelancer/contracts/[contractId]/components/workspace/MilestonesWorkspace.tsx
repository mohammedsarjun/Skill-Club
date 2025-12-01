"use client";
import { useState, useCallback } from 'react';
import { FaCheckCircle, FaClock, FaLock, FaUpload, FaFile, FaTrash, FaChevronRight } from 'react-icons/fa';
import { IMilestoneDeliverable } from '@/types/interfaces/IContractWorkspace';
import { uploadApi } from '@/api/uploadApi';

interface MilestonesWorkspaceProps {
  contractId: string;
  milestones: IMilestoneDeliverable[];
  currency: string;
  onSubmitMilestone: (milestoneId: string, files: { fileName: string; fileUrl: string }[], message: string) => Promise<void>;
}

export const MilestonesWorkspace = ({
  contractId,
  milestones,
  currency,
  onSubmitMilestone,
}: MilestonesWorkspaceProps) => {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedMilestone || files.length === 0) return;
    setUploading(true);
    try {
      const uploadedFiles = await Promise.all(
        files.map((file) =>
          uploadApi.uploadFile(file, {
            folder: `contracts/${contractId}/milestones`,
            resourceType: 'auto',
          })
        )
      );
      const fileData = uploadedFiles.map((uploaded, idx) => ({
        fileName: files[idx].name,
        fileUrl: uploaded.url,
      }));
      await onSubmitMilestone(selectedMilestone, fileData, message);
      setFiles([]);
      setMessage('');
      setSelectedMilestone(null);
    } catch (error) {
      console.error('Failed to submit milestone', error);
    } finally {
      setUploading(false);
    }
  }, [selectedMilestone, files, message, contractId, onSubmitMilestone]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            <FaLock className="text-xs" />
            Pending
          </span>
        );
      case 'funded':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <FaClock className="text-xs" />
            Funded
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <FaClock className="text-xs" />
            Submitted
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="text-xs" />
            Approved
          </span>
        );
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="text-xs" />
            Paid
          </span>
        );
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(amount);
  };

  const selectedMilestoneData = milestones.find((m) => m.milestoneId === selectedMilestone);

  return (
    <div className="space-y-6">
      {!selectedMilestone ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.milestoneId}
              className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all cursor-pointer ${
                milestone.status === 'funded' || milestone.status === 'submitted'
                  ? 'border-blue-200 hover:border-blue-400 hover:shadow-md'
                  : milestone.status === 'approved' || milestone.status === 'paid'
                  ? 'border-green-200 hover:border-green-400'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                if (milestone.status === 'funded' || milestone.status === 'submitted') {
                  setSelectedMilestone(milestone.milestoneId);
                }
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 flex-1">{milestone.title}</h3>
                {getStatusBadge(milestone.status)}
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(milestone.amount)}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Due: {new Date(milestone.expectedDelivery).toLocaleDateString()}
                  </p>
                </div>
                {(milestone.status === 'funded' || milestone.status === 'submitted') && (
                  <FaChevronRight className="text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <button
            onClick={() => {
              setSelectedMilestone(null);
              setFiles([]);
              setMessage('');
            }}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            ← Back to Milestones
          </button>

          {selectedMilestoneData && (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMilestoneData.title}</h2>
                    <p className="text-gray-600 mt-1">
                      Due: {new Date(selectedMilestoneData.expectedDelivery).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(selectedMilestoneData.amount)}</p>
                    {getStatusBadge(selectedMilestoneData.status)}
                  </div>
                </div>
              </div>

              {selectedMilestoneData.deliverable && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Submitted Deliverable</h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusBadge(selectedMilestoneData.deliverable.status)}
                      <span className="text-sm text-gray-500">
                        {new Date(selectedMilestoneData.deliverable.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    {selectedMilestoneData.deliverable.message && (
                      <p className="text-gray-700 text-sm mb-3">{selectedMilestoneData.deliverable.message}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {selectedMilestoneData.deliverable.files.map((file, idx) => (
                        <a
                          key={idx}
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm"
                        >
                          <FaFile className="text-gray-500" />
                          <span className="text-gray-700">{file.fileName}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedMilestoneData.status === 'funded' && !selectedMilestoneData.deliverable && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Deliverable</h3>
                  
                  <div className="mb-4">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileInput}
                      className="hidden"
                      id="milestone-file-upload"
                    />
                    <label
                      htmlFor="milestone-file-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                    >
                      <FaUpload />
                      Choose Files
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FaFile className="text-gray-500" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                          </div>
                          <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Add a note about this milestone deliverable..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={files.length === 0 || uploading}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {uploading ? 'Submitting...' : 'Submit Milestone'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
