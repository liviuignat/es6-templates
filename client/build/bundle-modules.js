'use strict';

var jspm = require('jspm');
var htmlMinifier = require('html-minifier');
var sanitizeSourceMap = require('./sanitize-source-map');

module.exports = function (options) {
  var bundleOptions = {
    minify: options.minify,
    mangle: options.mangle,
    sourceMaps: true,
    lowResSourceMaps: false
  };

  // ----- EVIL HACK -----------------------------------------------------------------

  // Babel currently has a bug where its own helper module's location
  // is not resolved correctly. Related: https://github.com/jspm/jspm-cli/issues/809
  // For now, we copy the file into the 'wrong' location so the builder can locate it:
  var fse = require('fs-extra');
  var correctLocation = 'src/jspm_packages/npm/babel-core@5.7.4/external-helpers.js';
  var anticipatedLocation = 'src/jspm_packages/npm/external-helpers.js';
  fse.copySync(correctLocation, anticipatedLocation);

  // ---------------------------------------------------------- END OF EVIL HACK ----^

  jspm.setPackagePath(options.packagePath);

  var builder = new jspm.Builder();

  return builder.buildSFX(options.rootModule, options.outputPath, bundleOptions).then(function () {
    sanitizeSourceMap(options.outputPath + '.map', options.base, options.sourceRoot);
  });
};
