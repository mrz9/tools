const imageResize = require('gulp-image-resize'),
      gulp = require('gulp');

gulp.task('resize',function(){
    return gulp.src('./src/*.png')
                .pipe(imageResize({
                    width:90
                }))
                .pipe(gulp.dest('./dist/'));
});