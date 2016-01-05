'use strict';

describe('switchFeatures module', function () {

    var http;
    beforeEach(module('switchFeatures'));

    beforeEach(module(function(_$httpProvider_) {
        http = _$httpProvider_;// Provider injection
    }));

    beforeEach(inject(function() {
    }));

    it('should add interceptor to httpProvider', function() {
        expect(http.interceptors).toContain('mockInterceptor');
    })
});
