'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var rimraf = require('rimraf');
var bundleLess = require('bundle-less');
var runSequence = require('run-sequence');
var tools = require('require-dir')('./../build', {
  camelcase: true
});

gulp.task('clean', function(done) {
  ['.tmp', '.dist'].forEach(function(dir) {
    rimraf.sync(dir, {
      maxBusyTries: 5
    });
  });
  done();
});

gulp.task('build:prod-scripts', function() {
  return tools.bundleModules({
    packagePath: '.',
    rootModule: 'polyfills + app',
    moduleMappings: {},
    outputPath: '.dist/app.js',
    base: 'src',
    sourceRoot: '/sources/',
    minify: true,
    mangle: true,
    htmlmin: htmlminOptions
  });
});

gulp.task('build:prod-styles', function(done) {
  tools.compileLess({
    from: 'src/index.less',
    to: '.dist/index.css',
    base: 'src',
    embedErrors: true,
    csswring: {
      removeAllComments: true
    },
    autoprefixer: {
      browsers: supportedBrowsers
    }
  }).then(done, done);
});

gulp.task('build:html', function() {
  var time = new Date().getTime();
  return gulp.src('src/index.html')
    .pipe($.htmlReplace({
      css: {
        src: '/index.css?q=' + time,
        tpl: '<link rel="stylesheet" href="%s" data-type="theme">'
      },
      js: {
        src: '/app.js?q=' + time,
        tpl: '<script src="%s" defer></script>'
      }
    }))
    .pipe($.htmlmin(htmlminOptions))
    .pipe(gulp.dest('.dist'));
});

gulp.task('build', function(done) {
  runSequence('clean', 'test', ['build:prod-styles', 'build:prod-scripts', 'build:html'], done);
});
