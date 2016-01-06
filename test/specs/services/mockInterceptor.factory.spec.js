(function () {
    'use strict';

    describe('mock interceptor factory', function () {
        var switchFeaturesConfig, mockInterceptor;
        beforeEach(module('switchFeatures'));

        beforeEach(inject(function (_switchFeaturesConfig_, _mockInterceptor_) {
            switchFeaturesConfig = _switchFeaturesConfig_;
            mockInterceptor = _mockInterceptor_;

            switchFeaturesConfig.config.mocks = {
                'test/12 WITH POST': 'test_post.json',
                'test/42 WITH DELETE': 'test_delete.json',
                'test/12': 'test_12.json',
                'test/42': 'test_42.json',
                'test': 'test.json'
            };

        }));

        it('shouldn\'t be redirected', function () {
            expect(mockInterceptor.request({
                method: 'POST',
                url: 'titi/12'
            })).toEqual({
                method: 'POST',
                url: 'titi/12'
            });

            expect(mockInterceptor.request({
                method: 'DELETE',
                url: 'foo/43'
            })).toEqual({
                method: 'DELETE',
                url: 'foo/43'
            });
        });

        it('should change be redirected', function () {
            expect(mockInterceptor.request({
                method: 'POST',
                url: 'test'
            })).toEqual({
                method: 'GET',
                url: '/mocks/test.json'
            });
        });

        it('should use the base path in configuration', function () {
            switchFeaturesConfig.config.basePathMock ='/mocksTest/';
            expect(mockInterceptor.request({
                method: 'POST',
                url: 'test'
            })).toEqual({
                method: 'GET',
                url: '/mocksTest/test.json'
            });
        });

        it('should be redirected for restfull', function () {
            expect(mockInterceptor.request({
                method: 'POST',
                url: 'test/12'
            })).toEqual({
                method: 'GET',
                url: '/mocks/test_post.json'
            });
            expect(mockInterceptor.request({
                method: 'POST',
                url: 'test/42'
            })).toEqual({
                method: 'GET',
                url: '/mocks/test_42.json'
            });
        });
    });
})();
