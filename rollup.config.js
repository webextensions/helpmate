/* eslint-disable filenames/match-exported */

import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

const plugins = [
    resolve(),
    commonjs(),
    json(),
    terser({
        // Equivalent to:
        //     $ terser <source> --compress sequences=false --format semicolons=false --output <destination>

        compress: {
            sequences: false
        },
        mangle: false,
        format: {
            semicolons: false,
            comments: function (_, comment) {
                if (
                    comment.value.charAt(0) === '!' ||
                    /cc_on|copyright|license|preserve/i.test(comment.value)
                ) {
                    return true;
                } else {
                    return false;
                }

                // if (comment.type === 'comment2') { // multiline comment
                //     return /@preserve|@license|@cc_on/i.test(comment.value);
                // } else if (comment.type === 'comment1') { // single line comment
                //     if (comment.value.indexOf('!') === 0) {
                //         return true;
                //     } else {
                //         return /@preserve|@license|@cc_on/i.test(comment.value);
                //     }
                // } else {
                //     return false;
                // }
            }
        }
    })
];

const output = {
    exports: 'named',
    sourcemap: true
};

/*
// Target output
const rollupConfig = [
    {
        input: 'src/index.js',
        output: { ...output, format: 'cjs', file: 'dist/index.cjs' },
        plugins
    },
    {
        input: 'src/index.js',
        output: { ...output, format: 'esm', file: 'dist/index.js' },
        plugins
    },
    ...
];
*/

// Read the list of files and directories recursively in the "src" directory
// and create a rollup config for each one.

const helpmateDir = path.resolve('./src');
const helpmateDirLength = helpmateDir.length;

const getFiles = async (dir) => {
    let dirents = await fs.readdir(dir, { withFileTypes: true });
    dirents = dirents.filter((dirent) => {
        if (dirent.name.endsWith('.test.mjs')) {
            return false;
        } else {
            return true;
        }
    });

    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
};

let files = await getFiles(helpmateDir);

files = (
    files
        .map((file) => {
            return file.slice(helpmateDirLength + 1);
        })
        .map((file) => {
            return '/' + file;
        })
);

/*
    Sample input:
        [
            '/array/index.js',
            '/array/sortArrayOfObjectsByProperty.js',
            '/async/eachOfLimitInOrder.js',
            '/async/index.js',
            '/fs/index.js',
            '/fs/updateFileIfRequired.js',
            '/index.js',
            '/logger/index.js',
            '/logger/noteDown.js',
            '/tasks/index.js',
            '/tasks/retryNTimesWithDelay.js'
        ]
    Sample output:
        [
            '/array/sortArrayOfObjectsByProperty.js',
            '/array/index.js',
            '/async/eachOfLimitInOrder.js',
            '/async/index.js',
            '/fs/updateFileIfRequired.js',
            '/fs/index.js',
            '/logger/noteDown.js',
            '/logger/index.js',
            '/tasks/retryNTimesWithDelay.js',
            '/tasks/index.js',
            '/index.js'
        ]
*/
// Sort the files so that the index.js files are last (also applicable for individual sub-folders)
// That means, split by the last occurring "/" character and sort by the first part of the split (if the first part of
// the split is empty, then that entry should come last since it represents the root path), followed by sorting
// the second part while considering the index.js files as the last ones from the second part.
files.sort((a, b) => {
    const aSplit = a.split('/').reverse();
    const bSplit = b.split('/').reverse();
    const aFirstPart = aSplit[1];
    const bFirstPart = bSplit[1];
    if (aFirstPart === bFirstPart) {
        if (aSplit[0] === 'index.js') {
            return 1;
        } else if (bSplit[0] === 'index.js') {
            return -1;
        } else {
            return aSplit[0] < bSplit[0] ? -1 : 1;
        }
    } else {
        if (aFirstPart === '') {
            return 1;
        } else if (bFirstPart === '') {
            return -1;
        } else {
            return aFirstPart < bFirstPart ? -1 : 1;
        }
    }
});

let previousFolder = null,
    currentFolder = null;

const filesSeparatedByNullPerDirectory = [];
for (const file of files) {
    currentFolder = dirname(file);
    if (
        previousFolder !== null &&
        currentFolder !== previousFolder
    ) {
        filesSeparatedByNullPerDirectory.push(null);
    }
    filesSeparatedByNullPerDirectory.push(file);
    previousFolder = currentFolder;
}

files = filesSeparatedByNullPerDirectory;
// console.log('>>>>>>>>>>>>>>>');
// console.log(files);
// console.log(filesSeparatedByNullPerDirectory);
// console.log('<<<<<<<<<<<<<<<');

// Remove the "/" character from the beginning of each file which was added in one of the previous steps
files = files.map((file) => {
    if (file === null) {
        return null;
    }
    return file.slice(1);
});

// Remove the ".js" extension from each file
files = files.map((file) => {
    if (file === null) {
        return null;
    }
    return file.slice(0, -3);
});

const listOfImports = [];
const listOfRequires = [];
const listOfFiles = [];

const rollupConfig = files.map((file) => {
    if (file === null) {
        listOfImports.push('');
        listOfRequires.push('');
        listOfFiles.push('');
        return null;
    }

    const source = file;
    const input = `src/${source}.js`;

    let namedExport = source.split('/').pop();
    if (namedExport === 'index') {
        namedExport = source.split('/').slice(-2)[0];
    }
    if (namedExport === 'index') {
        namedExport = 'helpmate';
    }
    listOfImports.push(`import { ${namedExport} } from 'helpmate/dist/${source}.js';`);
    listOfRequires.push(`const { ${namedExport} } = require('helpmate/dist/${source}.cjs');`);
    listOfFiles.push(`src/${source}.js`);

    return {
        input,
        output: [
            { ...output, format: 'cjs', file: `dist/${source}.cjs` },
            { ...output, format: 'esm', file: `dist/${source}.js` }
        ],
        plugins
    };
}).filter(x => x);

listOfImports.push(`import { helpmate } from 'helpmate';`);
listOfRequires.push(`const { helpmate } = require('helpmate');`);

console.log('List of files being bundled:');
// console.log(
//     '    ' +
//     files.map((file) => {
//         return `src/${file}.js`;
//     }).join('\n    ')
// );
console.log('    ' + listOfFiles.join('\n    '));

console.log('\nExamples of `import` for the modules:');
console.log('    ' + listOfImports.join('\n    '));

console.log('\nExamples of `require` for the modules:');
console.log('    ' + listOfRequires.join('\n    '));

const __dirname = dirname(fileURLToPath(import.meta.url));

const readmeTemplate = await fs.readFile(
    path.resolve(__dirname, 'README.md.template')
);
const readme = (
    readmeTemplate
        .toString()
        .replace('{{listOfImports}}', listOfImports.join('\n'))
        .replace('{{listOfRequires}}', listOfRequires.join('\n'))
        .replace('{{listOfFiles}}', listOfFiles.join('\n'))
        // .replace('{{listOfFiles}}', files.map((file) => {
        //     return `src/${file}.js`;
        // }).join('\n'))
);
await fs.writeFile(path.resolve(__dirname, 'README.md'), readme);

console.log('');
console.log(' ✓ Updated README.md file');

await fs.writeFile(path.resolve(__dirname, 'rollup.generated-config.json'), JSON.stringify(rollupConfig, null, 4));

export default rollupConfig; // eslint-disable-line import/no-default-export
