'use strict';

var gulp = require('gulp');
var tools = require('require-dir')('./../build', {
  camelcase: true
});

gulp.task('styles', function(done) {
  tools.compileLess({
    from: './src/index.less',
    to: './.tmp/index.css',
    base: './src',
    embedErrors: true,
    csswring: {
      removeAllComments: true
    },
    autoprefixer: {
      browsers: gulp.supportedBrowsers
    }
  }).then(done, done);
});
