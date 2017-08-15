module.exports = {
	html: true,
	images: true,
	iconFont: false,
	stylesheets: true,
	ghPages: true,

	// Javascripts | Webpack
	javascripts: {
		extensions: ['.js', '.jsx', '.json'],
		// Points d'entrée
		entry: {
			// Les chemins des fichiers sont relatifs à javascripts.dest dans config-path.json
			app: ['./app.js']
			// app: ['./src/javascripts/app.js']
		},

		hot: {
			reload: true,
			noInfo: false,
			quiet: true
		}
		// Ext
		// publicPath: '/assets/javascripts'
	},

	// Serveur
	browserSync: {
		server: {
			// Devrait correspondre `dest` dans config-path.json
			baseDir: 'public'
		},
		// proxy: {
		// 	target: 'http://127.0.0.1:8000/'
		// },
		// files: [''],
		port: 9201,
		ui: {
			port: 9202
		},
		notify: false
	},

	// Production
	production: {
		rev: true
	}
};
