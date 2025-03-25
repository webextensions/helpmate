const humanReadableByteSize = function (sizeInB) {
    if (
        typeof sizeInB === 'number' &&
        !Number.isNaN(sizeInB) &&
        sizeInB >= 0 &&
        sizeInB <= Number.MAX_SAFE_INTEGER
    ) {
        let size = Number.parseInt(sizeInB, 10);
        if (size === 1) {
            return size + ' byte';
        }
        if (size < 1024) {
            return size + ' bytes';
        }

        const arrUnits = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let i;
        for (i = 0; i < arrUnits.length; i++) {
            size = size / 1024;
            if (size < 1024) {
                return Number.parseFloat(size.toFixed(2)) + ' ' + arrUnits[i];
            }
        }
        return Number.parseFloat(size.toFixed(2)) + ' ' + arrUnits[i - 1];
    } else {
        return sizeInB + ' bytes';
    }
};

export { humanReadableByteSize };
