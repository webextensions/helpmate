/*
    // Example:

    import {
        occasionally,
        occasionallyAsync,
        STRATEGY_ONCE,
        STRATEGY_RANDOMLY_ONCE_IN_FEW_INCIDENTS
    } from 'helpmate/dist/scheduler/occasionally.js';

    (async () => {
        for (let i = 0; i < 10; i++) {
            occasionally(
                (incidentNumber) => {
                    console.log('Hello, world!', i, incidentNumber);
                },
                {
                    strategy: STRATEGY_ONCE,
                    id: 'hello-world'
                }
            );

            await occasionallyAsync(
                async (incidentNumber) => {
                    const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
                    const random = Math.floor(Math.random() * 1000);
                    await timeout(random);
                    console.log('Async - Hello, world!', i, incidentNumber);
                },
                {
                    strategy: STRATEGY_RANDOMLY_ONCE_IN_FEW_INCIDENTS,
                    id: 'async-hello-world',
                    incidents: 2
                }
            );
        }
    })();
*/

const
    STRATEGY_ONCE = 'STRATEGY_ONCE',
    STRATEGY_RANDOMLY_ONCE_IN_FEW_INCIDENTS = 'STRATEGY_RANDOMLY_ONCE_IN_FEW_INCIDENTS',
    STRATEGY_ONCE_IN_FEW_INCIDENTS = 'STRATEGY_ONCE_IN_FEW_INCIDENTS';

const ID_DEFAULT = 'ID_DEFAULT';

const obOnce                       = { [ID_DEFAULT]: 0 };
const obRandomlyOnceInFewIncidents = { [ID_DEFAULT]: 0 };
const obOnceInFewIncidents         = { [ID_DEFAULT]: 0 };

const occasionally = function (callback, options = {}) {
    const strategy = options.strategy || STRATEGY_RANDOMLY_ONCE_IN_FEW_INCIDENTS;

    if (strategy === STRATEGY_ONCE) {
        if (options.id === undefined) {
            console.warn(`Warning: It seems that you forgot to pass the "id" parameter to "occasionally()" function for the "strategy": "${strategy}". Using fallback "id": "${ID_DEFAULT}"`);
        }
        const incidentId = options.id || ID_DEFAULT;

        const incidentCounter = (obOnce[incidentId] || 0) + 1;
        obOnce[incidentId] = incidentCounter;

        if (incidentCounter === 1) {
            callback(incidentCounter);
            return true;
        }
    } else if (strategy === STRATEGY_RANDOMLY_ONCE_IN_FEW_INCIDENTS) {
        const incidents = options.incidents || 1;
        const random = Math.floor(Math.random() * incidents);

        const incidentId = options.id || ID_DEFAULT;

        const incidentCounter = (obRandomlyOnceInFewIncidents[incidentId] || 0) + 1;
        obRandomlyOnceInFewIncidents[incidentId] = incidentCounter;

        if (random === 0) {
            callback(incidentCounter);
            return true;
        }
    } else if (strategy === STRATEGY_ONCE_IN_FEW_INCIDENTS) {
        const incidents = options.incidents || 1;
        if (options.id === undefined) {
            console.warn(`Warning: It seems that you forgot to pass the "id" parameter to "occasionally()" function for the "strategy": "${strategy}". Using fallback "id": "${ID_DEFAULT}"`);
        }
        const incidentId = options.id || ID_DEFAULT;

        const incidentCounter = (obOnceInFewIncidents[incidentId] || 0) + 1;
        obOnceInFewIncidents[incidentId] = incidentCounter;

        if (incidentCounter % incidents === 0) {
            callback(incidentCounter);
            return true;
        }
    } else {
        callback();
        return true;
    }

    return false;
};

// eslint-disable-next-line require-await
const occasionallyAsync = async function (callback, options) {
    return new Promise((resolve, reject) => {
        let incidentCounter;
        const flagCalledBack = occasionally((val) => {
            incidentCounter = val;
        }, options);

        if (flagCalledBack) {
            // eslint-disable-next-line n/callback-return
            callback(incidentCounter).then(resolve).catch(reject);
        } else {
            resolve();
            return;
        }
    });
};

const attachStringConstantsToFunction = function (fn) {
    const strs = [
        STRATEGY_ONCE,
        STRATEGY_RANDOMLY_ONCE_IN_FEW_INCIDENTS,
        STRATEGY_ONCE_IN_FEW_INCIDENTS,

        ID_DEFAULT
    ];

    for (const str of strs) {
        fn[str] = str;
    }
};

attachStringConstantsToFunction(occasionally);
attachStringConstantsToFunction(occasionallyAsync);

export {
    occasionally,
    occasionallyAsync,

    STRATEGY_ONCE,
    STRATEGY_RANDOMLY_ONCE_IN_FEW_INCIDENTS,
    STRATEGY_ONCE_IN_FEW_INCIDENTS,

    ID_DEFAULT
};
