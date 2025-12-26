const timeoutAsync = function (ms) {
    return (
        new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
    );
};

export { timeoutAsync };
