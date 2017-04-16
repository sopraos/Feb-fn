const path = require('path')

module.exports = {
	entry: {
		app: ['./MySrc/styles/main.scss', './MySrc/scripts/core.js']
	},
	port: 9092,
	html: true,
	browsers: ['last 4 versions', '> 1%', 'ie > 8'],
	assets_url: '/',  // Urls dans le fichier final
	stylelint: './MySrc/styles/**/*.scss',
	assets_path: path.join(__dirname, '../dist/'),
	refresh: ['./index.html'], // Permet de forcer le rafraichissement du navigateur lors de la modification de ces fichiers
	debug: process.env.NODE_ENV === 'development'
}
