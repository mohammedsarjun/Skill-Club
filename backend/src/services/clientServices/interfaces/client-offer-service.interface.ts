import { ClientOfferRequestDTO, ClientOfferResponseDTO } from '../../../dto/clientDTO/client-offer.dto';

export interface IClientOfferService {
  createOffer(clientId: string, offerData: ClientOfferRequestDTO): Promise<ClientOfferResponseDTO>;
}
