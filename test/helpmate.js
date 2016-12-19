var fs = require('fs'),
    path = require('path');

var expect = require('chai').expect,
    assert = require('chai').assert,
    del = require('del');

var helpmate = require('../lib/helpmate.js');

describe('helpmate', function () {
    describe('helpmate.fs', function () {
        describe('helpmate.fs.updateFileIfRequired', function () {
            var filePath = path.normalize(__dirname + '/data/temp.txt');
            before(function (done) {
                fs.open(filePath, 'r', function (err, exists) {
                    var fileExists = true;

                    if (err && err.code === 'ENOENT') {
                        fileExists = false;
                    }
                    assert(fileExists === false, ' File/directory should not exist at ' + filePath);
                    done();
                });
            });

            it('Writes the file contents', function (done) {
                var data = 'This is dummy data.';
                helpmate.fs.updateFileIfRequired(
                    {
                        file: filePath,
                        data: data,
                        callback: function (err, status) {
                            var dataFromNewFile = fs.readFileSync(filePath, 'utf8');
                            expect(dataFromNewFile).to.equal(data);
                            del.sync([filePath]);
                            done();
                        }
                    }
                );
            });
            it('Updates the file contents', function (done) {
                var oldData = 'This is old data.',
                    newData = 'This is new data.';
                fs.writeFileSync(filePath, oldData, {encoding: 'utf8'});
                helpmate.fs.updateFileIfRequired(
                    {
                        file: filePath,
                        data: newData,
                        callback: function (err, status) {
                            expect(status).to.equal('file-updated');

                            var dataFromNewFile = fs.readFileSync(filePath, 'utf8');
                            expect(dataFromNewFile).to.equal(newData);
                            del.sync([filePath]);
                            done();
                        }
                    }
                );
            });
        });
    });
});
