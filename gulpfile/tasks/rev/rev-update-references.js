import gulp from 'gulp';
import path from 'path';

import revReplace from 'gulp-rev-replace';

gulp.task('rev-update-references', function() {
	let manifest = gulp.src(path.join(process.env.PWD, PATH_CONFIG.dest, 'assets.json'));

	return gulp.src(path.join(process.env.PWD, PATH_CONFIG.dest,'**/**.{css,js}'))
		.pipe(revReplace({
			manifest: manifest
		}))
		.pipe(gulp.dest(PATH_CONFIG.dest));
});
