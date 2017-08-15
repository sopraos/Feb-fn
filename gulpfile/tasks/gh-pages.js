import gulp from 'gulp';
import path from 'path';
import os from 'os';

import ghPages from 'gulp-gh-pages';

const taskGhPages = function() {
	const pkg = require(path.join(process.env.PWD, 'package.json'));

	const settings = {
		// src: path.resolve(process.env.PWD, PATH_CONFIG.finalDest, '**/*')
		src: path.resolve(process.env.PWD, PATH_CONFIG.dest, '**/*')
	};

	return gulp.src(settings.src)
		.pipe(ghPages(TASK_CONFIG.ghPages, { message: 'Commit auto-généré' }));

};

gulp.task('gh-pages', ['build'], taskGhPages);
module.exports = taskGhPages;
