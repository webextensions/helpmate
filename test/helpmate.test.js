/* global before */

import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, assert } from 'chai';

// Currently, the tests are run via @babel/register which seems to be converting the syntax to CommonJS, which can't
// import ES modules. So, wait for import ES modules support in Node.js (to mature out of experimental support).
// Afterwards, the package `del` can be updated from the current version del@=6.1.1.
import del from 'del';

import { helpmate } from '../src/index.js';

const moduleDir = dirname(fileURLToPath(import.meta.url));
// const moduleDir = __dirname;

describe('helpmate', function () {
    describe('helpmate.fs', function () {
        describe('helpmate.fs.updateFileIfRequired', function () {
            const filePath = path.normalize(moduleDir + '/data/temp.txt');
            before(function (done) {
                fs.open(filePath, 'r', function (err, exists) { // eslint-disable-line no-unused-vars
                    let fileExists = true;

                    if (err && err.code === 'ENOENT') {
                        fileExists = false;
                    }
                    assert(fileExists === false, ' File/directory should not exist at ' + filePath);
                    done();
                });
            });

            it('Writes the file contents', function (done) {
                const data = 'This is dummy data.';
                helpmate.fs.updateFileIfRequired(
                    {
                        file: filePath,
                        data: data,
                        callback: function (err, status) { // eslint-disable-line no-unused-vars
                            const dataFromNewFile = fs.readFileSync(filePath, 'utf8');
                            expect(dataFromNewFile).to.equal(data);
                            (async () => {
                                await del([filePath]);
                                done();
                            })();
                        }
                    }
                );
            });
            it('Updates the file contents', function (done) {
                const
                    oldData = 'This is old data.',
                    newData = 'This is new data.';
                fs.writeFileSync(filePath, oldData, { encoding: 'utf8' });
                helpmate.fs.updateFileIfRequired(
                    {
                        file: filePath,
                        data: newData,
                        callback: function (err, status) {
                            expect(status).to.equal('file-updated');

                            const dataFromNewFile = fs.readFileSync(filePath, 'utf8');
                            expect(dataFromNewFile).to.equal(newData);
                            (async () => {
                                await del([filePath]);
                                done();
                            })();
                        }
                    }
                );
            });
        });
    });
});
