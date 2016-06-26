// https://github.com/gulpjs/gulp/tree/4.0
// http://demisx.github.io/gulp4/2015/01/15/install-gulp4.html
var gulp = require('gulp'),
    del = require('del');

require('shelljs/global');

var paths = {
    lib: ['./lib/**/*.js'],
    test: ['./test/**/*.js'],
    docs: ['./docs/']
};

// https://cameronspear.com/blog/handling-sync-tasks-with-gulp-js/
gulp.task(jsdoc);
function jsdoc(cb) {
	console.log('Deleting: ' + paths.docs.join(', '));
	var files = del.sync(paths.docs);
	console.log('Done!');

    console.log('Creating documentation at: ' + paths.docs.join(', '));
	// https://www.npmjs.com/package/shelljs
	if (exec('./node_modules/.bin/jsdoc -c conf.json').code !== 0) {
		echo('Error: Generating documentation with JSDoc failed.');
		exit(1);
	} else {
		console.log('Done!');
		cb();
	}
}

gulp.task(watch);
function watch() {
	gulp.watch(paths.lib, jsdoc);
}

gulp.task('default', watch);
