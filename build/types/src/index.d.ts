import BigNumber from 'bignumber.js';
import { DataProductUpdateAction } from './data-product-update-action';
import { DataProductOrder } from './data-product-order';
import { DataProduct } from './data-product';
import { TransactionLog } from './transaction-log';
import { TransactionReceipt } from './transaction-receipt';
import { TransactionStatus } from './transaction-status';
export { DataProductUpdateAction, DataProductOrder, DataProduct, TransactionLog, TransactionReceipt, TransactionStatus };
export declare const PRODUCT_CREATION_GAS_LIMIT = 4000000;
export declare const PRODUCT_DELETION_GAS_LIMIT = 4000000;
export declare const PRODUCT_PURCHASE_GAS_LIMIT = 4000000;
export declare const PRODUCT_PURCHASE_APPROVE_GAS_LIMIT = 4000000;
export declare const PRODUCT_PURCHASE_CANCEL_GAS_LIMIT = 4000000;
export declare const PRODUCT_WITHDRAW_GAS_LIMIT = 4000000;
export declare const PRODUCT_PURCHASE_RATE_GAS_LIMIT = 4000000;
export declare const INIT_STATUS_INITIALIZED = 0;
export declare const INIT_STATUS_ALREADY_INITIALIZED = 1;
/**
 * Repux API
 */
