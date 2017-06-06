// Configuration de Webpack

import path from 'path';

import webpack from 'webpack';
import { webpackManifest } from './tools';
import querystring from 'querystring';
// import client from './client';

module.exports = (env) => {
	// V
	const rev = TASK_CONFIG.production.rev && env === 'production';

	// Configuration
	let webpackConfig = {
		// Points d'entrée
		entry: TASK_CONFIG.javascripts.entry,

		// Nos sorties
		output: {
			path: path.join(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.javascripts.dest),
			filename: rev ? '[name]-[hash].js' : '[name].js',
			publicPath: path.join(PATH_CONFIG.javascripts.dest, '/')
		},
		resolve: {
			extensions: TASK_CONFIG.extensions
		},
		module: {
			rules: [{
				// LOADERS
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}
			}]
		},
		plugins: []

	};

	// développement
	if (env === 'development') {
		webpackConfig.devtool = TASK_CONFIG.javascripts.devtool || 'eval-cheap-module-source-map';
		webpackConfig.output.pathinfo = true;

		if (!TASK_CONFIG.javascripts.hot || TASK_CONFIG.javascripts.hot.enabled !== false) {
			for (let key in TASK_CONFIG.javascripts.entry) {
				const entry = [];

				const hotMiddleware =
				`webpack-hot-middleware/client?${querystring.stringify(TASK_CONFIG.javascripts.hot)}`;

				TASK_CONFIG.javascripts.entry[key] = entry.concat(hotMiddleware, TASK_CONFIG.javascripts.entry[key]);
			}

			webpackConfig.plugins.push(
				new webpack.HotModuleReplacementPlugin(),
				new webpack.NoEmitOnErrorsPlugin()
			);
		}
	}

	// Production
	if (env === 'production') {
		if (rev) {
			webpackConfig.plugins.push(
				new webpackManifest(PATH_CONFIG.javascripts.dest, PATH_CONFIG.dest)
			);
		}

		webpackConfig.plugins.push(
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				}
			}),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
		);
	}

	const { customizeWebpackConfig = w => w } = TASK_CONFIG.javascripts;
	return customizeWebpackConfig(webpackConfig, env, webpack);

// end
};
