const spritesmith = require('gulp.spritesmith'),
      gulp = require('gulp');

gulp.task('sprite', function () {
  var spriteData = gulp.src('src/icon/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    padding: 2
  }));
  return spriteData.pipe(gulp.dest('src/dist'));
});