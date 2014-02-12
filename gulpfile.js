'use strict';

var pkg = require('./package.json');
var headerBanner = [
  '/**',
  ' * <%= pkg.fullname %>',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');
var footerBanner = [
  '',
  '/**',
  ' * Poweredby the fucking internet bro',
  ' */',
].join('\n');

var paths = {
  css: 'css/**/*.css',
  scss: 'scss/**/*.scss',
  scripts: ['js', '!js/vendor'],
  images: 'img'
};

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    cssmin = require('gulp-cssmin'),
    compass = require('gulp-compass');

gulp.task('compass', function() {
  return gulp.src(paths.scss)
    .pipe(compass({
      config_file: 'config.rb',
      css: 'css',
      sass: 'scss',
    }))
    .pipe(autoprefixer('last 15 version'))
    .pipe(notify({ message: 'CSS compiled' }));
});

gulp.task('cssmin', function() {
  return gulp.src(paths.css)
    .pipe(cssmin())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'CSS minified' }));
});

gulp.task('banner', function() {
  return gulp.src('dist/main.css')
    .pipe(header(headerBanner, { pkg : pkg } ))
    .pipe(footer(footerBanner))
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Banner added to CSS' }));
});

gulp.task('watch', function() {
  gulp.watch(paths.scss, ['compass']);
});

// Default Task
gulp.task('default', ['compass', 'watch']);
