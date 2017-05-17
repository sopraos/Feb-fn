const path = require('path');

module.exports = {
	entry: {
		app: ['./src/stylesheets/app.scss', './src/javascripts/app.js']
	},
	port: 9092,
	html: true,
	browsers: ['last 4 versions', '> 1%', 'ie > 8'],
	assets_url: '/',  // Urls dans le fichier final
	stylelint: './src/stylesheets/**/*.scss',
	assets_path: path.join(__dirname, '../dist/'),

	// Permet de forcer le rafraichissement du navigateur lors de la modification de ces fichiers
	refresh: ['./index.html'],
	debug: process.env.NODE_ENV === 'development'
};
