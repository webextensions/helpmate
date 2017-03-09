/** @namespace */
var helpmate = {
    fs: require('./fs/helpmate-fs.js'),
    logger: require('note-down'),
    async: require('./async/helpmate-async.js'),
    arrayUtils: require('./array/helpmate-array-utils.js')
};

module.exports = helpmate;
