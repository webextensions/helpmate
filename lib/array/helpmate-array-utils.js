var sortObjectByProperty = function (property) {
    return function (obA, obB) {
        var a = obA[property],
            b = obB[property];
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        }
        return 0;
    };
};

module.exports = { sortObjectByProperty: sortObjectByProperty };
