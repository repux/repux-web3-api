import { FileSystemWriter } from './file-system-writer';
import { UserAgent } from './user-agent';

const BYTE = 1;
const KILOBYTE = 1024 * BYTE;
const MEGABYTE = 1024 * KILOBYTE;
const GIGABYTE = 1024 * MEGABYTE;

export const STORAGE_SIZE = {
    BYTE,
    KILOBYTE,
    MEGABYTE,
    GIGABYTE
};

export class FileSize {
    static getMaxFileSize() {
        if (FileSystemWriter.isSupported()) {
            return 100 * STORAGE_SIZE.GIGABYTE;
        }

        if (UserAgent.isChromeOS() || UserAgent.isFirefoxOS()) {
            return 1.3 * STORAGE_SIZE.MEGABYTE;
        }

        if (UserAgent.isMobile()) {
            return 100 * STORAGE_SIZE.MEGABYTE;
        }

        if (UserAgent.isTrident() || UserAgent.isEdge()) {
            return 600 * STORAGE_SIZE.MEGABYTE;
        }

        return GIGABYTE * (1 + UserAgent.is64bit());
    }
}
