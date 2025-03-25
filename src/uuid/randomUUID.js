/* eslint-disable unicorn/filename-case */
/* eslint-disable @stylistic/space-infix-ops */
/* eslint-disable @stylistic/arrow-parens */

const randomUUID = function () {
    let uuid;
    if (typeof crypto.randomUUID === 'function') {
        uuid = crypto.randomUUID();
    } else {
        // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid/2117523#2117523
        // eslint-disable-next-line unicorn/prefer-string-replace-all
        uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    return uuid;
};

export { randomUUID };
