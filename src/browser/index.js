import { copyToClipboard } from './copyToClipboard.js';
import { getBrowser } from './getBrowser.js';
import { safeLocalStorage } from './safeLocalStorage.js';
import { safeLocalStorageSimple } from './safeLocalStorageSimple.js';

const browser = {
    copyToClipboard,
    getBrowser,
    safeLocalStorage,
    safeLocalStorageSimple
};

export { browser };
