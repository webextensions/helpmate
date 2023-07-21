const trackTime = {};

trackTime.log = {};
const trackTimeLog = trackTime.log;
// window.trackTimeLog = trackTimeLog; // DEV-HELPER

let now;
if (typeof performance !== 'undefined' && performance.now) {
    now = performance.now.bind(performance);
} else {
    now = Date.now.bind(Date);
}

trackTime.async = async function (trackName, fn) {
    const startTime = now();
    const result = await fn();
    const endTime = now();

    trackTimeLog[trackName] = (trackTimeLog[trackName] || 0) + (endTime - startTime);
    // Good to know: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now#security_requirements
    // Rounding off the numbers to avoid unnecessary digits towards the end due to floating point arithmetic.
    trackTimeLog[trackName] = Math.round(trackTimeLog[trackName] * 1000) / 1000;

    return result;
};

trackTime.sync = function (trackName, fn) {
    const startTime = now();
    const result = fn();
    const endTime = now();

    trackTimeLog[trackName] = (trackTimeLog[trackName] || 0) + (endTime - startTime);
    // Good to know: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now#security_requirements
    // Rounding off the numbers to avoid unnecessary digits towards the end due to floating point arithmetic.
    trackTimeLog[trackName] = Math.round(trackTimeLog[trackName] * 1000) / 1000;

    return result;
};

trackTime.reset = function (trackName) {
    trackTimeLog[trackName] = 0;
};

export { trackTime };
