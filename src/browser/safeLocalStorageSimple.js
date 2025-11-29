const safeLocalStorageSimple = {
    getItem: function (key) {
        try {
            return localStorage.getItem(key);
        } catch (err) { // eslint-disable-line no-unused-vars
            return null;
        }
    },
    setItem: function (key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (err) { // eslint-disable-line no-unused-vars
            // do nothing
        }
    },
    removeItem: function (key) {
        try {
            localStorage.removeItem(key);
        } catch (err) { // eslint-disable-line no-unused-vars
            // do nothing
        }
    },
    key: function (index) {
        try {
            return localStorage.key(index);
        } catch (err) { // eslint-disable-line no-unused-vars
            return null;
        }
    },
    clear: function () {
        try {
            localStorage.clear();
        } catch (err) { // eslint-disable-line no-unused-vars
            // do nothing
        }
    }
};

export { safeLocalStorageSimple };
