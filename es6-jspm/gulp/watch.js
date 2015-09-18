'use strict';

var gulp = require('gulp');

gulp.task('watch', ['serve'], function() {
  gulp.watch(gulp.jsPaths, ['lint', 'scripts']);
  gulp.watch(['./src/**/*.less'], ['reload:styles']);
  gulp.watch(['./src/**/*.html', '!index.html'], ['reload']);
});
