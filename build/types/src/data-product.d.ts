import BigNumber from 'bignumber.js';

export interface DataProduct {
  /**
   * Product contract address
   */
  address: string;

  /**
   * Product owner address
   */
  owner: string;

  /**
   * Product price
   */
  price: BigNumber;

  /**
   * IPFS hash of meta file
   */
  sellerMetaHash: string;

  /**
   * Funds locked until order finalisation
   */
  buyersDeposit: BigNumber;

  /**
   * Funds accumulated on product contract
   */
  fundsAccumulated: BigNumber;

  /**
   * If true, product is disabled
   */
  disabled: boolean;
}
