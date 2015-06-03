(function () {
    angular.module('rain.grid').directive('rainGridMenu', [rainGridMenu]);

    function rainGridMenu() {
        return {
            restrict: "AE",
            templateUrl: "rainModules/rainGrid/rainGridMenu/rainGridMenuTemplate.html",
            replace: false,
            scope: {
                filterData: '&',
                gridOptions: '='
            },
            controller: 'rain.grid.menu.controller'
        }
    }

})();