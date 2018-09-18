[API Reference](../README.md) > [RepuxWeb3Api](../classes/repuxweb3api.md)

# Class: RepuxWeb3Api

Repux API

## Hierarchy

**RepuxWeb3Api**

## Index

### Constructors

* [constructor](repuxweb3api.md#constructor)

### Methods

* [approveTokensTransferForDataProductPurchase](repuxweb3api.md#approvetokenstransferfordataproductpurchase)
* [cancelDataProductPurchase](repuxweb3api.md#canceldataproductpurchase)
* [createDataProduct](repuxweb3api.md#createdataproduct)
* [disableDataProduct](repuxweb3api.md#disabledataproduct)
* [finaliseDataProductPurchase](repuxweb3api.md#finalisedataproductpurchase)
* [getBalance](repuxweb3api.md#getbalance)
* [getBoughtAndFinalisedDataProducts](repuxweb3api.md#getboughtandfinaliseddataproducts)
* [getBoughtDataProducts](repuxweb3api.md#getboughtdataproducts)
* [getCreatedDataProducts](repuxweb3api.md#getcreateddataproducts)
* [getDataProduct](repuxweb3api.md#getdataproduct)
* [getDataProductBuyersAddresses](repuxweb3api.md#getdataproductbuyersaddresses)
* [getDataProductOrder](repuxweb3api.md#getdataproductorder)
* [getDefaultAccount](repuxweb3api.md#getdefaultaccount)
* [getEthBalance](repuxweb3api.md#getethbalance)
* [getNetworkId](repuxweb3api.md#getnetworkid)
* [init](repuxweb3api.md#init)
* [isTransferForPurchaseApproved](repuxweb3api.md#istransferforpurchaseapproved)
* [purchaseDataProduct](repuxweb3api.md#purchasedataproduct)
* [rateDataProductPurchase](repuxweb3api.md#ratedataproductpurchase)
* [waitForTransactionResult](repuxweb3api.md#waitfortransactionresult)
* [withdrawFundsFromDataProduct](repuxweb3api.md#withdrawfundsfromdataproduct)
* [getVersion](repuxweb3api.md#getversion)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new RepuxWeb3Api**(web3: *`any`*, contracts: *`object`*): [RepuxWeb3Api](repuxweb3api.md)

*Defined in [src/index.ts:66](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L66)*

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| web3 | `any` |  JavaScript Web3 API object (see: [https://github.com/ethereum/web3.js/](https://github.com/ethereum/web3.js/)) |
| contracts | `object` |  Addresses of Registry and Token contracts |

**Returns:** [RepuxWeb3Api](repuxweb3api.md)

___

## Methods

<a id="approvetokenstransferfordataproductpurchase"></a>

###  approveTokensTransferForDataProductPurchase

▸ **approveTokensTransferForDataProductPurchase**(dataProductAddress: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:316](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L316)*

Approves token transfer for DataProduct purchase

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dataProductAddress | `string` |  product address |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`string`>
Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)

___
<a id="canceldataproductpurchase"></a>

###  cancelDataProductPurchase

▸ **cancelDataProductPurchase**(dataProductAddress: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:476](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L476)*

Cancels Data Product purchase (works only after deliveryDeadline)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dataProductAddress | `string` |  product address |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`string`>
Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)

___
<a id="createdataproduct"></a>

###  createDataProduct

▸ **createDataProduct**(metaFileHash: *`string`*, price: *`BigNumber`*, daysToDeliver: *`number`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:212](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L212)*

Creates product contract

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| metaFileHash | `string` |  IPFS hash of meta file |
| price | `BigNumber` |  product price |
| daysToDeliver | `number` |  max days to finalise transaction |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`string`>
Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)

___
<a id="disabledataproduct"></a>

###  disableDataProduct

▸ **disableDataProduct**(dataProductAddress: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:457](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L457)*

Disables Data Product

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dataProductAddress | `string` |  product address |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`string`>
Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)

___
<a id="finalisedataproductpurchase"></a>

###  finaliseDataProductPurchase

▸ **finaliseDataProductPurchase**(dataProductAddress: *`string`*, buyerAddress: *`string`*, buyerMetaHash: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:375](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L375)*

Finalises data product purchase

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dataProductAddress | `string` |  product address |
| buyerAddress | `string` |  buyer address |
| buyerMetaHash | `string` |  IPFS file hash of meta file for re-encrypted file |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`string`>
Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)

___
<a id="getbalance"></a>

###  getBalance

▸ **getBalance**(account?: * `undefined` &#124; `string`*): `Promise`<`BigNumber`>

*Defined in [src/index.ts:157](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L157)*

Return account REPUX balance value

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`BigNumber`>
specified account balance value

___
<a id="getboughtandfinaliseddataproducts"></a>

###  getBoughtAndFinalisedDataProducts

▸ **getBoughtAndFinalisedDataProducts**(account?: * `undefined` &#124; `string`*): `Promise`<`string`[]>

*Defined in [src/index.ts:411](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L411)*

Returns products bought by provided account and approved

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`string`[]>
array of bought and finalised products addresses

___
<a id="getboughtdataproducts"></a>

###  getBoughtDataProducts

▸ **getBoughtDataProducts**(account?: * `undefined` &#124; `string`*): `Promise`<`string`[]>

*Defined in [src/index.ts:398](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L398)*

Returns products bought by provided account

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`string`[]>
array of bought products addresses

___
<a id="getcreateddataproducts"></a>

###  getCreatedDataProducts

▸ **getCreatedDataProducts**(account?: * `undefined` &#124; `string`*): `Promise`<`string`[]>

*Defined in [src/index.ts:424](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L424)*

Returns products created by provided account

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`string`[]>
array of created products addresses

___
<a id="getdataproduct"></a>

###  getDataProduct

▸ **getDataProduct**(dataProductAddress: *`string`*): `Promise`<[DataProduct](../interfaces/dataproduct.md)>

*Defined in [src/index.ts:233](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L233)*

Returns DataProduct data

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dataProductAddress | `string` |  product address |

**Returns:** `Promise`<[DataProduct](../interfaces/dataproduct.md)>
DataProduct object

___
<a id="getdataproductbuyersaddresses"></a>

###  getDataProductBuyersAddresses

▸ **getDataProductBuyersAddresses**(dataProductAddress: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`[]>

*Defined in [src/index.ts:495](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L495)*

Returns all buyers addresses by DataProduct address

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dataProductAddress | `string` |  product address |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`string`[]>
array of buyers addresses

___
<a id="getdataproductorder"></a>

###  getDataProductOrder

▸ **getDataProductOrder**(dataProductAddress: *`string`*, buyerAddress: *`string`*): `Promise`< [DataProductOrder](../interfaces/dataproductorder.md) &#124; `undefined`>

*Defined in [src/index.ts:265](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L265)*

Returns transaction on DataProduct by buyerAddress

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dataProductAddress | `string` |  product address |
| buyerAddress | `string` |  buyer address |

**Returns:** `Promise`< [DataProductOrder](../interfaces/dataproductorder.md) &#124; `undefined`>
DataProductOrder object

___
<a id="getdefaultaccount"></a>

###  getDefaultAccount

▸ **getDefaultAccount**(): `Promise`<`string`>

*Defined in [src/index.ts:141](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L141)*

Returns default account

**Returns:** `Promise`<`string`>
default account address

___
<a id="getethbalance"></a>

###  getEthBalance

▸ **getEthBalance**(account?: * `undefined` &#124; `string`*): `Promise`<`BigNumber`>

*Defined in [src/index.ts:171](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L171)*

Return account ETH balance value

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`BigNumber`>
specified account balance value

___
<a id="getnetworkid"></a>

###  getNetworkId

▸ **getNetworkId**(): `Promise`<`number`>

*Defined in [src/index.ts:193](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L193)*

Returns network Id

**Returns:** `Promise`<`number`>
current network ID

___
<a id="init"></a>

###  init

▸ **init**(): `Promise`<`number`>

*Defined in [src/index.ts:105](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L105)*

Sets up contracts

**Returns:** `Promise`<`number`>
INIT_STATUS_ALREADY_INITIALIZED if already initialized, INIT_STATUS_INITIALIZED otherwise

___
<a id="istransferforpurchaseapproved"></a>

###  isTransferForPurchaseApproved

▸ **isTransferForPurchaseApproved**(dataProductAddress: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`Boolean`>

*Defined in [src/index.ts:335](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L335)*

Returns true if approveTokensTransferForDataProductPurchase is already called

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dataProductAddress | `string` |  product address |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`Boolean`>
true if approved, false otherwise

___
<a id="purchasedataproduct"></a>

###  purchaseDataProduct

▸ **purchaseDataProduct**(dataProductAddress: *`string`*, publicKey: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:354](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L354)*

Purchases DataProduct

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dataProductAddress | `string` |  product address |
| publicKey | `string` |  buyer public key (needed for file encryption) |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`string`>
Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)

___
<a id="ratedataproductpurchase"></a>

###  rateDataProductPurchase

▸ **rateDataProductPurchase**(dataProductAddress: *`string`*, score: *`BigNumber`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:515](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L515)*

Rates data product purchase transaction (can be called only by buyer)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dataProductAddress | `string` |  product address |
| score | `BigNumber` |  should be a number from 1 to 5 |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`string`>
Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)

___
<a id="waitfortransactionresult"></a>

###  waitForTransactionResult

▸ **waitForTransactionResult**(transactionHash: *`string`*, timeInterval?: *`number`*): `Promise`<[TransactionReceipt](../interfaces/transactionreceipt.md)>

*Defined in [src/index.ts:534](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L534)*

Waits for transaction result and returns getTransactionReceipt
*__result__*: transaction receipt

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| transactionHash | `string` | - |  hash of transaction to check |
| `Default value` timeInterval | `number` | 1000 |  time interval between status checks in milliseconds, default: 1000 |

**Returns:** `Promise`<[TransactionReceipt](../interfaces/transactionreceipt.md)>

___
<a id="withdrawfundsfromdataproduct"></a>

###  withdrawFundsFromDataProduct

▸ **withdrawFundsFromDataProduct**(dataProductAddress: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:438](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L438)*

Withdraws funds from data product to owner account

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| dataProductAddress | `string` |  product address |
| `Optional` account |  `undefined` &#124; `string`|  account address, default: RepuxWeb3Api#getDefaultAccount |

**Returns:** `Promise`<`string`>
Transaction hash (to see transaction result use: RepuxWeb3Api#waitForTransactionResult)

___
<a id="getversion"></a>

### `<Static>` getVersion

▸ **getVersion**(): `string`

*Defined in [src/index.ts:97](https://github.com/repux/repux-web3-api/blob/bb65574/src/index.ts#L97)*

Returns API version

**Returns:** `string`
API version

___

