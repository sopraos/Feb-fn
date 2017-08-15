import gulp from 'gulp';
import path from 'path';
import browserSync from 'browser-sync';
import changed from 'gulp-changed';

let taskImages = function() {
	// Chemin
	const paths = {
		src: path.join(process.env.PWD,
			PATH_CONFIG.src, PATH_CONFIG.images.src, '**/*.{' + TASK_CONFIG.images.extensions + '}'),
		dest: path.join(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.images.dest)
	};

	return gulp.src(paths.src)
		.pipe(changed(paths.dest)) // Ignorer les fichiers non modifiés
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream());

};

gulp.task('images', taskImages);
module.exports = taskImages;
