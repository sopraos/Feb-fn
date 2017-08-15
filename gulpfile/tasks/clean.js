import gulp from 'gulp';
import path from 'path';

import del from 'del';

let taskClean = function (cb) {
	return del([path.join(process.env.PWD, PATH_CONFIG.dest)], { force: true });
};

gulp.task('clean', taskClean);
module.exports = taskClean;
