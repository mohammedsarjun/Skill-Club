import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, StopCircle, Upload, X, FileText } from 'lucide-react';
import { freelancerActionApi } from '@/api/action/FreelancerActionApi';
import { uploadApi } from '@/api/uploadApi';
import Swal from 'sweetalert2';

type SessionState = 'idle' | 'active' | 'paused';

interface WorkLogTrackerProps {
  contractId: string;
}

export default function WorkLogTracker({ contractId }: WorkLogTrackerProps) {
  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [pausedTime, setPausedTime] = useState<number>(0);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [proofFiles, setProofFiles] = useState<File[]>([]);
  const [workDescription, setWorkDescription] = useState<string>('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionState === 'active' && startTime !== null) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime - pausedTime);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sessionState, startTime, pausedTime]);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleStart = (): void => {
    setStartTime(Date.now());
    setElapsedTime(0);
    setPausedTime(0);
    setSessionState('active');
  };

  const handlePause = (): void => {
    if (startTime !== null) {
      setSessionState('paused');
      setPausedTime(Date.now() - startTime - elapsedTime);
    }
  };

  const handleResume = (): void => {
    setSessionState('active');
    setStartTime(Date.now() - elapsedTime);
    setPausedTime(0);
  };

  const handleEndSession = (): void => {
    setShowSubmitModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setProofFiles(prev => [...prev, ...fileArray]);
    }
  };

  const removeFile = (index: number): void => {
    setProofFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitWork = async (): Promise<void> => {
    if (proofFiles.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No Files',
        text: 'Please upload at least one proof of work file',
      });
      return;
    }

    try {
      Swal.fire({
        title: 'Uploading files...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const uploadedFiles = [];
      for (const file of proofFiles) {
        const uploadResponse = await uploadApi.uploadFile(file, { 
          folder: 'worklogs',
          resourceType: 'auto'
        });
        uploadedFiles.push({
          fileName: file.name,
          fileUrl: uploadResponse.url,
        });
      }

      const worklogData = {
        contractId,
        duration: elapsedTime,
        files: uploadedFiles,
        description: workDescription || undefined,
      };

      const response = await freelancerActionApi.submitWorklog(worklogData);

      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Work log submitted successfully!',
        });

        setSessionState('idle');
        setStartTime(null);
        setElapsedTime(0);
        setPausedTime(0);
        setProofFiles([]);
        setWorkDescription('');
        setShowSubmitModal(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: response.message || 'Failed to submit work log',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  };

  const handleCancelSubmit = (): void => {
    setShowSubmitModal(false);
    setProofFiles([]);
    setWorkDescription('');
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Work Session Tracker</h1>
          <p className="text-gray-600">Track your freelance work hours</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Timer Display */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg mb-4">
              <div className="text-white">
                <Clock className="w-12 h-12 mx-auto mb-2" />
                <div className="text-4xl font-bold">{formatTime(elapsedTime)}</div>
              </div>
            </div>
            <div className="text-lg font-medium text-gray-700">
              {sessionState === 'idle' && 'Ready to start'}
              {sessionState === 'active' && 'Session in progress'}
              {sessionState === 'paused' && 'Session paused'}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            {sessionState === 'idle' && (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md"
              >
                <Play className="w-5 h-5" />
                Start Session
              </button>
            )}

            {sessionState === 'active' && (
              <>
                <button
                  onClick={handlePause}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md"
                >
                  <Pause className="w-5 h-5" />
                  Pause
                </button>
                <button
                  onClick={handleEndSession}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md"
                >
                  <StopCircle className="w-5 h-5" />
                  End Session
                </button>
              </>
            )}

            {sessionState === 'paused' && (
              <>
                <button
                  onClick={handleResume}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md"
                >
                  <Play className="w-5 h-5" />
                  Resume
                </button>
                <button
                  onClick={handleEndSession}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md"
                >
                  <StopCircle className="w-5 h-5" />
                  End Session
                </button>
              </>
            )}
          </div>
        </div>

        {/* Submit Work Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Proof of Work</h2>
              
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Session Duration</div>
                <div className="text-3xl font-bold text-blue-600">{formatTime(elapsedTime)}</div>
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Files <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">Screenshots, documents, or any proof files</p>
                  </label>
                </div>

                {/* Uploaded Files List */}
                {proofFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {proofFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700 truncate">{file.name}</span>
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Work Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Description <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  value={workDescription}
                  onChange={(e) => setWorkDescription(e.target.value)}
                  placeholder="Describe what you worked on during this session..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCancelSubmit}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitWork}
                  className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors shadow-md"
                >
                  Submit Work Log
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}