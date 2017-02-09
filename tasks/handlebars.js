var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var templateData = require(".././temp/aprendizados.json");

module.exports = function() {

	var task = gulp.src('./README.template')
        .pipe(handlebars(templateData))
        .pipe(rename('README.md'))
        .pipe(gulp.dest('./'));

	return task;
};
