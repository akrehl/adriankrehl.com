var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  plumber = require('gulp-plumber'),
  concat = require('gulp-concat'),
  cssnano = require('gulp-cssnano'),
  uncss = require('gulp-uncss'),
  rename = require('gulp-rename');

////////////////////////////////////////
// Scripts
////////////////////////////////////////
gulp.task('scripts', function() {
  gulp.src(['assets/js/test.js', '!assets/js/*.min.js'])
    .pipe(plumber())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(reload({stream: true}));
});

////////////////////////////////////////
// Css
////////////////////////////////////////
gulp.task('uncss', function() {
  "use strict";
  gulp.src(['assets/css/bootstrap.min.css', 'assets/css/font-awesome.min.css', 'assets/css/main.css'])
    .pipe(plumber())
    .pipe(concat('app.css'))
    .pipe(uncss({
      html: ['index.html'],
      timeout: 2000,
      ignore: ['.tooltip', '.tooltip-inner', '.tooltip-bottom', '.tooltip-arrow',
        '*:before, *:after', '.fade' , '.tooltip.bottom', '.tooltip.in', '.tooltip.bottom .tooltip-arrow']
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/css'))
    .pipe(reload({stream: true}));
});

////////////////////////////////////////
// HTML
////////////////////////////////////////
gulp.task('html', function() {
  "use strict";
  gulp.src('index.html')
  .pipe(reload({stream:true}));
});

////////////////////////////////////////
// Browser-Sync
////////////////////////////////////////
gulp.task('browser-sync', function() {
  "use strict";
  browserSync({
    server: {
      baseDir: './'
    }
  });
});


////////////////////////////////////////
// Watch
////////////////////////////////////////
gulp.task('watch', function() {
  "use strict";
  gulp.watch('assets/js/test.js', ['scripts']);
  gulp.watch('index.html', ['html']);
  gulp.watch('assets/css/test.css', ['css']);
});

////////////////////////////////////////
// Default
////////////////////////////////////////
gulp.task('default', ['scripts', 'css', 'html', 'browser-sync', 'watch']);
