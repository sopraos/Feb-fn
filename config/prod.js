const webpack = require('webpack');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin');
const base = require('./base');
// const config = require('./config')

base.plugins.push(
	// new ProgressBarPlugin(),
	new webpack.LoaderOptionsPlugin({
		minimize: true,
		debug: false
	}),
	new webpack.optimize.UglifyJsPlugin({
		beautify: false,
		sourceMap: false,
		mangle: {
			screw_ie8: true,
			keep_fnames: true
		},
		compress: {
			screw_ie8: true
		},
		comments: false
	}),
	// new AssetsPlugin({filename: config.assets_path + 'assets.json'})
	new AssetsPlugin({
		filename: './dist/' + 'assets.json'
	})
);

module.exports = base;
