module.exports = {
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

	// Fonts & Fonts Icons
	fonts: {
		extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
	}

};
