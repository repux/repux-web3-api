/**
 * Decrypts file chunk
 * @param file
 * @param passwordKey
 * @param initializationVector
 * @param privateKey
 * @param options
 * @param done
 * @param progress
 * @returns {Promise<any>}
 */
export async function decryptionWorker([ bytes, passwordKey, initializationVector, privateKey, options ], done, progress) {
    const startTime = (new Date()).getTime();
    let vector = initializationVector;

    async function decryptFirstChunk(bytes) {
        const decryptedChunk = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, privateKey, bytes);
        progress({ chunk: decryptedChunk, number: 0, vector });
    }

    async function decryptChunk(bytes) {
        const alg = {
            name: 'AES-CBC',
            iv: vector
        };
        const decryptedChunk = await crypto.subtle.decrypt(
            alg,
            passwordKey,
            bytes
        );

        vector = new Uint8Array(decryptedChunk.slice(bytes.byteLength - options.VECTOR_SIZE, bytes.byteLength));

        progress({ chunk: decryptedChunk, number: 0, vector });
        progress({ time: (new Date()).getTime() - startTime, progress: 1 });
        done();
    }

    if (options.isFirstChunk) {
        decryptFirstChunk(bytes);
    } else {
        decryptChunk(bytes);
    }
}
