(function(module){
    angular.module(module).directive('rainGridDirective', [ rainGridDirective]);

    function rainGridDirective() {
        return {
            restrict: 'AE',
            templateUrl: 'rainModules/rainGrid/_rainGridTemplate.html',
            replace: false,
            scope: {
                rainGrid: '=',
                funcLink: '&',
                funcOnSelect: '&'
            },
            controller: 'rainGridController'

        };
    }   // end of rainGrid
})('rainGrid');
