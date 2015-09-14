'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

gulp.task('lint', function() {
  return gulp.src(gulp.jsPaths)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('scripts', ['reload'], function(done) {
  runSequence('lint', 'test', done);
});
