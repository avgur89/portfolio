// Gulp.js configuration

// include gulp and plugins
var gulp = require('gulp');
var	newer = require('gulp-newer');
var	preprocess = require('gulp-preprocess');
var	htmlclean = require('gulp-htmlclean');
var	imagemin = require('gulp-imagemin');
var	sass = require('gulp-sass');
var	pleeease = require('gulp-pleeease');
var	jshint = require('gulp-jshint');
var	stripdebug = require('gulp-strip-debug');
var	size = require('gulp-size');
var	del = require('del');
var	browsersync = require('browser-sync');
var	uglify = require('gulp-uglify');
var	browserify = require('browserify');
var	source = require('vinyl-source-stream');
var	buffer = require('vinyl-buffer');
var	pkg = require('./package.json');

// file locations
var
	devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),  // echo %NODE_ENV%, set NODE_ENV=production (or development)

	src = 'source/',
	dest = 'build/',

	html = {
		in: src + '*.html',
		watch: [src + '*.html', src + '_html_inc/**/*'],
		out: dest,
		context: {
			devBuild: devBuild,
			author: pkg.author,
			version: pkg.version
		}
	},

	images = {
		in: src + 'img/**/*',
		out: dest + 'img/'
	},

	css = {
		in: src + 'scss/main.scss',
		watch: [src + 'scss/**/*'],
		out: dest + 'css/',
		sassOpts: {
			outputStyle: 'nested',
			imagePath: '../img',
			precision: 3,
			errLogToConsole: true
		},
		pleeeaseOpts: {
			autoprefixer: { browsers: ['last 2 versions', '> 2%'] },
			pseudoElements: true,
			mqpacker: true,
			minifier: !devBuild
		}
	},

	fonts = {
		in: src + 'fonts/*.*',
		out: dest + 'fonts/'
	},

	fontAwesome = {
		in: src + 'scss/3-components/font-awesome/fonts/*.*',
		out: dest + 'fonts/'
	},

	libs = {
    in: src + 'libs/**/*',
		out: dest + 'libs/'
  },

	js = {
		in: src + 'js/**/*',
		out: dest + 'js/',
		filename: 'main.js'
	},

	syncOpts = {
		server: {
			baseDir: dest,
			index: 'index.html'
		},
		open: false,
		notify: true
	};

// show build type
console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');

// clean the build folder
gulp.task('clean', function() {
	del([
		dest + '*'
	]);
});

// build HTML files
gulp.task('html', function() {
	var page = gulp.src(html.in).pipe(preprocess({ context: html.context }));
	if (!devBuild) {
		page = page
			.pipe(size({ title: 'HTML in' }))
			.pipe(htmlclean())
			.pipe(size({ title: 'HTML out' }));
	}
	return page.pipe(gulp.dest(html.out));
});

// manage images
gulp.task('images', function() {
	return gulp.src(images.in)
		.pipe(newer(images.out))
		.pipe(imagemin())
		.pipe(gulp.dest(images.out));
});

// copy fonts
gulp.task('fonts', function() {
	return gulp.src(fonts.in)
		.pipe(newer(fonts.out))
		.pipe(gulp.dest(fonts.out));
});

// copy font-awesome icon font
gulp.task('fontAwesome', function() {
	return gulp.src(fontAwesome.in)
		.pipe(newer(fontAwesome.out))
		.pipe(gulp.dest(fontAwesome.out));
});

// copy libs
gulp.task('libs', function() {
	return gulp.src(libs.in)
		.pipe(newer(libs.out))
		.pipe(gulp.dest(libs.out));
});

// compile Sass
gulp.task('sass', function() {
	return gulp.src(css.in)
		.pipe(sass(css.sassOpts))
		.pipe(size({title: 'CSS in '}))
		.pipe(pleeease(css.pleeeaseOpts))
		.pipe(size({title: 'CSS out '}))
		.pipe(gulp.dest(css.out))
		.pipe(browsersync.reload({ stream: true }));
});

// load modules in one file
gulp.task('browserify', function() {
  browserify({
    entries: './source/js/main.js',
    debug: true
  })
  .bundle()
  .pipe(source('main.min.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./build/js'));
});

// browser sync
gulp.task('browsersync', function() {
	browsersync(syncOpts);
});

// default task
gulp.task('default', ['html', 'images', 'fonts', 'fontAwesome', 'libs', 'sass', 'browserify', 'browsersync'], function() {

	// html changes
	gulp.watch(html.watch, ['html', browsersync.reload]);

	// image changes
	gulp.watch(images.in, ['images']);

	// font changes
	gulp.watch(fonts.in, ['fonts']);

	// libs changes
	gulp.watch(libs.in, ['libs']);

	// sass changes
	gulp.watch(css.watch, ['sass']);

	// javascript changes
	gulp.watch(js.in, ['browserify', browsersync.reload]);

});
