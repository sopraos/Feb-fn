import gulp from 'gulp';
import path from 'path';

import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackConfig from '../util/webpack-config';

let taskBrowserSync = function() {
	const WBConfig = webpackConfig('development');
	const compiler = webpack(WBConfig);
	const server = TASK_CONFIG.browserSync.proxy || TASK_CONFIG.browserSync.server;

	server.middleware = [
		require('webpack-dev-middleware')(compiler, {
			stats: 'errors-only',
			publicPath: path.join('/', WBConfig.output.publicPath)
		}),
		require('webpack-hot-middleware')(compiler)
	];

	// Init
	browserSync.init(TASK_CONFIG.browserSync);
};

gulp.task('browserSync', taskBrowserSync);
module.exports = taskBrowserSync;
