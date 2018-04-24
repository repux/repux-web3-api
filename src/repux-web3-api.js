import BigNumber from 'bignumber.js';
import contract from 'truffle-contract';
import Registry_artifacts from '../contracts/Registry';
import DemoToken_artifacts from '../contracts/DemoToken';
import DataProduct_artifacts from '../contracts/DataProduct';
import ERC20_artifacts from '../contracts/ERC20';
import { Product } from './product';
import packageConfig from '../package';
import { ERRORS } from './errors';

const Registry = contract(Registry_artifacts);
const DemoToken = contract(DemoToken_artifacts);
const ERC20 = contract(ERC20_artifacts);
const DataProduct = contract(DataProduct_artifacts);

const PRODUCT_CREATION_GAS_PRICE = 4000000;
const PRODUCT_PURCHASE_GAS_PRICE = 4000000;

// Workaround for a compatibility issue between web3@1.0.0-beta.29 and truffle-contract@3.0.3
// https://github.com/trufflesuite/truffle-contract/issues/57#issuecomment-331300494
function fixTruffleContractCompatibilityIssue(web3) {
    if (typeof web3.currentProvider.sendAsync !== "function") {
        web3.currentProvider.sendAsync = function() {
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
class RepuxWeb3Api {

    /**
     * @param {Web3} web3 - Web3 instance
     */
    constructor(web3) {
        this._web3 = fixTruffleContractCompatibilityIssue(web3);
        this._provider = this._web3.currentProvider;

        Registry.setProvider(this._provider);
        DemoToken.setProvider(this._provider);
        ERC20.setProvider(this._provider);
        DataProduct.setProvider(this._provider);
    }

    /**
     * Initializes RepuX API.
     * Should be called once before any operation.
     * @returns {Promise<void>}
     */
    async initialize() {
        if (this._initialized) {
            return;
        }

        this._initialized = true;

        this._registry = await Registry.deployed();
        this._token = await DemoToken.deployed();
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
        return this._web3.eth.defaultAccount;
    }

    /**
     * Return account balance value
     * @param {string} [account=web3.eth.defaultAccount] - Account address
     * @returns {Promise<BigNumber>} Balance value
     */
    getBalance(account) {
        if (!account) {
            account = this.getDefaultAccount();
        }

        return this._token.balanceOf(account);
    }

    /**
     * Creates product contract
     * @param {Product} product - Product
     * @param {string} [account=web3.eth.defaultAccount] - Account address
     * @returns {Promise<*>}
     */
    createProduct(product, account) {
        if (!account) {
            account = this.getDefaultAccount();
        }

        return this._registry.createDataProduct(
            'We can\'t provide any fileHash because we have multiple chunks instead of single file',
            product.metaHash,
            product.price,
            {
                from: account,
                gas: PRODUCT_CREATION_GAS_PRICE
            }
        )
    }

    /**
     * Returns all products addresses
     * @returns {Promise<Array[string]>}
     */
    getProductAddresses() {
        return this._registry.getDataProducts();
    }

    /**
     * Returns products data by address
     * @param {string} productAddress - Product address
     * @returns {Promise<Array[string]>}
     */
    async getProduct(productAddress) {
        const instance = await DataProduct.at(productAddress);

        return Product.createFromDataProduct(instance);
    }

    /**
     * Purchases product
     * @param {string} productAddress - Product address
     * @param {string} [account=web3.eth.defaultAccount] - Account address
     * @returns {Promise<*>}
     */
    purchaseProduct(productAddress, account) {
        throw new Error(ERRORS.METHOD_NOT_IMPLEMENTED);
    }
}

export {
    RepuxWeb3Api,
    Product
}
