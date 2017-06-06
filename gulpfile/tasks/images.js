import gulp from 'gulp';
import path from 'path';
import browserSync from 'browser-sync';
import changed from 'gulp-changed';

let TaskImages = function() {
	// Chemin
	const paths = {
		src: path.resolve(process.env.PWD,
		PATH_CONFIG.src, PATH_CONFIG.images.src, '**/*.{' + TASK_CONFIG.images.extensions + '}'),
		dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.images.dest)
	};

	return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignorer les fichiers non modifiés
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());

};

gulp.task('images', TaskImages);
module.exports = TaskImages;
