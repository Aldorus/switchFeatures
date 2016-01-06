(function () {
    'use strict';

    describe('sf directive', function () {

        var scope, elm, config, $compile;
        beforeEach(module('switchFeatures'));
        beforeEach(inject(function (_$compile_, $rootScope, _switchFeaturesConfig_) {
            var html = '<div sf="result"></div>';
            scope = $rootScope.$new();
            elm = angular.element(html);
            $compile = _$compile_;
            config = _switchFeaturesConfig_;
        }));

        it('should have a scope', function () {
            $compile(elm)(scope);
            scope.$digest();

            expect(elm.hasClass('ng-scope')).toBe(true);
        });

        it('shouldn\'t change anything to the div', function () {
            config.config.features = {
                'result': false
            };
            $compile(elm)(scope);
            scope.$digest();
            expect(elm.attr('ng-if')).toBe(undefined);
        });

        it('should hide the div', function () {
            config.config.features = {
                'result': true
            };
            $compile(elm)(scope);
            scope.$digest();
            expect(elm.attr('ng-if')).toBe("false");
        });
    });

})();
