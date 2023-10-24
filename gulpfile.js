const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

// Load plugins

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();

// Clean assets

function clear() {
    return src('./dist/*', {
        read: false
    })
        .pipe(clean());
}

// JS function

function js() {
    const source = './app/js/*.js';

    return src(source)
        .pipe(changed(source))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('./dist/js/'))
        .pipe(browsersync.stream());
}

// CSS function

function css() {
    const source = './app/sass/main.scss';

    return src(source)
        .pipe(changed(source))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(cssnano())
        .pipe(dest('./dist/css/'))
        .pipe(browsersync.stream());
}

// Optimize images

function img() {
    return src('./app/img/*')
        .pipe(imagemin())
        .pipe(dest('./dist/img'));
}

function html() {
    return src('./app/*.html')
        .pipe(dest('./dist'));
}
// Watch files
function fonts() {
    return src('./app/fonts/*')
        .pipe(dest('./dist/fonts'));
}
function watchFiles() {
    watch('./app/scss/*', css);
    watch('./app/js/*', js);
    watch('./app/img/*', img);
    watch('./app/*', html);
}


// BrowserSync

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './dist'
        },
        port: 3000
    });
}

// Tasks to define the execution of the functions simultaneously or in series

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(js, css, img, fonts, html), browserSync, watchFiles);
