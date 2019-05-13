const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imageMin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('styles', () => {
  return gulp.src('./src/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dest/css'))
});

gulp.task('images', () => {
  return gulp.src('./src/images/**/*')
    .pipe(imageMin())
    .pipe(gulp.dest('./dest/imgs'))
});

gulp.task('javascript', () => {
  return gulp.src('./src/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dest/js'))
    .pipe(uglify())
});

gulp.task('copy-index', () => {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dest'))
});

gulp.task('all', gulp.series(
  'styles',
  'images',
  'javascript',
  'copy-index',
  () => {
    gulp.watch('./dest/css/**/*.css', gulp.series('styles'))
    gulp.watch('./dest/js/**/*.js', gulp.series('javascript'))
    gulp.watch('./src/index.html', gulp.series('copy-index'))
  }
));
