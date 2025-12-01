"use client";
import { useState, useCallback, useEffect } from 'react';
import { FaClock, FaPlay, FaPause, FaPlus, FaCheckCircle, FaTrash } from 'react-icons/fa';
import { IHourLog, ITimesheet } from '@/types/interfaces/IContractWorkspace';

interface TimesheetWorkspaceProps {
  contractId: string;
  hourlyRate: number;
  currency: string;
  timesheets: ITimesheet[];
  onSubmitTimesheet: (logs: IHourLog[]) => Promise<void>;
  onSubmitHourLog: (log: IHourLog) => Promise<void>;
}

export const TimesheetWorkspace = ({
  contractId,
  hourlyRate,
  currency,
  timesheets,
  onSubmitTimesheet,
  onSubmitHourLog,
}: TimesheetWorkspaceProps) => {
  const [currentLogs, setCurrentLogs] = useState<IHourLog[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerStartTime, setTimerStartTime] = useState<Date | null>(null);
  const [manualDate, setManualDate] = useState(new Date().toISOString().split('T')[0]);
  const [manualHours, setManualHours] = useState('');
  const [manualDescription, setManualDescription] = useState('');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = useCallback(() => {
    setIsTimerRunning(true);
    setTimerStartTime(new Date());
  }, []);

  const handleStopTimer = useCallback(() => {
    setIsTimerRunning(false);
    const hours = timerSeconds / 3600;
    if (hours > 0) {
      const newLog: IHourLog = {
        date: new Date().toISOString(),
        hours: parseFloat(hours.toFixed(2)),
        description: 'Timer session',
      };
      setCurrentLogs((prev) => [...prev, newLog]);
    }
    setTimerSeconds(0);
    setTimerStartTime(null);
  }, [timerSeconds]);

  const handleAddManualLog = useCallback(() => {
    if (!manualHours || parseFloat(manualHours) <= 0) return;
    const newLog: IHourLog = {
      date: manualDate,
      hours: parseFloat(manualHours),
      description: manualDescription || 'Manual entry',
    };
    setCurrentLogs((prev) => [...prev, newLog]);
    setManualHours('');
    setManualDescription('');
  }, [manualDate, manualHours, manualDescription]);

  const removeLog = useCallback((index: number) => {
    setCurrentLogs((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (currentLogs.length === 0) return;
    try {
      await onSubmitTimesheet(currentLogs);
      setCurrentLogs([]);
    } catch (error) {
      console.error('Failed to submit timesheet', error);
    }
  }, [currentLogs, onSubmitTimesheet]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(amount);
  };

  const totalHours = currentLogs.reduce((sum, log) => sum + log.hours, 0);
  const totalAmount = totalHours * hourlyRate;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaClock className="text-blue-600" />
            Timer
          </h3>
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-6 font-mono">{formatTime(timerSeconds)}</div>
            <button
              onClick={isTimerRunning ? handleStopTimer : handleStartTimer}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                isTimerRunning
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isTimerRunning ? (
                <span className="flex items-center gap-2">
                  <FaPause />
                  Stop Timer
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FaPlay />
                  Start Timer
                </span>
              )}
            </button>
            {isTimerRunning && timerStartTime && (
              <p className="text-sm text-gray-500 mt-3">
                Started at {timerStartTime.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaPlus className="text-green-600" />
            Manual Entry
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={manualDate}
                onChange={(e) => setManualDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hours</label>
              <input
                type="number"
                step="0.25"
                min="0"
                value={manualHours}
                onChange={(e) => setManualHours(e.target.value)}
                placeholder="e.g., 2.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                value={manualDescription}
                onChange={(e) => setManualDescription(e.target.value)}
                placeholder="What did you work on?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleAddManualLog}
              disabled={!manualHours || parseFloat(manualHours) <= 0}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Add Entry
            </button>
          </div>
        </div>
      </div>

      {currentLogs.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Week Logs</h3>
          <div className="space-y-2 mb-4">
            {currentLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(log.date).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-600">{log.description}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-900">{log.hours}h</span>
                  <span className="text-sm text-gray-600">{formatCurrency(log.hours * hourlyRate)}</span>
                  <button onClick={() => removeLog(index)} className="text-red-500 hover:text-red-700">
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">{totalHours.toFixed(2)}h</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Submit Timesheet
          </button>
        </div>
      )}

      {timesheets.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Timesheets</h3>
          <div className="space-y-3">
            {timesheets.map((timesheet, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(timesheet.weekStart).toLocaleDateString()} - {new Date(timesheet.weekEnd).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      timesheet.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : timesheet.status === 'paid'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {timesheet.status === 'approved' && <FaCheckCircle className="text-xs" />}
                    {timesheet.status.charAt(0).toUpperCase() + timesheet.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{timesheet.totalHours}h logged</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(timesheet.totalAmount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
