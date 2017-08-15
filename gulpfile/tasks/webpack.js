// Wepback production
import gulp from 'gulp';

import webpack from 'webpack';
import { logger } from '../util/tools';

let taskWebpackProduction = function(cb) {

	let webpackConfig = require('../util/webpack-config')('production');

	webpack(webpackConfig, function(err, stats) {
		logger(err, stats);
		cb();
	});

};

gulp.task('webpack:production', taskWebpackProduction);
module.exports = taskWebpackProduction;
