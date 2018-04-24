# RepuX JavaScript API

## Installation
//TODO

## Example usage
```javascript
import Web3 from 'web3';
import IpfsAPI from 'ipfs-api';
import { Repux } from 'repux';
let web3 = new Web3(new Web3.providers.HttpProvider('http://local.dev.ico.repux:8545'));
web3.eth.defaultAccount = '0x627306090abaB3A6e2400e9345bC60c78a8BEf57';
const repux = new RepuX(web3, new IpfsAPI({
    host: '127.0.0.1',
    port: 5002,
    protocol: 'http'
}));
const balance = await repux.getBalance();
console.log(balance);
```

## Development
1. Create symbolic link:
```
ln -s /path/to/compiled/contracts ./contracts 
```

2. Run ethereum node, compile and migrate contracts.

3. Run following commands:
```bash
npm install -g ipfs http-server
npm install
ipfs daemon
```

4. And to build library run:
```bash
npx webpack
```

## Tests
Build library, run `http-server` and then open index.html in browser.
