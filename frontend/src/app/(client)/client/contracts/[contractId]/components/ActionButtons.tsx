interface ActionButtonsProps {
  status: 'pending_funding' | 'active' | 'completed' | 'cancelled' | 'refunded';
  onFundContract: () => void;
  onCancelContract: () => void;
  isProcessing?: boolean;
}

export const ActionButtons = ({ status, onFundContract, onCancelContract, isProcessing }: ActionButtonsProps) => {
  if (status !== 'pending_funding') return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
      <div className="space-y-3">
        <button
          onClick={onFundContract}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Fund Contract
        </button>
        <button
          onClick={onCancelContract}
          disabled={isProcessing}
          className={`w-full px-4 py-3 text-white rounded-lg transition-colors font-medium ${isProcessing ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
        >
          {isProcessing ? 'Cancelling...' : 'Cancel Contract'}
        </button>
      </div>
    </div>
  );
};
