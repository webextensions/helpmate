/* globals window, navigator, chrome, browser */

const getBrowserStrategyGetManifest = function () {
    let name = 'not-available';

    const manifest = (
        typeof chrome === 'object' &&
        chrome &&
        chrome.runtime &&
        typeof chrome.runtime.getManifest === 'function' &&
        chrome.runtime.getManifest()
    );

    if (
        manifest &&
        manifest['applications'] &&
        manifest['applications']['gecko']
    ) {
        name = 'Firefox';
    }

    return {
        name: name.toLowerCase()
    };
};

const getBrowserStrategyGetBrowserInfo = async function () {
    let name = 'not-available';
    let version = 'not-available';

    const browserInfo = (
        typeof browser === 'object' &&
        browser &&
        browser.runtime &&
        typeof browser.runtime.getBrowserInfo === 'function' &&
        await browser.runtime.getBrowserInfo()
    );

    if (browserInfo) {
        name = browserInfo.name;
        version = browserInfo.version;
    }

    return {
        name: name.toLowerCase(),
        version
    };
};

const getBrowserStrategyCustomHacks = async function () {
    let name = 'not-available';
    const version = 'not-available';
    let byPassedUserAgentModification = false;

    identifyBrowserName: {
        // Detect browser (without using window.navigator.userAgent)

        if (typeof window.mozInnerScreenX === 'number') {
            // DATED-CODE
            name = 'Firefox';
            break identifyBrowserName;
        }

        if (typeof window.opr === 'object' && window.opr) {
            // DATED-CODE
            name = 'Opera';
            break identifyBrowserName;
        }

        if (typeof window.navigator.brave === 'object' && window.navigator.brave) {
            // DATED-CODE
            name = 'Brave';
            break identifyBrowserName;
        }

        // Just a block
        {
            const userAgentData = window.navigator.userAgentData || {};
            const brands = userAgentData.brands;

            if (Array.isArray(brands)) {
                if (!brands.length) {
                    // DATED-CODE: As of 2023-Jan, the code would reach here if a user has customized the User-Agent string on
                    // Chrome / Chromium based browser. Firefox does not support `window.navigator.userAgentData` yet.
                    byPassedUserAgentModification = true;
                    name = 'Chrome'; // Note: This is still a guess which should be true for most of the users.
                    break identifyBrowserName;
                }
            }
        }
    }

    return {
        name: name.toLowerCase(),
        version,
        byPassedUserAgentModification
    };
};

const getBrowserStrategyUserAgentData = function () {
    let name = 'not-available';
    let version = 'not-available';

    const userAgentData = window.navigator.userAgentData || {};
    const brands = userAgentData.brands || [];

    for (const ob of brands) {
        const brand = ((brand) => {
            if (brand === 'Google Chrome') {
                return 'Chrome';
            } else if (brand === 'Microsoft Edge') {
                return 'Edge';
            } else {
                return brand.toLowerCase();
            }
        })(ob.brand);
        if (
            brand === 'Chrome' ||
            brand === 'Edge' ||
            brand === 'Brave' ||
            brand === 'Opera' ||
            (
                brand === 'Chromium' &&
                name === 'not-available'
            )
        ) {
            name = brand;
            version = ob.version || 'not-available';
        }
    }

    return {
        name: name.toLowerCase(),
        version
    };
};

const getBrowserStrategyUserAgent = function () {
    // https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser/16938481#16938481
    const ua = navigator.userAgent;
    let tem;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR|Edge\/(\d+)/);
        if (tem != null) { return { name: 'Opera', version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }

    const name = M[0] || 'not-available';
    const version = M[1] || 'not-available';

    return {
        name: name.toLowerCase(),
        version
    };
};

const getBrowser = (function () {
    let confidenceLevel = 0;
    let sourceOfConfidence = 'not-available';
    let name = 'not-available';
    let flagChromiumBased = null;
    let encounteredError = false;

    return async function () {
        if (name === 'not-available') {
            try {
                identifyBrowserNameAndConfidenceLevel: {
                    name = getBrowserStrategyGetManifest().name;
                    if (name !== 'not-available') {
                        sourceOfConfidence = 'getManifest';
                        confidenceLevel = 1;
                        break identifyBrowserNameAndConfidenceLevel;
                    }

                    name = (await getBrowserStrategyGetBrowserInfo()).name;
                    if (name !== 'not-available') {
                        sourceOfConfidence = 'getBrowserInfo';
                        confidenceLevel = 1;
                        break identifyBrowserNameAndConfidenceLevel;
                    }

                    name = (await getBrowserStrategyCustomHacks()).name;
                    if (name !== 'not-available') {
                        sourceOfConfidence = 'customHacks';
                        confidenceLevel = 0.9;
                        break identifyBrowserNameAndConfidenceLevel;
                    }

                    name = getBrowserStrategyUserAgentData().name;
                    if (name !== 'not-available') {
                        sourceOfConfidence = 'userAgentData';
                        confidenceLevel = 0.8;
                        break identifyBrowserNameAndConfidenceLevel;
                    }

                    name = getBrowserStrategyUserAgent().name;
                    if (name !== 'not-available') {
                        sourceOfConfidence = 'userAgent';
                        confidenceLevel = 0.7;
                        break identifyBrowserNameAndConfidenceLevel;
                    }

                    name = 'chrome';
                    sourceOfConfidence = 'blind-guess';
                    confidenceLevel = 0.1;
                }
            } catch (err) {
                encounteredError = err;
            }

            if (name === 'firefox') {
                flagChromiumBased = false;
            } else if (
                [
                    'brave',
                    'chrome',
                    'chromium',
                    'opera',
                    'edge'
                ].includes(name)
            ) {
                flagChromiumBased = true;
            }
        }

        return {
            confidenceLevel,
            sourceOfConfidence,
            name,
            flagChromiumBased,
            encounteredError
        };
    };
})();

export {
    getBrowserStrategyGetManifest,
    getBrowserStrategyGetBrowserInfo,
    getBrowserStrategyCustomHacks,
    getBrowserStrategyUserAgentData,
    getBrowserStrategyUserAgent,
    getBrowser
};
