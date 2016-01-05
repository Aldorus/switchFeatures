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
                angular.extend(self.config.config, config);
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
