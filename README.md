# RepuX JavaScript API

## Installation
//TODO

## Example usage
```javascript
import Web3 from 'web3';
import IpfsApi from 'ipfs-api';
import{ Repux } from 'repux';
```

## Development
Run following commands:
```bash
npm install -g truffle ipfs http-server
npm install
ipfs daemon
```

In other terminal window:
```bash
truffle develop
truffle migrate --reset
```

And to build library run:
```bash
npm webpack
```

## Tests
Build library, run `http-server` and then open index.html in browser.