export declare class RepuxWeb3Api {
    private readonly _registryContractAddress;
    private readonly _tokenContractAddress;
    private readonly _web3;
    private readonly _provider;
    private initialized;
    private _registry;
    private _token;
    /**
     * @param web3 - JavaScript Web3 API object (see: https://github.com/ethereum/web3.js/)
     * @param contracts - Addresses of Registry and Token contracts
     */
    constructor(web3: any, contracts: {
        REGISTRY_CONTRACT_ADDRESS: string;
        TOKEN_CONTRACT_ADDRESS: string;
    });
    /**
     * Returns API version
     * @return API version
     */
    static getVersion(): string;
    /**
     * Sets up contracts
     * @return INIT_STATUS_ALREADY_INITIALIZED if already initialized, INIT_STATUS_INITIALIZED otherwise
     */
    init(): Promise<number>;
    /**
     * Returns default account
     * @return default account address
     */
    getDefaultAccount(): Promise<string>;
    /**
     * Return account balance value
     * @param account - account address, default: RepuxWeb3Api#getDefaultAccount
     * @return specified account balance value
     */
    getBalance(account?: string): Promise<BigNumber>;
    /**
     * Returns network Id
     * @return current network ID
     */
    getNetworkId(): Promise<number>;
    /**
     * Creates product contract
     * @param metaFileHash - IPFS hash of meta file
     * @param price - product price
     * @param daysToDeliver - max days to finalise transaction
     * @param account - account address, default: RepuxWeb3Api#getDefaultAccount
     * @return Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)
     */
    createDataProduct(metaFileHash: string, price: BigNumber, daysToDeliver: number, account?: string): Promise<string>;
    /**
     * Returns DataProduct data
     * @param dataProductAddress - product address
     * @return DataProduct object
     */
    getDataProduct(dataProductAddress: string): Promise<DataProduct>;
    /**
     * Returns transaction on DataProduct by buyerAddress
     * @param dataProductAddress - product address
     * @param buyerAddress - buyer address
     * @return DataProductOrder object
     */
    getDataProductOrder(dataProductAddress: string, buyerAddress: string): Promise<DataProductOrder | undefined>;
    /**
     * Approves token transfer for DataProduct purchase
     * @param dataProductAddress - product address
     * @param account - account address, default: RepuxWeb3Api#getDefaultAccount
     * @return Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)
     */
    approveTokensTransferForDataProductPurchase(dataProductAddress: string, account?: string): Promise<string>;
    /**
     * Returns true if approveTokensTransferForDataProductPurchase is already called
     * @param dataProductAddress - product address
     * @param account - account address, default: RepuxWeb3Api#getDefaultAccount
     * @return true if approved, false otherwise
     */
    isTransferForPurchaseApproved(dataProductAddress: string, account?: string): Promise<Boolean>;
    /**
     * Purchases DataProduct
     * @param dataProductAddress - product address
     * @param publicKey - buyer public key (needed for file encryption)
     * @param account - account address, default: RepuxWeb3Api#getDefaultAccount
     * @return Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)
     */
    purchaseDataProduct(dataProductAddress: string, publicKey: string, account?: string): Promise<string>;
    /**
     * Finalises data product purchase
     * @param dataProductAddress - product address
     * @param buyerAddress - buyer address
     * @param buyerMetaHash - IPFS file hash of meta file for re-encrypted file
     * @param account - account address, default: RepuxWeb3Api#getDefaultAccount
     * @return Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)
     */
    finaliseDataProductPurchase(dataProductAddress: string, buyerAddress: string, buyerMetaHash: string, account?: string): Promise<string>;
    /**
     * Returns products bought by provided account
     * @param account - account address, default: RepuxWeb3Api#getDefaultAccount
     * @return array of bought products addresses
     */
    getBoughtDataProducts(account?: string): Promise<string[]>;
    /**
     * Returns products bought by provided account and approved
     * @param account - account address, default: RepuxWeb3Api#getDefaultAccount
     * @return array of bought and finalised products addresses
     */
    getBoughtAndFinalisedDataProducts(account?: string): Promise<string[]>;
    /**
     * Returns products created by provided account
     * @param account - account address, default: RepuxWeb3Api#getDefaultAccount
     * @return array of created products addresses
     */
    getCreatedDataProducts(account?: string): Promise<string[]>;
    /**
     * Withdraws funds from data product to owner account
     * @param dataProductAddress - product address
     * @param account - account address, default: RepuxWeb3Api#getDefaultAccount
     * @return Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)
     */
    withdrawFundsFromDataProduct(dataProductAddress: string, account?: string): Promise<string>;
    /**
     * Disables Data Product
     * @param dataProductAddress - product address
     * @param account - account address, default: RepuxWeb3Api#getDefaultAccount
     * @return Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)
     */
    disableDataProduct(dataProductAddress: string, account?: string): Promise<string>;
    /**
     * Cancels Data Product purchase (works only after deliveryDeadline)
     * @param dataProductAddress - product address
     * @param account - account address, default: RepuxWeb3Api#getDefaultAccount
     * @return Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)
     */
    cancelDataProductPurchase(dataProductAddress: string, account?: string): Promise<string>;
    /**
     * Returns all buyers addresses by DataProduct address
     * @param dataProductAddress - product address
     * @param account - account address, default: RepuxWeb3Api#getDefaultAccount
     * @return array of buyers addresses
     */
    getDataProductBuyersAddresses(dataProductAddress: string, account?: string): Promise<string[]>;
    /**
     * Rates data product purchase transaction (can be called only by buyer)
     * @param dataProductAddress - product address
     * @param score - should be a number from 1 to 5
     * @param account - account address, default: RepuxWeb3Api#getDefaultAccount
     * @return Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)
     */
    rateDataProductPurchase(dataProductAddress: string, score: BigNumber, account?: string): Promise<string>;
    /**
     * Waits for transaction result and returns getTransactionReceipt
     * @param transactionHash - hash of transaction to check
     * @param timeInterval - time interval between status checks in milliseconds, default: 1000
     * @result transaction receipt
     */
    waitForTransactionResult(transactionHash: string, timeInterval?: number): Promise<TransactionReceipt>;
    /**
     * Returns Token contract instance
     * @return Token contract instance
     */
    private getTokenContract;
    /**
     * Returns Registry contract instance
     * @return Registry contract instance
     */
    private getRegistryContract;
}
