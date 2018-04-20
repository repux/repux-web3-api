import BigNumber from 'bignumber.js';

export class Product {
    /**
     *
     * @param {string} name - Product name
     * @param {BigNumber} price - Product price in Wei
     * @param {string} ipfsHash - Product file IPFS Hash
     * @param {string} [description=''] - Product description
     * @param {string} [category=''] - Product category
     * @param {number} [size=0] - Product file size in bytes
     */
    constructor(name, price, ipfsHash, description, category, size) {
        this.name = name;
        this.price = price;
        this.ipfsHash = ipfsHash;
        this.description = description || '';
        this.category = category || '';
        this.size = size || 0;
    }

    static createFromRawData(rawData, address) {
        const product = new Product();
        product.owner = rawData[0];
        product.name = rawData[1];
        product.description = rawData[2];
        product.ipfsHash = rawData[3];
        product.category = rawData[4];
        product.price = rawData[5];
        product.size = parseInt(rawData[6].valueOf());
        product.totalRating = rawData[7];
        product.rateCount = rawData[8];
        product.purchaseCount = rawData[9];
        product.ownership = rawData[10];
        product.address = address;

        return product;
    }
}
