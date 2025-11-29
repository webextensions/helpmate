/* global document */

const timeout = function (ms) {
    return new Promise((resolve) => { setTimeout(resolve, ms); });
};

const forceBlur = async function () {
    const input = document.createElement('input');
    input.style.position = 'absolute';
    input.style.visibility = 'hidden';
    input.style.opacity = '0';

    document.body.append(input);
    input.focus();
    await timeout(0);
    document.body.remove(input);
};

export { forceBlur };
