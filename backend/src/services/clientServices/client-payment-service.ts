import { injectable, inject } from 'tsyringe';
import { Types } from 'mongoose';
import { IClientPaymentService } from './interfaces/client-payment-service.interface';
import {
  InitiatePaymentDTO,
  PaymentResponseDTO,
  PaymentCallbackDTO,
  PaymentVerificationDTO,
} from '../../dto/clientDTO/client-payment.dto';
import { IContractRepository } from '../../repositories/interfaces/contract-repository.interface';
import {
  IPaymentRepository,
  ITransactionRepository,
  IEscrowRepository,
} from '../../repositories/interfaces/payment-repository.interface';
import { PayUService } from '../../utils/payu.service';
import AppError from '../../utils/app-error';
import { HttpStatus } from '../../enums/http-status.enum';
import { mapPaymentToResponseDTO } from '../../mapper/clientMapper/client-payment.mapper';

@injectable()
export class ClientPaymentService implements IClientPaymentService {
  constructor(
    @inject('IContractRepository') private contractRepository: IContractRepository,
    @inject('IPaymentRepository') private paymentRepository: IPaymentRepository,
    @inject('ITransactionRepository') private transactionRepository: ITransactionRepository,
    @inject('IEscrowRepository') private escrowRepository: IEscrowRepository,
    private payuService: PayUService,
  ) {}

