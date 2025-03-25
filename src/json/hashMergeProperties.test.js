import { expect } from 'chai';

import { hashMergeProperties } from './hashMergeProperties.js';

describe('json/hashMergeProperties', function () {
    it('Merges properties which are tagged with "#merge"', function () {
        /* eslint-disable @stylistic/quotes */
        /* eslint-disable @stylistic/quote-props */
        const input = {
            "server": {
                "config": {
                    "_base": {
                        "https": true,
                        "timeout": 10000
                    },
                    "_development": {
                        "#merge": "_base"
                    },
                    "_local": {
                        "#merge": "_development",
                        "timeout": 5000,
                        "https": false
                    },
                    "_baseProduction": {
                        "#merge": "_base",
                        "timeout": 30000
                    },
                    "_preproduction": {
                        "#merge": "_baseProduction",
                        "sourcemap": true
                    },
                    "_production": {
                        "#merge": "_baseProduction",
                        "sourcemap": false
                    }
                }
            }
        };

        const expectedOutput = {
            "server": {
                "config": {
                    "_base": {
                        "https": true,
                        "timeout": 10000
                    },
                    "_development": {
                        "https": true,
                        "timeout": 10000
                    },
                    "_local": {
                        "https": false,
                        "timeout": 5000
                    },
                    "_baseProduction": {
                        "https": true,
                        "timeout": 30000
                    },
                    "_preproduction": {
                        "https": true,
                        "sourcemap": true,
                        "timeout": 30000
                    },
                    "_production": {
                        "https": true,
                        "sourcemap": false,
                        "timeout": 30000
                    }
                }
            }
        };
        /* eslint-enable @stylistic/quote-props */
        /* eslint-enable @stylistic/quotes */

        const output = hashMergeProperties(input);

        expect(output).to.deep.equal(expectedOutput);
    });
});
