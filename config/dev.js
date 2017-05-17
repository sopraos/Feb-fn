const path = require('path');
const webpack = require('webpack');
const base = require('./base');
const config = require('./config');

base.output.publicPath = 'http://localhost:' + config.port + config.assets_url;
base.output.path = '/tmp/';
for (var name in base.entry) {
	base.entry[name] = [path.resolve(__dirname, './client'), ...base.entry[name]];
}

base.plugins.push(
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
	// new webpack.NoEmitOnErrorsPlugin()
);

module.exports = base;
