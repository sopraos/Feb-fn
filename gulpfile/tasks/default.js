import gulp from 'gulp';

import gulpSequence from 'gulp-sequence';
import { getTasksEnabled } from '../util/tools';

let taskDefault = function(cb) {
	const tasks = getTasksEnabled('watch');
	gulpSequence('clean', tasks.tasksAsset, tasks.tasksCode, 'watch', cb);
};

gulp.task('default', taskDefault);
module.exports = taskDefault;
