var async = require('async');

var sortObjectByProperty = require('../../lib/array/helpmate-array-utils.js').sortObjectByProperty;

var eachOfLimitInOrder = function (items, concurrency, cb, complete) {
    var pendingOutputs = [],
        outputDoneUptoIndex = -1,
        anyErrorSoFar = false;

    var flushOutputs = function () {
        pendingOutputs = pendingOutputs.sort(sortObjectByProperty('index'));
        var pendingOutput = pendingOutputs[0];

        if (pendingOutput) {
            if (pendingOutput.index === outputDoneUptoIndex + 1) {
                pendingOutputs.shift();
                pendingOutput.cbOrderedOutput();
                outputDoneUptoIndex++;

                if (pendingOutput._cb && pendingOutput.err) {
                    pendingOutput._cb(pendingOutput.err);
                } else {
                    flushOutputs();
                }
            }
        }
    };

    async.eachOfLimit(items, concurrency, function (item, key, _cb) {
        cb(item, key, function (err, cbOrderedOutput) {
            if (err) {
                anyErrorSoFar = true;
            }
            if (anyErrorSoFar) {
                pendingOutputs.push({index: key, err: err, cbOrderedOutput: cbOrderedOutput, _cb: _cb});
            } else {
                _cb();
                pendingOutputs.push({index: key, err: err, cbOrderedOutput: cbOrderedOutput});
            }
            flushOutputs();
        });
    }, function (err) {
        complete && complete(err);
    });
};

module.exports = eachOfLimitInOrder;
