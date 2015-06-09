(function () {
    angular.module('rainGrid').directive('rainGridFilter', [rainGridFilter]);

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
            controller: 'rainGrid.filterInput.controller'
        };

    }   // end of fieldSelect


})();
