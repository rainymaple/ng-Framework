(function () {

    var module = angular.module('app-framework');

    module.controller('categoryCtrl', ['$scope', 'rainService.repository', 'dbEntityConfig', categoryCtrl]);

    var _rowSelectedEvent = 'categoryCtrl.rowSelectedEvent';

    function categoryCtrl($scope, repositoryService, dbEntityConfig) {
        var vm = this;

        activate();

        // controller functions

        function activate() {
            vm.gridOptions = setGridOptions();
            vm.gridOptions.data = repositoryService.getDataList(dbEntityConfig.entities.category);
            vm.gridOptions.data.then(function (data) {
                if (data.length > 0) {
                    vm.categoryId = data[0].CategoryID;
                }
            })
        }

        $scope.$on(_rowSelectedEvent, function (event, data) {
            vm.categoryId = data.id;
        });
    }


    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            enablePage: true,
            idField: 'CategoryID',
            pageSize: 5,
            selectable: true,
            selectFirstRow: true,
            rowSelectedEvent: {funcEvent: _rowSelectedEvent}
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'CategoryID',
                displayName: 'Id'
            }, {
                field: 'CategoryName',
                displayName: 'Name'
            }, {
                field: 'Description',
                displayName: 'Description'
            }
        ];
    }
})();
