import { FileWriterInterface } from './file-writer-interface';
import { ERRORS } from './errors';
import { merge } from './uint8-array-utils';

export class BlobWriter extends FileWriterInterface {
    constructor(fileName, fileSize) {
        super();
        this.fileSize = fileSize;
        this.fileName = fileName;
    }

    init() {
        return new Promise((resolve, reject) => {
            if(!BlobWriter.isSupported()) {
                reject({ error: ERRORS.BLOB_NOT_SUPPORTED });
                return;
            }

            this.data = new Uint8Array();
            resolve();
        });
    }

    write(data) {
        this.data = merge(this.data, data);
    }

    getFileURL() {
        return window.URL.createObjectURL(new Blob([this.data]));
    }

    static isSupported() {
        return true;
    }
}
