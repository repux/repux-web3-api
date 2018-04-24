# RepuX Web3 API

## Installation


## Example usage
```javascript
import Web3 from 'web3';
import { RepuxWeb3Api } from 'repux-web3-api';
let web3 = new Web3(new Web3.providers.HttpProvider('http://local.dev.ico.repux:8545'));
web3.eth.defaultAccount = '0x627306090abaB3A6e2400e9345bC60c78a8BEf57';
const repux = new RepuxWeb3Api(web3);
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
npm install -g http-server
npm install
```

4. And to build library run:
```bash
npx webpack
```

## Tests
Build library, run `http-server` and then open index.html in browser.
