import gulp from 'gulp';
import path from 'path';
import CONFIG from '../config';

import { TasksEnabled } from '../util/tools';
import gulpSequence from 'gulp-sequence';

let TaskProduction = function(cb) {
	global.production = true;

	const tasks = TasksEnabled('production');
	const rev = CONFIG.production.rev ? 'rev' : false;

	gulpSequence('clean', tasks.TasksAssets, tasks.TasksCode, rev, cb);
};

gulp.task('build', TaskProduction);
module.exports = TaskProduction;
