'use strict';

var karma = require('karma');

module.exports = function (config, done) {
  karma.server.start(config, function (failedTests) {
    done();
  });
};
