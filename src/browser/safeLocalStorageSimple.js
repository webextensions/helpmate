/* global localStorage */

const safeLocalStorageSimple = {
    getItem: function (key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    },
    setItem: function (key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            // do nothing
        }
    },
    removeItem: function (key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            // do nothing
        }
    },
    key: function (index) {
        try {
            return localStorage.key(index);
        } catch (e) {
            return null;
        }
    },
    clear: function () {
        try {
            localStorage.clear();
        } catch (e) {
            // do nothing
        }
    }
};

export { safeLocalStorageSimple };
