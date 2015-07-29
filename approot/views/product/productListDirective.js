(function () {

    var module = angular.module('app-framework');

    var _eventGetProductDetail = 'productListDir.productDetail';

    module.directive('productListDir', ['rainService.repository', 'dbEntityConfig', 'commonService', productListDir]);

    function productListDir(repositoryService, dbEntityConfig, commonService) {
        return {
            restrict: 'AE',
            templateUrl: 'approot/Views/Product/productListTemplate.html',
            replace: false,
            scope: {
                categoryId: '='
            },
            controller: ['$scope',controller]

        };

        function controller($scope) {
            $scope.gridOptions = setGridOptions();

            getProducts();

            $scope.$watch('categoryId', function () {
                getProducts();
            });

            function getProducts() {
                if ($scope.categoryId === undefined) {
                    $scope.categoryId = 0;
                }
                $scope.gridOptions.data = repositoryService.getDataById(
                    dbEntityConfig.entities.productByCategoryId, $scope.categoryId);
            }

            $scope.$on(_eventGetProductDetail, function (event, data) {
                if(!data||!data.id){
                    return;
                }
                commonService.showProductModal(data.id);
            });

        }   // controller

    }


    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            pageSize: 5,
            idField: 'ProductID',
            title: 'Products'
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