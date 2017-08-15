import gulp from 'gulp';

import gulpSequence from 'gulp-sequence';

var updateHtml = TASK_CONFIG.html ? 'update-html' : false;

let taskRev = function(cb) {
	gulpSequence(
		'rev-assets', // 1) Ajoute des hachage aux fichiers Js et Css
		'rev-update-references', // 2) Mettre à jour les références des (images, fonts, etc)avec des noms de fichiers renvoyés dans css + js compilé								
		'rev-css', updateHtml, cb);
};

gulp.task('rev', taskRev);
module.exports = taskRev;
