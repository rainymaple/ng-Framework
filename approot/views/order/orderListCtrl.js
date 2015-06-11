(function () {

    var module = angular.module('app-framework');

    module.controller('orderListCtrl', ['$scope', 'rainService.repository', 'dbEntityConfig', orderListCtrl]);

    var _rowSelectedEvent='orderListCtrl.rowSelected';

    function orderListCtrl($scope, repositoryService, dbEntityConfig) {
        var vm = this;
        vm.selectedRow = false;
        vm.showDetail = true;

        activate();

        // controller functions

        function activate() {
            vm.gridOptions = setGridOptions();
            vm.gridOptions.data = repositoryService.getDataList(dbEntityConfig.entities.order);
            vm.gridOptions.data.then(function (data) {
                if (data.length > 0) {
                    vm.orderId = data[0].OrderID;
                }
            })
        }

        $scope.$on(_rowSelectedEvent, function (event, data) {
            var id = data.id;
            vm.orderId = id;
            vm.selectedRow = true;
        })


    }


    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            enablePage: true,
            idField: 'OrderID',
            pageSize: 5,
            title: 'Order List',
            selectable: true,
            selectFirstRow: false,
            rowSelectedEvent: {funcEvent:_rowSelectedEvent,funcIdField:'OrderID'}
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'OrderID',
                displayName: 'Id'
            }, {
                field: 'CustomerID',
                displayName: 'Customer'
            }, {
                field: 'OrderDate',
                displayName: 'Order Date',
                isDate: true
            }, {
                field: 'RequiredDate',
                displayName: 'Required Date',
                isDate: true
            }, {
                field: 'ShippedDate',
                displayName: 'Shipped Date',
                isDate: true
            }, {
                field: 'Freight',
                displayName: 'Freight',
                isNumber: true,
                decimal: 2
            }, {
                field: 'ShipName',
                displayName: 'ShipName'
            }, {
                field: 'ShipCountry',
                displayName: 'Ship Country'
            }
        ];
    }
})();
