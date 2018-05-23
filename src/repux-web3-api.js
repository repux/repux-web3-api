import contract from 'truffle-contract';
import RegistryArtifacts from '../contracts/Registry';
import DemoTokenArtifacts from '../contracts/DemoToken';
import packageConfig from '../package';

const Registry = contract(RegistryArtifacts);
const DemoToken = contract(DemoTokenArtifacts);

// Workaround for a compatibility issue between web3@1.0.0-beta.29 and truffle-contract@3.0.3
// https://github.com/trufflesuite/truffle-contract/issues/57#issuecomment-331300494
function fixTruffleContractCompatibilityIssue(web3) {
    if (typeof web3.currentProvider.sendAsync !== 'function') {
        web3.currentProvider.sendAsync = function () {
            return web3.currentProvider.send.apply(
                web3.currentProvider, arguments
            );
        };
    }
    return web3;
}

/**
 * Repux API
 */
export default class RepuxWeb3Api {
    /**
     * @param {Web3} web3 - Web3 instance
     * @param {Object} contracts
     */
    constructor(web3, contracts = {}) {
        if (typeof web3 === 'undefined') {
            throw new Error('web3 instance is required!');
        }

        if (!contracts.REGISTRY_CONTRACT_ADDRESS) {
            throw new Error('Repux Registry contract address should be set!');
        }

        this._registryContractAddress = contracts.REGISTRY_CONTRACT_ADDRESS;

        if (!contracts.DEMOTOKEN_CONTRACT_ADDRESS) {
            throw new Error('Repux DemoToken contract address should be set!');
        }

        this._demoTokenContractAddress = contracts.DEMOTOKEN_CONTRACT_ADDRESS;

        this._web3 = fixTruffleContractCompatibilityIssue(web3);
        this._provider = this._web3.currentProvider;

        Registry.setProvider(this._provider);
        DemoToken.setProvider(this._provider);

        this._registry = Registry.at(this._registryContractAddress);
        this._token = DemoToken.at(this._demoTokenContractAddress);
    }

    /**
     * Return API version
     * @returns {string} API version
     */
    static getVersion() {
        return packageConfig.version;
    }

    /**
     * Returns default account
     * @returns {string} Default account
     */
    getDefaultAccount() {
        return this._web3.eth.accounts[0];
    }

    /**
     * Return account balance value
     * @param {string} [account=web3.eth.defaultAccount] - Account address
     * @returns {Promise<BigNumber>} Balance value
     */
    async getBalance(account) {
        if (!account) {
            account = this.getDefaultAccount();
        }

        const contract = await this._token;
        return contract.balanceOf(account);
    }
}
