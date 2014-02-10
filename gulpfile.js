'use strict';
var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.fullname %>',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    compass = require('gulp-compass');

gulp.task('css', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(plumber()) // This will keeps pipes working after error event
                     // but it doesnt
    .pipe(compass({
      config_file: './config.rb'
    }))
    .pipe(autoprefixer('last 15 version'))
    //is this needed since its specified in my config.rb file
    //.pipe(gulp.dest('css'))
    .pipe(notify({ message: 'All done, master!' }));
});

gulp.task('watch', function() {
  gulp.watch('./scss/**/*.scss', ['css']);
});

// Default Task
gulp.task('default', ['css', 'watch']);