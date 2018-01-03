"use strict";

const gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  maps = require('gulp-sourcemaps'),
  del = require('del'),
  connect = require('gulp-connect'),
  imagemin = require('gulp-imagemin'),
  cleanCSS = require('gulp-clean-css'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync').create();

//JS tasks
gulp.task("concatScripts", () => {
  //gulp.src creates a readable stream of data
  return gulp.src(['js/global.js', 'js/circle/*.js'])
    .pipe(maps.init())
    .pipe(concat('all.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ['concatScripts'], () => {
  return gulp.src('js/all.js') //make sure to run concat before minify since app.js will be created
    .pipe(uglify())
    .pipe(rename('all.min.js')) //take the uglify result and rename it
    .pipe(gulp.dest('js'));
});

gulp.task("scripts", ['minifyScripts'], () => {
  return gulp.src('js/all.min.js')
    .pipe(gulp.dest('dist/scripts'));
});

//SASS to CSS tasks
gulp.task('compileSass', () => {
  return gulp.src('sass/global.scss')
    .pipe(maps.init()) //init maps before sass,use write after sass
    .pipe(sass()) //this will compile scss to css
    .pipe(rename('all.css')) //rename the output
    .pipe(maps.write('./')) //this path is rlative to output dir
    .pipe(gulp.dest('css'));

});

gulp.task("minifyCSS", ['compileSass'], () => {
  return gulp.src('css/all.css') //make sure to run concat before minify since app.js will be created
    .pipe(cleanCSS())
    .pipe(rename('all.min.css')) //take the uglify result and rename it
    .pipe(gulp.dest('css'));
});

gulp.task('styles', ['minifyCSS'], () => {
  return gulp.src('css/all.min.css')
    .pipe(gulp.dest('dist/styles'))
    .on("end", browserSync.reload);
});

//COMPRESS IMG
gulp.task('images', () => {
  return gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/content'));
});

//CLEAN
gulp.task('clean', () => {
  del(['dist', 'css', 'js/all*.js*']);
});

//BUILD
gulp.task("build", ()=>{
  return runSequence('clean',['scripts','styles','images']);
}); //useful pattern

//WATCH
gulp.task('watchFiles',function(){
   gulp.watch(['sass/**/**/*.sass','sass/**/*.sass','sass/*.scss'],['styles']); //look into the sass folder, look into any sub dirs, and look for any .scss files
   gulp.watch(['js/**/*.js','js/*.js'],['scripts']);
});

//SERVE AT LOCALHOST
gulp.task('serve',['watchFiles'],()=>{
  browserSync.init({
   server: "./",
   port: 3000
 });
});

//DEFAULT
gulp.task('default', () => {
   runSequence('build','serve');
});
