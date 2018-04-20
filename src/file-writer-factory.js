import { FileSystemWriter } from './file-system-writer';
import { BlobWriter } from './blob-writer';

export class FileWriterFactory {
    static create(fileName, fileSize) {
        if (FileSystemWriter.isSupported()) {
            return new FileSystemWriter(fileName, fileSize);
        }

        if (BlobWriter.isSupported()) {
            return new BlobWriter(fileName, fileSize);
        }
    }
}
