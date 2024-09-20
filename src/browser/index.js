import { copyToClipboard } from './copyToClipboard.js';
import { getBrowser } from './getBrowser.js';
import { safeLocalStorage } from './safeLocalStorage.js';

const browser = {
    copyToClipboard,
    getBrowser,
    safeLocalStorage
};

export { browser };
