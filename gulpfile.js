'use strict';

var gulp = require('gulp');
gulp.jsPaths = [
  './src/app.js',
  './src/**/*.js',
  '!./src/config.js',
  '!./src/jspm_packages/*.js',
  '!./src/jspm_packages/**/*.js'
]
gulp.supportedBrowsers = ['last 3 versions', 'last 3 BlackBerry versions', 'last 3 Android versions'];
gulp.htmlminOptions = {
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

require('require-dir')('./gulp');

gulp.task('default', ['watch']);
