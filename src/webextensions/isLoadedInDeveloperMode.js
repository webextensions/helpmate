/* global chrome */

const isLoadedInDeveloperMode = function () {
    let flag = false;
    try {
        const manifest = chrome.runtime.getManifest();
        // TODO: Verify that this works well across browsers
        // https://stackoverflow.com/questions/12830649/check-if-chrome-extension-installed-in-unpacked-mode/20227975#20227975
        flag = (!('update_url' in manifest));
    } catch (e) {
        // do nothing
    }
    return flag;
};

export { isLoadedInDeveloperMode };
