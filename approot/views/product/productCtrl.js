(function () {

    var module = angular.module('app-framework');

    module.controller('productCtrl', ['$scope', 'rainService.repository', 'dbEntityConfig','commonService', productCtrl]);

    var _eventGetProductDetail = 'productCtrl.productDetail';

    function productCtrl($scope, repositoryService, dbEntityConfig, commonService) {
        var vm = this;

        activate();

        // controller functions

        function activate() {
            vm.gridOptions = setGridOptions();
            vm.gridOptions.data = repositoryService.getDataList(dbEntityConfig.entities.product);
        }

        $scope.$on(_eventGetProductDetail, function (event, data) {
            var id = data.id;
            showProductModal(id);
        });

        function showProductModal(id) {
            var modalInstance = commonService.showProductModal(id);
            modalInstance.then(function () {
            });
        }
    }


    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            idField: 'ProductID'
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'ProductID',
                displayName: 'Id'
            }, {
                field: 'ProductName',
                displayName: 'Name',
                isLink: true,
                linkFunc: {funcEvent: _eventGetProductDetail, funcIdField: 'ProductID'}
            },
            {
                field: 'QuantityPerUnit',
                displayName: 'Quantity Per Unit'
            },
            {
                field: 'UnitPrice',
                displayName: 'Unit Price',
                isCurrency: true
            },
            {
                field: 'UnitsInStock',
                displayName: 'Units In Stock',
                isNumber: true
            },
            {
                field: 'UnitsOnOrder',
                displayName: 'Units On Order',
                isNumber: true
            },
            {
                field: 'ReorderLevel',
                displayName: 'Reorder Level',
                isNumber: true
            },
            {
                field: 'Discontinued',
                displayName: 'Discontinued',
                isCheckbox: true
            }
        ];
    }

})();
