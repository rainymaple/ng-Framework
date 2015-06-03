(function () {
    angular.module('rain.grid').directive('gridCell', [gridCell]);

    /*-- Function Directive --*/
    function gridCell() {

        return {
            restrict: 'AE',
            templateUrl: 'rainModules/rainGrid/rainGridCell/rainGridCellTemplate.html',
            replace: false,
            scope: {
                gridCell: '=',
                isDate: '=',
                isCurrency: '=',
                isNumber: '=',
                isCheckbox: '=',
                isLink: '=',
                isButton: '=',
                isHidden: '=',
                decimal:'=',
                funcLink: '&'
            },
            link: link

        };

        function link(scope, el, attr) {
            scope.value = scope.gridCell;
            if (scope.isLink || scope.isButton) {
                scope.linkFunc = function () {
                    scope.funcLink();
                }
            }

        }


    }
})();