const htmlEscape = function (str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;') // https://stackoverflow.com/questions/2083754/why-shouldnt-apos-be-used-to-escape-single-quotes
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};

export { htmlEscape };
