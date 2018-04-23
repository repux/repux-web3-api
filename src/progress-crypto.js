import { Observable } from './observable';
import { spawn } from 'threads';
import { encryptionWorker } from './encryption-worker';
import { decryptionWorker } from './decryption-worker';

export const CHUNK_SIZE = 15 * 64 * 1024;
export const FIRST_CHUNK_SIZE = 190;
export const VECTOR_SIZE = 16;
export const INITIALIZATION_VECTOR = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F]);

export class ProgressCrypto extends Observable {
    async crypt(type, password, initializationVector, asymmetricKey, file, options) {
        if (!options) {
            options = {};
        }

        options = Object.assign({
            CHUNK_SIZE,
            FIRST_CHUNK_SIZE,
            VECTOR_SIZE
        }, options);

        this.isFinished = false;
        this.chunks = {};

        const pwUtf8 = new TextEncoder().encode(password);
        const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);
        const passwordKey = await crypto.subtle.importKey('raw', pwHash, { name: 'AES-CBC' }, false, [type]);
        let asymmetricKeyObject = await crypto.subtle.importKey('jwk', asymmetricKey, { name: 'RSA-OAEP', hash: { name: "SHA-256" } }, false, [type]);

        this.thread = spawn(type === 'encrypt' ? encryptionWorker : decryptionWorker);
        this.thread.send([
            file,
            passwordKey,
            initializationVector,
            asymmetricKeyObject,
            options
        ]);

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
