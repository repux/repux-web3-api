import contract from 'truffle-contract';
import RegistryArtifacts from '../contracts/Registry';
import DemoTokenArtifacts from '../contracts/DemoToken';
import DataProductArtifacts from '../contracts/DataProduct';
import packageConfig from '../package';
import BigNumber from 'bignumber.js';
import { DataProductUpdateAction } from './data-product-update-action';

export { DataProductUpdateAction };

export const PRODUCT_CREATION_GAS_LIMIT = 4000000;
export const PRODUCT_DELETION_GAS_LIMIT = 4000000;
export const PRODUCT_PURCHASE_GAS_LIMIT = 4000000;
export const PRODUCT_PURCHASE_APPROVE_GAS_LIMIT = 4000000;
export const PRODUCT_PURCHASE_CANCEL_GAS_LIMIT = 4000000;
export const PRODUCT_WITHDRAW_GAS_LIMIT = 4000000;
export const PRODUCT_PURCHASE_RATE_GAS_LIMIT = 4000000;

export const INIT_STATUS_INITIALIZED = 0;
export const INIT_STATUS_ALREADY_INITIALIZED = 1;

const ERR_INIT = 'Please initialize library first using `init()` method';

let Registry;
let DemoToken;
let DataProduct;

// Workaround for a compatibility issue between web3@1.0.0-beta.29 and truffle-contract@3.0.3
// https://github.com/trufflesuite/truffle-contract/issues/57#issuecomment-331300494
function fixTruffleContractCompatibilityIssue(web3) {
    if (typeof web3.currentProvider.sendAsync !== 'function') {
        web3.currentProvider.sendAsync = function () {
            return web3.currentProvider.send.apply(
                web3.currentProvider, arguments
            );
        };
    }
    return web3;
}

/**
 * Repux API
 */
export default class RepuxWeb3Api {
    /**
     * @param {Web3} web3 - Web3 instance
     * @param {Object} contracts
     */
    constructor(web3, contracts = {}) {
        if (typeof web3 === 'undefined') {
            throw new Error('web3 instance is required!');
        }

        if (!contracts.REGISTRY_CONTRACT_ADDRESS) {
            throw new Error('Repux Registry contract address should be set!');
        }

        this._registryContractAddress = contracts.REGISTRY_CONTRACT_ADDRESS;

        if (!contracts.DEMOTOKEN_CONTRACT_ADDRESS) {
            throw new Error('Repux DemoToken contract address should be set!');
        }

        this._demoTokenContractAddress = contracts.DEMOTOKEN_CONTRACT_ADDRESS;

        this._web3 = fixTruffleContractCompatibilityIssue(web3);
        this._provider = this._web3.currentProvider;
    }

    /**
     * Return API version
     * @returns {string} API version
     */
    static getVersion() {
        return packageConfig.version;
    }

