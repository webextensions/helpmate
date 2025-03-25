const eslintIronPlateConfig = require('eslint-config-ironplate/node.js');

module.exports = [
    {
        // https://eslint.org/docs/latest/use/configure/ignore
        //
        // IMPORTANT:
        //     * https://github.com/eslint/eslint/discussions/18304#discussioncomment-9069706
        //     * https://github.com/eslint/eslint/discussions/17429#discussioncomment-6579229
        ignores: [
            // 'node_modules/**' is ignored by default

            // Temporary files
            'temp/**',

            // Auto-generated directories and contents
            'dist/**'
        ]
    },

    ...eslintIronPlateConfig,

    {
        files: [
            '**/*.js',
            '**/*.ts',
            '**/*.tsx'
        ],
        languageOptions: {
        },

        // Add ESLint plugins here. If they are stable and useful, move those as a pull
        // request to https://github.com/webextensions/eslint-config-ironplate/
        plugins: {
        },

        // Add ESLint rules here. If they are stable and useful, move those as a pull
        // request to https://github.com/webextensions/eslint-config-ironplate/
        rules: {
            'filenames/no-index': 'off',
            'import/no-unresolved': [2, { commonjs: true, amd: true }]
        }
    }
];
