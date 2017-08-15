import gulp from 'gulp';
import path from 'path';

import { handleErrors, generateIconSass } from '../../util/tools';
import iconfont from 'gulp-iconfont';
import packager from '../../../package.json';
import url from 'url';

const fontPath = path.join(PATH_CONFIG.dest, PATH_CONFIG.iconFont.dest);
const cssPath = path.join(PATH_CONFIG.dest, PATH_CONFIG.stylesheets.dest);

let settings = {
	name: packager.name + ' icons',
	src: path.join(PATH_CONFIG.src, PATH_CONFIG.iconFont.src, '/*.svg'),
	dest: path.join(PATH_CONFIG.dest, PATH_CONFIG.iconFont.dest),
	sassDest: path.join(PATH_CONFIG.src, PATH_CONFIG.stylesheets.src,	PATH_CONFIG.iconFont.sassDest),
	template: path.normalize('./gulpfile/tasks/iconFont/template.scss'),
	sassOutputName: '_icons.scss',
	fontPath: url.resolve('.', path.relative(cssPath, fontPath)),
	className: 'icon',
	options: {
		timestamp: 0, // see https://github.com/fontello/svg2ttf/issues/33
		fontName: 'icons',
		normalize: false,
		formats: TASK_CONFIG.fonts.extensions
	}
};

let taskIconFont = function() {
	return gulp.src(settings.src)
		.pipe(iconfont(settings.options))
		.on('glyphs', generateIconSass(settings))
		.on('error', handleErrors)
		.pipe(gulp.dest(settings.dest));
};

gulp.task('iconFont', taskIconFont);
module.exports = taskIconFont;
