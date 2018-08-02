import BigNumber from 'bignumber.js';

export interface DataProduct {
  address: string;
  owner: string;
  price: BigNumber;
  sellerMetaHash: string;
  buyersDeposit: BigNumber;
  fundsAccumulated: BigNumber;
  disabled: boolean;
}
