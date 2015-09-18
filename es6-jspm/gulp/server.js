'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var tools = require('require-dir')('./../build', {
  camelcase: true
});

gulp.task('reload', function() {
  return browserSync.reload();
});

gulp.task('reload:styles', ['styles'], function() {
  return browserSync.reload('*.css');
});

gulp.task('serve', ['styles'], function() {
  tools.startBrowserSync(['.tmp', 'src']);
});

gulp.task('serve:prod', ['build'], function(done) {
  tools.startBrowserSync(['.dist']);
});
