const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const header = require('gulp-header');

gulp.task('scripts', function() {
  let jsArr = [
    './src/modules/jquery.min.js',
    './src/modules/bootstrap.min.js',
    './src/modules/plugins/datapicker/bootstrap-datetimepicker.min.js',
  ]
  return gulp.src(jsArr)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(header('/**\n* Build By <%= name %>\n* at <%= time%> \n**/\n', { name : 'MR.Z',time:new Date()} ))
    .pipe(gulp.dest('./dist/'));
});