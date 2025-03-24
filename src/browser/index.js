import { copyToClipboard } from './copyToClipboard.js';
import { getBrowser } from './getBrowser.js';
import { safeLocalStorageSimple } from './safeLocalStorageSimple.js';

const browser = {
    copyToClipboard,
    getBrowser,
    safeLocalStorageSimple
};

export { browser };
