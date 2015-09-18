'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var gulpJest = require('./gulp/gulp-jest');
var $ = require('gulp-load-plugins')();
var sync = $.sync(gulp).sync;
var del = require('del');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var path = require('path');
var url = require('url');
var fs = require('fs');

require('harmonize')();

function generateEnvFile(env) {
  const environment = env || process.env.NODE_ENV || 'development';
  const envFileName = env ? 'env.' + env + '.js' : 'env.js';
  const envFileContent = 'window.env = \'' + environment + '\';\n';
  const fileData = {};

  fileData[envFileName] = envFileContent;

  return gulp.src('./.dist/scripts/env.js')
    .pipe($.add(fileData))
    .pipe(gulp.dest('./.dist/scripts/'))
};

var bundler = {
  w: null,
  init: function () {
    this.w = watchify(browserify({
      entries: ['./app/scripts/app.js'],
      insertGlobals: true,
      cache: {},
      packageCache: {}
    }));
  },
  bundle: function () {
    return this.w && this.w.bundle()
      .on('error', $.util.log.bind($.util, 'Browserify Error'))
      .pipe(source('app.js'))
      .pipe(gulp.dest('.dist/scripts'));
  },
  watch: function () {
    this.w && this.w.on('update', this.bundle.bind(this));
  },
  stop: function () {
    this.w && this.w.close();
  }
};

gulp.task('styles', function () {
  var mainFile = './app/styles/main.less';

  var injectFiles = gulp.src([
    './app/**/*.less',
    '!' + mainFile
  ], {
    read: false
  });

  var injectOptions = {
    transform: function (filePath) {
      console.log('path: ', filePath);
      filePath = filePath.replace('app/', '../');
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var indexFilter = $.filter('main.less');

  return gulp.src(mainFile)
    .pipe($.plumber())
    .pipe($.inject(injectFiles, injectOptions))
    .pipe($.less())
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.dist/styles'))
    .pipe($.size());
});

gulp.task('env', function () {
  ['', 'integration', 'qa', 'production'].forEach(generateEnvFile);
});

gulp.task('lint', function () {
  return gulp.src('./app/scripts/**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('scripts', ['lint'], function () {
  bundler.init();
  return bundler.bundle();
});

gulp.task('html', function () {
  var assets = $.useref.assets();
  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('.dist'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('.dist/images'))
    .pipe($.size());
});

gulp.task('extras', function () {
  return gulp.src(['app/*.txt', 'app/*.ico'])
    .pipe(gulp.dest('.dist/'))
    .pipe($.size());
});

gulp.task('serve', function () {
  var folder = path.resolve(__dirname, "./.dist");
  gulp.src('.dist')
    .pipe($.webserver({
      livereload: true,
      port: 9000,
      middleware: function (req, res, next) {
        var fileName = url.parse(req.url);
        fileName = fileName.href.split(fileName.search).join("");
        var fileExtension = path.extname(fileName);
        var hasExtension = !!fileExtension;
        if (!hasExtension) {
          req.url = '/';
        }

        return next();
      }
    }));
});

gulp.task('jest', function () {
  var nodeModules = path.resolve('./node_modules');
  var options = {
    testDirectoryName: 'scripts',
    testFileExtensions: ['spec.js'],
    scriptPreprocessor: nodeModules + '/babel-jest',
    unmockedModulePathPatterns: [
      'react',
      nodeModules + '/react',
      nodeModules + '/reflux',
      nodeModules + '/react-router',
      nodeModules + '/react-tools'
    ],
    verbose: true
  };

  return gulp.src('app').pipe(gulpJest(options));
});

gulp.task('set-production', function () {
  process.env.NODE_ENV = 'production';
});

gulp.task('minify:js', function () {
  return gulp.src('.dist/scripts/**/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('.dist/scripts/'))
    .pipe($.size());
});

gulp.task('minify:css', function () {
  return gulp.src('.dist/styles/**/*.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('.dist/styles'))
    .pipe($.size());
});

gulp.task('minify', ['minify:js', 'minify:css']);

gulp.task('clean', del.bind(null, '.dist'));

gulp.task('bundle', ['html', 'styles', 'scripts', 'images', 'extras']);

gulp.task('clean-bundle', sync(['clean', 'bundle', 'env']));

gulp.task('build', ['clean-bundle'], bundler.stop.bind(bundler));

gulp.task('build:production', sync(['set-production', 'build', 'minify']));

gulp.task('serve:production', sync(['build:production', 'serve']));

gulp.task('test', ['lint', 'jest']);

gulp.task('default', ['watch']);

gulp.task('watch', sync(['clean-bundle', 'serve']), function () {
  bundler.watch();
  gulp.watch('app/scripts/**/*.js', ['test']);
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/**/*.less', ['styles']);
  gulp.watch('app/images/**/*', ['images']);
});
