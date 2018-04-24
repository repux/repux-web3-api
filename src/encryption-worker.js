/**
 * Encrypts file with AES-CBC algorithm using password () and emits first chunk (190 bytes) encrypted
 * also with RSA algorithm using publicKey (2048 bits)
 * @param file
 * @param passwordKey
 * @param initializationVector
 * @param publicKey
 * @param options
 * @param done
 * @param progress
 * @returns {Promise<any>}
 */
export function encryptionWorker ([file, passwordKey, initializationVector, publicKey, options], done, progress) {
    const startTime = (new Date()).getTime();
    let offset = 0;
    const reader = new FileReader();
    let vector = initializationVector;

    function getVector(encryptedChunk, bytes) {
        const vector = new Uint8Array(options.VECTOR_SIZE);

        for (let i = 0; i < options.VECTOR_SIZE; i++) {
            vector[i] = encryptedChunk[i] ^ bytes[i];
        }
    }

    async function encryptFirstChunk(bytes) {
        const encryptedChunk = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, bytes);
        progress({ chunk: encryptedChunk, number: 0 });
    }

    async function encryptChunk(bytes, totalSize) {
        let tmp;

        const alg = {
            name: 'AES-CBC',
            iv: vector
        };
        const encryptedChunk = await crypto.subtle.encrypt(
            alg,
            passwordKey,
            new Uint8Array(bytes)
        );

        vector = getVector(encryptedChunk, bytes);

         if (offset === 0) {
             // Encrypt first chunk with asymmetric key
             await encryptFirstChunk(new Uint8Array(encryptedChunk.slice(0, options.FIRST_CHUNK_SIZE)));

             if (encryptedChunk.byteLength > options.FIRST_CHUNK_SIZE) {
                 tmp = new Uint8Array(encryptedChunk.slice(options.FIRST_CHUNK_SIZE, options.CHUNK_SIZE));
             }
         } else {
             tmp = encryptedChunk;
         }

         progress({ time: (new Date()).getTime() - startTime, progress: offset / totalSize });

        return tmp;
    }

    reader.onload = async () => {
        let tmp = await encryptChunk(new Uint8Array(reader.result), file.size);

        if (tmp.length) {
            progress({ chunk: tmp, number: offset / options.CHUNK_SIZE + 1, vector });
        }

        offset += options.CHUNK_SIZE;

        if (offset > file.size) {
            offset = file.size;
        }

        progress({ time: (new Date()).getTime() - startTime, progress: offset / file.size });

        seek();
    };

    function seek() {
        if (offset >= file.size) {
            return done();
        }

        const slice = file.slice(offset, offset + options.CHUNK_SIZE);
        reader.readAsArrayBuffer(slice);
    }

    seek();
}
