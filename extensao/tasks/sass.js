var gulp = require('gulp');
var sass = require('gulp-sass');

module.exports = function() {

	var options = {
		includePaths: ['./bower_components/sass-material-colors/sass', 'bower_components/compass-mixins/lib/compass'],
		outputStyle: 'compressed'
	};

	return gulp.src(['./sass/**/*.sass'])
		.pipe(sass(options))
		.pipe(gulp.dest('./css'));

};


