export default class RepuxWeb3Api {
    private web3;
    private registryContractAddress;
    private demoTokenContractAddress;
    private provider;
    private registry;
    private token;

    /**
     * @param {Web3} web3 - Web3 instance
     * @param {Object} contracts
     */
    constructor(web3?: any, contracts?: any);

    /**
     * Return API version
     * @returns {string} API version
     */
    getVersion(): any;

    /**
     * Returns default account
     * @returns {string} Default account
     */
    getDefaultAccount(): any;

    /**
     * Return account balance value
     * @param {string} [account=web3.eth.defaultAccount] - Account address
     * @returns {Promise<BigNumber>} Balance value
     */
    getBalance(account?: string): Promise<any>;

    /**
     * Creates product contract
     * @param {string} metaFileHash - Hash of meta file containing all data required to product publication
     * @param {BigNumber} price - Product price
     * @param {string} [account=web3.eth.defaultAccount] - Account address
     * @returns {Promise<*>}
     */
    createDataProduct(metaFileHash: string, price: any, account: string): Promise<any>;
}
