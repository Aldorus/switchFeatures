'use strict';

var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    angularFilesort = require('gulp-angular-filesort'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    Server = require('karma').Server;


// Test
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start()});

// Lint
gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', 'test/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());

});

// Build (+ mini)
gulp.task('build', ['lint', 'test'], function () {
    return gulp.src('src/**/*.js')
        .pipe(angularFilesort())
        .pipe(concat('switch-feature.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(concat('switch-feature.min.js'))
        .pipe(gulp.dest('dist'));
});

// Default
gulp.task('default', ['build']);
