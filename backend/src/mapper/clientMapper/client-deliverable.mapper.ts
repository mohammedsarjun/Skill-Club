import { ContractDeliverable } from '../../models/interfaces/contract.model.interface';
import { DeliverableResponseDTO } from '../../dto/clientDTO/client-deliverable.dto';

export class ClientDeliverableMapper {
  static toDeliverableResponseDTO(deliverable: ContractDeliverable): DeliverableResponseDTO {
    return {
      id: deliverable._id?.toString() || '',
      submittedBy: deliverable.submittedBy.toString(),
      files: deliverable.files,
      message: deliverable.message,
      status: deliverable.status,
      version: deliverable.version,
      submittedAt: deliverable.submittedAt.toISOString(),
      approvedAt: deliverable.approvedAt?.toISOString(),
    };
  }
}
