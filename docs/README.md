
#  API Reference

## Index

### Enumerations

* [DataProductUpdateAction](enums/dataproductupdateaction.md)
* [TransactionStatus](enums/transactionstatus.md)

### Classes

* [RepuxWeb3Api](classes/repuxweb3api.md)

### Interfaces

* [DataProduct](interfaces/dataproduct.md)
* [DataProductOrder](interfaces/dataproductorder.md)
* [TransactionLog](interfaces/transactionlog.md)
* [TransactionReceipt](interfaces/transactionreceipt.md)

### Variables

* [DataProductContract](#dataproductcontract)
* [ERR_INIT](#err_init)
* [INIT_STATUS_ALREADY_INITIALIZED](#init_status_already_initialized)
* [INIT_STATUS_INITIALIZED](#init_status_initialized)
* [OrderContract](#ordercontract)
* [PRODUCT_CREATION_GAS_LIMIT](#product_creation_gas_limit)
* [PRODUCT_DELETION_GAS_LIMIT](#product_deletion_gas_limit)
* [PRODUCT_PURCHASE_APPROVE_GAS_LIMIT](#product_purchase_approve_gas_limit)
* [PRODUCT_PURCHASE_CANCEL_GAS_LIMIT](#product_purchase_cancel_gas_limit)
* [PRODUCT_PURCHASE_GAS_LIMIT](#product_purchase_gas_limit)
* [PRODUCT_PURCHASE_RATE_GAS_LIMIT](#product_purchase_rate_gas_limit)
* [PRODUCT_WITHDRAW_GAS_LIMIT](#product_withdraw_gas_limit)
* [RegistryContract](#registrycontract)
* [TokenContract](#tokencontract)

### Functions

* [fixTruffleContractCompatibilityIssue](#fixtrufflecontractcompatibilityissue)

---

## Variables

<a id="dataproductcontract"></a>

### `<Let>` DataProductContract

**● DataProductContract**: *`any`*

*Defined in [src/index.ts:40](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L40)*

___
<a id="err_init"></a>

### `<Const>` ERR_INIT

**● ERR_INIT**: *"Please initialize library first using &#x60;init()&#x60; method"* = "Please initialize library first using `init()` method"

*Defined in [src/index.ts:36](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L36)*

___
<a id="init_status_already_initialized"></a>

### `<Const>` INIT_STATUS_ALREADY_INITIALIZED

**● INIT_STATUS_ALREADY_INITIALIZED**: *`1`* = 1

*Defined in [src/index.ts:34](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L34)*

___
<a id="init_status_initialized"></a>

### `<Const>` INIT_STATUS_INITIALIZED

**● INIT_STATUS_INITIALIZED**: *`0`* = 0

*Defined in [src/index.ts:33](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L33)*

___
<a id="ordercontract"></a>

### `<Let>` OrderContract

**● OrderContract**: *`any`*

*Defined in [src/index.ts:41](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L41)*

___
<a id="product_creation_gas_limit"></a>

### `<Const>` PRODUCT_CREATION_GAS_LIMIT

**● PRODUCT_CREATION_GAS_LIMIT**: *`4000000`* = 4000000

*Defined in [src/index.ts:25](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L25)*

___
<a id="product_deletion_gas_limit"></a>

### `<Const>` PRODUCT_DELETION_GAS_LIMIT

**● PRODUCT_DELETION_GAS_LIMIT**: *`4000000`* = 4000000

*Defined in [src/index.ts:26](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L26)*

___
<a id="product_purchase_approve_gas_limit"></a>

### `<Const>` PRODUCT_PURCHASE_APPROVE_GAS_LIMIT

**● PRODUCT_PURCHASE_APPROVE_GAS_LIMIT**: *`4000000`* = 4000000

*Defined in [src/index.ts:28](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L28)*

___
<a id="product_purchase_cancel_gas_limit"></a>

### `<Const>` PRODUCT_PURCHASE_CANCEL_GAS_LIMIT

**● PRODUCT_PURCHASE_CANCEL_GAS_LIMIT**: *`4000000`* = 4000000

*Defined in [src/index.ts:29](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L29)*

___
<a id="product_purchase_gas_limit"></a>

### `<Const>` PRODUCT_PURCHASE_GAS_LIMIT

**● PRODUCT_PURCHASE_GAS_LIMIT**: *`4000000`* = 4000000

*Defined in [src/index.ts:27](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L27)*

___
<a id="product_purchase_rate_gas_limit"></a>

### `<Const>` PRODUCT_PURCHASE_RATE_GAS_LIMIT

**● PRODUCT_PURCHASE_RATE_GAS_LIMIT**: *`4000000`* = 4000000

*Defined in [src/index.ts:31](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L31)*

___
<a id="product_withdraw_gas_limit"></a>

### `<Const>` PRODUCT_WITHDRAW_GAS_LIMIT

**● PRODUCT_WITHDRAW_GAS_LIMIT**: *`4000000`* = 4000000

*Defined in [src/index.ts:30](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L30)*

___
<a id="registrycontract"></a>

### `<Let>` RegistryContract

**● RegistryContract**: *`any`*

*Defined in [src/index.ts:38](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L38)*

___
<a id="tokencontract"></a>

### `<Let>` TokenContract

**● TokenContract**: *`any`*

*Defined in [src/index.ts:39](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L39)*

___

## Functions

<a id="fixtrufflecontractcompatibilityissue"></a>

###  fixTruffleContractCompatibilityIssue

▸ **fixTruffleContractCompatibilityIssue**(web3: *`any`*): `any`

*Defined in [src/index.ts:45](https://github.com/repux/repux-web3-api/blob/47534a6/src/index.ts#L45)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| web3 | `any` |

**Returns:** `any`

___

