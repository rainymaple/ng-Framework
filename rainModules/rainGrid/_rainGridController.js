(function () {

    angular.module('rainGrid').controller('rainGrid.controller', rainGridController);

    /*-- Function Controller --*/

    rainGridController.$inject = ['$scope', '$rootScope', 'rainGridService'];

    function rainGridController($scope, $rootScope, rainGridService) {

        $scope.gridOptions = {};
        var _dataRows = []; // _dataRows is original(neither sorted nor filtered)
        var _dataList = []; // _dataList might be sorted and/or filtered
        var _sortings = [null, 'ASC', 'DSC'];
        var _sortIndex = 0;
        var _sortField = null;
        var _isFiltered = false;
        var _dataRowsFiltered = [];

        $scope.$watch('rainGrid.data', function () {
            activate();
        });

        activate();

        // controller functions

        function activate() {
            buildGridOptions();
            $scope.gridOptions.data.then(
                function (dataList) {
                    initRainGrid(dataList);
                }
            )
        }

        function buildGridOptions() {
            $scope.gridOptions = {enablePage: true, pageSize: 10, selectable: false, showToolMenu: true};
            $scope.gridOptions = _.assign($scope.gridOptions, $scope.rainGrid);
            $scope.selectable = $scope.gridOptions.selectable;
            $scope.actionButtonPlace =0;
            if($scope.gridOptions.deleteLink && $scope.gridOptions.deleteLink.enable){
                $scope.showDeleteButton =true;
                $scope.actionButtonPlace =$scope.gridOptions.deleteLink.place||0;
            }
            $scope.showToolMenu = $scope.gridOptions.showToolMenu;
            $scope.title = $scope.gridOptions.title;
        }

        function initRainGrid(dataList) {
            $scope.gridOptions.dataList = dataList;
            $scope.gridData = getGridData($scope.gridOptions);
            initPage();
            initData($scope.gridData);
            rainGridService.modifyPaginationIcons();
            //cfpLoadingBar.complete();
        }

        function initPage() {
            $scope.enablePage = $scope.gridOptions.enablePage;
            $scope.currentPage = 1;
            $scope.maxSize = 2;
            $scope.pageSizes = [
                {label: ' 5', value: 5},
                {label: '10', value: 10},
                {label: '15', value: 15},
                {label: '20', value: 20}
            ];
            $scope.pageSize = $scope.pageSizes[1];
            if ($scope.gridOptions.pageSize) {
                var pageSize = _.find($scope.pageSizes, function (size) {
                    return size.value == $scope.gridOptions.pageSize;
                });
                if (pageSize) {
                    $scope.pageSize = pageSize;
                }
            }

        }

        $scope.filterData = function (filters) {
            _dataList = rainGridService.filterData(_dataRows, filters);

            _isFiltered = (filters.length > 0 && !!filters[0].col);
            if (_isFiltered) {
                _dataRowsFiltered = _dataList;
            }

            // after filtering, remove sorting and go to the first page
            $scope.rowCount = _dataList.length;
            $scope.enablePage = $scope.gridOptions.enablePage && ($scope.rowCount > $scope.pageSizes[0].value);
            $scope.sortField = null;
            $scope.sortOrder = null;
            $scope.currentPage = 1;
            getPageData(_dataList);
        };

        function initData(gridData) {

            $scope.currentPage = 1;
            _sortIndex = 0;
            _sortField = null;

            _dataRows = gridData.rows;

            $scope.header = gridData.header;
            $scope.rowCount = _dataRows.length;
            $scope.enablePage = $scope.gridOptions.enablePage && ($scope.rowCount > $scope.pageSizes[0].value);

            // _dataRows is original(neither sorted nor filtered), _dataList might be sorted and/or filtered;
            _dataList = _dataRows;
            getPageData(_dataList);
        }

        function getPageData(dataList) {
            if (!$scope.enablePage) {
                $scope.list = dataList;
                return $scope.list;
            }
            var pagedDataList = rainGridService.getDataListByPage(dataList, $scope.currentPage, $scope.pageSize.value);

            if (pagedDataList) {
                $scope.list = pagedDataList;
                angular.forEach($scope.list, function (row) {
                    if (row.rowSelected) {
                        if (row != $scope.selectedRow) {
                            row.rowSelected = false;
                        }
                    }
                })
            }
            return $scope.list;
        }

        // Building the header and rows
        function getGridData(gridOptions) {
            var gridList = rainGridService.buildGridData(gridOptions);
            if (gridList.rows.length > 0 && gridList.rows[0].rowSelected) {
                $scope.selectedRow = gridList.rows[0];
            }
            return gridList;
        }   // end of getGridData


        // page event handlers

        $scope.linkTo = function (row, funcEvent, funcIdField) {
            // execute the link function of this field
            var field = _.find(row, function (col) {
                return col.fieldName === funcIdField;
            });
            if (field) {
                var id = field.value;
                $rootScope.$broadcast(funcEvent, {id: id});
            }
        };

        $scope.pageSizeChanged = function (pageSize) {
            $scope.currentPage = 1;
            getPageData(_dataList);
        };

        $scope.pageChanged = function () {
            getPageData(_dataList);
        };

        $scope.sortingChanged = function (sortField) {
            if (_sortField !== sortField) {
                _sortIndex = 1;
            } else {
                _sortIndex = _sortIndex + 1;
                if (_sortIndex > 2) {
                    _sortIndex = 0;
                }
            }
            _sortField = sortField;
            $scope.sortField = sortField;
            $scope.sortOrder = _sortings[_sortIndex];

            var rows = _isFiltered ? _dataRowsFiltered : _dataRows;
            _dataList = rainGridService.sortData(rows, _sortings, _sortField, _sortIndex);
            getPageData(_dataList);
        };

        $scope.selectRow = function (row) {
            if (!$scope.selectable) {
                return;
            }
            var isSelected = row.rowSelected;
            angular.forEach($scope.list, function (row) {
                row.rowSelected = false;
            });
            row.rowSelected = !isSelected;
            if (row.rowSelected) {
                $scope.selectedRow = row;
            }
            if (row.rowSelected && $scope.gridOptions.rowSelectedEvent) {
                var funcEvent = $scope.gridOptions.rowSelectedEvent.funcEvent;
                $rootScope.$broadcast(funcEvent, {id: row.id});
            }
        };


    }   // end of controller

})();