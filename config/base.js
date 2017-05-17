// const path = require('path')
const webpack = require('webpack');
const config = require('./config');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const postcss = {
	plugins: [
		require('autoprefixer')({
			browsers: config.browsers
		})
	]
};

let base = {
	// Points d'entrée
	devtool: config.debug ? 'cheap-module-eval-source-map' : false,
	entry: config.entry,

	// Nos sorties
	output: {
		path: config.assets_path,
		filename: config.debug ? '[name].js' : '[name].[chunkhash:8].js',
		publicPath: config.assets_url
	},

	// Ici, on peut ajouter nos extensions à résoudre lors d'un require()
	resolve: {
		extensions: ['.js', '.css', '.scss', '.json']
	},

	module: {
		// Liste de nos loaders
		// ! \\ à noter que les loaders sont exécutés en ordre inverse
		// les premiers en dernier
		rules: [
			// LINTERS
			{
				enforce: 'pre',
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				use: ['eslint-loader']
			},
			// LOADERS
			{
				// Pour tous les fichiers qui finissent par .js ou .jsx
				// en prenant bien soin d'exclure les node_modules
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				// On ajoute le loader babel
				// use: 'babel-loader'
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
						// presets: [
						//   ['env', {
						//     targets: {
						//       browsers: ['last 4 versions', 'safari >= 7']
						//     }
						//   }
						//   ]
						// ]
					}
				}
			},

			// Pour nos CSS, on va utiliser un plugin un peu particulier
			// qui va nous permettre de require() nos CSS comme un module
			// mais qui va tout de même permettre de sortir tout cela dans un seul
			// fichier .css pour la production
			// test: /\.(css|scss)$/,
			{
				test: /\.(css|scss)$/,
				exclude: [/node_modules/],
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader'
						},
						{
							loader: 'sass-loader'
						}
					],
					// use style-loader in development
					fallback: 'style-loader'
				})
			},
			// Url loader
			{
				test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
				use: [
					{ loader: 'url-loader',
						query: {
							limit: 10000,
							// name: '[name].[hash:7].[ext]'
							name: '[name].[ext]'
						}
					}
				]
			}

		]
	},

	// Nos plugins
	plugins: [
		//
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: postcss
			}
		}),
		//
		new ExtractTextPlugin({
			filename: '[name].[contenthash:8].css',
			disable: config.debug
		}),
		new FriendlyErrorsWebpackPlugin()
	]
//
};

if (config.stylelint) {
	base.plugins.push(
		new StyleLintPlugin({
			files: config.stylelint
		})
	);
}

if (config.html) {
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	base.plugins.push(
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		})
	);
}

module.exports = base;
