(function () {
    angular.module('rainGrid').directive('rainGrid', [rainGridDirective]);

    function rainGridDirective() {
        return {
            restrict: 'AE',
            templateUrl: 'rainModules/rainGrid/_rainGridTemplate.html',
            replace: false,
            scope: {
                rainGrid: '='
            },
            controller: 'rainGrid.controller'

        };
    }   // end of rainGrid
})();
