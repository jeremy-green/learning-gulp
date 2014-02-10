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
    compass = require('gulp-compass');

gulp.task('css', function() {
  return gulp.src('scss/main.sass')
    .pipe(compass({
      config_file: './config.rb',
      css: 'css'
    }))
    .pipe(autoprefixer('last 15 version'))
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'All done, master!' }));
});

gulp.task('default', function() {

});