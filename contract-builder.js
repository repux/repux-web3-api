const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const contractsDir = './contracts';
const smartContractsModule = path.dirname(require.resolve('repux-smart-contracts'));

console.log('Removing old contracts artifacts...');
fsExtra.removeSync(contractsDir);

console.log('Compiling contracts...');
exec(`truffle compile --contracts_build_directory=${contractsDir} --contracts_directory=${smartContractsModule}/contracts`,
    (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log(err);
            console.log(`stderr: ${stderr}`);
            return;
        }

        console.log('Removing unnecessary data...');
        const files = fs.readdirSync(contractsDir);

        files.forEach(file => {
            const path = `${contractsDir}/${file}`;
            const contract = JSON.parse(fs.readFileSync(path, 'utf8'));
            fs.writeFileSync(path, JSON.stringify({ abi: contract.abi }));
        });
    });
