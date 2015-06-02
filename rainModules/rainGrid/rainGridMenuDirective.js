(function (app) {
    app.directive('rainGridMenu', ['rainGridService', rainGridMenu]);

    function rainGridMenu(rainGridService) {
        return {
            restrict: "AE",
            templateUrl: "rainModules/rainGrid/rainGridMenuTemplate.html",
            replace: false,
            scope: {
                filterData: '&',
                gridOptions: '='
            },
            controller: function ($scope) {

                activate();

                function activate() {
                    menuConfig();
                    $scope.filters = [
                        {col: {}, constraint: {}, expression: ''}
                    ];
                    verifyFilterStatus();
                }

                // event handlers

                $scope.doFilter = function () {
                    var modalInstance = rainGridService.showFilterModal($scope.gridOptions, $scope.filters);
                    modalInstance.then(function (data) {
                        if (!data.isCancel) {
                            $scope.filters = data.filters;
                            verifyFilterStatus();
                            $scope.filterData({filters: $scope.filters});
                        }
                    });
                };

                $scope.removeFilters = function () {
                    $scope.filters = [
                        {col: {}, constraint: {}, expression: ''}
                    ];
                    verifyFilterStatus();
                    $scope.filterData({filters: $scope.filters});
                };

                function verifyFilterStatus() {
                    if ($scope.filters.length === 0) {
                        $scope.hasFiltered = false;
                    } else {
                        var filter = $scope.filters[0];
                        $scope.hasFiltered = !!filter.col && !!filter.constraint
                        && filter.expression !== undefined && filter.expression !== '';
                    }
                }

                // menu config
                function menuConfig() {
                    $scope.status = {
                        isOpen: false
                    };

                    $scope.toggled = function (open) {
                        console.log('Dropdown is now: ', open);
                    };

                    $scope.toggleDropdown = function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.status.isOpen = !$scope.status.isOpen;
                    };
                }
            }
        }
    }


})(angular.module('rainGrid'));