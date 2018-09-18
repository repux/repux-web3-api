import { TransactionLog } from './transaction-log';
import { TransactionStatus } from './transaction-status';

export interface TransactionReceipt {
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  blockNumber: number;
  gasUsed: number;
  cumulativeGasUsed: number;
  contractAddress: string | null;
  logs: TransactionLog[];
  status: TransactionStatus;
  logsBloom: string;
}
