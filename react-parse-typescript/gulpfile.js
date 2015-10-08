'use strict';

const gulp = require('gulp');
var gulpJest = require('./gulp/gulp-jest');
const less = require('gulp-less');
const $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
const merge = require('merge2');
const runSequence = require('run-sequence');
const del = require('del');
const path = require('path');
const url = require('url');

require('harmonize')();

const paths = {
  tsc: '.tmp/tsc',
  dist: '.tmp/dist'
};

const bundler = {
  w: null,
  init: function () {
    this.w = watchify(browserify({
      entries: [paths.tsc + '/app.js'],
      insertGlobals: true,
      debug: true,
      cache: {},
      packageCache: {}
    }));
  },
  bundle: function () {
    return this.w && this.w.bundle()
      .on('error', $.util.log.bind($.util, 'Browserify Error'))
      .pipe(source('app.js', './app'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dist));
  },
  watch: function () {
    this.w && this.w.on('update', this.bundle.bind(this));
  },
  stop: function () {
    this.w && this.w.close();
  }
};

gulp.task('tsc', function() {
  var tsResult = gulp.src(['./app/**/*.ts', './app/**/*.tsx'])
    .pipe($.plumber())
    .pipe($.typescript({
      isolatedModules: true,
      target: 'ES6',
      jsx: 'react',
      noImplicitAny: true,
      removeComments: true,
      preserveConstEnums: true,
      sourceMap: true
    }));

   return tsResult.js.pipe(gulp.dest(paths.tsc));
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
    .pipe(gulp.dest(paths.dist + '/styles'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(paths.dist + '/images'))
    .pipe($.size());
});

gulp.task('extras', function () {
  return gulp.src(['app/*.txt', 'app/*.ico'])
    .pipe(gulp.dest(paths.dist))
    .pipe($.size());
});

gulp.task('clean-tsc', del.bind(null, paths.tsc));
gulp.task('clean-dist', del.bind(null, paths.dist));
gulp.task('clean', ['clean-tsc', 'clean-dist']);

gulp.task('html', function () {
  var assets = $.useref.assets();
  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(paths.dist))
    .pipe($.size());
});

gulp.task('serve', function () {
  gulp.src(paths.dist)
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

gulp.task('tslint', function(){
  return gulp.src(['./app/**/*.ts', './app/**/*.tsx'])
    .pipe($.tslint())
    .pipe($.tslint.report('verbose'));
});

gulp.task('test', function () {
  var nodeModules = path.resolve('./node_modules');
  var options = {
    testDirectoryName: 'tsc',
    testFileExtensions: ['spec.js'],
    scriptPreprocessor: nodeModules + '/babel-jest',
    unmockedModulePathPatterns: [
      'react',
      nodeModules + '/react',
      nodeModules + '/flux',
      nodeModules + '/react-router',
      nodeModules + '/react-tools'
    ],
    verbose: true
  };

  return gulp.src(paths.tsc).pipe(gulpJest(options));
});

gulp.task('build', ['clean'], function (callback) {
  return runSequence('tslint', 'tsc', ['scripts', 'styles', 'html'], callback);
});

gulp.task('watch', ['build', 'serve'], function () {
    bundler.watch();
    gulp.watch(['app/**/*.ts', 'app/**/*.tsx'], ['tslint', 'tsc']);
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/**/*.less', ['styles']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch(paths.tsc + '/**/*.js', ['test']);
});

gulp.task('default', ['watch']);