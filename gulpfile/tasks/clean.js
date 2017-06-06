import gulp from 'gulp';
import path from 'path';

import del from 'del';

let TaskClean = function (cb) {
	return del([path.join(process.env.PWD, PATH_CONFIG.dest)], { force: true });
};

gulp.task('clean', TaskClean);
module.exports = TaskClean;
