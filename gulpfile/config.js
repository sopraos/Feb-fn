module.exports = {
	// Config
	html: true,
	stylesheets: true,

	// Nos tasks
	TasksAssets: ['iconFont', 'images'],
	TasksCode: ['html', 'stylesheets', 'javascripts'],

	// Server
	browserSync: {
		server: {
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

	//
};
