// gulp
var gulp = require('gulp'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
watch = require('gulp-watch'),
webserver = require('gulp-webserver'),
sequence = require('gulp-sequence')
bower = require('gulp-bower'),
ngAnnotate = require('gulp-ng-annotate')
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cleanCSS = require('gulp-clean-css'),
rename = require('gulp-rename'),
merge = require('merge-stream'),
del = require('del');

var paths = {
  dev: {
    all: 'app/**',
    css: 'app/**/*.css',
	sass: 'app/**/*.scss',
    index: 'app/index.html',
    html: 'app/**/*.html',
    js: ['app/**/*.mod.js', 'app/**/*!(.mod).js'],
    images: 'app/img/**',
    jsDependencies: [
	  'bower_components/angular/angular.js',
      'bower_components/jquery/dist/jquery.js',      
	  'bower_components/angular-animate/angular-animate.js',
	  'bower_components/angular-route/angular-route.js',
	  'bower_components/angular-ui-router/release/angular-ui-router.js',
	  'bower_components/bootstrap/dist/js/bootstrap.js'
    ],
    fontDependencies: [
	  'bower_components/font-awesome/fonts/**',
	  'bower_components/bootstrap/fonts/**'
    ]
  },
  build: {
    all: 'dist/**',
    main: 'dist/',
    css: 'dist/css',
    js: 'dist/js',
    images: 'dist/img',
	fonts: 'dist/fonts'
  }
};

// tasks
gulp.task('webserver', ['styles', 'js', 'html'], function () {
  gulp.src('dist')
    .pipe(webserver({
      //directoryListing: true,
      //open: true,
      livereload: true,
      host: "0.0.0.0"
    }));
});

gulp.task('lint', function() {
  gulp.src(paths.dev.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', function() {
    return del([paths.build.all]);
});

gulp.task('styles', function() {
	var sassStream,
    cssStream;

	  //compile sass
	  sassStream = gulp.src(paths.dev.sass)
		.pipe(sass({style: 'expanded', errLogToConsole: true}));

	  //select additional css files
	  cssStream = gulp.src(paths.dev.css);

  return merge(sassStream, cssStream)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(concat('style.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.build.css));
});

gulp.task('images', function() {
  gulp.src(paths.dev.images)
    .pipe(gulp.dest(paths.build.images));
});


gulp.task('js', function() {
  gulp.src(paths.dev.js)
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(paths.build.js));
});

gulp.task('fonts', function() {
  gulp.src(paths.dev.fontDependencies)
    .pipe(gulp.dest(paths.build.fonts));
});

gulp.task('jsDependencies', function () {
  gulp.src(paths.dev.jsDependencies)
    .pipe(ngAnnotate()) // needed for angularjs dependencies
    .pipe(concat('dependencies.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.build.js));
});

gulp.task('html', function () {
  gulp.src(paths.dev.html)
    .pipe(gulp.dest(paths.build.main));
});

gulp.task('index', function () {
  gulp.src(paths.dev.index)
    .pipe(gulp.dest(paths.build.main));
});

gulp.task('watch', ['styles', 'js', 'html'], function () {
  //gulp.watch(paths.dev.all, ['styles', 'js', 'html']);
  
  gulp.watch([paths.dev.sass, paths.dev.css], ['styles']);
  gulp.watch(paths.dev.js, ['js']);
  gulp.watch(paths.dev.html, ['html']);
  gulp.watch(paths.dev.images, ['images']);
  gulp.watch(paths.dev.index, ['index']);
});


gulp.task('bower-install', function () {
  return bower({cmd: 'install'});
});

gulp.task('bower-update', function () {
  return bower({cmd: 'update'});
});

gulp.task('build', sequence('clean', 'bower-install', ['jsDependencies', 'images', 'styles', 'js', 'index', 'html', 'fonts'], 'lint'));
gulp.task('run', sequence('build', 'webserver', 'watch'));
gulp.task('default', ['run']);