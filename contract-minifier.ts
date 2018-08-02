import * as fs from 'fs';

const dir = './contracts';
const files = fs.readdirSync(dir);

files.forEach(file => {
  const path = `${dir}/${file}`;
  const contract = JSON.parse(fs.readFileSync(path, 'utf8'));
  fs.writeFileSync(path, JSON.stringify({ abi: contract.abi }));
});
