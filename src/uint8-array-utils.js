const merge = (...arrays) => {
    const size = arrays.reduce((acc, array) => acc += array.byteLength, 0);
    const tmp = new Uint8Array(size);
    let offset = 0;

    arrays.forEach(array => {
        tmp.set(new Uint8Array(array), offset);
        offset += array.byteLength;
    });

    return tmp;
};

export {
    merge
};
