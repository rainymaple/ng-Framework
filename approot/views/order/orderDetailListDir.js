(function () {

    var module = angular.module('app-framework');

    module.directive('orderDetailListDir', ['rainService.repository', 'dbEntityConfig',
        'commonService', orderDetailListDir]);

    var _productDetailEvent = 'orderDetailListDir.productDetail';

    function orderDetailListDir(repositoryService, dbEntityConfig, commonService) {
        return {
            restrict: 'AE',
            templateUrl: 'approot/views/order/orderDetailListDir.html',
            replace: false,
            scope: {
                orderId: '='
            },
            controller: ['$scope', controller]

        };

        function controller($scope) {
            $scope.gridOptions = setGridOptions();

            getProducts();

            $scope.$watch('orderId', function () {
                getProducts();
            });

            function getProducts() {
                if ($scope.orderId === undefined) {
                    $scope.orderId = 0;
                }
                $scope.gridOptions.data = repositoryService.getDataById(
                    dbEntityConfig.entities.orderDetails, $scope.orderId);
            }


            $scope.$on(_productDetailEvent, function (event, data) {
                if (!data || !data.id) {
                    return;
                }
                var id = data.id;
                commonService.showProductModal(id);
            });

        }   // controller

    }


    function setGridOptions() {
        return {
            columnDefs: getColumnDefs(),
            pageSize: 5,
            idField: 'OrderID',
            title: 'Order Details'
        };
    }

    function getColumnDefs() {
        return [
            {
                field: 'OrderID',
                displayName: 'Id'
            }, {
                field: 'ProductID',
                displayName: 'ProductID',
                isHidden: true
            }, {
                field: 'ProductName',
                displayName: 'Product Name',
                isLink: true,
                linkFunc: {
                    funcIdField: 'ProductID',
                    funcEvent: _productDetailEvent
                }
            },
            {
                field: 'UnitPrice',
                displayName: 'Unit Price',
                isCurrency: true
            },
            {
                field: 'Quantity',
                displayName: 'Quantity',
                isNumber: true
            },
            {
                field: 'Discount',
                displayName: 'Discount',
                isNumber: true,
                decimal: 2
            }
        ];
    }
})();