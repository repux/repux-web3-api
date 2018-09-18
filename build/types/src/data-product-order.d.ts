import BigNumber from 'bignumber.js';

export interface DataProductOrder {
  /**
   * Order contract address
   */
  address: string;

  /**
   * Product contract address
   */
  dataProductAddress: string;

  /**
   * Buyer address
   */
  buyerAddress: string;

  /**
   * Buyer public key (needed for file encryption)
   */
  publicKey: string;

  /**
   * IPFS hash of meta file for re-encrypted product
   */
  buyerMetaHash: string;

  /**
   * Date until Order rating is available
   */
  rateDeadline: Date;

  /**
   * Date until Order finalisation is available
   */
  deliveryDeadline: Date;

  /**
   * Product price
   */
  price: BigNumber;

  /**
   * Order fee
   */
  fee: BigNumber;

  /**
   * If true, Order is purchased
   */
  purchased: boolean;

  /**
   * If true, Order is finalised
   */
  finalised: boolean;

  /**
   * If true, order is rated
   */
  rated: boolean;

  /**
   * Order rating (from 1 to 5)
   */
  rating: BigNumber;
}
