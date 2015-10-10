var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  spriteData.pipe(gulp.dest('slice/ico/'));
});

var minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del');
  
//css压缩
gulp.task('minifycss', function() {
    return gulp.src('../css/*.css')      //压缩的文件
     //   .pipe(concat('wap.min.css'))       //- 合并后的文件名 不要就注释掉
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('min/css'));   //输出文件夹
});

//js压缩
gulp.task('minifyjs', function() {
    return gulp.src('../js/*.js')
        //.pipe(concat('main.js'))    //合并所有js到main.js
        //.pipe(gulp.dest('mon/js'))    //输出main.js到文件夹
        //.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('min/js'));  //输出
});