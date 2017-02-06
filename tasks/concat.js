var gulp = require('gulp');
var concat_json = require("gulp-concat-json");

module.exports = function() {

	var task = gulp.src("_data/**/*.json")
    .pipe(concat_json("./temp/aprendizados.json"))
    .pipe(gulp.dest("./"));

	return task;
};
