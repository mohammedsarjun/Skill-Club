import { Calendar } from "lucide-react";

interface ActionButtonsProps {
  contractType: 'fixed' | 'hourly' | 'fixed_with_milestones';
  status: 'pending_funding' | 'active' | 'completed' | 'cancelled' | 'refunded';
  onFundContract: () => void;
  onCancelContract: () => void;
  onScheduleMeeting?: () => void;
  isProcessing?: boolean;
  canCancel?: boolean;
}

export const ActionButtons = ({ contractType,status, onFundContract, onCancelContract, onScheduleMeeting, isProcessing, canCancel }: ActionButtonsProps) => {

  console.log(contractType)
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
      <div className="space-y-3">
        {(status === 'pending_funding'  || contractType == 'fixed_with_milestones') && (
          <button
            onClick={onFundContract}
            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Fund Contract
          </button>
        )}
        
        {(status === 'active' || status === 'pending_funding') && onScheduleMeeting && (
          <button
            onClick={onScheduleMeeting}
            className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Schedule Meeting
          </button>
        )}
        {canCancel && (
        <button
          onClick={onCancelContract}
          disabled={isProcessing}
          className={`w-full px-4 py-3 text-white rounded-lg transition-colors font-medium ${isProcessing ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
        >
          {isProcessing ? 'Cancelling...' : 'Cancel Contract'}
        </button>)}
      </div>
    </div>
  );
};
