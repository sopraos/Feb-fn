import gulp from 'gulp';

import gulpSequence from 'gulp-sequence';
import { getTasksEnabled } from '../util/tools';

const taskProduction = function(cb) {
	global.production = true;

	const tasks = getTasksEnabled('production');
	const rev = TASK_CONFIG.production.rev ? 'rev' : false;

	gulpSequence('clean', tasks.tasksAsset, tasks.tasksCode, rev, cb);
};

gulp.task('build', taskProduction);
module.exports = taskProduction;
