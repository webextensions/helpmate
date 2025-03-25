const retryNTimesWithDelay = async function ({
    verbose = false,
    attempts,
    delayStrategy,
    delay,
    exponentialDelayMultiplier = 2,
    maxDelay,
    fn
}) {
    // With delayStrategy, the delay is exponential
    let theError;
    let delayToUse = 0;
    for (let i = 0; i < attempts; i++) {
        try {
            if (verbose) {
                console.log('Attempt:', i + 1, 'of', attempts, 'with delay:', delayToUse, 'ms', 'started');
            }
            await fn();
            if (verbose) {
                console.log('Attempt:', i + 1, 'of', attempts, 'with delay:', delayToUse, 'ms', 'succeeded');
            }
            return;
        } catch (err) {
            if (verbose) {
                console.log('Attempt:', i + 1, 'of', attempts, 'with delay:', delayToUse, 'ms', 'failed');
            }
            theError = err;
            if (delayToUse === 0) {
                delayToUse = delay;
            } else {
                if (delayStrategy === 'exponential') {
                    delayToUse = delayToUse * exponentialDelayMultiplier;
                } else if (delayStrategy === 'linear') {
                    delayToUse = delayToUse + delay;
                } else { // delayStrategy === 'constant'
                    delayToUse = delay;
                }

                delayToUse = Math.min(delayToUse, maxDelay);
            }
            await new Promise((resolve) => setTimeout(resolve, delayToUse));
        }
    }
    throw theError;
};

export { retryNTimesWithDelay };
