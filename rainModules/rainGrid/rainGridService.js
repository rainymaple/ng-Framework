(function () {
    angular.module('rainGrid').factory('rainGridService',
        ['$parse', '$modal', 'rainGridConfig', rainGridService]);

    function rainGridService($parse, $modal, rainGridConfig) {
        var baseUrl = rainGridConfig.baseUrl;
        return {
            baseUrl: baseUrl,
            rainGridLinkFunc: rainGridLinkFunc,
            modifyPaginationIcons: modifyPaginationIcons,
            getDataListByPage: getDataListByPage,
            buildGridData: buildGridData,
            sortData: sortData,
            showFilterModal: showFilterModal,
            getFilterConstraintsByColumnType: getFilterConstraintsByColumnType,
            filterData: filterData
        };

        // Service Functions

        function rainGridLinkFunc(params, linkFunctions) {
            var field = _.find(params.row, function (col) {
                return col.fieldName === params.funcIdField;
            });
            if (field) {
                var id = field.value;
                var func = params.funcName + '(' + id + ')';
                var parseFunc = $parse(func);
                parseFunc(linkFunctions);
            }
        }

        function getDataListByPage(dataList, page, pageSize) {
            // page starts with 1
            if (!dataList || page <= 0) {
                return null;
            }
            try {
                //dataList = sortData(dataList);

                var start = (page - 1) * pageSize;
                var pagedData = _.slice(dataList, start, start + pageSize);
                if (!pagedData) {
                    return null;
                }
                return pagedData;
            } catch (e) {
                console.log(e.message);
                return null;
            }
        }   // end of getDataListByPage

        function buildHeader(columnDefs) {
            var row = [];
            angular.forEach(columnDefs, function (col) {
                row.push({
                    fieldName: col.field,
                    displayName: col.displayName,
                    isHidden: col.isHidden
                });
            });
            return row;
        }   // end of buildHeader

        function buildGridData(gridOptions) {
            var list = gridOptions.dataList;
            var columnDefs = gridOptions.columnDefs;
            var idField = null;
            var id = null;


            var gridList = {rows: [], header: buildHeader(columnDefs)};
            if (list.length == 0) {
                return gridList;
            }
            gridList.rows = _.map(list, function (rowData) {
                var row = [];
                if (!columnDefs) {
                    for (var property in rowData) {
                        if (rowData.hasOwnProperty(property)) {
                            row.push(
                                {
                                    fieldName: property,
                                    value: rowData[property],
                                    displayName: property
                                });
                        }
                    }
                } else {
                    idField = gridOptions.idField;
                    if (idField) {
                        id = rowData[gridOptions.idField];
                    }
                    for (var i = 0; i < columnDefs.length; i++) {
                        var col = columnDefs[i];
                        row.push({
                            id: rowData[gridOptions.idField],
                            fieldName: col.field,
                            value: rowData[col.field] || col.field,
                            displayName: col.displayName,
                            isCheckbox: col.isCheckbox,
                            isCurrency: col.isCurrency,
                            isNumber: col.isNumber,
                            decimal: col.decimal,
                            isLink: col.isLink,
                            isButton: col.isButton,
                            isIcon: col.isIcon,
                            isDate: col.isDate,
                            isHidden: col.isHidden || false,
                            linkFunc: col.linkFunc || {funcName: '', funcIdField: ''},
                            order: i
                        });
                    }
                }
                return {rowData: row, rowSelected: false, idField: idField, id: id};
            });
            if (gridOptions.selectFirstRow && gridList.rows.length > 0) {
                gridList.rows[0].rowSelected = true;
            }

            return gridList;
        }   // end of buildGridData

        // Sorting
        function sortData(dataList, sortings, sortField, sortIndex) {
            var sortOrder = sortings[sortIndex];
            if (!sortField || !sortOrder) {
                return dataList;
            }
            var sortedData = _.sortBy(dataList, function (row) {
                var rowData = row.rowData;
                var sortedValue = null;
                for (var i = 0; i < rowData.length; i++) {
                    if (rowData[i].fieldName === sortField) {
                        sortedValue = rowData[i].value;
                        return sortedValue;
                    }
                }
            });
            return sortOrder === sortings[1] ? sortedData : sortedData.reverse();
        }   // end of sortData

        function modifyPaginationIcons() {
            $('ul.pagination a:contains("<<"):first').html("<i class='fa fa-angle-double-left page-arrow'></i>");
            $('ul.pagination a:contains(">>"):first').html("<i class='fa fa-angle-double-right page-arrow'></i>");
            $('ul.pagination a:contains("<"):first').html("<i class='fa fa-angle-left page-arrow'></i>");
            $('ul.pagination a:contains(">"):first').html("<i class='fa fa-angle-right page-arrow'></i>");
        }

        // Filtering
        function showFilterModal(gridOptions, filters) {
            var modalInstance = $modal.open({
                templateUrl: baseUrl + 'rainGridFilterModal/rainGridFilterModalTemplate.html',
                controller: 'rainGrid.filterModal.controller',
                resolve: {
                    columnDefs: function () {
                        return gridOptions.columnDefs;
                    },
                    filters: function () {
                        return filters;
                    }
                }
            });

            return modalInstance.result;
            /*modalInstance.result.then(function (obj) {
             // return value from $modalInstance.close(obj)
             }, function () {
             });*/
        }   // end of showFilterModal

        function getFilterConstraintsByColumnType(col) {
            var constraints = [];
            var type = 'text';
            if (col.isNumber || col.isCurrency) {
                type = 'number';
            } else if (col.isBoolean) {
                type = 'bool';
            } else if (col.isDate) {
                type = 'date';
            }
            switch (type) {
                case 'number':
                    constraints = [
                        {label: 'equal to', value: 'equalTo'},
                        {label: 'greater than', value: 'greaterThan'},
                        {label: 'less than', value: 'lessThan'}
                    ];
                    break;
                case 'bool':
                    constraints = [
                        {label: 'equal to', value: 'equalTo'}
                    ];
                    break;
                case 'date':
                    constraints = [
                        {label: 'equal to', value: 'equalTo'},
                        {label: 'greater than', value: 'greaterThan'},
                        {label: 'less than', value: 'lessThan'}
                    ];
                    break;
                default :
                    constraints = [
                        {label: 'equal to', value: 'equalTo'},
                        {label: 'greater than', value: 'greaterThan'},
                        {label: 'less than', value: 'lessThan'},
                        {label: 'contains', value: 'contains'},
                        {label: 'starts with', value: 'startsWith'}
                    ];
            }
            return constraints;
        }   // end of getFilterConstraintsByColumnType

        function filterData(_dataRows, filters) {

            var _dataList = [];

            // if there's not filter, just return the original data list
            if (filters.length === 0 || !filters[0].col) {
                _dataList = _dataRows;
                return _dataList;
            }

            _dataList = _.filter(_dataRows, function (row) {
                var rowData = row.rowData;
                var condition = true;
                for (var i = 0; i < rowData.length; i++) {
                    var column = rowData[i];
                    for (var j = 0; j < filters.length; j++) {
                        var filter = filters[j];
                        var filteredField = filter.col.value;
                        var filterConstraint = filter.constraint.value;
                        var filterExpression = filter.expression;
                        if (column.fieldName === filteredField) {
                            switch (filterConstraint) {
                                case 'equalTo':
                                    condition = condition && column.value == filterExpression;
                                    break;
                                case 'greaterThan':
                                    condition = condition && column.value > filterExpression;
                                    break;
                                case 'lessThan':
                                    condition = condition && column.value < filterExpression;
                                    break;
                                case 'contains':
                                    condition = condition && column.value.indexOf(filterExpression) >= 0;
                                    break;
                                case 'startsWith':
                                    condition = condition && column.value.indexOf(filterExpression) === 0;
                                    break;
                            }
                            if (!condition) {
                                break;
                            }
                        }
                    }
                    if (!condition) {
                        break;
                    }
                }
                return condition;
            });

            return _dataList;
        }   // end of filterData
    }
})();
