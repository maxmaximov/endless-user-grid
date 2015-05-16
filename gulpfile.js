var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {
    gulp.src('public/demo/demo.js')
        .pipe(browserify({
          insertGlobals : true,
          //debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./public/min/demo'))
});

gulp.task('default', ['browserify'], function() {
});
