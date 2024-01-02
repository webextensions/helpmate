import { expect } from 'chai';

import { trackTime } from '../../src/misc/trackTime.js';

const timeoutAsync = function (time) {
    return new Promise(function (resolve, reject) { // eslint-disable-line no-unused-vars
        setTimeout(function () {
            resolve();
        }, time);
    });
};

const timeoutSync = function (time) {
    const startTime = Date.now();
    while (Date.now() - startTime <= time) {
        // Do nothing
    }
};

describe('misc/trackTime', function () {
    describe('trackTime.async', function () {
        it('Tracks the time taken by an async function', async function () {
            const trackName = 'test-track';
            const delay = 200;

            trackTime.reset(trackName);
            await trackTime.async(trackName, () => timeoutAsync(delay));
            expect(trackTime.log[trackName]).to.be.at.least(delay);
        });
    });

    describe('trackTime.sync', function () {
        it('Tracks the time taken by a sync function', function () {
            const trackName = 'test-track';
            const delay = 100;

            trackTime.reset(trackName);
            trackTime.sync(trackName, () => timeoutSync(delay));
            expect(trackTime.log[trackName]).to.be.at.least(delay);
        });
    });
});
