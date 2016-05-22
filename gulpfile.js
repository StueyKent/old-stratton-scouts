var gulp = require('gulp'),
  fs = require('fs'),
  path = require('path'),
  merge = require('merge-stream'),
  watch = require('gulp-watch'),
  plumber = require('gulp-plumber'),
  gutil = require('gulp-util'),
  clean = require('gulp-clean'),
  fileinclude = require('gulp-file-include'),
  sass = require('gulp-sass'),
  uglifycss = require('gulp-uglifycss'),
  autoprefix = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  order = require("gulp-order");


function errorLog(error) {
  gutil.log("\n\n", gutil.colors.red("!!!!!!! Error !!!!!!!\n\n"),
    gutil.colors.cyan("Plugin:"), error.plugin, "\n",
    gutil.colors.cyan("Message:"), error.message, "\n\n",
    gutil.colors.red("!!!!!!!!!!!!!!!!!!!!!\n")
  );
}

function getFolders(dir) {
  var folders = fs.readdirSync(dir)
    .filter(function (file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });

  return folders;
}

gulp.task('html', ['clean-html'], function () {
  var htmlSrc = './src/*.html',
    htmlDst = './build';

  var stream = gulp.src(htmlSrc)
    .pipe(plumber(errorLog))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(htmlDst));

  return stream;
});

gulp.task('clean-html', function () {
  var src = './build/*.html';

  var stream = gulp.src(src, {
      read: false
    })
    .pipe(clean());

  return stream;
});

gulp.task('js', ['clean-js'], function () {

  var jsSrc = './src/js/modules',
    jsDst = './build/js',
    folders = getFolders(jsSrc);

  if (folders.length === 0) {
    return;
  }

  var tasks = folders.map(function (folder) {
    return gulp.src(path.join(jsSrc, folder, '/*.js'))
      .pipe(plumber(errorLog))
      .pipe(order([folder + '.js', '*.js']))
      .pipe(concat(folder + '.js'))
      //.pipe(uglify())
      .pipe(rename(folder + '.min.js'))
      .pipe(plumber.stop())
      .pipe(gulp.dest(jsDst));
  });

  return merge(tasks);
});

gulp.task('clean-js', function () {
  var src = './build/js/*.js';

  var stream = gulp.src(src, {
      read: false
    })
    .pipe(clean());

  return stream;
});

gulp.task('js-libs', ['clean-js-libs'], function () {
  var jsSrc = './src/js/vendor/*.js',
    jsDst = './build/js/vendor';

  var stream = gulp.src(jsSrc)
    .pipe(gulp.dest(jsDst));

  return stream;
});

gulp.task('clean-js-libs', function () {
  var src = './build/js/vendor/*.js';

  var stream = gulp.src(src, {
      read: false
    })
    .pipe(clean());

  return stream;
});

gulp.task('css', ['clean-css'], function () {
  var cssSrc = './src/scss/**/*.scss',
    cssDst = './build/css';

  var stream = gulp.src(cssSrc)
    .pipe(plumber(errorLog))
    .pipe(sass({
      errLogToConsole: true,
      includePaths: ['./src/scss']
    }))
    .pipe(autoprefix('last 2 versions'))
    //.pipe(uglifycss())
    .pipe(rename('app.min.css'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(cssDst));

  return stream;
});

gulp.task('clean-css', function () {
  var src = './build/css/*.css';

  var stream = gulp.src(src, {
      read: false
    })
    .pipe(clean());

  return stream;
});

gulp.task("default", ['html', 'js', 'js-libs', 'css'], function () {
  watch('./src/**/*.html', function () {
    gulp.start('html');
  });

  watch('./src/js/modules/**/*.js', function () {
    gulp.start('js');
  })

  watch('./src/js/vendor/*.js', function () {
    gulp.start('js-libs');
  })

  watch('./src/scss/**/*.scss', function () {
    gulp.start('css');
  })
});