'use strict';

angular.module('switchFeatures', [])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('mockInterceptor');
    });
