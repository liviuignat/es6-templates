'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const $ = require('gulp-load-plugins')();
const merge = require('merge2');
const del = require('del');
const path = require('path');
var url = require('url');

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
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});

gulp.task('clean-tmp', del.bind(null, '.tmp'));

gulp.task('scripts', ['clean-tmp'], function() {
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
    .pipe(gulp.dest('.tmp'));
});

gulp.task('html', function () {
  var assets = $.useref.assets();
  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('.tmp'))
    .pipe($.size());
});

gulp.task('serve', function () {
  gulp.src('.tmp')
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