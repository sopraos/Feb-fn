import gulp from 'gulp';

import gulpSequence from 'gulp-sequence';
import { TasksEnabled } from '../util/tools';

let TaskDefault = function(cb) {
	const tasks = TasksEnabled('watch');

	gulpSequence('clean', tasks.TasksAssets, tasks.TasksCode, 'watch', cb);
	console.log('Default tast');
};

gulp.task('default', TaskDefault);
module.exports = TaskDefault;
