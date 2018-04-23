import { INITIALIZATION_VECTOR, ProgressCrypto } from './progress-crypto';
import { ERRORS } from './errors';
import { FileWriterFactory } from './file-writer-factory';
import { FileSize } from './file-size';
import { merge } from './uint8-array-utils';

export class FileDownloader extends ProgressCrypto {
    constructor(ipfs) {
        super();
        this.ipfs = ipfs;
    }

    download(password, privateKey, fileHash) {
        this.password = password;
        this.privateKey = privateKey;

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
                    this.isFirstChunk = true;
                    this.vector = INITIALIZATION_VECTOR;
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
                let content = file.content;

                if (this.firstChunkData) {
                    content = merge(this.firstChunkData, file.content);
                    this.firstChunkData = null;
                }

                this.crypt('decrypt', this.password, this.vector, this.privateKey, content, {
                    isFirstChunk: this.isFirstChunk
                });
            });
        });
    }

    onProgress(progress) {
        this.emit('progress', (progress + this.fileChunksNumber - this.fileChunks.length - 1) / this.fileChunksNumber);
    }

    onChunkCrypted(chunk) {
        this.vector = chunk.vector;

        if (!this.isFirstChunk) {
            this.fileWriter.write(chunk.chunk);
        } else {
            this.isFirstChunk = false;
            this.firstChunkData = chunk.chunk;
        }

        this.fileChunks.shift();
        this.downloadFileChunks();
    }
}
