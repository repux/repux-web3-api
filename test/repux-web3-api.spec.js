/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import RepuxWeb3Api from '../src/repux-web3-api';
import Web3 from 'web3';
import config from './config';

let web3;
let repuxWeb3Api;
let DEFAULT_ACCOUNT;

describe('RepuX Web3 API', () => {
    beforeEach(() => {
        web3 = new Web3(new Web3.providers.HttpProvider(config.ETH_NODE_URL));
        repuxWeb3Api = new RepuxWeb3Api(web3, {
            REGISTRY_CONTRACT_ADDRESS: config.REGISTRY_CONTRACT_ADDRESS,
            DEMOTOKEN_CONTRACT_ADDRESS: config.DEMOTOKEN_CONTRACT_ADDRESS
        });

        DEFAULT_ACCOUNT = web3.eth.accounts[0];
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
        it('should return default account', () => {
            const defaultAccount = repuxWeb3Api.getDefaultAccount();
            expect(defaultAccount).to.equal(DEFAULT_ACCOUNT);
        });
    });

    describe('getBalance()', () => {
        it('should return user balance', async () => {
            const balance = await repuxWeb3Api.getBalance();
            expect(balance.valueOf()).to.equal('100000000000000000000');
        });

        it('should return user balance by account', async () => {
            const balance = await repuxWeb3Api.getBalance(DEFAULT_ACCOUNT);
            expect(balance.valueOf(), '100000000000000000000');
        });
    });
});
