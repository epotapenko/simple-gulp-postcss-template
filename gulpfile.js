/*** 
    created by epotapenko 
    This is gulpfile.js for build your changes of css, js, html files.
*/

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    cssnext = require('postcss-cssnext'),
    cssimport = require("postcss-partial-import"),
    sourcemaps = require('gulp-sourcemaps');
    

gulp.task('css', function () {
    var processors = [
        cssimport(),
        cssnext({
            browsers: 'last 4 versions'
        }),
        cssnano()
    ];

    return gulp.src('./resources/css/main.css')
        .pipe( sourcemaps.init() )
        .pipe( postcss(processors) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('./assets/css/') )
        .pipe(browserSync.stream());
});


gulp.task('serve', ['css'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("resources/css/**/*.css", ['css']);
    gulp.watch("resources/js/**/*.js").on('change', browserSync.reload);
    gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('start', ['serve']);