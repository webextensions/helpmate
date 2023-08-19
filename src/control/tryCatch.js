const tryCatchSafe = function (fn, fallbackValue) {
    try {
        const value = fn();
        return [null, value];
    } catch (err) {
        return [err, fallbackValue];
    }
};

const tryCatchSafeAsync = async function (fn, fallbackValue) {
    try {
        const value = await fn();
        return [null, value];
    } catch (err) {
        return [err, fallbackValue];
    }
};

const tryCatchFallback = function (fn, fallbackValue) {
    try {
        const value = fn();
        return value;
    } catch (err) {
        return fallbackValue;
    }
};

const tryCatchFallbackAsync = async function (fn, fallbackValue) {
    try {
        const value = await fn();
        return value;
    } catch (err) {
        return fallbackValue;
    }
};

const tryCatch = {
    safe: tryCatchSafe,
    safeAsync: tryCatchSafeAsync,
    fallback: tryCatchFallback,
    fallbackAsync: tryCatchFallbackAsync
};

export {
    tryCatchSafe,
    tryCatchSafeAsync,
    tryCatchFallback,
    tryCatchFallbackAsync,

    tryCatch
};