  async initiatePayment(clientId: string, data: InitiatePaymentDTO): Promise<PaymentResponseDTO> {
    const contract = await this.contractRepository.findById(data.contractId);

    if (!contract) {
      throw new AppError('Contract not found', HttpStatus.NOT_FOUND);
    }

    if (contract.clientId.toString() !== clientId) {
      throw new AppError('Unauthorized to fund this contract', HttpStatus.FORBIDDEN);
    }

    if (contract.status !== 'pending_funding') {
      throw new AppError('Contract is not in pending_funding state', HttpStatus.BAD_REQUEST);
    }

    let expectedAmount = 0;

    if (contract.paymentType === 'fixed' || contract.paymentType === 'fixed_with_milestones') {
      if (!contract.budget) {
        throw new AppError('Contract budget not defined', HttpStatus.BAD_REQUEST);
      }
      expectedAmount = contract.budget;
    } else if (contract.paymentType === 'hourly') {
      if (!contract.hourlyRate || !contract.estimatedHoursPerWeek) {
        throw new AppError(
          'Contract hourly rate or estimated hours not defined',
          HttpStatus.BAD_REQUEST,
        );
      }
      expectedAmount = contract.hourlyRate * contract.estimatedHoursPerWeek;
    }

    if (Math.abs(data.amount - expectedAmount) > 0.01) {
      throw new AppError(
        `Invalid payment amount. Expected: ${expectedAmount}, Received: ${data.amount}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const gatewayOrderId = `ORD_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const { getUsdRateFor } = await import('../../utils/currency.util');
    const conversionRate = await getUsdRateFor(data.currency);
    const amountBaseUSD = data.amount * conversionRate;

    const payment = await this.paymentRepository.createPayment({
      contractId: contract._id as Types.ObjectId,
      clientId: new Types.ObjectId(clientId),
      freelancerId: contract.freelancerId as Types.ObjectId,
      amount: data.amount,
      amountBaseUSD,
      currency: data.currency,
      conversionRate,
      gateway: 'payu',
      purpose: data.purpose,
      status: 'pending',
      gatewayOrderId,
    });

    console.log('Client provided return/cancel URLs:', data.returnUrl, data.cancelUrl);


    // Resolve backend base URL for PayU callbacks. Default to localhost:5000 when env not provided.
    const backendBaseRaw = process.env.BACKEND_URL || process.env.API_URL || `http://localhost:${process.env.PORT || 5000}`;
    const backendBase = String(backendBaseRaw || `http://localhost:${process.env.PORT || 5000}`);
    const callbackEndpoint = `${backendBase.replace(/\/$/, '')}/api/client/payments/callback`;

    const payuConfig = {
      key: this.payuService.getMerchantKey(),
      txnid: payment.paymentId,
      amount: payment.amount.toString(),
      productinfo: `${contract.paymentType} contract funding`,
      firstname: 'Client',
      email: 'client@example.com',
      phone: '9999999999',
      // PayU uses `surl` and `furl` to POST callback data back to our server.
      // Force these to our backend callback endpoint to ensure the controller is invoked.
      // surl: callbackEndpoint,
      // furl: callbackEndpoint,
      //       // FRONTEND redirects
      surl: callbackEndpoint,
      furl: callbackEndpoint,
      notify_url: callbackEndpoint,
      hash: '',
      udf1: contract?._id?.toString() as string,
      udf2: '',
      udf3: '',
      udf4: '',
      udf5: '',
    };

    const hashParams = {
      key: payuConfig.key,
      txnid: payuConfig.txnid,
      amount: payuConfig.amount,
      productinfo: payuConfig.productinfo,
      firstname: payuConfig.firstname,
      email: payuConfig.email,
      udf1: payuConfig.udf1,
      udf2: payuConfig.udf2,
      udf3: payuConfig.udf3,
      udf4: payuConfig.udf4,
      udf5: payuConfig.udf5,
      udf6: '',
      udf7: '',
      udf8: '',
      udf9: '',
      udf10: '',
    };

    payuConfig.hash = this.payuService.generateHash(hashParams);
    return mapPaymentToResponseDTO(payment, payuConfig, this.payuService.getPayUUrl());
  }

  async handlePaymentCallback(data: PaymentCallbackDTO): Promise<PaymentVerificationDTO> {
    console.log('Processing payment callback:', {
      status: data.status,
      txnid: data.txnid,
      mihpayid: data.mihpayid,
      amount: data.amount,
      udf1: data.udf1,
    });

    if (!data.status || !data.txnid || !data.mihpayid) {
      console.error('Invalid callback data - missing required fields');
      throw new AppError('Invalid payment callback data', HttpStatus.BAD_REQUEST);
    }

    console.log('Verifying payment hash...');
    console.log('Verifying payment hash...');

    // Ensure required fields for hash verification are present (PayU sends these)
    if (!data.key || !data.amount || !data.productinfo || !data.firstname || !data.email || !data.hash) {
      console.error('Invalid callback data - missing hash verification fields');
      throw new AppError('Invalid payment callback data (missing verification fields)', HttpStatus.BAD_REQUEST);
    }

    const isValid = this.payuService.verifyHash({
      status: data.status,
      key: data.key,
      txnid: data.txnid,
      amount: data.amount,
      productinfo: data.productinfo,
      firstname: data.firstname,
      email: data.email,
      udf1: data.udf1,
      udf2: data.udf2,
      udf3: data.udf3,
      udf4: data.udf4,
      udf5: data.udf5,
      hash: data.hash,
    });

    if (!isValid) {
      console.error('Hash verification failed - potential fraud attempt');
      throw new AppError('Invalid payment hash', HttpStatus.BAD_REQUEST);
    }

    console.log('Hash verified successfully');
    console.log('Looking up payment with txnid:', data.txnid);

    const payment = await this.paymentRepository.findByPaymentId(data.txnid);

    if (!payment) {
      console.error('Payment not found for txnid:', data.txnid);
      throw new AppError('Payment not found', HttpStatus.NOT_FOUND);
    }

    console.log('Payment found:', {
      paymentId: payment.paymentId,
      contractId: payment.contractId.toString(),
      currentStatus: payment.status,
    });

    // Determine payment status from PayU response
    const paymentStatus = data.status === 'success' ? 'success' : 'failed';

    console.log('Updating payment status to:', paymentStatus);

    // Update payment record with callback data
    await this.paymentRepository.updatePaymentStatus(
      payment.paymentId,
      paymentStatus,
      data as unknown as Record<string, unknown>,
      data.mihpayid,
    );

    // Only create transaction/escrow and activate contract on SUCCESS
    if (paymentStatus === 'success') {
      console.log('Payment successful - activating contract and creating records');

      await this.contractRepository.updateStatusById(payment.contractId.toString(), 'active');
      console.log('Contract activated');

      let transactionPurpose: 'contract_funding' | 'milestone_funding' | 'hourly_advance' =
        'contract_funding';
      if (payment.purpose === 'milestone_funding') {
        transactionPurpose = 'milestone_funding';
      } else if (payment.purpose === 'hourly_advance') {
        transactionPurpose = 'hourly_advance';
      }

      await this.transactionRepository.createTransaction({
        contractId: payment.contractId as Types.ObjectId,
        fromUserId: payment.clientId as Types.ObjectId,
        toUserId: payment.freelancerId as Types.ObjectId,
        type: 'debit',
        purpose: transactionPurpose,
        amount: payment.amount,
        amountBaseUSD: payment.amountBaseUSD,
        currency: payment.currency,
        conversionRate: payment.conversionRate,
        description: `${payment.purpose} for contract`,
      });
      console.log('Transaction created');

      await this.escrowRepository.createEscrow({
        contractId: payment.contractId as Types.ObjectId,
        paymentId: payment._id as Types.ObjectId,
        clientId: payment.clientId as Types.ObjectId,
        freelancerId: payment.freelancerId as Types.ObjectId,
        amount: payment.amount,
        amountBaseUSD: payment.amountBaseUSD,
        currency: payment.currency,
        conversionRate: payment.conversionRate,
        status: 'held',
        description: `Escrow for ${payment.purpose}`,
      });
      console.log('Escrow created');
    } else {
      console.log('Payment failed - skipping transaction/escrow creation');
    }

    const result: PaymentVerificationDTO = {
      paymentId: payment.paymentId,
      status: paymentStatus,
      gatewayTransactionId: data.mihpayid,
      contractId: payment.contractId.toString(),
    };

    console.log('Payment callback processed successfully:', result);

    return result;
  }
}
