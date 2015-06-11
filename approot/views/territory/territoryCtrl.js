(function () {

    var module = angular.module('app-framework');

    module.controller('territoryCtrl', ['rainService.repository', 'dbEntityConfig', territoryCtrl]);

    function territoryCtrl(repositoryService, dbEntityConfig) {
        var vm = this;

        activate();

        // Controller Functions

        function activate() {
            vm.gridOptions = setGridOptions();
            vm.gridOptions.data = repositoryService.getDataList(dbEntityConfig.entities.territory);
        }

    }

    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            idField: 'TerritoryID'
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'TerritoryID',
                displayName: 'Id'
            }, {
                field: 'TerritoryDescription',
                displayName: 'Description'
            }
        ];
    }

})();
