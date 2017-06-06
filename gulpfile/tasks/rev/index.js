import gulp from 'gulp';

import gulpSequence from 'gulp-sequence';

let TaskRev = function(cb) {
	gulpSequence('rev-css', cb);
};

gulp.task('rev', TaskRev);
module.exports = TaskRev;
