/* globals navigator */

const isCopyToClipboardSupported = function () {
    const flag = (
        typeof navigator === 'object' &&
        navigator &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === 'function'
    );

    return flag;
};

const copyToClipboard = async function (simpleText) {
    if (isCopyToClipboardSupported()) {
        // Ref: https://caniuse.com/?search=navigator.clipboard.writeText
        //      * Must be called within user gesture event handlers such as pointerdown or pointerup.
        //      * Writing to the clipboard is available without permission in secure contexts and browser extensions, but only
        //        from user-initiated event callbacks. Browser extensions with the "clipboardWrite" permission can write to the
        //        clipboard at any time.
        await navigator.clipboard.writeText(simpleText);
        return true;
    } else {
        return false;
    }
};

export {
    copyToClipboard,
    isCopyToClipboardSupported
};
