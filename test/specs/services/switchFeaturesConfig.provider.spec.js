(function () {
    'use strict';

    describe('switch feature config provider', function () {
        var switchFeaturesConfig;
        beforeEach(module('switchFeatures'));

        beforeEach(inject(function (_switchFeaturesConfig_) {
            switchFeaturesConfig = _switchFeaturesConfig_;
        }));

        it('should change the basePath', function () {
            expect(switchFeaturesConfig.config.basePathMock).toEqual('/mocks/');
            switchFeaturesConfig.setBasePathMock('/mocksTest/');
            expect(switchFeaturesConfig.config.basePathMock).toEqual('/mocksTest/');
        });

        it('should add in configuration with setMocks', function () {
            switchFeaturesConfig.setMocks({
                'toto': 'mock.json'
            });

            expect(switchFeaturesConfig.config.mocks).toEqual({
                'toto': 'mock.json'
            });
        });

        it('should add in configuration with setMocks', function () {
            switchFeaturesConfig.setFeatures({
                'toto': 'test'
            });

            expect(switchFeaturesConfig.config.features).toEqual({
                'toto': 'test'
            });
        });
    });
})();
