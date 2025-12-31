
import 'reflect-metadata';
import cron from 'node-cron';
import { container } from 'tsyringe';
import '../config/container';
import { IClientContractService } from '../services/clientServices/interfaces/client-contract-service.interface';

const clientContractService = container.resolve<IClientContractService>('IClientContractService');


async function runAutoApprove() {
      console.log('Running auto-approval cron...');
  try {
    await clientContractService.autoApprovePendingDeliverables();
    console.log('Auto-approval cron finished.');
  } catch (err) {
    console.error('Auto-approval cron failed:', err);
  }
}
cron.schedule('0 * * * *', async () => {
await runAutoApprove();
});
