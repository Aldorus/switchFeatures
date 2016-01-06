'use strict';

var wiredep = require('wiredep');
var wiredepOptions = {
    dependencies: true,
    devDependencies: true
};

module.exports = function (config) {
    var files = wiredep(wiredepOptions).js;
    files.push('src/switchFeatures.js');
    files.push('src/**/*.js');
    files.push('test/**/*.spec.js');
    var configuration = {
        browsers: ['PhantomJS'],
        singleRun: true,
        autoWatch: false,
        frameworks: ['jasmine'],
        files: files,
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/*.js': ['coverage']
        }
    };
    config.set(configuration);
};
