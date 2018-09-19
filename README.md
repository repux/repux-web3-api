# RepuX Web3 API
This library helps developers using RepuX protocol. It supports communication with RepuX smart contracts deployed on 
Ethereum blockchain using [Ethereum JavaScript API](https://github.com/ethereum/web3.js).

## Quickstart

### Installation
```bash
npm install @repux/repux-web3-api
```

### Usage
```javascript
import { RepuxWeb3Api } from '@repux/repux-web3-api';

const repuxWeb3Api = new RepuxWeb3Api(window.web3, {
    REGISTRY_CONTRACT_ADDRESS: '0x41acd34d987e3fe854b7a8f3cb101e809ba31c76',
    DEMOTOKEN_CONTRACT_ADDRESS: '0xfa19d4e302336d61b895ea3b26bf4864bdd1d8ab'
});

const balance = await repuxWeb3Api.getBalance();

console.log(balance);
```

### API Reference
API Reference is available [here](https://github.com/repux/repux-web3-api/tree/master/docs/README.md)

## Want to help?
Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on our guidelines for [contributing](https://github.com/repux/repux-web3-api/tree/master/CONTRIBUTING.md)
