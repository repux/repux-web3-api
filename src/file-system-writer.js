import { FileWriterInterface } from './file-writer-interface';
import { ERRORS } from './errors';

export class FileSystemWriter extends FileWriterInterface {
    constructor(fileName, fileSize) {
        super();
        this.fileSize = fileSize;
        this.fileName = fileName;
    }

    init() {
        return new Promise((resolve, reject) => {
            if(!FileSystemWriter.isSupported()) {
                reject({ error: ERRORS.FILE_SYSTEM_API_NOT_SUPPORTED });
                return;
            }

            FileSystemWriter.requestFileSystem()(window.TEMPORARY, this.fileSize, fs => {
                fs.root.getFile(this.fileName, { create: true, exclusive: false }, fileEntry => {
                    this.fileEntry = fileEntry;
                    this.fileEntry.createWriter(fileWriter => {
                        this.fileWriter = fileWriter;
                        this.fileWriter.truncate(0);
                        resolve();
                    }, error => reject({ error }))
                }, error => reject({ error }));
            }, error => reject({ error }));
        });
    }

    static requestFileSystem() {
        return window ? window.requestFileSystem || window.webkitRequestFileSystem : null;
    }

    static isSupported() {
        return this.requestFileSystem();
    }

    write(data) {
        this.fileWriter.write(new Blob([data]));
    }

    getFileURL() {
        return this.fileEntry.toURL();
    }
}
