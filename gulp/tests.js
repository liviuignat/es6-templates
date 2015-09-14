'use strict';

var gulp = require('gulp');
var path = require('path');
var tools = require('require-dir')('./../build', {
  camelcase: true
});

gulp.task('test', function(done) {
  var options = {
    configFile: path.resolve('karma.conf.js'),
    singleRun: true,
    browsers: ['PhantomJS']
  };
  tools.runKarma(options, done);
});
