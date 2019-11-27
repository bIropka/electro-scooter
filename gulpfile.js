var gulp = require('gulp'),
    pug = require('gulp-pug'),
    browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    del = require('del'),
    sass = require('gulp-sass'),
    plumber = require("gulp-plumber"),
    notify = require("gulp-notify"),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css');

gulp.task('markup', function() {
    return gulp.src('src/pug/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .on("error", notify.onError(function(error) {
            return "Something happened: " + error.message;
        }))
        .pipe(gulp.dest('public'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

gulp.task('styles', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(rename("styles.min.scss"))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", notify.onError(function(error) {
            return "Something happened: " + error.message;
        }))
        .pipe(autoprefixer(['last 2 version']))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

gulp.task('scripts', function () {
    return gulp.src([
        'src/js/main.js',
        'src/js/components/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/js'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

gulp.task('libs', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
        'node_modules/jquery-validation/dist/jquery.validate.min.js',
        'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
        'node_modules/wnumb/wNumb.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
        'node_modules/nouislider/distribute/nouislider.min.js'
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('repaint', function() {
    browsersync({
        server: {
            baseDir: 'public',
            directory: true
        }
    });
});

gulp.task('clean', function () {
    return del.sync(['public/js', 'public/css', 'public/*.html']);
});

gulp.task('watch', ['repaint', 'markup', 'styles', 'libs', 'scripts'], function () {
    gulp.watch('src/pug/**/*.pug', ['markup']);
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch(['src/js/**/*.js'], ['scripts']);
});

gulp.task('default', ['watch']);
