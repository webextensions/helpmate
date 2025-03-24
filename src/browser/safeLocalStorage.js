/* global localStorage */

/*
Notes and Limitations:
    * The `fallbackStorage` object is not shared between multiple browser tabs / windows
    * The `.key()` method does not utilize the `fallbackStorage` object, so that it can be as compatible to multiple browser tabs as possible
    * The `.length` getter does not utilize the `fallbackStorage` object, so that it can be as compatible to multiple browser tabs as possible
    * The `handleError.onError` function is not reset by `handleError.reset()`
*/

const handleError = {
    errorCount: 0,
    firstError: null,
    lastError: null,
    onError: null

    // avoidDeadCodeElimination: null // The purpose of `handleError.avoidDeadCodeElimination` is to set an accessed value to it for avoiding the code usage from being removed by a dead code elimination tool
};
handleError.reset = () => {
    handleError.errorCount = 0;
    handleError.firstError = null;
    handleError.lastError = null;
    // Note: `handleError.onError` is not being reset

    // handleError.avoidDeadCodeElimination = null;
};

const recordError = function (err) {
    handleError.errorCount++;

    if (handleError.firstError === null) {
        handleError.firstError = err;
    }

    handleError.lastError = err;

    if (typeof handleError.onError === 'function') {
        handleError.onError(err);
    }
};

const fallbackStorage = Object.create(null); // No inherited properties, like `toString`, `hasOwnProperty`, etc.

const safeLocalStorage = {
    getItem: function (key) {
        try {
            const value = localStorage.getItem(key);

            if (value !== null) {
                return value;
            }
        } catch (err) {
            recordError(err);
        }

        if (Object.prototype.hasOwnProperty.call(fallbackStorage, key)) {
            // Note: Not doing a check for `fallbackStorage[key] === undefined` since that case should not occur in normal usage
            return fallbackStorage[key];
        }
        return null;
    },

    setItem: function (key, value) {
        try {
            fallbackStorage[key] = String(value);
            localStorage.setItem(key, value);
        } catch (err) {
            recordError(err);
        }
    },

    removeItem: function (key) {
        try {
            delete fallbackStorage[key];
            localStorage.removeItem(key);
        } catch (err) {
            recordError(err);
        }
    },

    clear: function () {
        try {
            for (const key in fallbackStorage) {
                delete fallbackStorage[key];
            }
            localStorage.clear();
        } catch (err) {
            recordError(err);
        }
    },

    key: function (index) {
        /*
        // This approach isn't compatible with multiple browser tabs, hence, it's not being used
        const computedIndex = Number(index) || 0;
        const keys = Object.keys(fallbackStorage);
        const key = keys[computedIndex] || null;
        try {
            // Here, we are not utilizing the value of `localStorage.key(index)`. We are just checking if localStorage is available for access without error
            handleError.avoidDeadCodeElimination = localStorage.key(index);
        } catch (err) {
            recordError(err);
        }
        return key;
        */

        try {
            const key = localStorage.key(index);
            return key;
        } catch (err) {
            recordError(err);
            return null;
        }
    },

    get length() {
        /*
        // This approach isn't compatible with multiple browser tabs, hence, it's not being used
        const fallbackStorageLength = Object.keys(fallbackStorage).length;
        try {
            // Here, we are not utilizing the value of `localStorage.length`. We are just checking if localStorage is available for access without error.
            handleError.avoidDeadCodeElimination = localStorage.length;
        } catch (err) {
            recordError(err);
        }
        return fallbackStorageLength;
        */

        try {
            return localStorage.length;
        } catch (err) {
            recordError(err);
            return 0;
        }
    }
};

export {
    safeLocalStorage,
    fallbackStorage,
    handleError
};
