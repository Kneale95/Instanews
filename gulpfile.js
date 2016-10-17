var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    plumber = require('gulp-plumber')
    notify = require('gulp-notify')

var plumberErrorHandler={
    errorHandler: notify.onError({
        title:"gulp",
        message: "Error: <%= error.message %>" //will see notification if there is an error
    })
};
//sass
gulp.task('scss', function() {
   gulp.src('./scss/style.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});
//uglify
gulp.task('js', function(){
    gulp.src('./js/*.js')
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }))
      .pipe(gulp.dest('./build/js'))
});
//lint
gulp.task('lint',function(){
    return gulp.src('.js/*js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failaftererror()) 
});
//watch
gulp.task('watch',function(){
    gulp.watch('js/**/*.js',['js',eslint]);
    gulp.watch('sass/*.scss', ['sass']);
});
//browsersync

// Modify our default task method by passing an array of task names
gulp.task('default', ['browser-sync', 'watch']);