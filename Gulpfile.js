'use strict';


// -----------------------------------------------------------------------------
// Dépendances
// -----------------------------------------------------------------------------

var gulp = require('gulp'),
  // On appelle nos plugins
  plugins = require('gulp-load-plugins')();
/*
 * Les Dépendances instalé
 * -----------------------
 * gulp-load-plugins
 *
 * ===== Globaux =====
 * gulp-concat     | Concatène des fichiers
 * gulp-sourcemaps | Source Maps
 * gulp-rename     | Renommer des fichiers
 * gulp-livereload | Actualise automatiquement le navigateur lors d'un enregistrement d'un fichier
 * gulp-clean      | Supprime les fichiers et dossiers.
 *
 * ===== Styles =====
 * gulp-sass         | Sass
 * gulp-autoprefixer | Autoprefixer
 * gulp-clean-css    | Minifie CSS
 *
 * ===== Scripts =====
 * gulp-jshint         | Détecte les erreurs et les problèmes potentiels dans le code
 *   jshint
 *   jshint-stylish
 * gulp-uglify         | Minifie JS
 *
 * ===== images =====
 * gulp-imagemin       | Minifie Images [.png, .jpg, .svg, etc... ]
 */

// -----------------------------------------------------------------------------
// Clean | nettoyage
// -----------------------------------------------------------------------------

gulp.task('clean', function () {
  return gulp.src(['./web/images'], {read: false})
    .pipe(plugins.clean());
});

// -----------------------------------------------------------------------------
// Compilation SASS
// -----------------------------------------------------------------------------

gulp.task('styles', function () {
  return gulp.src('./MySrc/styles/main.scss')
  // Initialisations de Source Maps
    .pipe(plugins.sourcemaps.init())

    // Sass & Error
    .pipe(plugins.sass.sync().on('error', plugins.sass.logError))

    // Autoprefixer
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
      //cascade: false
    }))

    // Concaténation
    .pipe(plugins.concat('style.css'))

    // Sauvegarde le tout dans ./web/css/ Sans Minification
    .pipe(gulp.dest('./web/css'))

    // Renomme le fichier en .min.css
    .pipe(plugins.rename({
      basename: "style",
      suffix: ".min"
    }))

    // Minifie le fichier CSS
    .pipe(plugins.cleanCss({
      compatibility: 'ie8'
    }))

    //Source Maps
    .pipe(plugins.sourcemaps.write('.'))

    // On déplace les fichiers dans notre dossier final
    .pipe(gulp.dest('./web/css'))

    // Livereload
    .pipe(plugins.livereload());
});

// -----------------------------------------------------------------------------
// Javascript
// -----------------------------------------------------------------------------
gulp.task('scripts', function () {
  return gulp.src([
    './MySrc/scripts/libs/*.js',
    './MySrc/scripts/core.js',
    './MySrc/scripts/components/*.js'
  ])
  // Initialisations de Source Maps
    .pipe(plugins.sourcemaps.init())

    // Détecter les erreurs et les problèmes potentiels dans le code JavaScript
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))

    // Concaténation
    .pipe(plugins.concat('style.js'))

    // Sauvegarde le tout dans ./web/js/ Sans Minification
    .pipe(gulp.dest('./web/js'))

    // Renomme le fichier en .min.js
    .pipe(plugins.rename({
      basename: "style",
      suffix: ".min"
    }))

    // Minifie le fichier JS
    .pipe(plugins.uglify())

    //Source Maps
    .pipe(plugins.sourcemaps.write('.'))

    // On déplace les fichiers dans notre dossier final
    .pipe(gulp.dest('./web/js'))

    // Livereload
    .pipe(plugins.livereload());

});


// -----------------------------------------------------------------------------
// Images
// -----------------------------------------------------------------------------

gulp.task('images', ['clean'], function () {
  return gulp.src('./MySrc/images/**/*')
  // Optimisation des images
    .pipe(plugins.imagemin())
    .pipe(gulp.dest('./web/images'))

    // Livereload
    .pipe(plugins.livereload());
});


// -----------------------------------------------------------------------------
// Iconfont
// -----------------------------------------------------------------------------

gulp.task('iconfont', function () {
  console.log('iconfont');
});



// -----------------------------------------------------------------------------
// Default
// -----------------------------------------------------------------------------

//gulp.task('default', ['styles', 'scripts', 'images', 'iconfont'], function () {
gulp.task('default', ['styles', 'scripts', 'images'], function () {
  // Livereload
  //plugins.livereload.listen({ basePath: 'dist' });
  plugins.livereload.listen();

  // Génération des fichiers à chaque modification
  gulp.watch('./MySrc/styles/**/*.scss', ['styles']);
  gulp.watch('./MySrc/scripts/**/*.js', ['scripts']);
  gulp.watch('./MySrc/images/**/*', ['images']);
  //gulp.watch('../fonts/icons/*.svg', ['iconfont']);
  gulp.watch(['*.html']).on('change', function(event) {
    plugins.livereload.changed(event.path)
  })

});