// Configuration par default

module.exports = {

	// Javascripts | Webpack
	javascripts: {
		extensions: ['.js', '.jsx', '.json'],

		// Points d'entrée
		entry: {
			app: ['./src/javascripts/app.js']
		},

		//
		hot: {
			reload: true,
			noInfo: false,
			quiet: true
		}
	},

	// Stylesheets
	stylesheets: {
		extensions: ['sass', 'scss', 'css']
	},

	// Html
	html: {
		dataFile: 'data/global.json',
		nunjucksRender: {
			envOptions: {
				watch: false
			}
		},
		extensions: ['html', 'json']
	},

	// Images
	images: {
		extensions: ['jpg', 'png', 'svg', 'gif']
	},

	// Fonts Icons
	iconFont: {
		sassDest: 'icons',
		extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
	}

//
};
