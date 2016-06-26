var expect = require('chai').expect,
    assert = require('chai').assert,
    helpmate = require('../helpmate.js'),
    fs = require('fs'),
    path = require('path'),
    del = require('del');

describe('helpmate', function () {
    describe('helpmate.fs', function () {
        describe('helpmate.fs.updateFileIfRequired', function () {
            var filePath = path.normalize(__dirname + '/temp.txt');
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
                            del(filePath, function (err, paths) {
                                done();
                            });
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
                            del(filePath, function (err, paths) {
                                done();
                            });
                        }
                    }
                );
            });
        });
    });
});
