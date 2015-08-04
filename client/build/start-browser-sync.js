'use strict';

var browserSync = require('browser-sync');
var url = require('url');
var path = require('path');
var folder = path.resolve(__dirname, 'src');

module.exports = function (baseDir) {
  var defaultFile = 'index.html'

  return browserSync({
    server: {
      baseDir: baseDir,
      middleware: function (req, res, next) {
        var fileName = url.parse(req.url);
        fileName = fileName.href.split(fileName.search).join('');
        var extension = path.extname(fileName);

        if (!extension) {
          req.url = '/' + defaultFile;
        }
        return next();
      }
    },
    startPath: '/',
    browser: 'default'
  });
};
