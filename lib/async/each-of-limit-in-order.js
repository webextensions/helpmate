var async = require('async');

var sortObjectByProperty = require('../../lib/array/helpmate-array-utils.js').sortObjectByProperty;

var eachOfLimitInOrder = function (items, concurrency, cb, complete) {
    var pendingOutputs = [];
    var outputDoneUptoIndex = -1;
    var flushOutputs = function () {
        pendingOutputs = pendingOutputs.sort(sortObjectByProperty('index'));
        var pendingOutput = pendingOutputs[0];

        if (pendingOutput) {
            if (pendingOutput.index === outputDoneUptoIndex + 1) {
                pendingOutputs.shift();
                pendingOutput.orderedOutput();
                pendingOutput._cb(pendingOutput.err);
                outputDoneUptoIndex++;
                flushOutputs();
            }
        }
    };

    async.eachOfLimit(items, concurrency, function (item, key, _cb) {
        cb(item, key, function (err, orderedOutput) {
            pendingOutputs.push({index: key, err: err, orderedOutput: orderedOutput, _cb: _cb});
            flushOutputs();
        });
    }, function (err) {
        complete(err);
    });
};

module.exports = eachOfLimitInOrder;