    /**
     * Sets up contracts
     * @returns {Promise<any>}
     */
    init() {
        return new Promise((resolve, reject) => {
            if (this.initialized) {
                resolve(INIT_STATUS_ALREADY_INITIALIZED);
            }

            Registry = contract(RegistryArtifacts);
            DemoToken = contract(DemoTokenArtifacts);
            DataProduct = contract(DataProductArtifacts);

            Registry.setProvider(this._provider);
            DemoToken.setProvider(this._provider);
            DataProduct.setProvider(this._provider);

            Registry.at(this._registryContractAddress)
                .then(registry => {
                    this._registry = registry;
                    return DemoToken.at(this._demoTokenContractAddress);
                })
                .then(token => {
                    this._token = token;
                    this.initialized = true;
                    resolve(INIT_STATUS_INITIALIZED);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Returns DemoToken contract instance
     * @returns {T | *}
     */
    getDemoTokenContract() {
        if (!this.initialized) {
            throw new Error(ERR_INIT);
        }

        return this._token;
    }

    /**
     * Returns Registry contract instance
     * @returns {T | *}
     */
    getRegistryContract() {
        if (!this.initialized) {
            throw new Error(ERR_INIT);
        }

        return this._registry;
    }

    /**
     * Returns default account
     * @returns {Promise<string>} Default account
     */
    getDefaultAccount() {
        return new Promise(resolve => {
            this._web3.eth.getAccounts((error, accounts) => {
                resolve(accounts[0]);
            });
        });
    }

    /**
     * Return account balance value
     * @param {string} [account=web3.eth.defaultAccount] - Account address
     * @returns {Promise<BigNumber>} Balance value
     */
    async getBalance(account) {
        if (!account) {
            account = await this.getDefaultAccount();
        }

        const result = await this.getDemoTokenContract().balanceOf.call(account);
        return new BigNumber(this._web3.fromWei(result));
    }

    /**
     * Returns network Id
     * @returns {Promise<number>}
     */
    getNetworkId() {
        return new Promise(resolve => {
            this._web3.version.getNetwork((err, netId) => resolve(+netId));
        });
    }

    /**
     * Creates product contract
     * @param {string} metaFileHash - Hash of meta file containing all data required to product publication
     * @param {BigNumber} price - Product price
     * @param {number} daysToDeliver - Days for deliver
     * @param {string} [account=web3.eth.defaultAccount] - Account address
     * @returns {Promise<*>}
     */
    async createDataProduct(metaFileHash, price, daysToDeliver, account) {
        if (!account) {
            account = await this.getDefaultAccount();
        }

        const result = await this.getRegistryContract().createDataProduct(
            metaFileHash,
            this._web3.toWei(price.toString()),
            daysToDeliver,
            {
                from: account,
                gas: PRODUCT_CREATION_GAS_LIMIT
            }
        );

        return this._getTransactionResult(result.logs[0].args.dataProduct, result);
    }

    /**
     * Watches for DataProductUpdate events on blockchain
     * @param config - watch config
     * @param callback - callback called when event is received
     * @returns {Promise<*>}
     */
    async watchForDataProductUpdate(config, callback) {
        const event = this.getRegistryContract().DataProductUpdate({}, config);

        event.watch(async (errors, result) => {
            if (!result) {
                return;
            }

            callback({
                dataProductAddress: result.args.dataProduct,
                userAddress: result.args.sender,
                action: result.args.action.toString(),
                blockNumber: result.blockNumber
            });
        });

        return event;
    }

    /**
     * Returns DataProduct data
     * @param {string} dataProductAddress
     * @returns {Promise<{address: string, owner: string, price: BigNumber, sellerMetaHash: string, buyersDeposit: BigNumber,
     * fundsAccumulated: BigNumber, disabled: boolean}>}
     */
    async getDataProduct(dataProductAddress) {
        const product = await DataProduct.at(dataProductAddress);

        return {
            address: dataProductAddress,
            owner: await product.owner.call(),
            price: this._web3.fromWei(await product.price.call()),
            sellerMetaHash: await product.sellerMetaHash.call(),
            buyersDeposit: this._web3.fromWei(await product.buyersDeposit.call()),
            fundsAccumulated: await this.getBalance(dataProductAddress),
            disabled: await product.disabled.call()
        };
    }

    /**
     * Returns transaction on DataProduct by buyerAddress
     * @param {string} dataProductAddress
     * @param {string} buyerAddress
     * @returns {Promise<{publicKey: string, buyerMetaHash: string, rateDeadline: Date, deliveryDeadline: Date,
     * price: BigNumber, purchased: boolean, finalised: boolean, rated: boolean, rating: BigNumber}>}
     */
    async getDataProductTransaction(dataProductAddress, buyerAddress) {
        const product = await DataProduct.at(dataProductAddress);
        const transaction = await product.getTransactionData(buyerAddress);
        const [
            publicKey,
            buyerMetaHash,
            rateDeadline,
            deliveryDeadline,
            price,
            fee,
            purchased,
            finalised,
            rated,
            rating
        ] = transaction;

        if (!purchased) {
            return null;
        }

        return {
            dataProductAddress,
            buyerAddress,
            publicKey,
            buyerMetaHash,
            rateDeadline: new Date(rateDeadline.toNumber() * 1000),
            deliveryDeadline: new Date(deliveryDeadline.toNumber() * 1000),
            price: new BigNumber(this._web3.fromWei(price)),
            fee: new BigNumber(this._web3.fromWei(fee)),
            purchased,
            finalised,
            rated,
            rating: rating ? new BigNumber(rating) : undefined
        };
    }

    /**
     * Purchases DataProduct
     * @param {string} dataProductAddress
     * @param {string} publicKey
     * @param {string} account
     * @returns {Promise<*>}
     */
    async purchaseDataProduct(dataProductAddress, publicKey, account) {
        let result;
        if (!account) {
            account = await this.getDefaultAccount();
        }

        const product = await DataProduct.at(dataProductAddress);
        const price = await product.price.call();

        try {
            await this.getDemoTokenContract().approve(dataProductAddress, price, {
                from: account
            });

            result = await product.purchase(publicKey, {
                from: account,
                gas: PRODUCT_PURCHASE_GAS_LIMIT
            });
        } catch (error) {
            await this.getDemoTokenContract().approve(dataProductAddress, 0, {
                from: account
            });

            throw error;
        }

        return this._getTransactionResult(dataProductAddress, result);
    }

    /** @deprecated use finaliseDataProductPurchase() */
    approveDataProductPurchase(dataProductAddress, buyerAddress, buyerMetaHash, account) {
        return this.finaliseDataProductPurchase(dataProductAddress, buyerAddress, buyerMetaHash, account);
    }

    /**
     * Finalises data product purchase
     * @param dataProductAddress
     * @param buyerAddress
     * @param buyerMetaHash
     * @param account
     */
    async finaliseDataProductPurchase(dataProductAddress, buyerAddress, buyerMetaHash, account) {
        if (!account) {
            account = await this.getDefaultAccount();
        }

        const product = await DataProduct.at(dataProductAddress);
        const result = await product.finalise(buyerAddress, buyerMetaHash, {
            from: account,
            gas: PRODUCT_PURCHASE_APPROVE_GAS_LIMIT
        });

        return this._getTransactionResult(dataProductAddress, result);
    }

    /**
     * Returns products bought by provided account
     * @param {string} account
     * @returns {Promise<*>}
     */
    async getBoughtDataProducts(account) {
        if (!account) {
            account = await this.getDefaultAccount();
        }

        return this.getRegistryContract().getDataPurchasedFor.call(account);
    }

    /** @deprecated use getBoughtAndFinalisedDataProducts() */
    getBoughtAndFinalisedDataProducts(account) {
        return this.getBoughtAndFinalisedDataProducts(account);
    }

    /**
     * Returns products bought by provided account and approved
     * @param {string} account
     * @returns {Promise<*>}
     */
    async getBoughtAndFinalisedDataProducts(account) {
        if (!account) {
            account = await this.getDefaultAccount();
        }

        return this.getRegistryContract().getDataFinalisedFor.call(account);
    }

    /**
     * Returns products created by provided account
     * @param {string} account
     * @returns {Promise<*>}
     */
    async getCreatedDataProducts(account) {
        if (!account) {
            account = await this.getDefaultAccount();
        }

        return this.getRegistryContract().getDataCreatedFor.call(account);
    }

    /**
     * Withdraws funds from data product to owner account
     * @param {string} dataProductAddress
     * @param {string} account
     * @returns {Promise<*>}
     */
    async withdrawFundsFromDataProduct(dataProductAddress, account) {
        if (!account) {
            account = await this.getDefaultAccount();
        }

        const product = await DataProduct.at(dataProductAddress);
        const result = await product.withdraw({
            from: account,
            gas: PRODUCT_WITHDRAW_GAS_LIMIT
        });

        return this._getTransactionResult(dataProductAddress, result);
    }

    /**
     * Disables Data Product
     * @param dataProductAddress
     * @param account
     * @returns {Promise<*>}
     */
    async disableDataProduct(dataProductAddress, account) {
        if (!account) {
            account = await this.getDefaultAccount();
        }

        const product = await DataProduct.at(dataProductAddress);
        const result = await product.disable({
            from: account,
            gas: PRODUCT_DELETION_GAS_LIMIT
        });

        return this._getTransactionResult(dataProductAddress, result);
    }

    /**
     * Cancels Data Product purchase (works only after deliveryDeadline)
     * @param dataProductAddress
     * @param account
     * @returns {Promise<*>}
     */
    async cancelDataProductPurchase(dataProductAddress, account) {
        if (!account) {
            account = await this.getDefaultAccount();
        }

        const product = await DataProduct.at(dataProductAddress);
        const result = await product.cancelPurchase({
            from: account,
            gas: PRODUCT_PURCHASE_CANCEL_GAS_LIMIT
        });

        return this._getTransactionResult(dataProductAddress, result);
    }

    /**
     * Returns all buyers addresses by DataProduct address
     * @param dataProductAddress
     * @param account
     * @returns {Promise<string[]>}
     */
    async getDataProductBuyersAddresses(dataProductAddress, account) {
        if (!account) {
            account = await this.getDefaultAccount();
        }

        const product = await DataProduct.at(dataProductAddress);
        return product.getBuyersAddresses({
            from: account,
            gas: PRODUCT_PURCHASE_CANCEL_GAS_LIMIT
        });
    }

    /**
     * Rates data product purchase transaction (can be called only by buyer)
     * @param {string} dataProductAddress
     * @param {BigNumber} score
     * @param {string} account
     * @returns {Promise<*>}
     */
    async rateDataProductPurchase(dataProductAddress, score, account) {
        if (!account) {
            account = await this.getDefaultAccount();
        }

        const product = await DataProduct.at(dataProductAddress);
        const result = await product.rate(score.toString(), {
            from: account,
            gas: PRODUCT_PURCHASE_RATE_GAS_LIMIT
        });

        return this._getTransactionResult(dataProductAddress, result);
    }

    _getTransactionResult(address, result) {
        return {
            address,
            blockNumber: result.receipt.blockNumber,
            blockHash: result.receipt.blockHash,
            status: result.receipt.status
        };
    }
}
