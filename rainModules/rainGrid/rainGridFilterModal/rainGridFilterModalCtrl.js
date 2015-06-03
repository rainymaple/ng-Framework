(function () {
    angular.module('rain.grid').controller('rain.grid.filterModal.controller',
        ['$modalInstance', 'columnDefs', 'filters', '$scope', rainGridFilterModalCtrl]);

    function rainGridFilterModalCtrl($modalInstance, columnDefs, filters, $scope) {

        $scope.columns = _.map(columnDefs, function (col) {
            return {
                label: col.displayName,
                value: col.field,
                isNumber: col.isNumber,
                isCurrency: col.isCurrency,
                isBoolean: col.isBoolean || col.isCheckbox,
                isDate: col.isDate
            }
        });

        $scope.filters = filters;

        // event handlers

        $scope.addFilter = addFilter;
        $scope.deleteFilter = deleteFilter;
        $scope.doFilter = doFilter;
        $scope.doCancel = doCancel;

        // event handler functions

        function addFilter() {
            $scope.filters.push({col: {}, constraint: {}, expression: ''});
        }

        function deleteFilter(col) {
            _.remove($scope.filters, function (filter) {
                return filter.col.value === col.value;
            });
            if ($scope.filters.length === 0) {
                $scope.filters.push({col: {}, constraint: {}, expression: ''});
            }
        }

        function doFilter() {
            cleanFilters();
            $modalInstance.close({filters: $scope.filters, isCancel: false});
        }

        function doCancel() {
            cleanFilters();
            $modalInstance.close({filters: $scope.filters, isCancel: true});
        }

        function cleanFilters() {
            _.remove($scope.filters, function (filter) {
                return !filter.col || !filter.constraint || filter.expression === undefined || filter.expression === ''
            });
            if ($scope.filters.length === 0) {
                $scope.filters.push({col: {}, constraint: {}, expression: ''});
            }
        }
    }


})();