var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var config = require('./gulp.config')(); // the way to import local module
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);


// --- create template caches --- //

gulp.task('buildMenuTemplateCache', function () {
    return gulp.src(['./rainModules/rainMenu/**/*.html'])
        .pipe($.angularTemplatecache({
            root: 'rainModules/rainMenu/',
            module: 'rainMenu'
        }))
        .pipe(gulp.dest('./rainModules/rainMenu/'))
});

gulp.task('buildFrameworkTemplateCache', function () {
    return gulp.src(['./rainModules/rainFramework/**/*.html'])
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache({
            root: 'rainModules/rainFramework/',
            module: 'rainFramework'
        }))
        .pipe(gulp.dest('./rainModules/rainFramework/'))
});

gulp.task('buildGridTemplateCache', function () {
    return gulp.src(['./rainModules/rainGrid/**/*.html'])
        .pipe($.angularTemplatecache({
            root: 'rainModules/rainGrid/',
            module: 'rainGrid'
        }))
        .pipe(gulp.dest('./rainModules/rainGrid/'))
});


// --- create a single javaScript file --- //

gulp.task('buildRainModuleJavaScript',
    [
        'buildMenuTemplateCache',
        'buildFrameworkTemplateCache',
        'buildGridTemplateCache'
    ],
    function () {
        log('Building rainModule.js');
        return gulp.src(['./rainModules/**/*.js'])
            .pipe($.plumber())
            .pipe($.angularFilesort())         // make sure the depended files are up front
            .pipe($.stripLine(['use strict']))     // remove some unnecessary texts
            .pipe($.concat('rainModule.js'))   // concatenate all the files to this one
            .pipe(gulp.dest(config.distribution));     // copy the destination file to this folder
    });

// --- create a single css file --- //

gulp.task('buildRainModuleCss', function () {
    log('Compiling Sass --> CSS');
    return gulp.src(['./rainModules/**/*.scss'])
        .pipe($.sass())
        .pipe($.concat('rainModule.css'))
        .pipe($.autoprefixer({browser: ['last 2 version', '> 5%']}))    // adding vendor prefixes
        .pipe(gulp.dest(config.distribution));
});

gulp.task('buildAppJavaScript',
    function () {
        log('Building application level javaScript files --> app.js');
        return gulp.src(config.appJs)
            .pipe($.plumber())
            .pipe($.angularFilesort())         // make sure the depended files are up front
            .pipe($.stripLine(['use strict']))     // remove some unnecessary texts
            .pipe($.concat('app.js'))   // concatenate all the files to this one
            .pipe(gulp.dest(config.distribution));     // copy the destination file to this folder
    });

gulp.task('fonts', ['clean-fonts'], function () {
    log('copying fonts');
    return gulp.src(config.vendorFonts)
        .pipe(gulp.dest(config.distribution + '/fonts'))
});

gulp.task('clean-fonts', function (funcDone) {
    var path = config.distribution + '/fonts/*.*';
    clean(path, funcDone);
});

gulp.task('vendor-css', ['clean-vendor-css'], function () {
    log('copying fonts');
    return gulp
        .src(config.vendorCss)
        .pipe($.concat('vendor.css'))
        .pipe(gulp.dest(config.distribution))
});

gulp.task('clean-vendor-css', function (funcDone) {
    var path = config.distribution + '/css/*.*';
    clean(path, funcDone);
});

gulp.task('vendor-js-map',  function () {
    return gulp
        .src(config.vendorJsMap)
        .pipe(gulp.dest(config.distribution))
});

gulp.task('vendor-js',['vendor-js-map'],  function () {
    log('Creating vendor javaScript files into vendor.js');
    return gulp
        .src(config.vendorJs)
        .pipe($.concat('vendor.js'))
        .pipe(gulp.dest(config.distribution))
});
//================
function clean(path, funcDone) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, funcDone);
}

function log(msg) {
    if (typeof (msg) == 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}