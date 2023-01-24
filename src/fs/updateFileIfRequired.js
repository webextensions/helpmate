import fs from 'node:fs';

/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback callback
 * @param {object} err - null / Error (if there)
 * @param {string} status - 'read-error' / 'write-error' / 'file-updated' / 'file-update-not-required'
 */

/**
 * @param {object} options
 * @param {string} options.file - Path of the file to be updated
 * @param {string} options.encoding - Encoding of the data
 * @param {string} options.data - The new data to be written
 * @todo Add support for other than string data-types for options.data
 * @param {boolean} options.verbose - To log the messages or not
 * @param {callback} options.callback - The function to be called on completion
 */
function updateFileIfRequired(options) {
    const
        file = options.file,
        encoding = options.encoding || 'utf8',
        newData = options.data,
        verbose = options.verbose || false,
        cb = options.callback || function () {};
    fs.readFile(file, encoding, function (err, oldData) {
        // err.code is 'ENOENT' when the file doesn't exist
        if (err && err.code !== 'ENOENT') {
            if (verbose) {
                console.log('Error in reading data for file: ' + file);
                console.log(err);
            }
            cb(err, 'read-error');
            return;
        }

        if (newData === oldData) {
            cb(null, 'file-update-not-required');
        } else {
            fs.writeFile(file, newData, encoding, function (err) {
                if (err) {
                    if (verbose) {
                        console.log('Error in writing data to file: ' + file);
                        console.log(err);
                    }
                    cb(err, 'write-error');
                } else {
                    cb(null, 'file-updated');
                }
            });
        }
    });
}

export { updateFileIfRequired };
