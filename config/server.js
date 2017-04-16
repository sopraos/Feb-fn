const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpackDev = require('./dev')
const config = require('./config')
const compiler = webpack(webpackDev)
const hotMiddleware = require('webpack-hot-middleware')(compiler)
const chokidar = require('chokidar')

// Force le rafraichissement du navigateur
let refresh = function (path) {
	console.log('* ' + path + ' changed')
	hotMiddleware.publish({action: 'reload'})
}

let server = new WebpackDevServer(compiler, {
	hot: true,
	quiet: true,
	noInfo: false,
	publicPath: webpackDev.output.publicPath,
	stats: {
		colors: true,
		chunks: false
	}
})
server.use(hotMiddleware)
server.listen(config.port, function (err) {
	if (err) {
		console.log(err)
		return
	}
	chokidar.watch(config.refresh).on('change', refresh)
	console.log('==> Listening on http://localhost:' + config.port)
})
