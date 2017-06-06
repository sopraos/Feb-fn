import gulp from 'gulp';
import path from 'path';

import { handleErrors } from '../util/tools';
import browserSync from 'browser-sync';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';

let TaskStylesheets = function() {
	// Chemin
	const paths = {
		src: path.join(process.env.PWD, PATH_CONFIG.src,
		PATH_CONFIG.stylesheets.src, '**/*.{' + TASK_CONFIG.stylesheets.extensions + '}'),
		dest: path.join(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.stylesheets.dest)
	};

	return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(sass(TASK_CONFIG.stylesheets.sass))
    .on('error', handleErrors)
    .pipe(autoprefixer(TASK_CONFIG.stylesheets.autoprefixer))
		.pipe(gulpif(global.production, cleanCSS({
			compatibility: 'ie8'
		})))
    .pipe(gulpif(!global.production, sourcemaps.write()))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());

};

gulp.task('stylesheets', TaskStylesheets);
module.exports = TaskStylesheets;
