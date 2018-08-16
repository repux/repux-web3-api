//@ts-ignore
import contract from 'truffle-contract';
import RegistryArtifacts from '../contracts/Registry.json';
import TokenArtifacts from '../contracts/DemoToken.json';
import DataProductArtifacts from '../contracts/DataProduct.json';
import OrderArtifacts from '../contracts/Order.json';
import packageConfig from '../package.json';
import BigNumber from 'bignumber.js';
import { DataProductUpdateAction } from './data-product-update-action';
import { DataProductOrder } from './data-product-order';
import { DataProduct } from './data-product';
import { TransactionLog } from './transaction-log';
import { TransactionReceipt } from './transaction-receipt';
import { TransactionStatus } from './transaction-status';

export {
  DataProductUpdateAction,
  DataProductOrder,
  DataProduct,
  TransactionLog,
  TransactionReceipt,
  TransactionStatus
};

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

let RegistryContract: any;
let TokenContract: any;
let DataProductContract: any;
let OrderContract: any;

// Workaround for a compatibility issue between web3@1.0.0-beta.29 and truffle-contract@3.0.3
// https://github.com/trufflesuite/truffle-contract/issues/57#issuecomment-331300494
function fixTruffleContractCompatibilityIssue(web3: any) {
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
export class RepuxWeb3Api {
  private readonly _registryContractAddress: string;
  private readonly _tokenContractAddress: string;
  private readonly _web3: any;
  private readonly _provider: any;
  private initialized = false;
  private _registry: any;
  private _token: any;

  constructor(web3: any, contracts: { REGISTRY_CONTRACT_ADDRESS: string, TOKEN_CONTRACT_ADDRESS: string }) {
    if (typeof web3 === 'undefined') {
      throw new Error('web3 instance is required!');
    }

    if (!contracts.REGISTRY_CONTRACT_ADDRESS) {
      throw new Error('Repux Registry contract address should be set!');
    }

    this._registryContractAddress = contracts.REGISTRY_CONTRACT_ADDRESS;

    if (!contracts.TOKEN_CONTRACT_ADDRESS) {
      throw new Error('Repux Token contract address should be set!');
    }

    this._tokenContractAddress = contracts.TOKEN_CONTRACT_ADDRESS;

    this._web3 = fixTruffleContractCompatibilityIssue(web3);
    this._provider = this._web3.currentProvider;
  }

  /**
   * Return API version
   */
  static getVersion() {
    return packageConfig.version;
  }

  /**
   * Sets up contracts
   */
  init() {
    return new Promise((resolve, reject) => {
      if (this.initialized) {
        resolve(INIT_STATUS_ALREADY_INITIALIZED);
      }

      RegistryContract = contract(RegistryArtifacts);
      TokenContract = contract(TokenArtifacts);
      DataProductContract = contract(DataProductArtifacts);
      OrderContract = contract(OrderArtifacts);

      RegistryContract.setProvider(this._provider);
      TokenContract.setProvider(this._provider);
      DataProductContract.setProvider(this._provider);
      OrderContract.setProvider(this._provider);

      RegistryContract.at(this._registryContractAddress)
        .then((registry: any) => {
          this._registry = registry;
          return TokenContract.at(this._tokenContractAddress);
        })
        .then((token: any) => {
          this._token = token;
          this.initialized = true;
          resolve(INIT_STATUS_INITIALIZED);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  /**
   * Returns Token contract instance
   */
  getTokenContract() {
    if (!this.initialized) {
      throw new Error(ERR_INIT);
    }

    return this._token;
  }

  /**
   * Returns Registry contract instance
   */
  getRegistryContract() {
    if (!this.initialized) {
      throw new Error(ERR_INIT);
    }

    return this._registry;
  }

  /**
   * Returns default account
   */
  getDefaultAccount(): Promise<string> {
    return new Promise(resolve => {
      this._web3.eth.getAccounts((error: any, accounts: string[]) => {
        resolve(accounts[ 0 ]);
      });
    });
  }

  /**
   * Return account balance value
   */
  async getBalance(account?: string) {
    if (!account) {
      account = await this.getDefaultAccount();
    }

    const result = await this.getTokenContract().balanceOf.call(account);
    return new BigNumber(this._web3.fromWei(result));
  }

  /**
   * Returns network Id
   */
  getNetworkId() {
    return new Promise(resolve => {
      this._web3.version.getNetwork((err: any, netId: string) => resolve(+netId));
    });
  }

  /**
   * Creates product contract
   */
  async createDataProduct(metaFileHash: string, price: BigNumber, daysToDeliver: number, account?: string): Promise<string> {
    if (!account) {
      account = await this.getDefaultAccount();
    }

    return this.getRegistryContract().createDataProduct.sendTransaction(
      metaFileHash,
      this._web3.toWei(price.toString()),
      daysToDeliver,
      {
        from: account,
        gas: PRODUCT_CREATION_GAS_LIMIT
      }
    );
  }

  /**
   * Returns DataProduct data
   */
  async getDataProduct(dataProductAddress: string): Promise<DataProduct> {
    const product = await DataProductContract.at(dataProductAddress);

    const promises = [
      dataProductAddress,
      product.owner.call(),
      product.price.call(),
      product.sellerMetaHash.call(),
      product.buyersDeposit.call(),
      this.getBalance(dataProductAddress),
      product.disabled.call()
    ];

    const values = await Promise.all(promises);

    return {
      address: values[ 0 ],
      owner: values[ 1 ],
      price: this._web3.fromWei(values[ 2 ]),
      sellerMetaHash: values[ 3 ],
      buyersDeposit: this._web3.fromWei(values[ 4 ]),
      fundsAccumulated: values[ 5 ],
      disabled: values[ 6 ]
    };
  }

  /**
   * Returns transaction on DataProduct by buyerAddress
   */
  async getDataProductOrder(dataProductAddress: string, buyerAddress: string): Promise<DataProductOrder | undefined> {
    const product = await DataProductContract.at(dataProductAddress);
    const transactionAddress = await product.getOrderFor(buyerAddress);

    if (parseInt(transactionAddress, 0) === 0) {
      return;
    }

    const transaction = await OrderContract.at(transactionAddress);

    const promises = [
      transactionAddress,
      dataProductAddress,
      buyerAddress,
      transaction.buyerPublicKey.call(),
      transaction.buyerMetaHash.call(),
      transaction.rateDeadline.call(),
      transaction.deliveryDeadline.call(),
      transaction.price.call(),
      transaction.fee.call(),
      true,
      transaction.finalised.call(),
      transaction.rated.call(),
      transaction.rating.call()
    ];

    const values = await Promise.all(promises);

    return {
      address: values[ 0 ],
      dataProductAddress: values[ 1 ],
      buyerAddress: values[ 2 ],
      publicKey: values[ 3 ],
      buyerMetaHash: await values[ 4 ],
      rateDeadline: new Date((values[ 5 ]).toNumber() * 1000),
      deliveryDeadline: new Date((values[ 6 ]).toNumber() * 1000),
      price: new BigNumber(this._web3.fromWei(values[ 7 ])),
      fee: new BigNumber(this._web3.fromWei(values[ 8 ])),
      purchased: values[ 9 ],
      finalised: await values[ 10 ],
      rated: await values[ 11 ],
      rating: new BigNumber(values[ 12 ])
    };
  }

  /**
   * Approves token transfer for DataProduct purchase
   */
  async approveTokensTransferForDataProductPurchase(dataProductAddress: string, account?: string): Promise<string> {
    if (!account) {
      account = await this.getDefaultAccount();
    }

    const product = await DataProductContract.at(dataProductAddress);
    const price = await product.price.call();

    return this.getTokenContract().approve.sendTransaction(dataProductAddress, price, {
      from: account
    });
  }

  /**
   * Purchases DataProduct
   */
  async purchaseDataProduct(dataProductAddress: string, publicKey: string, account?: string): Promise<string> {
    if (!account) {
      account = await this.getDefaultAccount();
    }

    const product = await DataProductContract.at(dataProductAddress);

    return product.purchase.sendTransaction(publicKey, {
      from: account,
      gas: PRODUCT_PURCHASE_GAS_LIMIT
    });
  }

  /**
   * Finalises data product purchase
   */
  async finaliseDataProductPurchase(dataProductAddress: string, buyerAddress: string, buyerMetaHash: string, account?: string): Promise<string> {
    if (!account) {
      account = await this.getDefaultAccount();
    }

    const product = await DataProductContract.at(dataProductAddress);

    return product.finalise.sendTransaction(buyerAddress, buyerMetaHash, {
      from: account,
      gas: PRODUCT_PURCHASE_APPROVE_GAS_LIMIT
    });
  }

  /**
   * Returns products bought by provided account
   */
  async getBoughtDataProducts(account?: string): Promise<string[]> {
    if (!account) {
      account = await this.getDefaultAccount();
    }

    return this.getRegistryContract().getDataPurchasedFor.call(account);
  }

  /**
   * Returns products bought by provided account and approved
   */
  async getBoughtAndFinalisedDataProducts(account?: string): Promise<string[]> {
    if (!account) {
      account = await this.getDefaultAccount();
    }

    return this.getRegistryContract().getDataFinalisedFor.call(account);
  }

  /**
   * Returns products created by provided account
   */
  async getCreatedDataProducts(account?: string): Promise<string[]> {
    if (!account) {
      account = await this.getDefaultAccount();
    }

    return this.getRegistryContract().getDataCreatedFor.call(account);
  }

  /**
   * Withdraws funds from data product to owner account
   */
  async withdrawFundsFromDataProduct(dataProductAddress: string, account?: string): Promise<string> {
    if (!account) {
      account = await this.getDefaultAccount();
    }

    const product = await DataProductContract.at(dataProductAddress);

    return product.withdraw.sendTransaction({
      from: account,
      gas: PRODUCT_WITHDRAW_GAS_LIMIT
    });
  }

  /**
   * Disables Data Product
   */
  async disableDataProduct(dataProductAddress: string, account?: string): Promise<string> {
    if (!account) {
      account = await this.getDefaultAccount();
    }

    const product = await DataProductContract.at(dataProductAddress);

    return product.disable.sendTransaction({
      from: account,
      gas: PRODUCT_DELETION_GAS_LIMIT
    });
  }

  /**
   * Cancels Data Product purchase (works only after deliveryDeadline)
   */
  async cancelDataProductPurchase(dataProductAddress: string, account?: string): Promise<string> {
    if (!account) {
      account = await this.getDefaultAccount();
    }

    const product = await DataProductContract.at(dataProductAddress);

    return product.cancelPurchase.sendTransaction({
      from: account,
      gas: PRODUCT_PURCHASE_CANCEL_GAS_LIMIT
    });
  }

  /**
   * Returns all buyers addresses by DataProduct address
   */
  async getDataProductBuyersAddresses(dataProductAddress: string, account?: string): Promise<string[]> {
    if (!account) {
      account = await this.getDefaultAccount();
    }

    const product = await DataProductContract.at(dataProductAddress);

    return product.getBuyersAddresses({
      from: account,
      gas: PRODUCT_PURCHASE_CANCEL_GAS_LIMIT
    });
  }

  /**
   * Rates data product purchase transaction (can be called only by buyer)
   */
  async rateDataProductPurchase(dataProductAddress: string, score: BigNumber, account?: string): Promise<string> {
    if (!account) {
      account = await this.getDefaultAccount();
    }

    const product = await DataProductContract.at(dataProductAddress);

    return product.rate.sendTransaction(score.toString(), {
      from: account,
      gas: PRODUCT_PURCHASE_RATE_GAS_LIMIT
    });
  }

  /**
   * Waits for transaction result and returns getTransactionReceipt
   */
  async waitForTransactionResult(transactionHash: string, timeInterval: number = 1000): Promise<TransactionReceipt> {
    return new Promise<any>((resolve, reject) => {
      const makeAttempt = () => {
        this._web3.eth.getTransactionReceipt(transactionHash, async (errTx: any, result: TransactionReceipt) => {
          if (errTx) {
            clearInterval(interval);
            return reject(errTx)
          }

          if (result && result.status) {
            clearInterval(interval);
            resolve(result);
          }
        });
      };

      const interval = setInterval(makeAttempt, timeInterval);
      makeAttempt();
    });
  }
}
