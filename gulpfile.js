'use strict'

const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

var paths = {
        styles: {
            src: './views/public/src/styles/scss/**/**/*.scss',
            dest: './views/public/src/styles/dist/'
        },
        scripts: {
            src: './views/public/src/scripts/*.js',
            dest: './views/public/src/script/dist/'
        }
    };

function styleCompiler() {
    return src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(dest(paths.styles.dest))
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(rename('style.min.css' ))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function watchTask() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    watch(paths.styles.src, styleCompiler);
    watch(paths.scripts.src).on('change', browserSync.reload);
    //watch('./*.jsx').on('change', browserSync.reload);
}

exports.default = series(styleCompiler, watchTask);
 
function uglify() {
  return src(paths.scripts.src)
    .pipe(uglify())
    .pipe(rename('script.min.js' ))
    .pipe(dest(paths.scripts.dest));
}

exports.uglify = uglify();