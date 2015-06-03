(function () {
    angular.module('rain.grid').directive('rainGrid', [rainGridDirective]);

    function rainGridDirective() {
        return {
            restrict: 'AE',
            templateUrl: 'rainModules/rainGrid/_rainGridTemplate.html',
            replace: false,
            scope: {
                rainGrid: '='
            },
            controller: 'rain.grid.controller'

        };
    }   // end of rainGrid
})();
