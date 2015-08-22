var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');

var path = {
  ALL: ['app/app/*.js', 'app/collections/*.js', 'app/models/*.js', 'app/views/*.js'],
  HTML: 'index.html',
  CSS: 'public/css/style.css',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'public',
  DEST_BUILD: 'public/build',
  DEST_SRC: 'public/src',
  ENTRY_POINT: './app/app.js'
};

gulp.task('lint', function () {
  gulp.src(path.ALL)
    .pipe(jshint());
});

gulp.task('copy-index', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('copy-css', function(){
  gulp.src(path.CSS)
    .pipe(concat('main.css'))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy-index']);
  gulp.watch(path.CSS, ['copy-css']);
  gulp.watch(path.ALL, ['lint']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC));
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('demon', function () {
  nodemon({
    script: 'index.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['lint'])
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('default', ['copy-index', 'copy-css', 'demon', 'watch']);
