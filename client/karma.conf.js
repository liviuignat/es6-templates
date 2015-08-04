'use strict';

module.exports = function (config) {

  config.set({
    basePath: 'src',
    frameworks: ['jspm', 'jasmine', 'phantomjs-shim'],
    jspm: {
      config: 'config.js',
      serveFiles: ['**/*'],
      loadFiles: ['polyfills.js', '**/*.spec.js']
    },
    exclude: [],
    preprocessors: {},
    reporters: ['spec'],
    specReporter: {
      suppressPassed: true,
      suppressFailed: false,
      suppressSkipped: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    browserNoActivityTimeout: 25000
  });
};
