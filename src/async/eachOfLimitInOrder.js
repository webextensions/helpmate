import { eachOfLimit } from 'async';

import { sortArrayOfObjectsByProperty } from '../array/sortArrayOfObjectsByProperty.js';

const eachOfLimitInOrder = function (items, concurrency, cb, complete) {
    let pendingOutputs = [],
        outputDoneUptoIndex = -1,
        anyErrorSoFar = false;

    const flushOutputs = function () {
        pendingOutputs = pendingOutputs.toSorted(sortArrayOfObjectsByProperty('index'));
        const pendingOutput = pendingOutputs[0];

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

    eachOfLimit(items, concurrency, function (item, key, _cb) {
        cb(item, key, function (err, cbOrderedOutput) {
            let callCbAfterFlushOutputs = null;

            if (err) {
                anyErrorSoFar = true;
            }
            if (anyErrorSoFar) {
                pendingOutputs.push({ index: key, err: err, cbOrderedOutput: cbOrderedOutput, _cb: _cb });
            } else {
                callCbAfterFlushOutputs = true;
                pendingOutputs.push({ index: key, err: err, cbOrderedOutput: cbOrderedOutput });
            }
            flushOutputs();

            if (callCbAfterFlushOutputs) {
                _cb();
            }
        });
    }, function (err) {
        complete && complete(err);
    });
};

export { eachOfLimitInOrder };
