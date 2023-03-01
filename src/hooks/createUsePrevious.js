// https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect/53446665#53446665
// https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
const createUsePrevious = function (React) {
    const usePrevious = function (value) {
        const ref = React.useRef();
        React.useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };

    return usePrevious;
};

export { createUsePrevious };
