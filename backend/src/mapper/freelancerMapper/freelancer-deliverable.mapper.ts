import { ContractDeliverable } from '../../models/interfaces/contract.model.interface';
import { DeliverableResponseDTO } from '../../dto/freelancerDTO/freelancer-deliverable.dto';

export class FreelancerDeliverableMapper {
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
