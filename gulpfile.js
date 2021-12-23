'use strict'

const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
//const browserSync = require('browser-sync').create();

var paths = {
        styles: {
            srcWatched: './views/public/styles/scss/**/**/*.scss',
            src: './views/public/styles/scss/style.scss',
            dest: './views/public/styles/dist/',
            destmin: './views/public/styles/dist/'
        },
        scripts: {
            src: './views/public/scripts/*.js',
            dest: './views/public/scripts/dist/'
        }
    };

function styleCompiler() {
    return src('./views/public/styles/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(dest(paths.styles.dest))
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(rename('style.min.css' ))
    .pipe(dest(paths.styles.dest))
    //.pipe(browserSync.stream());
}

function watchTask() {
    watch(paths.styles.srcWatched, styleCompiler);
    //browserSync.init({
    //    server: {
    //        baseDir: './'
    //    }
    //})
    //watch(paths.scripts.src).on('change', browserSync.reload);
    //watch('./*.jsx').on('change', browserSync.reload);
}

exports.default = series(styleCompiler, watchTask);
 
// function uglifyJs() {
//   return src(paths.scripts.src)
//     .pipe(uglify())
//     .pipe(rename('script.min.js' ))
//     .pipe(dest(paths.scripts.dest));
// }

//exports.uglifyJs = uglifyJs();