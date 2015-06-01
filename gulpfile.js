/*
 * install some necessary utilities

 * npm install --save-dev gulp
 * npm install --save-dev gulp-concat
 * npm install --save-dev gulp-angular-filesort
 * npm install --save-dev gulp-strip-line
 * npm install --save-dev gulp-angular-templatecache
 * npm install --save-dev gulp-sass
 * npm install --save-dev gulp-autoprefixer
 * */

var gulp = require('gulp');
var concat = require('gulp-concat');
var angularFileSort = require('gulp-angular-filesort');
var strip = require('gulp-strip-line');
var templateCache = require('gulp-angular-templatecache');
var sass = require('gulp-sass');
var autoPrefix = require('gulp-autoprefixer');

// --- create template caches --- //

gulp.task('buildMenuTemplateCache', function () {
    return gulp.src(['./rainModules/rainMenu/**/*.html'])
        .pipe(templateCache({
            root: 'rainModules/rainMenu/',
            module: 'rainMenu'
        }))
        .pipe(gulp.dest('./rainModules/rainMenu/'))
});

gulp.task('buildFrameworkTemplateCache', function () {
    return gulp.src(['./rainModules/rainFramework/**/*.html'])
        .pipe(templateCache({
            root: 'rainModules/rainFramework/',
            module: 'rainFramework'
        }))
        .pipe(gulp.dest('./rainModules/rainFramework/'))
});

gulp.task('buildGridTemplateCache', function () {
    return gulp.src(['./rainModules/rainGrid/**/*.html'])
        .pipe(templateCache({
            root: 'rainModules/rainGrid/',
            module: 'rainGrid'
        }))
        .pipe(gulp.dest('./rainModules/rainGrid/'))
});


// --- create a single javaScript file --- //

gulp.task('buildJavaScript', function () {
    return gulp.src(['./rainModules/**/*.js'])
        .pipe(angularFileSort())         // make sure the depended files are up front
        .pipe(strip(['use strict']))     // remove some unnecessary texts
        .pipe(concat('rainModule.js'))   // concatenate all the files to this one
        .pipe(gulp.dest('./dist/'));     // copy the destination file to this folder
});

// --- create a single css file --- //

gulp.task('buildCss', function () {
    return gulp.src(['./rainModules/**/*.scss'])
        .pipe(sass())
        .pipe(concat('rainModule.css'))
        .pipe(autoPrefix({browser: ['last 2 version', '> 5%']}))    // adding vendor prefixes
        .pipe(gulp.dest('./dist'));
});

