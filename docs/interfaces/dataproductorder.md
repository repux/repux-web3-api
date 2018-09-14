[API Reference](../README.md) > [DataProductOrder](../interfaces/dataproductorder.md)

# Interface: DataProductOrder

## Hierarchy

**DataProductOrder**

## Index

### Properties

* [address](dataproductorder.md#address)
* [buyerAddress](dataproductorder.md#buyeraddress)
* [buyerMetaHash](dataproductorder.md#buyermetahash)
* [dataProductAddress](dataproductorder.md#dataproductaddress)
* [deliveryDeadline](dataproductorder.md#deliverydeadline)
* [fee](dataproductorder.md#fee)
* [finalised](dataproductorder.md#finalised)
* [price](dataproductorder.md#price)
* [publicKey](dataproductorder.md#publickey)
* [purchased](dataproductorder.md#purchased)
* [rateDeadline](dataproductorder.md#ratedeadline)
* [rated](dataproductorder.md#rated)
* [rating](dataproductorder.md#rating)

---

## Properties

<a id="address"></a>

###  address

**● address**: *`string`*

*Defined in [src/data-product-order.ts:7](https://github.com/repux/repux-web3-api/blob/5ff278a/src/data-product-order.ts#L7)*

Order contract address

___
<a id="buyeraddress"></a>

###  buyerAddress

**● buyerAddress**: *`string`*

*Defined in [src/data-product-order.ts:17](https://github.com/repux/repux-web3-api/blob/5ff278a/src/data-product-order.ts#L17)*

Buyer address

___
<a id="buyermetahash"></a>

###  buyerMetaHash

**● buyerMetaHash**: *`string`*

*Defined in [src/data-product-order.ts:27](https://github.com/repux/repux-web3-api/blob/5ff278a/src/data-product-order.ts#L27)*

IPFS hash of meta file for re-encrypted product

___
<a id="dataproductaddress"></a>

###  dataProductAddress

**● dataProductAddress**: *`string`*

*Defined in [src/data-product-order.ts:12](https://github.com/repux/repux-web3-api/blob/5ff278a/src/data-product-order.ts#L12)*

Product contract address

___
<a id="deliverydeadline"></a>

###  deliveryDeadline

**● deliveryDeadline**: *`Date`*

*Defined in [src/data-product-order.ts:37](https://github.com/repux/repux-web3-api/blob/5ff278a/src/data-product-order.ts#L37)*

Date until Order finalisation is available

___
<a id="fee"></a>

###  fee

**● fee**: *`BigNumber`*

*Defined in [src/data-product-order.ts:47](https://github.com/repux/repux-web3-api/blob/5ff278a/src/data-product-order.ts#L47)*

Order fee

___
<a id="finalised"></a>

###  finalised

**● finalised**: *`boolean`*

*Defined in [src/data-product-order.ts:57](https://github.com/repux/repux-web3-api/blob/5ff278a/src/data-product-order.ts#L57)*

If true, Order is finalised

___
<a id="price"></a>

###  price

**● price**: *`BigNumber`*

*Defined in [src/data-product-order.ts:42](https://github.com/repux/repux-web3-api/blob/5ff278a/src/data-product-order.ts#L42)*

Product price

___
<a id="publickey"></a>

###  publicKey

**● publicKey**: *`string`*

*Defined in [src/data-product-order.ts:22](https://github.com/repux/repux-web3-api/blob/5ff278a/src/data-product-order.ts#L22)*

Buyer public key (needed for file encryption)

___
<a id="purchased"></a>

###  purchased

**● purchased**: *`boolean`*

*Defined in [src/data-product-order.ts:52](https://github.com/repux/repux-web3-api/blob/5ff278a/src/data-product-order.ts#L52)*

If true, Order is purchased

___
<a id="ratedeadline"></a>

###  rateDeadline

**● rateDeadline**: *`Date`*

*Defined in [src/data-product-order.ts:32](https://github.com/repux/repux-web3-api/blob/5ff278a/src/data-product-order.ts#L32)*

Date until Order rating is available

___
<a id="rated"></a>

###  rated

**● rated**: *`boolean`*

*Defined in [src/data-product-order.ts:62](https://github.com/repux/repux-web3-api/blob/5ff278a/src/data-product-order.ts#L62)*

If true, order is rated

___
<a id="rating"></a>

###  rating

**● rating**: *`BigNumber`*

*Defined in [src/data-product-order.ts:67](https://github.com/repux/repux-web3-api/blob/5ff278a/src/data-product-order.ts#L67)*

Order rating (from 1 to 5)

___

