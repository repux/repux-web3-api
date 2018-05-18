# RepuX Web3 API

## Installation
Execute `yarn` from project root.

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
Tests are executed by Karma runner (https://karma-runner.github.io) written in Mocha test framework (https://mochajs.org/). To run tests use command: 

    yarn test
    
To use watch: 

    yarn test:watch    

## Example usage
```javascript
import Web3 from 'web3';
import RepuxWeb3Api from 'repux-web3-api';

const web3 = new Web3(new Web3.providers.HttpProvider(config.ETH_NODE_URL));
const repuxWeb3Api = new RepuxWeb3Api(web3, {
    REGISTRY_CONTRACT_ADDRESS: '0x4ca80dfaaef31c2d7c0b5974775e86bfa86a6c70',
    DEMOTOKEN_CONTRACT_ADDRESS: '0x618231c15b548292abc0013da5e24bab350c86d2'
});

await repuxWeb3Api.init();
const balance = await repuxWeb3Api.getBalance();

console.log(balance);
```

## Contribution
We are using [semantic-release](https://github.com/semantic-release/semantic-release) to make semantic versioning easier. 
This tool requires special commit message convention taken from Angular to determine the type of changes in repository. 
You can read more about Angular commit message conventions [here](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
Please follow this conventions when you contributing.

## Releasing new version
To release new library version checkout master branch and run `GH_TOKEN=YOUR-GITHUB-PERSONAL-ACCESS-TOKEN NPM_TOKEN=YOUR-NPM-TOKEN yarn release` command.
You can also add GH_TOKEN and NPM_TOKEN environment variable to your .bashrc (in OSX .bash_profile) file and then simply run `yarn release` command.
Semantic-release needs access to at least GitHub **repo** scope. If you don't know how to generate your personal token, please read 
[this article](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/). You also have to generate NPM_TOKEN. This 
token is used only to preparing package.json file. Library won't be published to NPM repository until you add "@semantic-release/npm" to **publish** section
in `.releaserc` file.
