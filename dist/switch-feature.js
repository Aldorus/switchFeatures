(function () {
    
    'use strict';
    angular.module('switchFeatures', [])
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('mockInterceptor');
        });

})();

(function () {
    'use strict';

    angular.module('switchFeatures')
        .provider('switchFeaturesConfig', function () {
            var self = this;

            self.config = {
                basePathMock: '/mocks/', // Default base path
                features: {},
                mocks: {}
            };

            self.$get = function () {
                var provider = {};
                provider.config = self.config;
                provider.setBasePathMock = self.setBasePathMock;
                provider.setConfig = self.setConfig;
                provider.setMocks = self.setMocks;
                provider.setFeatures = self.setFeatures;
                return provider;
            };

            /**
             * Set the base path mock
             * @param basePathMock
             */
            self.setBasePathMock = function setBasePathMock(basePathMock) {
                self.config.basePathMock = basePathMock;
            };

            /**
             * Set the global configuration for this provider
             * @param config
             */
            self.setConfig = function setConfig(config) {
                angular.extend(self.config, config);
            };

            /**
             * Set only the mocks configuration for this provider
             * @param config
             */
            self.setMocks = function setMocks(mocks) {
                angular.extend(self.config.mocks, mocks);
            };

            /**
             * Set only the features configuration for this provider
             * @param features
             */
            self.setFeatures = function setFeatures(features) {
                angular.extend(self.config.features, features);
            };

            return self;
        });
})();

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

(function () {

    'use strict';

    angular.module('switchFeatures')
        .directive('sf', sf);

    function sf(switchFeaturesConfig, $compile) {
        return {
            replace: false,
            restrict: 'A',
            scope: true,
            link: function sfLink(scope, element, attrs) {
                var vm = this;
                if (switchFeaturesConfig.config.features[attrs.sf] === true) {
                    attrs.$set('ng-if', false);
                    $compile(element)(scope);
                }
                return vm;
            }
        };
    }
})();

