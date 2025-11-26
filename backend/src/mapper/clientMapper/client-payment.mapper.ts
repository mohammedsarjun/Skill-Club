import { IPayment } from '../../models/interfaces/payment.model.interface';
import { PaymentResponseDTO } from '../../dto/clientDTO/client-payment.dto';

export const mapPaymentToResponseDTO = (payment: IPayment, payuConfig: PaymentResponseDTO['payuConfig'], payuUrl: string): PaymentResponseDTO => {
  return {
    paymentId: payment.paymentId,
    gatewayOrderId: payment.gatewayOrderId || '',
    amount: payment.amount,
    amountBaseUSD: payment.amountBaseUSD,
    currency: payment.currency,
    conversionRate: payment.conversionRate,
    payuConfig,
    payuUrl,
  };
};
