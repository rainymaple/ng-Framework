var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var runSequence =require('run-sequence');
var config = require('./gulp.config')(); // the way to import local module
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);


// 1. --- rainModule --- //

// 1.1 --- rainModule: directive templates

gulp.task('rain-menu-temp', function () {
    return gulp.src(['./rainModules/rainMenu/**/*.html'])
        .pipe($.angularTemplatecache({
            root: 'rainModules/rainMenu/',
            module: 'rainMenu',
            filename: 'rainMenu.t.js'
        }))
        .pipe(gulp.dest(config.rainModuleTmp));
});

gulp.task('rain-framework-temp', function () {
    return gulp.src(['./rainModules/rainFramework/**/*.html'])
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache({
            root: 'rainModules/rainFramework/',
            module: 'rainFramework',
            filename: 'rainFramework.t.js'
        }))
        .pipe(gulp.dest(config.rainModuleTmp));
});

gulp.task('rain-grid-temp', function () {
    return gulp.src(['./rainModules/rainGrid/**/*.html'])
        .pipe($.angularTemplatecache({
            root: 'rainModules/rainGrid/',
            module: 'rainGrid',
            filename: 'rainGrid.t.js'
        }))
        .pipe(gulp.dest(config.rainModuleTmp));
});


// 1.2 --- rainModule: create a single javaScript file

gulp.task('rain-js',
    [
        'clean-rain-templates',
        'rain-menu-temp',
        'rain-framework-temp',
        'rain-grid-temp'
    ],
    function () {
        log('Building rainModule.js');
        return gulp.src(['./rainModules/**/*.js'])
            .pipe($.plumber())
            .pipe($.angularFilesort())         // make sure the depended files are up front
            .pipe($.stripLine(['use strict']))     // remove some unnecessary texts
            .pipe($.concat('rain.js'))   // concatenate all the files to this one
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe(gulp.dest(config.distribution));     // copy the destination file to this folder
    });

gulp.task('clean-rain-templates', function (funcDone) {
    var path = config.rainModuleTmp;
    clean(path, funcDone);
});

// 1.3 --- rainModule: create a single css file

gulp.task('rain-css', function () {
    log('Compiling rainModule Sass --> CSS');
    return gulp.src(['./rainModules/**/*.scss'])
        .pipe($.sass())
        .pipe($.concat('rain.css'))
        .pipe($.autoprefixer({browser: ['last 2 version', '> 5%']}))    // adding vendor prefixes
        .pipe($.csso())             // compress
        .pipe(gulp.dest(config.distribution));
});


// 2 --- vendor files --- //

// 2.1 -- vendor: fonts
gulp.task('vendor-fonts', ['clean-fonts'], function () {
    log('copying fonts');
    return gulp.src(config.vendorFonts)
        .pipe(gulp.dest(config.distribution + '/fonts'))
});

gulp.task('clean-fonts', function (funcDone) {
    var path = config.distribution + '/fonts/*.*';
    clean(path, funcDone);
});

// 2.2 -- vendor: css
gulp.task('vendor-css', ['vendor-css-map'], function () {
    log('Building and optimizing vendor css file');
    return gulp
        .src(config.vendorCss)
        .pipe($.concat('vendor.css'))
        .pipe($.csso())
        .pipe(gulp.dest(config.distribution + '/css/'))
});

gulp.task('vendor-css-map', ['clean-vendor-css'], function () {
    log('Copying vendor css map files');
    /*return gulp
     .src(config.vendorCssMap)
     .pipe(gulp.dest(config.distribution+ '/css/'))*/
});

gulp.task('clean-vendor-css', function (funcDone) {
    var path = config.distribution + '/css';
    clean(path, funcDone);
});

// 2.3 -- vendor: javascript
gulp.task('vendor-js-map', ['clean-vendor-js'], function () {
    return gulp
        .src(config.vendorJsMap)
        .pipe(gulp.dest(config.distribution))
});

gulp.task('clean-vendor-js', function (funcDone) {
    var path = config.distribution + '/vendor.js';
    clean(path, funcDone);
});

gulp.task('vendor-js', ['vendor-js-map'], function () {
    log('Creating vendor javaScript files into vendor.js');
    return gulp
        .src(config.vendorJs)
        .pipe($.concat('vendor.js'))
        /*.pipe($.ngAnnotate())
         .pipe($.uglify())*/
        .pipe(gulp.dest(config.distribution))
});

// 3 --- app level files --- //

// 3.1 --- app: create a single javascript file

gulp.task('app-js',
    function () {
        log('Building application level javaScript files --> app.js');
        return gulp.src(config.appJs)
            .pipe($.plumber())
            .pipe($.angularFilesort())         // make sure the depended files are up front
            .pipe($.stripLine(['use strict']))     // remove some unnecessary texts
            .pipe($.concat('app.js'))   // concatenate all the files to this one
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe(gulp.dest(config.distribution));     // copy the destination file to this folder
    });

gulp.task('app-css', function () {
    log('Building and optimizing app css file');
    return gulp
        .src(config.appCss)
        .pipe($.concat('app.css'))
        .pipe($.csso())
        .pipe(gulp.dest(config.distribution))
});

// 4 --- project build --- //

gulp.task('rebuild',function(callback){
    runSequence('build-clean',
        ['vendor-js', 'vendor-css','vendor-fonts'],
        ['rain-js', 'rain-css'],
        ['app-js', 'app-css'],
        callback);
});

gulp.task('build-clean', function (funcDone) {
    var path = [config.distribution,config.rainModuleTmp];
    clean(path, funcDone);
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