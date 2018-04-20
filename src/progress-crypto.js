import { Observable } from './observable';
import { spawn } from 'threads';
import { cryptWorker } from './crypt-worker';

export class ProgressCrypto extends Observable {
    crypt(type, password, file) {
        this.isFinished = false;
        this.chunks = {};
        this.thread = spawn(cryptWorker);
        this.thread.send([
            type,
            (new Date()).getTime(),
            file,
            password
        ]);

        this.thread.on('message', data => {
            console.log('m',data);
        });

        this.thread.on('progress', data => {
            if (data.chunk) {
                this.maxChunkNumber = data.number;
                this.onChunkCrypted(data);
            }

            if (data.progress) {
                this.onProgress(data.progress);

                if (data.progress === 1) {
                    this.thread.kill();
                    this.isFinished = true;
                }
            }

            if (data.error) {
                this.onError(data.error);
                this.thread.kill();
            }
        });

        return this.thread;
    }

    terminate() {
        if (this.thread) {
            this.thread.kill();
            this.thread = undefined;
        }
    }

    onChunkCrypted(chunk) {
        this.emit('chunkCrypted', chunk);
    }

    onProgress(progress) {
        this.emit('progress', progress);
    }

    onError(error) {
        this.emit('error', error);
    }
}
