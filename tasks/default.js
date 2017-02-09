"use strict";

var gulp = require("gulp");
var runSequence = require("run-sequence");

module.exports = function() {
	return runSequence("concat", "transformJson", "handlebars");
};