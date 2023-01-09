const sortArrayOfObjectsByProperty = function (property) {
    return function (obA, obB) {
        const
            a = obA[property],
            b = obB[property];
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        }
        return 0;
    };
};

export {
    sortArrayOfObjectsByProperty
};
