import BigNumber from 'bignumber.js';

export class Product {
    /**
     *
     * @param {string} metaHash - Product meta IPFS Hash
     * @param {BigNumber} price - Product price in Wei
     */
    constructor(metaHash, price) {
        this.metaHash = metaHash;
        this.price = price;
    }

    /**
     * Converts DataProduct instance to Product instance
     * @param {DataProduct} dataProduct - DataProduct instance
     * @returns {Promise<Product>}
     */
    static async createFromDataProduct(dataProduct) {
        const product = new Product();
        product.address = dataProduct.address;
        product.metaHash = await dataProduct.metaHash();
        product.price = await dataProduct.price();

        return product;
    }
}
