var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {
    gulp.src('public/js/app.js')
        .pipe(browserify({
          insertGlobals : true,
          //debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./public/min/js'))
});

gulp.task('default', ['browserify'], function() {
});
