'use strict';
 
var gulp          = require('gulp');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var concat        = require('gulp-concat');
 
gulp.task('default', ['sass'], function () {
 gulp.watch('src/styles/**/*.scss', ['sass']);
});



gulp.task('sass', function () {
  gulp.src('src/styles/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('src/styles'))
});
