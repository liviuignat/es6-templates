'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
const merge = require('merge2');
const del = require('del');
const path = require('path');
const url = require('url');

require('harmonize')();

const bundler = {
  w: null,
  init: function () {
    this.w = watchify(browserify({
      entries: ['_tmp/app.js'],
      insertGlobals: true,
      cache: {},
      packageCache: {}
    }));
  },
  bundle: function () {
    return this.w && this.w.bundle()
      .on('error', $.util.log.bind($.util, 'Browserify Error'))
      .pipe(source('app.js'))
      .pipe(gulp.dest('_dist'));
  },
  watch: function () {
    this.w && this.w.on('update', this.bundle.bind(this));
  },
  stop: function () {
    this.w && this.w.close();
  }
};

gulp.task('tsc', ['clean-tmp'], function() {
  return gulp.src(['./app/**/*.ts', './app/**/*.tsx'])
    .pipe($.plumber())
    .pipe($.typescript({
      //moduleResolution: 'classic',
      //module: 'system',
      //out: 'all.js',
      isolatedModules: true,
      target: 'ES6',
      jsx: 'react',
      noImplicitAny: true,
      removeComments: true,
      preserveConstEnums: true,
      sourceMap: true
    }))
    .pipe(gulp.dest('_tmp'));
});

gulp.task('scripts', [], function () {
  bundler.init();
  return bundler.bundle();
});

gulp.task('styles', function () {
  const mainFile = './app/styles/main.less';

  const injectFiles = gulp.src([
    './app/**/*.less',
    '!' + mainFile
  ], {
    read: false
  });

  const injectOptions = {
    transform: function (filePath) {
      console.log('path: ', filePath);
      filePath = filePath.replace('app/', '../');
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src(mainFile)
    .pipe($.plumber())
    .pipe($.inject(injectFiles, injectOptions))
    .pipe($.less())
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('_dist/styles'))
    .pipe($.size());
});

gulp.task('clean-tmp', del.bind(null, '_tmp'));
gulp.task('clean-dist', del.bind(null, '_dist'));

gulp.task('html', function () {
  var assets = $.useref.assets();
  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('_dist'))
    .pipe($.size());
});

gulp.task('serve', function () {
  gulp.src('_dist')
    .pipe($.webserver({
      livereload: true,
      port: 9000,
      middleware: function (req, res, next) {
        let fileName = url.parse(req.url);
        fileName = fileName.href.split(fileName.search).join("");
        const fileExtension = path.extname(fileName);
        const hasExtension = !!fileExtension;
        if (!hasExtension) {
          req.url = '/';
        }

        return next();
      }
    }));
});