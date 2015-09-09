'use strict';

var gulp = require('gulp');
var cached = require('gulp-cached');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var htmlReplace = require('gulp-html-replace');
var htmlmin = require('gulp-htmlmin');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var path = require('path');
var rimraf = require('rimraf');
var bundleLess = require('bundle-less');
var runSequence = require('run-sequence');
var karma = require('karma');
var tools = require('require-dir')('build', {
  camelcase: true
});
var jsPaths = ['src/app.js', 'src/**/*.js', '!src/config.js', '!src/jspm_packages/*.js', '!src/jspm_packages/**/*.js']

var supportedBrowsers = ['last 3 versions', 'last 3 BlackBerry versions', 'last 3 Android versions'];

var htmlminOptions = {
  removeComments: true,
  ignoreCustomComments: [/^\s*\/?ko/],
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  useShortDoctype: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  removeOptionalTags: true,
  caseSensitive: true
};

gulp.task('clean', function (done) {
  ['.tmp', '.dist'].forEach(function (dir) {
    rimraf.sync(dir, {
      maxBusyTries: 5
    });
  });
  done();
});

gulp.task('test', function (done) {
  var options = {
    configFile: path.resolve('karma.conf.js'),
    singleRun: true,
    browsers: ['PhantomJS']
  };
  tools.runKarma(options, done);
});

gulp.task('lint', function () {
  return gulp.src(jsPaths)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('reload', function () {
  return browserSync.reload();
});

gulp.task('reload:styles', ['styles'], function () {
  return browserSync.reload('*.css');
});

gulp.task('scripts', ['reload'], function (done) {
  runSequence('lint', 'test', done);
});

gulp.task('styles', function (done) {
  tools.compileLess({
    from: 'src/theme-default.less',
    to: '.tmp/theme-default.css',
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

gulp.task('serve', ['styles'], function () {
  tools.startBrowserSync(['.tmp', 'src']);
});

gulp.task('watch', ['serve'], function () {
  gulp.watch(jsPaths, ['lint', 'scripts']);
  gulp.watch(['src/**/*.less'], ['reload:styles']);
  gulp.watch(['src/**/*.html', '!index.html'], ['reload']);
});

gulp.task('default', ['watch']);

gulp.task('build:prod-scripts', function () {
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

gulp.task('build:prod-styles', function (done) {
  tools.compileLess({
    from: 'src/theme-reddiamond.less',
    to: '.dist/theme-reddiamond.css',
    base: 'src',
    embedErrors: true,
    csswring: {
      removeAllComments: true
    },
    autoprefixer: {
      browsers: supportedBrowsers
    }
  });

  tools.compileLess({
    from: 'src/theme-default.less',
    to: '.dist/theme-default.css',
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

gulp.task('build:html', function () {
  var time = new Date().getTime();
  return gulp.src('src/index.html')
    .pipe(htmlReplace({
      css: {
        src: '/theme-default.css?q=' + time,
        tpl: '<link rel="stylesheet" href="%s" data-type="theme">'
      },
      js: {
        src: '/app.js?q=' + time,
        tpl: '<script src="%s" defer></script>'
      }
    }))
    .pipe(htmlmin(htmlminOptions))
    .pipe(gulp.dest('.dist'));
});

gulp.task('build', function (done) {
  runSequence('clean', 'test', ['build:prod-styles', 'build:prod-scripts', 'build:html'], done);
});

gulp.task('serve:prod', ['build'], function (done) {
  tools.startBrowserSync(['.dist']);
});
