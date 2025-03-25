const htmlEscape = function (str) {
    return str
        .replaceAll('&', '&amp;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;') // https://stackoverflow.com/questions/2083754/why-shouldnt-apos-be-used-to-escape-single-quotes
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
};

export { htmlEscape };
