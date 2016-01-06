(function () {
    'use strict';

    angular.module('switchFeatures')
        .factory('mockInterceptor', function (switchFeaturesConfig) {

            /**
             * Rewrite the config according to the provider configuration
             * @param {*} config
             */
            function rewriteConfig(config) {
                // Check in config
                var match = Object.keys(switchFeaturesConfig.config.mocks).filter(function (element) {
                    if (config.url.indexOf(element) >= 0) {
                        return true;
                    }
                    return false;
                })[0];

                if (match && switchFeaturesConfig.config.mocks[match + ' WITH ' + config.method]) {
                    config.url = switchFeaturesConfig.config.basePathMock + switchFeaturesConfig.config.mocks[match + ' WITH ' + config.method];
                    config.method = 'GET';
                } else if (match && switchFeaturesConfig.config.mocks[match]) {
                    config.url = switchFeaturesConfig.config.basePathMock + switchFeaturesConfig.config.mocks[match];
                    config.method = 'GET';
                }
                return config;
            }

            return {
                request: function (config) {
                    return rewriteConfig(config);
                }
            };
        });
})();
