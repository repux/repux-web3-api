import { VersionEntry } from './version-entry';
import { Method } from './method';
import { ContractType } from './contract-type';

export const versionMap = new Map<Method, VersionEntry[]>([
  [ Method.createDataProduct, [
    { contractType: ContractType.Registry, minVersion: 1 }
  ] ],
  [ Method.getBoughtDataProducts, [
    { contractType: ContractType.Registry, minVersion: 1 }
  ] ],
  [ Method.getBoughtAndFinalisedDataProducts, [
    { contractType: ContractType.Registry, minVersion: 1 }
  ] ],
  [ Method.getCreatedDataProducts, [
    { contractType: ContractType.Registry, minVersion: 1 }
  ] ],
  [ Method.getDataProduct, [
    { contractType: ContractType.DataProduct, minVersion: 1 }
  ] ],
  [ Method.approveTokensTransferForDataProductPurchase, [
    { contractType: ContractType.DataProduct, minVersion: 1 }
  ] ],
  [ Method.purchaseDataProduct, [
    { contractType: ContractType.DataProduct, minVersion: 1 }
  ] ],
  [ Method.finaliseDataProductPurchase, [
    { contractType: ContractType.DataProduct, minVersion: 1 }
  ] ],
  [ Method.withdrawFundsFromDataProduct, [
    { contractType: ContractType.DataProduct, minVersion: 1 }
  ] ],
  [ Method.disableDataProduct, [
    { contractType: ContractType.DataProduct, minVersion: 1 }
  ] ],
  [ Method.cancelDataProductPurchase, [
    { contractType: ContractType.DataProduct, minVersion: 1 }
  ] ],
  [ Method.getDataProductBuyersAddresses, [
    { contractType: ContractType.DataProduct, minVersion: 1 }
  ] ],
  [ Method.rateDataProductPurchase, [
    { contractType: ContractType.DataProduct, minVersion: 1 }
  ] ],
  [ Method.getDataProductOrder, [
    { contractType: ContractType.DataProduct, minVersion: 1 },
    { contractType: ContractType.Order, minVersion: 1 }
  ] ]
]);
