import gulp from 'gulp';
import path from 'path';
import fs from 'fs';

import browserSync from 'browser-sync';
import data from 'gulp-data';
import { handleErrors } from '../util/tools';
import nunjucksRender from 'gulp-nunjucks-render';

let taskHtml = function() {
	// Chemin
	const paths = {
		src: [path.join(process.env.PWD, PATH_CONFIG.src,
			PATH_CONFIG.html.src, '*.{' + TASK_CONFIG.html.extensions + '}')],
		dest: path.join(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.html.dest)
	};

	const dataFunction = TASK_CONFIG.html.dataFunction || function(file) {
		const dataPath = path.join(process.env.PWD, PATH_CONFIG.src,
			PATH_CONFIG.html.src, TASK_CONFIG.html.dataFile);
		return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
	};

	const nunjucksRenderPath = [ path.join(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src) ];
	TASK_CONFIG.html.nunjucksRender.path = TASK_CONFIG.html.nunjucksRender.path || nunjucksRenderPath;

	return gulp.src(paths.src)
		.pipe(data(dataFunction))
		.on('error', handleErrors)
		.pipe(nunjucksRender(TASK_CONFIG.html.nunjucksRender))
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream());

};

gulp.task('html', taskHtml);
module.exports = taskHtml;
