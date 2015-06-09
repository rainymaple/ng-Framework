(function () {
    angular.module('rainGrid').directive('rainGridMenu', [rainGridMenu]);

    function rainGridMenu() {
        return {
            restrict: "AE",
            templateUrl: "rainModules/rainGrid/rainGridMenu/rainGridMenuTemplate.html",
            replace: false,
            scope: {
                filterData: '&',
                gridOptions: '='
            },
            controller: 'rainGrid.menu.controller'
        }
    }

})();