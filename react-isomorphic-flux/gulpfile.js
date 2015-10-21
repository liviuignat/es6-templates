'use strict';

const gulp = require('gulp');
const gulpJest = require('./gulp/gulp-jest');
const less = require('gulp-less');
const $ = require('gulp-load-plugins')();
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const vinylPaths = require('vinyl-paths');
const merge = require('merge2');
const runSequence = require('run-sequence');
const del = require('del');
const path = require('path');
const url = require('url');

require('harmonize')();

let REVISION = 0;

const paths = {
  client: './src/app',
  dist: '.dist',
  deploy: '.deploy',
  deployPublic: '.deploy/public'
};

var bundler = {
  w: null,
  init: function () {
    this.w = watchify(browserify({
      entries: [paths.client + '/app.js'],
      insertGlobals: true,
      cache: {},
      packageCache: {}
    }));
  },
  bundle: function () {
    console.log('scripts bundler start');
    const from = Date.now();

    return this.w && this.w.bundle()
      .on('error', $.util.log.bind($.util, 'Browserify Error'))
      .pipe($.plumber())
      .pipe(source('app.js', paths.client))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dist))
      .on('end', () => {
        $.util.log(`scripts bundle finish after ${(Date.now() - from) / 1000} s`);
      });
  },
  watch: function () {
    this.w && this.w.on('update', this.bundle.bind(this));
  },
  stop: function () {
    this.w && this.w.close();
  }
};

gulp.task('scripts', [], function () {
  bundler.init();
  return bundler.bundle();
});

gulp.task('less', function () {
  const mainFile = paths.client + '/styles/main.less';

  const injectFiles = gulp.src([
    paths.client + '/**/*.less',
    '!' + mainFile
  ], {
    read: false
  });

  const injectOptions = {
    transform: function (filePath) {
      console.log('path: ', filePath);
      filePath = filePath.replace('app/', '../../');
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

gulp.task('sass', function () {
  const mainFile = paths.client + '/styles/main.scss';

  const injectFiles = gulp.src([
    paths.client + '/styles/variables/*.scss',
    paths.client + '/**/*.scss',
    '!' + mainFile
  ], {
    read: false
  });

  const injectOptions = {
    transform: function (filePath) {
      console.log('path: ', filePath);
      filePath = filePath.replace('src/app/', '../');
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src(mainFile)
    .pipe($.plumber())
    .pipe($.inject(injectFiles, injectOptions))
    .pipe($.sass())
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest(paths.dist + '/styles'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src(paths.client + '/images/**/*')
    .pipe($.plumber())
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(paths.dist + '/images'))
    .pipe($.size());
});

gulp.task('extras', function () {
  return gulp.src([paths.client + '/*.txt', paths.client + '/*.ico'])
    .pipe(gulp.dest(paths.dist))
    .pipe($.size());
});

gulp.task('clean', del.bind(null, paths.dist));
gulp.task('clean-deploy', del.bind(null, paths.deploy));

gulp.task('generate-html', function () {
  var assets = $.useref.assets();
  return gulp.src(paths.client + '/index.html')
    .pipe($.plumber())
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(paths.dist))
    .pipe($.size());
});

gulp.task('rename-html', function () {
  var assets = $.useref.assets();
  return gulp.src(paths.dist + '/index.html')
    .pipe($.plumber())
    .pipe(vinylPaths(del))
    .pipe($.rename('index-processed.html'))
    .pipe(gulp.dest(paths.dist))
    .pipe($.size());
});

gulp.task('html', function (callback) {
  return runSequence('generate-html', 'rename-html', callback);
});

gulp.task('serve', function () {
  gulp.src(paths.dist)
    .pipe($.plumber())
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

gulp.task('eslint', function () {
  return gulp.src([
      paths.client + '/**/*.js',
      '!' + paths.client + '/bower_components/**/*.js'
    ])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('test', function () {
  var nodeModules = path.resolve('./node_modules');
  var options = {
    testDirectoryName: 'app',
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

  return gulp.src(paths.client)
    .pipe($.plumber())
    .pipe($.wait(1000))
    .pipe(gulpJest(options));
});

gulp.task('build', ['clean'], function (callback) {
  return runSequence('eslint', 'test', ['scripts', 'sass', 'html'], callback);
});

gulp.task('build-server', ['clean-deploy'], function (callback) {
  return gulp.src([
    paths.client + '/**/*.js',
    '!' + paths.client + '/bower_components/**/*'
  ]).pipe($.babel({
      sourceMaps: false
    }))
    .pipe(gulp.dest(paths.deploy));
});
gulp.task('deploy-static', function (callback) {
  var revNumber = REVISION;
  var jsFilter = $.filter(['**/*.js'], {restore: true});
  var cssFilter = $.filter(['**/*.css'], {restore: true});

  return gulp.src(paths.dist + '/**/*')
    .pipe(jsFilter)
    .pipe($.uglify())
    .pipe(jsFilter.restore)

    .pipe(cssFilter)
    .pipe($.minifyCss())
    .pipe(cssFilter.restore)

    .pipe($.rename({
      suffix: `-${revNumber}`
    }))

    .pipe(gulp.dest(paths.deployPublic))
    .pipe($.size());
});
gulp.task('replace-deploy-rev', function (callback) {
  var revNumber = REVISION;

  return gulp.src(paths.deploy + '/**/*.js')
    .pipe($.replace('/app.js', `/app-${revNumber}.js`))
    .pipe($.replace('/scripts/vendor.js', `/scripts/vendor-${revNumber}.js`))
    .pipe($.replace('/styles/main.css', `/styles/main-${revNumber}.css`))
    .pipe(gulp.dest(paths.deploy));
});

gulp.task('deploy', function (callback) {
  REVISION = Date.now();
  runSequence('build-server', 'clean', 'build', 'deploy-static', 'replace-deploy-rev', callback);
});

gulp.task('watch', ['build'], function (callback) {
  gulp.watch(paths.client + '/*.html', ['html']);
  gulp.watch(paths.client + '/**/*.scss', ['sass']);
  gulp.watch(paths.client + '/images/**/*', ['images']);

  bundler.watch();
  gulp.watch(paths.client + '/**/*.js', ['eslint', 'test']);

  runSequence('serve', callback);
});

gulp.task('default', ['watch']);
