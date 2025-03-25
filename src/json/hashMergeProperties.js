import extend from 'extend';

const walk = function (json, callback) {
    if (typeof json === 'object' && json !== null) {
        for (const key of Object.keys(json)) {
            const value = json[key];
            callback(value, key, json); // eslint-disable-line n/callback-return
            walk(value, callback);
        }
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
    const clonedJson = structuredClone(json);

    const mergedJson = executePass(clonedJson);

    return mergedJson;
};

export { hashMergeProperties };
