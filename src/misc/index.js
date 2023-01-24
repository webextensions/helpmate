import { copyToClipboard } from './copyToClipboard.js';
import { humanReadableByteSize } from './humanReadableByteSize.js';
import { retryNTimesWithDelay } from './retryNTimesWithDelay.js';
import { timeout } from './timeout.js';

const misc = {
    copyToClipboard,
    humanReadableByteSize,
    retryNTimesWithDelay,
    timeout
};

export { misc };
