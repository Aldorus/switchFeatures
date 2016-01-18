(function () {

    'use strict';
    angular.module('switchFeatures', [])
        .config(function ($httpProvider) {
            'use strict';
            $httpProvider.interceptors.push('mockInterceptor');
        });

})();
