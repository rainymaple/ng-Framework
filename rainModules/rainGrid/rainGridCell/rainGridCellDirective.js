(function () {
    angular.module('rainGrid').directive('gridCell', [gridCell]);

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
                isIcon: '=',
                isHidden: '=',
                decimal:'=',
                funcLink: '&'
            },
            link: link

        };

        function link(scope, el, attr) {
            scope.value = scope.gridCell;
            if (scope.isLink || scope.isButton || scope.isIcon) {
                scope.linkFunc = function () {
                    scope.funcLink();
                }
            }

        }


    }
})();