export interface TransactionLog {
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  address: string;
  data: string;
  topics: string[];
  type: string;
}
