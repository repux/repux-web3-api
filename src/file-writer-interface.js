export class FileWriterInterface {
    init() {
        // Overwrite me
    }
    static isSupported() {
        // Overwrite me
    }

    write(data) {
        // Overwrite me
    }

    getFileURL() {
        // Overwrite me
    }
}
