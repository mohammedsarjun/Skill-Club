import { ClientMeetingProposalRequestDTO, ClientMeetingProposalResponseDTO } from '../../../dto/clientDTO/client-meeting.dto';

export interface IClientMeetingService {
  proposeMeeting(clientId: string, contractId: string, meetingData: ClientMeetingProposalRequestDTO): Promise<ClientMeetingProposalResponseDTO>;
  
}
