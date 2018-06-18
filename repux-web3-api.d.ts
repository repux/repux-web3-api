import BigNumber from 'bignumber.js';

export enum DataProductUpdateAction {
    CREATE = '0',
    UPDATE = '1',
    DELETE = '2',
    PURCHASE = '3',
    APPROVE = '4',
    RATE = '5',
    CANCEL_RATING = '6'
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
    approved: boolean;
    rated: boolean;
    rating: BigNumber;
}

export interface DataProduct {
    address: string;
    owner: string;
    price: BigNumber;
    sellerMetaHash: string;
    totalRating: BigNumber;
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
     * @param account
     */
    createDataProduct(metaFileHash: string, price: BigNumber, account: string): Promise<TransactionResult>;

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

    /**
     * Approves DataProduct purchase
     * @param {string} dataProductAddress
     * @param {string} buyerAddress
     * @param {string} buyerMetaHash
     * @param {string} account
     */
    approveDataProductPurchase(dataProductAddress: string, buyerAddress: string, buyerMetaHash: string, account?: string): Promise<TransactionResult>

    /**
     * Returns products bought by provided account
     * @param account
     */
    getBoughtDataProducts(account?: string): Promise<string[]>

    /**
     * Returns products bought by provided account and approved
     * @param account
     */
    getBoughtAndApprovedDataProducts(account?: string): Promise<string[]>

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
}
