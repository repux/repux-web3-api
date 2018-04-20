import assert from 'assert';
import { RepuX, Product } from '../src/repux';
import IpfsAPI from 'ipfs-api';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { TEST_ACCOUNT_ADDRESS, TEST_ACCOUNT_ADDRESS_2, BLOCKCHAIN_URL, IPFS_HOST, IPFS_PORT, IPFS_PROTOCOL } from './config';

const FILE_PASSWORD = 'PASSWORDPASSWORD';
const FILE_NAME = 'test.txt';
const FILE = new File([new Blob(['TEST'])], FILE_NAME);

describe('Whole file exchange process should work', function () {
    let web3 = new Web3(new Web3.providers.HttpProvider(BLOCKCHAIN_URL));
    let uploadedFileHash, productAddresses, product;
    web3.eth.defaultAccount = TEST_ACCOUNT_ADDRESS;
    const repux = new RepuX(web3, new IpfsAPI({
        host: IPFS_HOST,
        port: IPFS_PORT,
        protocol: IPFS_PROTOCOL
    }));

    describe('RepuX.getVersion()', function() {
        it('should return actual version', function () {
            const version = RepuX.getVersion();
            console.log(version);
            assert.ok(typeof version === 'string');
        });
    });

    describe('RepuX.initialize()', function () {
        it('should initialize library', async function (done) {
            await repux.initialize();
            assert.ok(repux._initialized);
            assert.ok(repux._registry);
            assert.ok(repux._token);
            done();
        });
    });

    describe('RepuX.getDefaultAccount()', function () {
        it('should return default account', function () {
            const defaultAccount = repux.getDefaultAccount();
            console.log(defaultAccount);
            assert.equal(defaultAccount, TEST_ACCOUNT_ADDRESS);
        });
    });

    describe('RepuX.getBalance()', function () {
        it('should return user balance', async function (done) {
            const balance = await repux.getBalance();
            console.log(balance);
            assert.equal(balance.valueOf(), '100000000000000000000');
            done();
        });

        it('should return user balance by account', async function (done) {
            const balance = await repux.getBalance(TEST_ACCOUNT_ADDRESS);
            console.log(balance);
            assert.equal(balance.valueOf(), '100000000000000000000');
            done();
        });
    });

    describe('RepuX.uploadFile()', function () {
        this.timeout(30000);

        it('should emit progress event and emit finish event with meta file hash', function (done) {
            const fileUploader = repux.uploadFile(FILE_PASSWORD, FILE);
            fileUploader.subscribe('progress', function(eventType, progress) {
                console.log(progress);
                assert.equal(progress, 1);
            });

            fileUploader.subscribe('finish', function(eventType, metaFileHash) {
                assert.ok(metaFileHash);
                console.log(metaFileHash);
                uploadedFileHash = metaFileHash;
                done();
            });
        });
    });

    describe('RepuX.createProduct()', function () {
        it('should create new product contract', async function(done) {
            const product = new Product('Product name', new BigNumber(1), uploadedFileHash, 'Product description', 'Product category', FILE.size);
            const dataProduct = await repux.createProduct(product);
            console.log(dataProduct);
            assert.ok(dataProduct);
            done();
        });

        it('should create new product contract by account', async function(done) {
            const product = new Product('Product name', new BigNumber(1), uploadedFileHash, 'Product description', 'Product category', FILE.size);
            const dataProduct = await repux.createProduct(product, TEST_ACCOUNT_ADDRESS);
            console.log(dataProduct);
            assert.ok(dataProduct);
            done();
        });
    });

    describe('RepuX.getProductAddresses()', function () {
        it('should return addresses of all products in registry', async function () {
            productAddresses = await repux.getProductAddresses();
            console.log(productAddresses);
            assert.ok(Array.isArray(productAddresses));
            assert.ok(productAddresses.length > 0);
        });
    });

    describe('RepuX.getProduct()', function () {
        it('should return Product object instance by given product address', async function () {
            product = await repux.getProduct(productAddresses[productAddresses.length - 1]);
            console.log(product);
            assert.ok(product.name === 'Product name');
        });
    });

    describe('RepuX.purchaseProduct()', function () {
        it ('should be able to purchase product from registry', async function () {
            console.log(productAddresses[productAddresses.length - 1]);
            const approvedTokens = await repux.approveTokensForProduct(product, TEST_ACCOUNT_ADDRESS_2);
            const purchasedProduct = await repux.purchaseProduct(productAddresses[productAddresses.length - 1], TEST_ACCOUNT_ADDRESS_2);
            console.log(purchasedProduct);
            assert.ok(purchasedProduct);
        });
    });

    describe('RepuX.downloadFile()', function () {
        this.timeout(30000);

        it ('should emit progress event and emit finish event with url to file', async function (done) {
            const fileUploader = repux.downloadFile(FILE_PASSWORD, product.ipfsHash);
            fileUploader.subscribe('progress', function(eventType, progress) {
                console.log(progress);
                assert.equal(progress, 1);
            });

            fileUploader.subscribe('finish', function(eventType, result) {
                assert.ok(result.fileUrl);
                assert.equal(result.fileName, FILE_NAME);
                console.log(result);
                done();
            });
        });
    });
});
