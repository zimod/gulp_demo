"use strict";

const gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  maps = require('gulp-sourcemaps'),
  del = require('del'),
  connect = require('gulp-connect');

gulp.task("concatScripts", function() {
  //gulp.src creates a readable stream of data
  return gulp.src(['js/global.js', 'js/circle/*.js'])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ['concatScripts'], function() {
  return gulp.src('js/app.js') //make sure to run concat before minify since app.js will be created
    .pipe(uglify())
    .pipe(rename('all.min.js')) //take the uglify result and rename it
    .pipe(gulp.dest('js'));
});

gulp.task("scripts", ['minifyScripts'], function() {
  return gulp.src('js/all.min.js')
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('compileSass',function(){
    return gulp.src('sass/global.scss')
        .pipe(maps.init())//init maps before sass,use write after sass
        .pipe(sass())//this will compile scss to css
        .pipe(maps.write('./'))//this path is rlative to output dir
        .pipe(gulp.dest('css'));
});

gulp.task('styles',['compileSass'],function(){
    return gulp.src('css/global.css')
               .pipe(gulp.dest('dist/styles'));
});
