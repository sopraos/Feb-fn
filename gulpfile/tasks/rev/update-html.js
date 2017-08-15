import gulp from 'gulp';
import path from 'path';

import revReplace from 'gulp-rev-replace';

// 5) Mettre à jour les assets dans l'HTML
gulp.task('update-html', function() {
	var manifest = gulp.src(path.join(process.env.PWD, PATH_CONFIG.dest, 'assets.json'));
	return gulp.src(path.join(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.html.dest, '**/*.html'))
		.pipe(revReplace({ manifest: manifest }))
		.pipe(gulp.dest(path.join(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.html.dest)));
});
