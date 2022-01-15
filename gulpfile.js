import gulp from 'gulp'
const { src, dest, watch, series } = gulp
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass( dartSass );
import prefix from 'gulp-autoprefixer'
import minify from 'gulp-clean-css'
import uglify from'gulp-uglify'
import rename from 'gulp-rename'
import browserSync from 'browser-sync';

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
    .pipe(browserSync.stream());
}

function watchTask() {
    watch(paths.styles.srcWatched, styleCompiler);
    browserSync.init({
       server: {
           baseDir: './views/public/styles/dist/style.min.css'
       }
    })
    watch(paths.scripts.src).on('change', browserSync.reload);
    //watch('./*.jsx').on('change', browserSync.reload);
}

export default series(styleCompiler, watchTask);
 
// function uglifyJs() {
//   return src(paths.scripts.src)
//     .pipe(uglify())
//     .pipe(rename('script.min.js' ))
//     .pipe(dest(paths.scripts.dest));
// }

//exports.uglifyJs = uglifyJs();