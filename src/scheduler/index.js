import { occasionally } from './occasionally.js';
import { retryNTimesWithDelay } from './retryNTimesWithDelay.js';
import { timeout } from './timeout.js';

const scheduler = {
    occasionally,
    retryNTimesWithDelay,
    timeout
};

export { scheduler };
