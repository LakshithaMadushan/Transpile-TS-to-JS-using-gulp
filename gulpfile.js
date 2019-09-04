const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const paths = {
	pages: [ 'src/*.html' ]
};

gulp.task('default', function() {
	return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'));
});

gulp.task('copy-html', function() {
	return gulp.src(paths.pages).pipe(gulp.dest('dist'));
});

gulp.task(
	'browserify_out',
	gulp.series('copy-html', function() {
		return browserify({
			basedir: '.',
			debug: true,
			entries: [ 'src/main.ts' ],
			cache: {},
			packageCache: {}
		})
			.plugin(tsify)
			.bundle()
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('dist'));
	})
);

gulp.task(
	'browserify_out_with_sm',
	gulp.series('copy-html', function() {
		return browserify({
			basedir: '.',
			debug: true,
			entries: [ 'src/main.ts' ],
			cache: {},
			packageCache: {}
		})
			.plugin(tsify)
			.bundle()
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(gulp.dest('test'))
			.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('dist'));
	})
);
