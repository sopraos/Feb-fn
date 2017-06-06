import gulp from 'gulp';
import path from 'path';
import watch from 'gulp-watch';

// import watch from 'gulp-watch';

let TaskWatch = function() {
	const watchableTasks = ['iconFont', 'images', 'html', 'stylesheets'];

	function getTaskPathFor(taskName) {
		switch (taskName) {
		case 'iconFont':
			return PATH_CONFIG.iconFont;
		case 'svgSprite':
			return PATH_CONFIG.icons;
		case 'html':
			return PATH_CONFIG.html;
		case 'static':
			return PATH_CONFIG.static;
		default:
			return PATH_CONFIG[taskName];
		}
	}

	watchableTasks.forEach(function(taskName) {
		var taskConfig = TASK_CONFIG[taskName];
		var taskPath = getTaskPathFor(taskName);
		var watchConfig = {};
		if (TASK_CONFIG.watch !== undefined && TASK_CONFIG.watch.gulpWatch !== undefined) {
			watchConfig = TASK_CONFIG.watch.gulpWatch;
		}

		if (taskConfig) {
			var srcPath = path.join(process.env.PWD, PATH_CONFIG.src, taskPath.src);
			var globPattern = '**/*' + (taskConfig.extensions ? '.{' + taskConfig.extensions.join(',') + '}' : '');
			watch(path.join(srcPath, globPattern), watchConfig, function() {
				require('./' + taskName)();
			});
		}
	});

};

gulp.task('watch', ['browserSync'], TaskWatch);
module.exports = TaskWatch;
