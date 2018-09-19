[API Reference](../README.md) > ["src/index"](../modules/_src_index_.md) > [Index](../classes/_src_index_.index.md)

# Class: Index

Repux API

## Hierarchy

**Index**

## Index

### Constructors

* [constructor](_src_index_.index.md#constructor)

### Properties

* [_provider](_src_index_.index.md#_provider)
* [_registry](_src_index_.index.md#_registry)
* [_registryContractAddress](_src_index_.index.md#_registrycontractaddress)
* [_token](_src_index_.index.md#_token)
* [_tokenContractAddress](_src_index_.index.md#_tokencontractaddress)
* [_web3](_src_index_.index.md#_web3)
* [initialized](_src_index_.index.md#initialized)

### Methods

* [approveTokensTransferForDataProductPurchase](_src_index_.index.md#approvetokenstransferfordataproductpurchase)
* [cancelDataProductPurchase](_src_index_.index.md#canceldataproductpurchase)
* [createDataProduct](_src_index_.index.md#createdataproduct)
* [disableDataProduct](_src_index_.index.md#disabledataproduct)
* [finaliseDataProductPurchase](_src_index_.index.md#finalisedataproductpurchase)
* [getBalance](_src_index_.index.md#getbalance)
* [getBoughtAndFinalisedDataProducts](_src_index_.index.md#getboughtandfinaliseddataproducts)
* [getBoughtDataProducts](_src_index_.index.md#getboughtdataproducts)
* [getCreatedDataProducts](_src_index_.index.md#getcreateddataproducts)
* [getDataProduct](_src_index_.index.md#getdataproduct)
* [getDataProductBuyersAddresses](_src_index_.index.md#getdataproductbuyersaddresses)
* [getDataProductOrder](_src_index_.index.md#getdataproductorder)
* [getDefaultAccount](_src_index_.index.md#getdefaultaccount)
* [getNetworkId](_src_index_.index.md#getnetworkid)
* [getRegistryContract](_src_index_.index.md#getregistrycontract)
* [getTokenContract](_src_index_.index.md#gettokencontract)
* [init](_src_index_.index.md#init)
* [purchaseDataProduct](_src_index_.index.md#purchasedataproduct)
* [rateDataProductPurchase](_src_index_.index.md#ratedataproductpurchase)
* [waitForTransactionResult](_src_index_.index.md#waitfortransactionresult)
* [withdrawFundsFromDataProduct](_src_index_.index.md#withdrawfundsfromdataproduct)
* [getVersion](_src_index_.index.md#getversion)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Index**(web3: *`any`*, contracts: *`object`*): [Index](_src_index_.index.md)

*Defined in [src/index.ts:66](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L66)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| web3 | `any` |
| contracts | `object` |

**Returns:** [Index](_src_index_.index.md)

___

## Properties

<a id="_provider"></a>

### `<Private>` _provider

**● _provider**: *`any`*

*Defined in [src/index.ts:63](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L63)*

___
<a id="_registry"></a>

### `<Private>` _registry

**● _registry**: *`any`*

*Defined in [src/index.ts:65](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L65)*

___
<a id="_registrycontractaddress"></a>

### `<Private>` _registryContractAddress

**● _registryContractAddress**: *`string`*

*Defined in [src/index.ts:60](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L60)*

___
<a id="_token"></a>

### `<Private>` _token

**● _token**: *`any`*

*Defined in [src/index.ts:66](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L66)*

___
<a id="_tokencontractaddress"></a>

### `<Private>` _tokenContractAddress

**● _tokenContractAddress**: *`string`*

*Defined in [src/index.ts:61](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L61)*

___
<a id="_web3"></a>

### `<Private>` _web3

**● _web3**: *`any`*

*Defined in [src/index.ts:62](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L62)*

___
<a id="initialized"></a>

### `<Private>` initialized

**● initialized**: *`boolean`* = false

*Defined in [src/index.ts:64](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L64)*

___

## Methods

<a id="approvetokenstransferfordataproductpurchase"></a>

###  approveTokensTransferForDataProductPurchase

▸ **approveTokensTransferForDataProductPurchase**(dataProductAddress: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:292](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L292)*

Approves token transfer for DataProduct purchase

**Parameters:**

| Param | Type |
| ------ | ------ |
| dataProductAddress | `string` |
| `Optional` account |  `undefined` &#124; `string`|

**Returns:** `Promise`<`string`>

___
<a id="canceldataproductpurchase"></a>

###  cancelDataProductPurchase

▸ **cancelDataProductPurchase**(dataProductAddress: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:410](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L410)*

Cancels Data Product purchase (works only after deliveryDeadline)

**Parameters:**

| Param | Type |
| ------ | ------ |
| dataProductAddress | `string` |
| `Optional` account |  `undefined` &#124; `string`|

**Returns:** `Promise`<`string`>

___
<a id="createdataproduct"></a>

###  createDataProduct

▸ **createDataProduct**(metaFileHash: *`string`*, price: *`BigNumber`*, daysToDeliver: *`number`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:196](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L196)*

Creates product contract

**Parameters:**

| Param | Type |
| ------ | ------ |
| metaFileHash | `string` |
| price | `BigNumber` |
| daysToDeliver | `number` |
| `Optional` account |  `undefined` &#124; `string`|

**Returns:** `Promise`<`string`>

___
<a id="disabledataproduct"></a>

###  disableDataProduct

▸ **disableDataProduct**(dataProductAddress: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:394](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L394)*

Disables Data Product

**Parameters:**

| Param | Type |
| ------ | ------ |
| dataProductAddress | `string` |
| `Optional` account |  `undefined` &#124; `string`|

**Returns:** `Promise`<`string`>

___
<a id="finalisedataproductpurchase"></a>

###  finaliseDataProductPurchase

▸ **finaliseDataProductPurchase**(dataProductAddress: *`string`*, buyerAddress: *`string`*, buyerMetaHash: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:324](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L324)*

Finalises data product purchase

**Parameters:**

| Param | Type |
| ------ | ------ |
| dataProductAddress | `string` |
| buyerAddress | `string` |
| buyerMetaHash | `string` |
| `Optional` account |  `undefined` &#124; `string`|

**Returns:** `Promise`<`string`>

___
<a id="getbalance"></a>

###  getBalance

▸ **getBalance**(account?: * `undefined` &#124; `string`*): `Promise`<`BigNumber`>

*Defined in [src/index.ts:170](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L170)*

Return account balance value

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` account |  `undefined` &#124; `string`|

**Returns:** `Promise`<`BigNumber`>

___
<a id="getboughtandfinaliseddataproducts"></a>

###  getBoughtAndFinalisedDataProducts

▸ **getBoughtAndFinalisedDataProducts**(account?: * `undefined` &#124; `string`*): `Promise`<`string`[]>

*Defined in [src/index.ts:356](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L356)*

Returns products bought by provided account and approved

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` account |  `undefined` &#124; `string`|

**Returns:** `Promise`<`string`[]>

___
<a id="getboughtdataproducts"></a>

###  getBoughtDataProducts

▸ **getBoughtDataProducts**(account?: * `undefined` &#124; `string`*): `Promise`<`string`[]>

*Defined in [src/index.ts:345](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L345)*

Returns products bought by provided account

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` account |  `undefined` &#124; `string`|

**Returns:** `Promise`<`string`[]>

___
<a id="getcreateddataproducts"></a>

###  getCreatedDataProducts

▸ **getCreatedDataProducts**(account?: * `undefined` &#124; `string`*): `Promise`<`string`[]>

*Defined in [src/index.ts:367](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L367)*

Returns products created by provided account

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` account |  `undefined` &#124; `string`|

**Returns:** `Promise`<`string`[]>

___
<a id="getdataproduct"></a>

###  getDataProduct

▸ **getDataProduct**(dataProductAddress: *`string`*): `Promise`<[DataProduct](../interfaces/_src_data_product_.dataproduct.md)>

*Defined in [src/index.ts:215](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L215)*

Returns DataProduct data

**Parameters:**

| Param | Type |
| ------ | ------ |
| dataProductAddress | `string` |

**Returns:** `Promise`<[DataProduct](../interfaces/_src_data_product_.dataproduct.md)>

___
<a id="getdataproductbuyersaddresses"></a>

###  getDataProductBuyersAddresses

▸ **getDataProductBuyersAddresses**(dataProductAddress: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`[]>

*Defined in [src/index.ts:426](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L426)*

Returns all buyers addresses by DataProduct address

**Parameters:**

| Param | Type |
| ------ | ------ |
| dataProductAddress | `string` |
| `Optional` account |  `undefined` &#124; `string`|

**Returns:** `Promise`<`string`[]>

___
<a id="getdataproductorder"></a>

###  getDataProductOrder

▸ **getDataProductOrder**(dataProductAddress: *`string`*, buyerAddress: *`string`*): `Promise`< [DataProductOrder](../interfaces/_src_data_product_order_.dataproductorder.md) &#124; `undefined`>

*Defined in [src/index.ts:244](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L244)*

Returns transaction on DataProduct by buyerAddress

**Parameters:**

| Param | Type |
| ------ | ------ |
| dataProductAddress | `string` |
| buyerAddress | `string` |

**Returns:** `Promise`< [DataProductOrder](../interfaces/_src_data_product_order_.dataproductorder.md) &#124; `undefined`>

___
<a id="getdefaultaccount"></a>

###  getDefaultAccount

▸ **getDefaultAccount**(): `Promise`<`string`>

*Defined in [src/index.ts:156](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L156)*

Returns default account

**Returns:** `Promise`<`string`>

___
<a id="getnetworkid"></a>

###  getNetworkId

▸ **getNetworkId**(): `Promise`<`Object`>

*Defined in [src/index.ts:182](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L182)*

Returns network Id

**Returns:** `Promise`<`Object`>

___
<a id="getregistrycontract"></a>

###  getRegistryContract

▸ **getRegistryContract**(): `any`

*Defined in [src/index.ts:145](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L145)*

Returns Registry contract instance

**Returns:** `any`

___
<a id="gettokencontract"></a>

###  getTokenContract

▸ **getTokenContract**(): `any`

*Defined in [src/index.ts:134](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L134)*

Returns Token contract instance

**Returns:** `any`

___
<a id="init"></a>

###  init

▸ **init**(): `Promise`<`Object`>

*Defined in [src/index.ts:99](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L99)*

Sets up contracts

**Returns:** `Promise`<`Object`>

___
<a id="purchasedataproduct"></a>

###  purchaseDataProduct

▸ **purchaseDataProduct**(dataProductAddress: *`string`*, publicKey: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:308](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L308)*

Purchases DataProduct

**Parameters:**

| Param | Type |
| ------ | ------ |
| dataProductAddress | `string` |
| publicKey | `string` |
| `Optional` account |  `undefined` &#124; `string`|

**Returns:** `Promise`<`string`>

___
<a id="ratedataproductpurchase"></a>

###  rateDataProductPurchase

▸ **rateDataProductPurchase**(dataProductAddress: *`string`*, score: *`BigNumber`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:442](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L442)*

Rates data product purchase transaction (can be called only by buyer)

**Parameters:**

| Param | Type |
| ------ | ------ |
| dataProductAddress | `string` |
| score | `BigNumber` |
| `Optional` account |  `undefined` &#124; `string`|

**Returns:** `Promise`<`string`>

___
<a id="waitfortransactionresult"></a>

###  waitForTransactionResult

▸ **waitForTransactionResult**(transactionHash: *`string`*, timeInterval?: *`number`*): `Promise`<[TransactionReceipt](../interfaces/_src_transaction_receipt_.transactionreceipt.md)>

*Defined in [src/index.ts:458](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L458)*

Waits for transaction result and returns getTransactionReceipt

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| transactionHash | `string` | - |
| `Default value` timeInterval | `number` | 1000 |

**Returns:** `Promise`<[TransactionReceipt](../interfaces/_src_transaction_receipt_.transactionreceipt.md)>

___
<a id="withdrawfundsfromdataproduct"></a>

###  withdrawFundsFromDataProduct

▸ **withdrawFundsFromDataProduct**(dataProductAddress: *`string`*, account?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in [src/index.ts:378](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L378)*

Withdraws funds from data product to owner account

**Parameters:**

| Param | Type |
| ------ | ------ |
| dataProductAddress | `string` |
| `Optional` account |  `undefined` &#124; `string`|

**Returns:** `Promise`<`string`>

___
<a id="getversion"></a>

### `<Static>` getVersion

▸ **getVersion**(): `any`

*Defined in [src/index.ts:92](https://github.com/repux/repux-web3-api/blob/d792f26/src/index.ts#L92)*

Return API version

**Returns:** `any`

___

