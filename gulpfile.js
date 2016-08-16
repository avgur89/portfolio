// Gulp.js configuration

// include gulp and plugins
var
	gulp = require('gulp'),
	newer = require('gulp-newer'),
	concat = require('gulp-concat'),
	preprocess = require('gulp-preprocess'),
	htmlclean = require('gulp-htmlclean'),
	imagemin = require('gulp-imagemin'),
	sass = require('gulp-sass'),
	pleeease = require('gulp-pleeease'),
	jshint = require('gulp-jshint'),
	deporder = require('gulp-deporder'),			// Dependency Management (// requires: scrollTo.js tweetForm.js) at the top of fontloader.js. Will load first scrollTo then tweetForm
	stripdebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	size = require('gulp-size'),
	del = require('del'),
	browsersync = require('browser-sync');
	pkg = require('./package.json');

// file locations
var
	devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),  // echo %NODE_ENV%, set NODE_ENV=production (or development)

	source = 'source/',
	dest = 'build/',

	html = {
		in: source + '*.html',
		watch: [source + '*.html', source + '_html_inc/**/*'],
		out: dest,
		context: {
			devBuild: devBuild,
			author: pkg.author,
			version: pkg.version
		}
	},

	images = {
		in: source + 'img/**/*',
		out: dest + 'img/'
	},

	css = {
		in: source + 'scss/main.scss',
		watch: [source + 'scss/**/*'],
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
		in: source + 'fonts/**/*',
		out: dest + 'fonts/'
	},

	libs = {
    in: source + 'libs/**/*',
		out: dest + 'libs/'
  },

	js = {
		in: source + 'js/**/*',
		out: dest + 'js/',
		filename: 'main.js'
	},

	php = {
		in: source + 'php/**/*',
		out: dest + 'php/'
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

// copy libs
gulp.task('libs', function() {
	return gulp.src(libs.in)
		.pipe(newer(libs.out))
		.pipe(gulp.dest(libs.out));
});


// copy php files
gulp.task('php', function() {
	return gulp.src(php.in)
		.pipe(newer(php.out))
		.pipe(gulp.dest(php.out));
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

gulp.task('js', function() {
	if (devBuild) {
		return gulp.src(js.in)
			.pipe(newer(js.out))
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(jshint.reporter('fail'))
			.pipe(gulp.dest(js.out));
	}
	else {
		del([
			dest + 'js/*'
		]);
		return gulp.src(js.in)
			.pipe(deporder())
			.pipe(concat(js.filename))
			.pipe(size({ title: 'JS in '}))
			.pipe(stripdebug())
			.pipe(uglify())
			.pipe(size({ title: 'JS out '}))
			.pipe(gulp.dest(js.out));
	}
});

// browser sync
gulp.task('browsersync', function() {
	browsersync(syncOpts);
});

// default task
gulp.task('default', ['html', 'images', 'fonts', 'libs', 'sass', 'js', 'php', 'browsersync'], function() {

	// html changes
	gulp.watch(html.watch, ['html', browsersync.reload]);

	// image changes
	gulp.watch(images.in, ['images']);

	// font changes
	gulp.watch(fonts.in, ['fonts']);

	// libs changes
	gulp.watch(libs.in, ['libs']);

	// libs changes
	gulp.watch(php.in, ['php']);

	// sass changes
	gulp.watch(css.watch, ['sass']);

	// javascript changes
	gulp.watch(js.in, ['js', browsersync.reload]);

});
