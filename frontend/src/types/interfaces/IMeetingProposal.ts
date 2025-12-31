export interface MeetingProposal {
  meetingDate: Date;
  meetingTime: {
    hour: number;
    minute: number;
    period: 'AM' | 'PM';
  };
  meetingLink?: string;
  meetingDateTimeISO: string;
  meetingDuration: number;
}

export interface MeetingProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (proposal: MeetingProposal) => void;
  contractId: string;
}
