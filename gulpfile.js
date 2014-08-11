var gulp = require('gulp'),
	sass = require('gulp-sass'),
	jshint = require('gulp-jshint'),
	watch = require('gulp-watch');

// compile sass
gulp.task('sass', function() {
	return gulp.src('sass/*.scss')
		.pipe(sass({errLogToConsole: true}))
		.pipe(gulp.dest('assets/css/'));
});

// lint js
gulp.task('jshint', function() {
	return gulp.src('assets/js/*.js')
		.pipe(jshint({
			asi: true,
			curly: true,
			eqeqeq: true,
			indent: 4,
			jquery: true,
			quotmark: 'single',
			undef: true,
			unused: true,
			globals: {
				document: false,
				window: false,
				location: false,
				setTimeout: false,
				clearTimeout: false
			}
		}))
		.pipe(jshint.reporter('default'));
});

// watch for changes
gulp.task('watch', function() {
	gulp.watch('assets/js/*.js', ['jshint']);
	gulp.watch('sass/*.scss', ['sass']);
});
