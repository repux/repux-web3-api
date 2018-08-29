import { ContractType } from './contract-type';
import { versionMap } from './version-map';
import { Method } from './method';

export class VersionController {
  versionMap = versionMap;

  isMethodSupported(method: Method, contractType: ContractType, version: number): boolean {
    const versionEntries = this.versionMap.get(method);
    if (!versionEntries) {
      return false;
    }

    const contractEntry = versionEntries.find(entry => entry.contractType === contractType);
    if (!contractEntry) {
      return true;
    }

    if (contractEntry.maxVersion && contractEntry.maxVersion < version) {
      return false;
    }

    return !(contractEntry.minVersion && contractEntry.minVersion > version);
  }

  assertMethodSupported(method: Method, contractType: ContractType, version: number): void {
    if (!this.isMethodSupported(method, contractType, version)) {
      throw new Error(`Unsupported method(${method}) in contract(${contractType}) version(${version})`);
    }
  }
}
