import { ContractType } from './contract-type';

export interface VersionEntry {
  minVersion?: number;
  maxVersion?: number;
  contractType: ContractType;
}
