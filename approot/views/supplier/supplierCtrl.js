(function () {

    var module = angular.module('app-framework');

    module.controller('supplierCtrl', ['$scope','rainService.repository', 'dbEntityConfig', supplierCtrl]);

    function supplierCtrl($scope,repositoryService, dbEntityConfig) {

        activate();

        // controller functions

        function activate() {
            $scope.gridOptions = setGridOptions();
            $scope.gridOptions.data = repositoryService.getDataList(dbEntityConfig.entities.supplier);
        }

    }

    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            //pageSize: 20,
            idField: 'SupplierID'
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'SupplierID',
                displayName: 'Id'
            }, {
                field: 'CompanyName',
                displayName: 'Company',
                isDetailLink: false
            },
            {
                field: 'ContactName',
                displayName: 'Contact Name'
            },
            {
                field: 'ContactTitle',
                displayName: 'Contact Title'
            },
            {
                field: 'Country',
                displayName: 'Country'
            },
            {
                field: 'Phone',
                displayName: 'Phone'
            },
            {
                field: 'Fax',
                displayName: 'Fax'
            }
        ];
    }

})();
