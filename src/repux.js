import BigNumber from 'bignumber.js';
import contract from 'truffle-contract';
import Registry_artifacts from '../build/contracts/Registry';
import DemoToken_artifacts from '../build/contracts/DemoToken';
import DataProduct_artifacts from '../build/contracts/DataProduct';
import ERC20_artifacts from '../build/contracts/ERC20';
import { Product } from './product';
import { FileUploader } from './file-uploader';
import { FileDownloader } from './file-downloader';
import packageConfig from '../package';

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
class RepuX {

    /**
     * @param {Web3} web3 - Web3 instance
     * @param {IpfsAPI} ipfs - IpfsAPI instance
     */
    constructor(web3, ipfs) {
        this._web3 = fixTruffleContractCompatibilityIssue(web3);
        this._provider = this._web3.currentProvider;
        this._ipfs = ipfs;

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
            product.name,
            product.description,
            product.ipfsHash,
            product.category,
            product.price,
            product.size,
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
        const rawProduct = await instance.getDataProduct();

        return Product.createFromRawData(rawProduct, productAddress);
    }

    /**
     * Approves tokens transfer (should be called before purchaseProduct)
     * @param {Product} product - Product
     * @param {string} [account=web3.eth.defaultAccount] - Account address
     * @returns {boolean}
     */
    async approveTokensForProduct(product, account) {
        if (!account) {
            account = this.getDefaultAccount();
        }

        const tokenInstance = await ERC20.at(this._token.address);
        return tokenInstance.approve(product.address, product.price, { from: account });
    }

    /**
     * Purchases product
     * @param {string} productAddress - Product address
     * @param {string} [account=web3.eth.defaultAccount] - Account address
     * @returns {Promise<*>}
     */
    async purchaseProduct(productAddress, account) {
        if (!account) {
            account = this.getDefaultAccount();
        }

        const instance = await DataProduct.at(productAddress);
        return instance.purchase({
            gas: PRODUCT_PURCHASE_GAS_PRICE,
            from: account
        });
    }

    /**
     * Uploads and encrypts file
     * @param {string} password - Password to encrypt file
     * @param {File} file - file to upload
     * @returns {FileUploader}
     */
    uploadFile(password, file) {
        const fileUploader = new FileUploader(this._ipfs);
        fileUploader.upload(password, file);

        return fileUploader;
    }

    /**
     * Downloads and decrypts file
     * @param password
     * @param ipfsHash
     * @returns {FileDownloader}
     */
    downloadFile(password, ipfsHash) {
        const fileDownloader = new FileDownloader(this._ipfs);
        fileDownloader.download(password, ipfsHash);

        return fileDownloader;
    }
}

export {
    RepuX,
    Product
}
