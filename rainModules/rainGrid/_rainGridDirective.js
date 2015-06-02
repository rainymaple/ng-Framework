(function (module) {
    angular.module(module).directive('rainGrid', [rainGridDirective]);

    function rainGridDirective() {
        return {
            restrict: 'AE',
            templateUrl: 'rainModules/rainGrid/_rainGridTemplate.html',
            replace: false,
            scope: {
                rainGrid: '='
            },
            controller: 'rainGridController'

        };
    }   // end of rainGrid
})('rainGrid');
