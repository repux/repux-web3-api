/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import RepuxWeb3Api, { DataProductUpdateAction } from '../src/repux-web3-api';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import config from './config';

let web3,
    repuxWeb3Api,
    DEFAULT_ACCOUNT,
    SECONDARY_ACCOUNT,
    createdProduct;

describe('RepuX Web3 API', () => {
    const metaFileHash = 'SOME_HASH';
    const daysForDeliver = 0;
    const price = new BigNumber(1.1);

    before(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider(config.ETH_NODE_URL));
        repuxWeb3Api = new RepuxWeb3Api(web3, {
            REGISTRY_CONTRACT_ADDRESS: config.REGISTRY_CONTRACT_ADDRESS,
            DEMOTOKEN_CONTRACT_ADDRESS: config.DEMOTOKEN_CONTRACT_ADDRESS
        });

        DEFAULT_ACCOUNT = web3.eth.accounts[0];
        SECONDARY_ACCOUNT = web3.eth.accounts[1];

        const amountToIssue = web3.toWei(new BigNumber('100').toString());
        await repuxWeb3Api._token.issue(DEFAULT_ACCOUNT, amountToIssue, { from: DEFAULT_ACCOUNT });
        await repuxWeb3Api._token.issue(SECONDARY_ACCOUNT, amountToIssue, { from: DEFAULT_ACCOUNT });
    });

    describe('constructor()', () => {
        it('should throw an error when parameters are missing', () => {
            expect(() => new RepuxWeb3Api()).to.throw('web3 instance is required!');
        });

        it('should throw an error when Registry Contract address is not set', () => {
            expect(() => new RepuxWeb3Api(web3)).to.throw('Repux Registry contract address should be set!');
        });

        it('should throw an error when Registry Contract address is not set', () => {
            expect(() => new RepuxWeb3Api(web3)).to.throw('Repux Registry contract address should be set!');
        });

        it('should throw an error when DemoToken Contract address is not set', () => {
            expect(() => new RepuxWeb3Api(web3, {
                REGISTRY_CONTRACT_ADDRESS: config.REGISTRY_CONTRACT_ADDRESS
            })).to.throw('Repux DemoToken contract address should be set!');
        });
    });

    describe('getVersion()', () => {
        it('should return actual version', () => {
            const version = RepuxWeb3Api.getVersion();
            expect(version).to.be.a.string;
        });
    });

    describe('getDefaultAccount()', () => {
        it('should return default account', async () => {
            const defaultAccount = await repuxWeb3Api.getDefaultAccount();
            expect(defaultAccount).to.equal(DEFAULT_ACCOUNT);
        });
    });

    describe('getBalance()', () => {
        it('should return user balance', async () => {
            let balance = await repuxWeb3Api.getBalance();
            expect(balance.isGreaterThan(new BigNumber('10')));
        });

        it('should return user balance by account', async () => {
            const balance = await repuxWeb3Api.getBalance(SECONDARY_ACCOUNT);
            expect(balance.isGreaterThan(new BigNumber('10')));
        });
    });

    describe('getNetworkId()', () => {
        it('should return network identifier', async () => {
            const netId = await repuxWeb3Api.getNetworkId();
            expect(netId).to.not.be.undefined;
        });
    });

    describe('createDataProduct()', () => {
        it('should call createDataProduct() method on _registry object', async () => {
            const result = await repuxWeb3Api.createDataProduct(metaFileHash, price, daysForDeliver, DEFAULT_ACCOUNT);
            expect(result.status).to.equal('0x01');
            createdProduct = result;
        });
    });

    describe('watchForDataProductUpdate()', () => {
        it('should listen for DataProductUpdate event', () => {
            return new Promise(async resolve => {
                const event = await repuxWeb3Api.watchForDataProductUpdate({
                    fromBlock: createdProduct.blockNumber,
                    toBLock: 'latest'
                }, ({ dataProductAddress, userAddress, action, blockNumber }) => {
                    expect(dataProductAddress).to.equal(createdProduct.address);
                    expect(userAddress).to.equal(DEFAULT_ACCOUNT);
                    expect(action).to.equal('0');
                    expect(blockNumber).to.be.greaterThan(0);
                    event.stopWatching();
                    resolve();
                });
            });
        });
    });

    describe('getDataProduct()', () => {
        it('should return DataProduct by address', async () => {
            const result = await repuxWeb3Api.getDataProduct(createdProduct.address);
            expect(result.address).to.equal(createdProduct.address);
            expect(result.owner).to.equal(DEFAULT_ACCOUNT);
            expect(result.sellerMetaHash).to.equal('SOME_HASH');
            expect(result.totalRating.toString()).to.equal(DataProductUpdateAction.CREATE);
            expect(result.price.toString()).to.equal('1.1');
            expect(result.disabled).to.be.false;
        });
    });

    describe('purchaseDataProduct()', () => {
        it('shouldn\'t throw any errors', async () => {
            try {
                const result = await repuxWeb3Api.purchaseDataProduct(createdProduct.address, 'SOME_PUBLIC_KEY', SECONDARY_ACCOUNT);
                expect(result.status).to.equal('0x01');
                expect(result.address).to.equal(createdProduct.address);
                expect(true).to.be.true;
            } catch (error) {
                expect(false).to.be.true;
            }
        });
    });

    describe('getDataProductTransaction()', () => {
        it('should return DataProduct transaction by dataProductAddress and buyerAddress', async () => {
            const result = await repuxWeb3Api.getDataProductTransaction(createdProduct.address, SECONDARY_ACCOUNT);
            expect(result.publicKey).to.equal('SOME_PUBLIC_KEY');
            expect(result.buyerMetaHash).to.equal('');
            expect(result.price.toString()).to.equal('1.1');
            expect(result.purchased).to.be.true;
            expect(result.finalised).to.be.false;
            expect(result.rated).to.be.false;
            expect(result.rating.toString()).to.equal('0');
        });
    });

    describe('getBoughtDataProducts()', () => {
        it('should return list containing addresses of products bought by account owner', async () => {
            const result = await repuxWeb3Api.getBoughtDataProducts(SECONDARY_ACCOUNT);
            expect(result.length > 0);
            expect(result.includes(createdProduct.address));
        });

        it('should\'t return address of product created by account owner', async () => {
            const result = await repuxWeb3Api.getBoughtDataProducts(DEFAULT_ACCOUNT);
            expect(!result.includes(createdProduct.address));
        });
    });

    describe('getCreatedDataProducts()', () => {
        it('should return list containing addresses of products created by account owner', async () => {
            const result = await repuxWeb3Api.getCreatedDataProducts(DEFAULT_ACCOUNT);
            expect(result.length > 0);
            expect(result.includes(createdProduct.address));
        });

        it('should\'t return address of product bought by account owner', async () => {
            const result = await repuxWeb3Api.getCreatedDataProducts(SECONDARY_ACCOUNT);
            expect(!result.includes(createdProduct.address));
        });
    });

    describe('finaliseDataProductPurchase()', () => {
        it('shouldn\'t throw any errors', async () => {
            try {
                const result = await repuxWeb3Api.finaliseDataProductPurchase(createdProduct.address, SECONDARY_ACCOUNT, 'SOME_HASH');
                expect(result.status).to.equal('0x01');
                expect(result.address).to.equal(createdProduct.address);
                expect(true).to.be.true;
            } catch (error) {
                console.log(error);
                expect(false).to.be.true;
            }
        });
    });

    describe('getBoughtAndFinalisedDataProducts()', () => {
        it('should return list containing addresses of products bought by account owner', async () => {
            const result = await repuxWeb3Api.getBoughtAndFinalisedDataProducts(SECONDARY_ACCOUNT);
            expect(result.length > 0);
            expect(result.includes(createdProduct.address));
        });

        it('should\'t return address of product created by account owner', async () => {
            const result = await repuxWeb3Api.getBoughtAndFinalisedDataProducts(DEFAULT_ACCOUNT);
            expect(!result.includes(createdProduct.address));
        });
    });

    describe('withdrawFundsFromDataProduct()', () => {
        it('should withdraw funds from data product contract', async () => {
            try {
                const balanceBefore = await repuxWeb3Api.getBalance(createdProduct.address);
                expect(balanceBefore.toString()).to.equal(price.toString());
                const result = await repuxWeb3Api.withdrawFundsFromDataProduct(createdProduct.address);
                expect(result.status).to.equal('0x01');
                const balanceAfter = await repuxWeb3Api.getBalance(createdProduct.address);
                expect(balanceAfter.toString()).to.equal('0');
                expect(true).to.be.true;
            } catch (error) {
                console.log(error);
                expect(false).to.be.true;
            }
        });
    });

    describe('disableDataProduct()', () => {
        it('shouldn\'t throw any errors', async () => {
            try {
                const result = await repuxWeb3Api.disableDataProduct(createdProduct.address);
                expect(result.status).to.equal('0x01');
                expect(true).to.be.true;
                const product = await repuxWeb3Api.getDataProduct(createdProduct.address);
                expect(product.disabled).to.be.true;
            } catch (error) {
                console.log(error);
                expect(false).to.be.true;
            }
        });
    });

    describe('cancelPurchase()', () => {
        it('shouldn\'t throw any errors', async () => {
            try {
                const product = await repuxWeb3Api.createDataProduct(metaFileHash, price, daysForDeliver, DEFAULT_ACCOUNT);
                await repuxWeb3Api.purchaseDataProduct(product.address, 'SOME_PUBLIC_KEY', SECONDARY_ACCOUNT);
                const result = await repuxWeb3Api.cancelDataProductPurchase(product.address, SECONDARY_ACCOUNT);
                expect(result.status).to.equal('0x01');
                expect(true).to.be.true;
            } catch (error) {
                console.log(error);
                expect(false).to.be.true;
            }
        });
    });
});
