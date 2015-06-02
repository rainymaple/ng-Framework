(function (app) {
    app.directive('rainGridFilter', ['rainGridService', rainGridFilter]);

    /*-- Function Directive --*/
    function rainGridFilter(rainGridService) {
        return {
            restrict: 'AE',
            templateUrl: 'rainModules/rainGrid/rainGridFilterInputTemplate.html',
            replace: false,
            scope: {
                filter: '=',
                columns: '=',
                deleteFilter: '&'
            },
            controller: function ($scope) {

                activate();

                function activate() {
                    getFilterColumn();
                    setConstraints($scope.filter.col);
                    buildBoolValues();
                    $scope.isBool = $scope.filter.col.isBoolean;
                }


                // event handlers
                $scope.columnChanged = setConstraints;

                $scope.removeFilter = function (col) {
                    $scope.deleteFilter({col: col})
                };

                function getFilterColumn() {
                    var index = -1;
                    for (var i = 0; i < $scope.columns.length; i++) {
                        if ($scope.columns[i].value === $scope.filter.col.value) {
                            index = i;
                            break;
                        }
                    }
                    if (index === -1) {
                        $scope.filter.col = {}
                    } else {
                        $scope.filter.col = $scope.columns[index];
                    }
                }

                function setConstraints(col) {
                    $scope.constraints = rainGridService.getFilterConstraintsByColumnType(col);

                    if ($scope.filter.constraint) {
                        var index = -1;
                        for (var i = 0; i < $scope.constraints.length; i++) {
                            if ($scope.constraints[i].value === $scope.filter.constraint.value) {
                                index = i;
                                break;
                            }
                        }
                        if (index === -1) {
                            $scope.filter.constraint = {};
                        } else {
                            $scope.filter.constraint = $scope.constraints[index];
                        }
                    }
                    $scope.isBool = $scope.filter.col.isBoolean;
                }

                function buildBoolValues(){
                    $scope.boolValues = [{label:'true',value:true},{label:'false',value:false}];
                }
            }
        };

    }   // end of fieldSelect


})(angular.module('rainGrid'));
