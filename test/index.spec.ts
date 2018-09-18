import 'mocha';
import { expect } from 'chai';
import {
  RepuxWeb3Api,
  INIT_STATUS_INITIALIZED,
  INIT_STATUS_ALREADY_INITIALIZED, TransactionStatus
} from '../src';
import BigNumber from 'bignumber.js';
// @ts-ignore
import Web3 from 'web3';
import config from './config';

let web3: any,
  repuxWeb3Api: RepuxWeb3Api,
  DEFAULT_ACCOUNT: string,
  SECONDARY_ACCOUNT: string,
  createdProduct: string;

describe('RepuX Web3 API', () => {
  const metaFileHash = 'SOME_HASH';
  const daysToDeliver = 0;
  const price = new BigNumber(1.1);

  before(async () => {
    web3 = new Web3(new Web3.providers.HttpProvider(config.ETH_NODE_URL));
    repuxWeb3Api = new RepuxWeb3Api(web3, {
      REGISTRY_CONTRACT_ADDRESS: config.REGISTRY_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_ADDRESS: config.TOKEN_CONTRACT_ADDRESS
    });

    await repuxWeb3Api.init();

    DEFAULT_ACCOUNT = web3.eth.accounts[ 0 ];
    SECONDARY_ACCOUNT = web3.eth.accounts[ 1 ];
  });

  describe('constructor()', () => {
    it('should throw an error when parameters are missing', () => {
      expect(() => new RepuxWeb3Api(<any> undefined, <any> {})).to.throw('web3 instance is required!');
    });

    it('should throw an error when Registry Contract address is not set', () => {
      expect(() => new RepuxWeb3Api(web3, <any> {})).to.throw('Repux Registry contract address should be set!');
    });

    it('should throw an error when Registry Contract address is not set', () => {
      expect(() => new RepuxWeb3Api(web3, <any> {})).to.throw('Repux Registry contract address should be set!');
    });

    it('should throw an error when Token Contract address is not set', () => {
      expect(() => new RepuxWeb3Api(web3, {
        REGISTRY_CONTRACT_ADDRESS: config.REGISTRY_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ADDRESS: <any> undefined
      })).to.throw('Repux Token contract address should be set!');
    });
  });

  describe('init()', () => {
    it('should set contract instances', async () => {
      await repuxWeb3Api.init();
      expect(repuxWeb3Api[ '_registry' ]).to.not.equal(undefined);
      expect(repuxWeb3Api[ '_token' ]).to.not.equal(undefined);
    });

    it('should throw an error when wrong contract address provided', async () => {
      const api = new RepuxWeb3Api(web3, {
        REGISTRY_CONTRACT_ADDRESS: '0xc2d327375dd73b132d1171aadf7a205d3a9b7d8g',
        TOKEN_CONTRACT_ADDRESS: config.TOKEN_CONTRACT_ADDRESS
      });

      let errorThrown = false;
      try {
        await api.init();
      } catch (err) {
        errorThrown = true;
      }

      expect(errorThrown).to.equal(true);
    }).timeout(5000);

    it('should setup contracts only once', async () => {
      const api = new RepuxWeb3Api(web3, {
        REGISTRY_CONTRACT_ADDRESS: config.REGISTRY_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ADDRESS: config.TOKEN_CONTRACT_ADDRESS
      });
      let status = await api.init();
      expect(status).to.equal(INIT_STATUS_INITIALIZED);

      status = await api.init();
      expect(status).to.equal(INIT_STATUS_ALREADY_INITIALIZED);
    });
  });

  describe('getVersion()', () => {
    it('should return actual version', () => {
      const version = RepuxWeb3Api.getVersion();
      expect(typeof version).to.equal('string');
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
      const balance = await repuxWeb3Api.getBalance();
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
      expect(netId).to.not.equal(undefined);
    });
  });

  describe('createDataProduct()', () => {
    it('should call createDataProduct() method on _registry object', async () => {
      const transactionHash = await repuxWeb3Api.createDataProduct(metaFileHash, price, daysToDeliver, DEFAULT_ACCOUNT);
      const result = await repuxWeb3Api.waitForTransactionResult(transactionHash);
      expect(result.status).to.equal(TransactionStatus.SUCCESSFUL);
      const createdProducts = await repuxWeb3Api.getCreatedDataProducts(DEFAULT_ACCOUNT);
      createdProduct = createdProducts[ createdProducts.length - 1 ];
    });
  });

  describe('getDataProduct()', () => {
    it('should return DataProduct by address', async () => {
      const result = await repuxWeb3Api.getDataProduct(createdProduct);
      expect(result.address).to.equal(createdProduct);
      expect(result.owner).to.equal(DEFAULT_ACCOUNT);
      expect(result.sellerMetaHash).to.equal('SOME_HASH');
      expect(result.price.toString()).to.equal('1.1');
      expect(result.disabled).to.equal(false);
    });
  });

  describe('purchaseDataProduct()', () => {
    it('shouldn\'t throw any errors', async () => {
      try {
        const approveTransactionHash = await repuxWeb3Api.approveTokensTransferForDataProductPurchase(createdProduct, SECONDARY_ACCOUNT);
        await repuxWeb3Api.waitForTransactionResult(approveTransactionHash);
        expect(await repuxWeb3Api.isTransferForPurchaseApproved(createdProduct, SECONDARY_ACCOUNT)).to.equal(true);

        const transactionHash = await repuxWeb3Api.purchaseDataProduct(createdProduct, 'SOME_PUBLIC_KEY', SECONDARY_ACCOUNT);
        const result = await repuxWeb3Api.waitForTransactionResult(transactionHash);
        expect(result.status).to.equal(TransactionStatus.SUCCESSFUL);
      } catch (error) {
        console.log(error);
        expect(false).to.equal(true);
      }
    });
  });

  describe('getDataProductOrder()', () => {
    it('should return DataProduct order by dataProductAddress and buyerAddress', async () => {
      const result = await repuxWeb3Api.getDataProductOrder(createdProduct, SECONDARY_ACCOUNT);

      expect(result).to.not.equal(undefined);

      if (!result) {
        return;
      }

      expect(result.publicKey).to.equal('SOME_PUBLIC_KEY');
      expect(result.buyerMetaHash).to.equal('');
      expect(result.price.toString()).to.equal('1.1');
      expect(result.purchased).to.equal(true);
      expect(result.finalised).to.equal(false);
      expect(result.rated).to.equal(false);
      expect(result.rating.toString()).to.equal('0');
    });
  });

  describe('getBoughtDataProducts()', () => {
    it('should return list containing addresses of products bought by account owner', async () => {
      const result = await repuxWeb3Api.getBoughtDataProducts(SECONDARY_ACCOUNT);
      expect(result.length > 0);
      expect(result.includes(createdProduct));
    });

    it('should\'t return address of product created by account owner', async () => {
      const result = await repuxWeb3Api.getBoughtDataProducts(DEFAULT_ACCOUNT);
      expect(!result.includes(createdProduct));
    });
  });

  describe('getCreatedDataProducts()', () => {
    it('should return list containing addresses of products created by account owner', async () => {
      const result = await repuxWeb3Api.getCreatedDataProducts(DEFAULT_ACCOUNT);
      expect(result.length > 0);
      expect(result.includes(createdProduct));
    });

    it('should\'t return address of product bought by account owner', async () => {
      const result = await repuxWeb3Api.getCreatedDataProducts(SECONDARY_ACCOUNT);
      expect(!result.includes(createdProduct));
    });
  });

  describe('finaliseDataProductPurchase()', () => {
    it('shouldn\'t throw any errors', async () => {
      try {
        const transactionHash = await repuxWeb3Api.finaliseDataProductPurchase(createdProduct, SECONDARY_ACCOUNT, 'SOME_HASH');
        const result = await repuxWeb3Api.waitForTransactionResult(transactionHash);
        expect(result.status).to.equal(TransactionStatus.SUCCESSFUL);
      } catch (error) {
        console.log(error);
        expect(false).to.equal(true);
      }
    });
  });

  describe('getBoughtAndFinalisedDataProducts()', () => {
    it('should return list containing addresses of products bought by account owner', async () => {
      const result = await repuxWeb3Api.getBoughtAndFinalisedDataProducts(SECONDARY_ACCOUNT);
      expect(result.length > 0);
      expect(result.includes(createdProduct));
    });

    it('should\'t return address of product created by account owner', async () => {
      const result = await repuxWeb3Api.getBoughtAndFinalisedDataProducts(DEFAULT_ACCOUNT);
      expect(!result.includes(createdProduct));
    });
  });

  describe('withdrawFundsFromDataProduct()', () => {
    it('should withdraw funds from data product contract', async () => {
      try {
        const balanceBefore = await repuxWeb3Api.getBalance(createdProduct);
        expect(balanceBefore.toString()).to.equal(price.toString());

        const transactionHash = await repuxWeb3Api.withdrawFundsFromDataProduct(createdProduct);
        const result = await repuxWeb3Api.waitForTransactionResult(transactionHash);
        expect(result.status).to.equal(TransactionStatus.SUCCESSFUL);

        const balanceAfter = await repuxWeb3Api.getBalance(createdProduct);
        expect(balanceAfter.toString()).to.equal('0');
      } catch (error) {
        console.log(error);
        expect(false).to.equal(true);
      }
    });
  });

  describe('getDataProductBuyersAddresses()', () => {
    it('should return buyers addresses array', async () => {
      const addresses = await repuxWeb3Api.getDataProductBuyersAddresses(createdProduct);
      expect(addresses).to.deep.equal([ SECONDARY_ACCOUNT ]);
    });
  });

  describe('rateDataProductPurchase()', () => {
    it('shouldn\'t throw any errors', async () => {
      try {
        const transactionHash = await repuxWeb3Api.rateDataProductPurchase(createdProduct, new BigNumber(2), SECONDARY_ACCOUNT);
        const result = await repuxWeb3Api.waitForTransactionResult(transactionHash);
        expect(result.status).to.equal(TransactionStatus.SUCCESSFUL);
      } catch (error) {
        console.log(error);
        expect(false).to.equal(true);
      }
    });
  });

  describe('disableDataProduct()', () => {
    it('shouldn\'t throw any errors', async () => {
      try {
        const transactionHash = await repuxWeb3Api.disableDataProduct(createdProduct);
        const result = await repuxWeb3Api.waitForTransactionResult(transactionHash);
        expect(result.status).to.equal(TransactionStatus.SUCCESSFUL);

        const product = await repuxWeb3Api.getDataProduct(createdProduct);
        expect(product.disabled).to.equal(true);
      } catch (error) {
        console.log(error);
        expect(false).to.equal(true);
      }
    });
  });

  describe('cancelPurchase()', () => {
    it('shouldn\'t throw any errors', async () => {
      try {
        const productTransactionHash = await repuxWeb3Api.createDataProduct(metaFileHash, price, daysToDeliver, DEFAULT_ACCOUNT);
        await repuxWeb3Api.waitForTransactionResult(productTransactionHash);
        const createdProducts = await repuxWeb3Api.getCreatedDataProducts(DEFAULT_ACCOUNT);
        const product = createdProducts[ createdProducts.length - 1 ];

        const approveTransactionHash = await repuxWeb3Api.approveTokensTransferForDataProductPurchase(product, SECONDARY_ACCOUNT);
        await repuxWeb3Api.waitForTransactionResult(approveTransactionHash);

        const purchaseTransactionHash = await repuxWeb3Api.purchaseDataProduct(product, 'SOME_PUBLIC_KEY', SECONDARY_ACCOUNT);
        await repuxWeb3Api.waitForTransactionResult(purchaseTransactionHash);

        const transactionHash = await repuxWeb3Api.cancelDataProductPurchase(product, SECONDARY_ACCOUNT);
        const result = await repuxWeb3Api.waitForTransactionResult(transactionHash);
        expect(result.status).to.equal(TransactionStatus.SUCCESSFUL);
      } catch (error) {
        console.log(error);
        expect(false).to.equal(true);
      }
    });
  });
});
