import { ProgressCrypto } from './progress-crypto';
import { ERRORS } from './errors';
import { FileWriterFactory } from './file-writer-factory';
import { FileSize } from './file-size';

export class FileDownloader extends ProgressCrypto {
    constructor(ipfs) {
        super();
        this.ipfs = ipfs;
    }

    download(password, fileHash) {
        this.password = password;

        this.ipfs.files.get(fileHash, (err, files) => {
            if (!files || files.length === 0) {
                this.emit('error', ERRORS.FILE_NOT_FOUND);
            }

            files.forEach(async (file) => {
                const fileMeta = JSON.parse(file.content.toString('utf8'));
                this.fileWriter = FileWriterFactory.create(fileMeta.name, fileMeta.size);

                if (fileMeta.size > FileSize.getMaxFileSize()) {
                    return this.emit('error', ERRORS.MAX_FILE_SIZE_EXCEEDED);
                }

                try {
                    await this.fileWriter.init();
                    this.fileChunks = Object.values(fileMeta.chunks);
                    this.fileChunksNumber = this.fileChunks.length;
                    this.downloadFileChunks();
                } catch(err) {
                    this.emit('error', err.error);
                }
            });
        })
    }

    downloadFileChunks() {
        if (!this.fileChunks.length) {
            this.emit('finish', { fileURL: this.fileWriter.getFileURL(), fileName: this.fileWriter.fileName });
            this.emit('progress', 1);
            return;
        }

        this.ipfs.files.get(this.fileChunks[0], (err, files) => {
            files.forEach((file) => {
                this.crypt('decrypt', this.password, file.content);
            });
        });
    }

    onProgress(progress) {
        this.emit('progress', (progress + this.fileChunksNumber - this.fileChunks.length) / this.fileChunksNumber);
    }

    onChunkCrypted(chunk) {
        this.fileWriter.write(chunk.chunk);
        this.fileChunks.shift();
        this.downloadFileChunks();
    }
}
