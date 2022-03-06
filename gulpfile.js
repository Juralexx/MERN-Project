import gulp from 'gulp'
const { src, dest, watch, series } = gulp
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import prefix from 'gulp-autoprefixer'
import minify from 'gulp-clean-css'
import rename from 'gulp-rename'
import browserSync from 'browser-sync';

var paths = {
    styles: {
        srcWatched: './views/src/styles/scss/**/**/*.scss',
        src: './views/src/styles/scss/style.scss',
        dest: './views/src/styles/dist/',
        destmin: './views/src/styles/dist/'
    },
    scripts: {
        src: './views/src/public/scripts/*.js',
        dest: './views/src/public/scripts/dist/'
    }
};

const server = browserSync.create();
server.init({
    baseDir: './views/src/styles/dist/',
});

function styleCompiler() {
    return src('./views/src/styles/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix('last 2 versions'))
        .pipe(rename('old.css'))
        .pipe(dest(paths.styles.dest))
        .pipe(server.stream())
    // .pipe(sass().on('error', sass.logError))
    // .pipe(prefix('last 2 versions'))
    // .pipe(minify())
    // .pipe(dest(paths.styles.dest));
}

function watchTask() {
    watch(paths.styles.srcWatched, styleCompiler);
    watch(paths.styles.dest).on('change', () => server.stream())
}

export default series(styleCompiler, watchTask);