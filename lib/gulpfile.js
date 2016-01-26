var gulp = require('gulp'),
    uglify = require('gulp-uglify'); //minifies js files
    jshint = require('gulp-jshint'); //validates js
    concat = require('gulp-concat'); //joins multiple files into one
    rename = require('gulp-rename'); //renames files
    
    sass = require('gulp-sass');
    minifyCss = require('gulp-minify-css');
    concat = require('gulp-concat'); 
    rename = require('gulp-rename');

    plumber = require('gulp-plumber');

    browserSync = require('browser-sync').create();
    reload = browserSync.reload;

var JS_SRC = ['./js/**/*.js'];
var SCSS_SRC = ['./scss/**/*.scss', './css/**/*.css'];
var HTML_SRC = ['index.html'];

gulp.task('js', function() {
    gulp.src(JS_SRC)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(rename({
            basename: 'main',
            extname: '.js'
        }))
        .pipe(gulp.dest('js'));
});

gulp.task('scss', function() {
    gulp.src(SCSS_SRC)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(concat('style.css'))
        .pipe(rename({
            basename: 'style',
            extname: '.css'
        }))
        .pipe(gulp.dest('css'));
});


gulp.task('serve', ['js', 'scss'], function() {
  browserSync.init({
      server : {
          baseDir : './'
      }
  });

  var scssWatch = gulp.watch(SCSS_SRC, ['scss']);
  scssWatch.on('change', reload);

  var jsWatch = gulp.watch(JS_SRC, ['js']);
  jsWatch.on('change', reload);

  gulp.watch(HTML_SRC, reload);
});