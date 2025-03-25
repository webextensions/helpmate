const htmlEscape = function (str) {
    /* eslint-disable unicorn/prefer-string-replace-all */
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;') // https://stackoverflow.com/questions/2083754/why-shouldnt-apos-be-used-to-escape-single-quotes
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    /* eslint-enable unicorn/prefer-string-replace-all */
};

export { htmlEscape };
