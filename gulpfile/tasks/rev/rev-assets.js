import gulp from 'gulp';
import path from 'path';

import rev from 'gulp-rev';
import revNapkin from 'gulp-rev-napkin';

gulp.task('rev-assets', function() {
	//
	var ignoreThese = '!' + path.join(process.env.PWD, PATH_CONFIG.dest,'**/*+(css|js|json|html)');

	return gulp.src([path.join(process.env.PWD, PATH_CONFIG.dest,'**/*'), ignoreThese])
		.pipe(rev())
		.pipe(gulp.dest(PATH_CONFIG.dest))
		.pipe(revNapkin({
			verbose: false, force: true
		}))
		.pipe(rev.manifest(path.join(process.env.PWD, PATH_CONFIG.dest, 'assets.json'), {
			merge: true
		}))
		.pipe(gulp.dest(''));
});
