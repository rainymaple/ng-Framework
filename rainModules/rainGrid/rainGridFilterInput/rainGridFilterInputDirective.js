(function () {
    angular.module('rain.grid').directive('rainGridFilter', [rainGridFilter]);

    /*-- Function Directive --*/
    function rainGridFilter() {
        return {
            restrict: 'AE',
            templateUrl: 'rainModules/rainGrid/rainGridFilterInput/rainGridFilterInputTemplate.html',
            replace: false,
            scope: {
                filter: '=',
                columns: '=',
                deleteFilter: '&'
            },
            controller: 'rain.grid.filterInput.controller'
        };

    }   // end of fieldSelect


})();
