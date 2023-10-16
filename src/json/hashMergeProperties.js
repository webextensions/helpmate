import extend from 'extend';

const walk = function (json, callback) {
    if (typeof json === 'object' && json !== null) {
        Object.keys(json).forEach(function (key) {
            const value = json[key];
            callback(value, key, json); // eslint-disable-line node/callback-return
            walk(value, callback);
        });
    }
};

const executePass = function (json) {
    let modificationsOccurredInThisPass = false;
    walk(json, function (value, key, parentNode) {
        if (typeof value === 'object' && value !== null && value['#merge']) {
            const nameOfPropertyToMergeWith = value['#merge'];
            const mergeWith = parentNode[nameOfPropertyToMergeWith];

            if (typeof mergeWith === 'object' && mergeWith !== null) {
                delete value['#merge'];
                const newValue = extend(true, {}, mergeWith, value);
                if (newValue['#merge'] === nameOfPropertyToMergeWith) {
                    throw new Error('Circular reference detected: ' + nameOfPropertyToMergeWith);
                }
                parentNode[key] = newValue;

                modificationsOccurredInThisPass = true;
            }
        }
    });

    if (modificationsOccurredInThisPass) {
        executePass(json);
    }

    return json;
};

const hashMergeProperties = (json) => {
    let clonedJson;

    if (typeof structuredClone === 'function') {
        clonedJson = structuredClone(json);
    } else {
        clonedJson = JSON.parse(JSON.stringify(json));
    }

    const mergedJson = executePass(clonedJson);

    return mergedJson;
};

export { hashMergeProperties };
