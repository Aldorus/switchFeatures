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

