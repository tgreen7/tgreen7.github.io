// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var cleanCSS = require('gulp-clean-css');
var del = require('del');

// Compile Our Sass
gulp.task('styles', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        // minify
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        // live reload
        .pipe(livereload())
        .on('end', function () {
            gutil.log(gutil.colors.green('Styles task complete!'));
        });
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
            // 'src/js/jquery.fancybox-media.js',
            // 'src/js/jquery.fancybox.pack.js',
            'src/js/plugins.js',
            'src/js/main.js',
        ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .on('end', function () {
            gutil.log(gutil.colors.green('Scripts task complete!'));
        });
});

// Watches html and reloads
gulp.task('html', function() {
    return gulp.src([
            './**/*.html',
            '!./node_modules/**/*'
        ])
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    
    // Watch .scss files
    gulp.watch('src/scss/**/*.scss', ['styles']);
    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts']);

    // Watch HTML and livereload
    gulp.watch('./**/*.html', ['html']);
});

// Clean
gulp.task('clean', function() {
  return del(['dist/css', 'dist/js', 'dist/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'watch');
});
