import gulp from 'gulp';
import path from 'path';
import fs from 'fs';

// Tasks
import taskDefaults from '../task-defaults';
import mergeWith from 'lodash/mergeWith';

// **
import notify from 'gulp-notify';
import gutil from 'gulp-util';

import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';

//
import data from 'gulp-data';
import rename from 'gulp-rename';
import render from 'gulp-nunjucks-render';

// CONFIG PATHS & TASKS
// ---|-----------------
// ==Configuration des chemins
export function getPathConfig () {
	return require('../config-path.json');
}

// ==Configuration des tâches
export function getTaskConfig () {
	return require('../config-task.js');
}

function withDefaults (taskConfig) {
	Object.keys(taskDefaults).reduce((config, key) => {
		if (taskConfig[key] !== false) {
			// if true, use default, else merge objects
			config[key] = taskDefaults[key] === false ?
				taskDefaults[key] :
				mergeWith(taskDefaults[key], config[key] || {}, replaceArrays);
		}
		return config;
	}, taskConfig);

	return taskConfig;
}
function replaceArrays(objValue, srcValue) {
	if (Array.isArray(objValue)) {
		return srcValue;
	}
}
const taskConfig = withDefaults(getTaskConfig());
export { taskConfig };

// ==Erreurs
export function handleErrors (error, cb) {
	notify.onError(error.toString().split(': ').join(':\n')).apply(this, arguments);
	if (typeof this.emit === 'function') {
		this.emit('end');
	}
}

// ==Enabled Tasks
export function getTasksEnabled(env) {
	//
	// var tasksAsset = ['fonts', 'iconFont', 'images', 'svgSprite'];
	// var tasksCode= ['html', 'stylesheets', 'javascripts'];

	var tasksAsset = ['iconFont', 'images'];
	var tasksCode = ['html', 'stylesheets', 'javascripts'];

	function matchFilter(task) {
		if (TASK_CONFIG[task]) {
			if (task === 'javascripts') {
				task = env === 'production' ? 'webpack:production' : false;
			}
			return task;
		}
	}

	function exists(value) {
		return !!value;
	}

	function findExistingTasks(candidates) {
		var tasks = compact(candidates.map(matchFilter).filter(exists));

		return isEmpty(tasks) ? false : tasks;
	}

	return {
		tasksAsset: findExistingTasks(tasksAsset),
		tasksCode: findExistingTasks(tasksCode)
	};
}

// WEBPACK
// === Webpack Manifest
export function webpackManifest (jsDest, dest, filename) {
	var filename = filename || 'assets.json';
	return function() {
		this.plugin('done', function(stats) {
			var stats = stats.toJson();
			var chunks = stats.assetsByChunkName;
			var manifest = {};

			for (var key in chunks) {
				var originalFilename = key + '.js';
				manifest[path.join(jsDest, originalFilename)] = path.join(jsDest, chunks[key]);
			}

			fs.writeFileSync(
				path.join(process.env.PWD, dest, filename),
				JSON.stringify(manifest)
			);
		});
	};
}

// ==Times
export function prettifyTime (milliseconds) {
	if (milliseconds > 999) {
		return (milliseconds / 1000).toFixed(2) + ' s';
	} else {
		return milliseconds + ' ms';
	}
}

// ==Logger
export function logger (err, stats) {
	if (err) {
		throw new gutil.PluginError('webpack', err);
	}

	var statColor = stats.compilation.warnings.length < 1 ? 'green' : 'yellow';

	if (stats.compilation.errors.length > 0) {
		stats.compilation.errors.forEach(function(error) {
			handleErrors(error);
			statColor = 'red';
		});
	} else {
		var compileTime = prettifyTime(stats.endTime - stats.startTime);
		gutil.log(gutil.colors[statColor](stats));
		gutil.log('Compiled with', gutil.colors.cyan('webpack'), 'in', gutil.colors.magenta(compileTime));
	}
}

// == Genrateur de template icons
export function generateIconSass(config) {
	return function(glyphs, options) {
		//
		gutil.log(gutil.colors.blue('Generating ' + config.sassDest + '/' + config.sassOutputName));

		render.nunjucks.configure(config.nunjucks, { watch: false });

		return gulp.src(config.template)
			.pipe(data({
				icons: glyphs.map(function(glyph) {
					gutil.log(gutil.colors.green('+ adding ' + glyph.name + ' glyph'));
					return {
						name: glyph.name,
						code: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase()
					};
				}),

				fontName: config.options.fontName,
				fontPath: config.fontPath,
				className: config.className,
				// comment:
				// '// NE MODIFIEZ PAS DIRECTEMENT!\n // Généré par iconFont.js\n  // de ' + config.template
				comment:
				'/*\n NE MODIFIEZ PAS DIRECTEMENT!\n Généré automatiquement par iconFont.js de '
				+ config.template + '\n*/'
			}))
			.pipe(render({
				path: config.template
			}))
			.on('error', handleErrors)
			.pipe(rename(config.sassOutputName))
			.pipe(gulp.dest(config.sassDest));
	};
}
