import assert from 'assert';
import { RepuxWeb3Api, Product } from '../src/repux-web3-api';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { TEST_ACCOUNT_ADDRESS, TEST_ACCOUNT_ADDRESS_2, BLOCKCHAIN_URL } from './config';

describe('Whole file exchange process should work', function () {
    let web3 = new Web3(new Web3.providers.HttpProvider(BLOCKCHAIN_URL));
    let uploadedFileHash = 'SomeFileHash', productAddresses, product;
    web3.eth.defaultAccount = TEST_ACCOUNT_ADDRESS;
    const repux = new RepuxWeb3Api(web3);

    describe('RepuX.getVersion()', function () {
        it('should return actual version', function () {
            const version = RepuxWeb3Api.getVersion();
            console.log('version', version);
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
            console.log('defaultAccount', defaultAccount);
            assert.equal(defaultAccount, TEST_ACCOUNT_ADDRESS);
        });
    });

    describe('RepuX.getBalance()', function () {
        it('should return user balance', async function (done) {
            const balance = await repux.getBalance();
            console.log('balance', balance);
            assert.equal(balance.valueOf(), '100000000000000000000');
            done();
        });

        it('should return user balance by account', async function (done) {
            const balance = await repux.getBalance(TEST_ACCOUNT_ADDRESS);
            console.log('balance', balance);
            assert.equal(balance.valueOf(), '100000000000000000000');
            done();
        });
    });

    describe('RepuX.createProduct()', function () {
        it('should create new product contract', async function (done) {
            const product = new Product(uploadedFileHash, new BigNumber(1));
            const dataProduct = await repux.createProduct(product);
            console.log('dataProduct', dataProduct);
            assert.ok(dataProduct);
            done();
        });

        it('should create new product contract by account', async function (done) {
            const product = new Product(uploadedFileHash, new BigNumber(1));
            const dataProduct = await repux.createProduct(product, TEST_ACCOUNT_ADDRESS);
            console.log('dataProduct', dataProduct);
            assert.ok(dataProduct);
            done();
        });
    });

    describe('RepuX.getProductAddresses()', function () {
        it('should return addresses of all products in registry', async function () {
            productAddresses = await repux.getProductAddresses();
            console.log('productAddresses', productAddresses);
            assert.ok(Array.isArray(productAddresses));
            assert.ok(productAddresses.length > 0);
        });
    });

    describe('RepuX.getProduct()', function () {
        it('should return Product object instance by given product address', async function () {
            product = await repux.getProduct(productAddresses[ productAddresses.length - 1 ]);
            console.log('product', product);
            assert.ok(product.metaHash === uploadedFileHash);
        });
    });

    describe('RepuX.purchaseProduct()', function () {
        it('should be able to purchase product from registry', async function () {
            console.log('productAddress', productAddresses[ productAddresses.length - 1 ]);
            const purchasedProduct = await repux.purchaseProduct(productAddresses[ productAddresses.length - 1 ], TEST_ACCOUNT_ADDRESS_2);
            console.log('purchasedProduct', purchasedProduct);
            assert.ok(purchasedProduct);
        });
    });
});
