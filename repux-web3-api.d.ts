import BigNumber from 'bignumber.js';

export enum DataProductUpdateAction {
  CREATE = '0',
  UPDATE = '1',
  DELETE = '2',
  PURCHASE = '3',
  CANCEL_PURCHASE = '4',
  FINALISE = '5',
  RATE = '6',
  CANCEL_RATING = '7'
}

export interface DataProductEvent {
  dataProductAddress: string;
  userAddress: string;
  dataProductUpdateAction: DataProductUpdateAction;
  blockNumber: number;
}

export interface TransactionResult {
  address: string;
  blockNumber: string;
  blockHash: string;
  status: string;
}

export interface DataProductTransaction {
  publicKey: string;
  buyerMetaHash: string;
  price: BigNumber;
  purchased: boolean;
  finalised: boolean;
  rated: boolean;
  rating: BigNumber;
}

export interface DataProduct {
  address: string;
  owner: string;
  price: BigNumber;
  sellerMetaHash: string;
  totalRating: BigNumber;
  buyersDeposit: BigNumber;
  fundsAccumulated: BigNumber;
  disabled: boolean;
}

export interface ContractEvent {
  stopWatching(): void;
}

export default class RepuxWeb3Api {
  private web3;
  private registryContractAddress;
  private demoTokenContractAddress;
  private provider;
  private registry;
  private token;

  /**
   * @param {Web3} web3 - Web3 instance
   * @param {Object} contracts
   */
  constructor(web3?: any, contracts?: any);

  /**
   * Return API version
   * @returns {string} API version
   */
  getVersion(): string;

  /**
   * Sets up contracts
   * @returns {Promise<any>}
   */
  init(): Promise<any>;
  
  /**
   * Returns default account
   * @returns {Promise<string>} Default account
   */
  getDefaultAccount(): Promise<string>;

  /**
   * Return account balance value
   * @param {string} [account=web3.eth.defaultAccount] - Account address
   * @returns {Promise<BigNumber>} Balance value
   */
  getBalance(account?: string): Promise<BigNumber>;

  /**
   * Returns network Id
   * @returns {Promise<number>}
   */
  getNetworkId(): Promise<number>;

  /**
   * Creates product contract
   * @param metaFileHash
   * @param price
   * @param daysForDeliver
   * @param account
   */
  createDataProduct(metaFileHash: string, price: BigNumber, daysForDeliver: number, account?: string): Promise<TransactionResult>;

  /**
   * Watches for DataProductUpdate events on blockchain
   * @param config
   * @param callback
   */
  watchForDataProductUpdate(config: { fromBlock: number, toBlock: number | string }, callback: (DataProductEvent) => void): Promise<ContractEvent>;

  /**
   * Returns DataProduct data
   * @param dataProductAddress
   */
  getDataProduct(dataProductAddress: string): Promise<DataProduct>

  /**
   * Purchases DataProduct
   * @param dataProductAddress
   * @param publicKey
   * @param account
   */
  purchaseDataProduct(dataProductAddress: string, publicKey: string, account?: string): Promise<TransactionResult>

  /** @deprecated use approveDataProductPurchase() */
  approveDataProductPurchase(dataProductAddress: string, buyerAddress: string, buyerMetaHash: string, account?: string): Promise<TransactionResult>

  /**
   * Finalises DataProduct purchase
   * @param {string} dataProductAddress
   * @param {string} buyerAddress
   * @param {string} buyerMetaHash
   * @param {string} account
   */
  finaliseDataProductPurchase(dataProductAddress: string, buyerAddress: string, buyerMetaHash: string, account?: string): Promise<TransactionResult>

  /**
   * Returns products bought by provided account
   * @param account
   */
  getBoughtDataProducts(account?: string): Promise<string[]>

  /** @deprecated use getBoughtAndFinalisedDataProducts() */
  getBoughtAndApprovedDataProducts(account?: string): Promise<string[]>

  /**
   * Returns products bought by provided account and approved
   * @param account
   */
  getBoughtAndFinalisedDataProducts(account?: string): Promise<string[]>

  /**
   * Returns products created by provided account
   * @param account
   */
  getCreatedDataProducts(account?: string): Promise<string[]>

  /**
   * Returns transaction on DataProduct by buyerAddress
   * @param dataProductAddress
   * @param buyerAddress
   */
  getDataProductTransaction(dataProductAddress: string, buyerAddress: string): Promise<DataProductTransaction>

  /**
   * Disables Data Product
   * @param dataProductAddress
   * @param account
   */
  disableDataProduct(dataProductAddress: string, account?: string): Promise<TransactionResult>

  /**
   * Cancels Data Product purchase (works only after deliveryDeadline)
   * @param dataProductAddress
   * @param account
   */
  cancelDataProductPurchase(dataProductAddress: string, account?: string): Promise<TransactionResult>

  /**
   * Withdraws funds from data product to owner account
   * @param dataProductAddress
   * @param account
   */
  withdrawFundsFromDataProduct(dataProductAddress: string, account?: string): Promise<TransactionResult>
}
