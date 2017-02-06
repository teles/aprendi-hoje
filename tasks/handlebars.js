var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var templateData = require(".././aprendizados.json");

module.exports = function() {

	var task = gulp.src('./readme.hbs')
        .pipe(handlebars(templateData))
        .pipe(rename('README.md'))
        .pipe(gulp.dest('./'));

	return task;
};
