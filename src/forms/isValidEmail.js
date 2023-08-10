/* eslint-env browser */

// https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript/13975255#13975255
const isValidEmail = function (value) {
    const input = document.createElement('input');

    input.type = 'email';
    input.required = true;
    input.value = value;

    if (typeof input.checkValidity === 'function') {
        return input.checkValidity();
    } else {
        return /\S+@\S+\.\S+/.test(value);
    }
};

export { isValidEmail };
