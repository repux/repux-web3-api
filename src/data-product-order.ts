import BigNumber from 'bignumber.js';

export interface DataProductOrder {
  address: string;
  dataProductAddress: string;
  buyerAddress: string;
  publicKey: string;
  buyerMetaHash: string;
  rateDeadline: Date;
  deliveryDeadline: Date;
  price: BigNumber;
  fee: BigNumber;
  purchased: boolean;
  finalised: boolean;
  rated: boolean;
  rating: BigNumber;
}
