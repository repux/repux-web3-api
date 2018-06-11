import contract from 'truffle-contract';
import RegistryArtifacts from '../contracts/Registry';
import DemoTokenArtifacts from '../contracts/DemoToken';
import DataProductArtifacts from '../contracts/DataProduct';
import packageConfig from '../package';
import BigNumber from 'bignumber.js';
import { DataProductUpdateAction } from './data-product-update-action';

const Registry = contract(RegistryArtifacts);
const DemoToken = contract(DemoTokenArtifacts);
const DataProduct = contract(DataProductArtifacts);
export const PRODUCT_CREATION_GAS_LIMIT = 4000000;
export const PRODUCT_PURCHASE_GAS_LIMIT = 4000000;
export const PRODUCT_PURCHASE_APPROVE_GAS_LIMIT = 4000000;

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

        Registry.setProvider(this._provider);
        DemoToken.setProvider(this._provider);
        DataProduct.setProvider(this._provider);

        this._registry = Registry.at(this._registryContractAddress);
        this._token = DemoToken.at(this._demoTokenContractAddress);
    }

    /**
     * Return API version
     * @returns {string} API version
     */
    static getVersion() {
        return packageConfig.version;
    }

    /**
     * Returns default account
     * @returns {string} Default account
     */
    getDefaultAccount() {
        return this._web3.eth.accounts[0];
    }

    /**
     * Return account balance value
     * @param {string} [account=web3.eth.defaultAccount] - Account address
     * @returns {Promise<BigNumber>} Balance value
     */
    async getBalance(account) {
        if (!account) {
            account = this.getDefaultAccount();
        }

        const contract = await this._token;
        const result = await contract.balanceOf.call(account);
        return new BigNumber(result);
    }

    /**
     * Creates product contract
     * @param {string} metaFileHash - Hash of meta file containing all data required to product publication
     * @param {BigNumber} price - Product price
     * @param {string} [account=web3.eth.defaultAccount] - Account address
     * @returns {Promise<string>}
     */
    async createDataProduct(metaFileHash, price, account) {
        if (!account) {
            account = this.getDefaultAccount();
        }

        const registry = await this._registry;
        const result = await registry.createDataProduct(
            metaFileHash,
            this._web3.toWei(price.toString()),
            {
                from: account,
                gas: PRODUCT_CREATION_GAS_LIMIT
            }
        );

        return {
            address: result.logs[0].args.dataProduct,
            blockNumber: result.logs[0].blockNumber,
            blockHash: result.logs[0].blockHash,
            status: result.receipt.status
        };
    }

    /**
     * Watches for DataProductUpdate events on blockchain
     * @param config - watch config
     * @param callback - callback called when event is received
     */
    async watchForDataProductUpdate(config, callback) {
        const registry = await this._registry;
        registry.DataProductUpdate({}, config).watch(async (errors, result) => {
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
    }

    /**
     * Returns DataProduct data
     * @param {string} dataProductAddress
     * @returns {Promise<{address: string, owner: string, price: BigNumber, sellerMetaHash: string, totalRating: BigNumber}>}
     */
    async getDataProduct(dataProductAddress) {
        const product = await DataProduct.at(dataProductAddress);

        return {
            address: dataProductAddress,
            owner: await product.owner.call(),
            price: this._web3.fromWei(await product.price.call()),
            sellerMetaHash: await product.sellerMetaHash.call(),
            totalRating: await product.getTotalRating.call()
        };
    }

    /**
     * Returns transaction on DataProduct by buyerAddress
     * @param {string} dataProductAddress
     * @param {string} buyerAddress
     * @returns {Promise<{publicKey: string, buyerMetaHash: string, price: BigNumber, purchased: boolean, approved: boolean, rated: boolean, rating: BigNumber}>}
     */
    async getDataProductTransaction(dataProductAddress, buyerAddress) {
        const product = await DataProduct.at(dataProductAddress);
        const transaction = await product.getTransactionData(buyerAddress);

        return {
            publicKey: transaction[0],
            buyerMetaHash: transaction[1],
            price: this._web3.fromWei(transaction[2]),
            purchased: transaction[3],
            approved: transaction[4],
            rated: transaction[5],
            rating: transaction[6]
        };
    }

    /**
     * Purchases DataProduct
     * @param {string} dataProductAddress
     * @param {string} publicKey
     * @param {string} account
     * @returns {Promise<void>}
     */
    async purchaseDataProduct(dataProductAddress, publicKey, account) {
        let result;
        if (!account) {
            account = this.getDefaultAccount();
        }

        const token = await this._token;
        const product = await DataProduct.at(dataProductAddress);
        const price = await product.price.call();

        try {
            await token.approve(dataProductAddress, price, {
                from: account
            });

            result = await product.purchase(publicKey, {
                from: account,
                gas: PRODUCT_PURCHASE_GAS_LIMIT
            });
        } catch (error) {
            await token.approve(dataProductAddress, 0, {
                from: account
            });

            throw error;
        }

        return {
            address: dataProductAddress,
            blockNumber: result.receipt.blockNumber,
            blockHash: result.receipt.blockHash,
            status: result.receipt.status
        };
    }

    /**
     * Approves data product purchase
     * @param dataProductAddress
     * @param buyerAddress
     * @param buyerMetaHash
     * @param account
     */
    async approveDataProductPurchase(dataProductAddress, buyerAddress, buyerMetaHash, account) {
        if (!account) {
            account = this.getDefaultAccount();
        }

        const product = await DataProduct.at(dataProductAddress);
        const result = await product.approve(buyerAddress, buyerMetaHash, {
            from: account,
            gas: PRODUCT_PURCHASE_APPROVE_GAS_LIMIT
        });

        return {
            address: dataProductAddress,
            blockNumber: result.receipt.blockNumber,
            blockHash: result.receipt.blockHash,
            status: result.receipt.status
        };
    }

    /**
     * Returns products bought by provided account
     * @param {string} account
     * @returns {Promise<*>}
     */
    async getBoughtDataProducts(account) {
        if (!account) {
            account = this.getDefaultAccount();
        }

        const registry = await this._registry;
        return registry.getDataPurchasedFor.call(account);
    }

    /**
     * Returns products bought by provided account and approved
     * @param {string} account
     * @returns {Promise<*>}
     */
    async getBoughtAndApprovedDataProducts(account) {
        if (!account) {
            account = this.getDefaultAccount();
        }

        const registry = await this._registry;
        return registry.getDataApprovedFor.call(account);
    }

    /**
     * Returns products created by provided account
     * @param {string} account
     * @returns {Promise<*>}
     */
    async getCreatedDataProducts(account) {
        if (!account) {
            account = this.getDefaultAccount();
        }

        const registry = await this._registry;
        return registry.getDataCreatedFor.call(account);
    }
}

export {
    DataProductUpdateAction
}
