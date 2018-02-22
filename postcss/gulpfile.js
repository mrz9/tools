
const
    gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('gulp-cssnano');

gulp.task('css', function () {
    let processors = [autoprefixer({ browsers: ['last 2 versions'] })];
    return gulp.src('src/*.css')
        .pipe(postcss(processors))
        .pipe( gulp.dest('build/') );
});



