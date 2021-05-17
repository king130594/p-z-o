const { src, dest, watch, parallel, series } = require('gulp');

const scss       = require('gulp-sass'),
    concat       = require('gulp-concat'),
    browserSync  = require('browser-sync').create(),
    uglify       = require('gulp-uglify-es').default,
    autoprefixer = require('gulp-autoprefixer'),
    clean        = require('gulp-clean'),
    imagemin     = require('gulp-imagemin'),
    fileinclude = require('gulp-file-include');


    
function html(){
    src(['app/_index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(concat('index.html'))
    .pipe(dest('./app'))

    .pipe(browserSync.stream());
}

function styles(){
    return src(['app/scss/style.scss', 'app/scss/media.scss'])
    .pipe(autoprefixer({
        overrideBrowserslist:  ['last 10 versions'],
        grid: true,
    }))
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(dest('app/css'))

    .pipe(browserSync.stream());
}

function scripts(){
    return src([
        'app/js/main.js',
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))

    .pipe(browserSync.stream());
}

function server(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function watching(){
    watch(['app/_*.html']).on('change', html)
    watch(['app/scss/**/*.scss'], styles)
    watch(['app/js/**/*.js', '!app/js/**/*.min.js'], scripts);
}

function cleanDist(){
    return src('dist', {read: false})
    .pipe(clean())
}

function make(){
    return src([
        'app/css/**/*',
        'app/favicon/**/*',
        'app/fonts/**/*',
        'app/images/**/*',
        'app/js/**/*',
        '!app/js/**/_*.js',
        'app/*.html',
        '!app/_*.html',
        'app/*.ico'
    ], {base: 'app'})

    .pipe(dest('dist/'))
}

function images(){
    return src('dist/images/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/images/', {base: 'dist/images'}))
}



exports.styles    = styles;
exports.scripts   = scripts;
exports.server    = server;
exports.watching  = watching;
exports.cleanDist = cleanDist;
exports.images    = images;
exports.make      = make;

exports.build     = series(cleanDist, make, images);
exports.default   = parallel(watching, server);