(function () {

    var module = angular.module('app-framework');

    module.directive('orderDetailListDir', [
        'rainService.repository'
        , 'dbEntityConfig'
        , 'commonService'
        , 'rainService.dialog'
        , orderDetailListDir]);

    var _productDetailEvent = 'orderDetailListDir.productDetail';
    var _eventDeleteProduct = 'orderDetailListDir.deleteProduct';

    function orderDetailListDir(repositoryService, dbEntityConfig, commonService, dialogService) {
        return {
            restrict: 'AE',
            templateUrl: 'approot/views/order/orderDetailListDir.html',
            replace: false,
            scope: {
                orderId: '=',
                showDelete: '=',
                showEdit: '='
            },
            controller: ['$scope', controller]

        };

        function controller($scope) {

            var _message = commonService.showMessage;
            var _entityOrderDetail = dbEntityConfig.entities.orderDetails;
            var _entityDeleteOrderDetail = dbEntityConfig.entities.deleteOrderDetail;

            $scope.gridOptions = setGridOptions($scope.showDelete, $scope.showEdit);

            getProducts();

            $scope.$watch('orderId', function () {
                getProducts();
            });

            function getProducts() {
                if ($scope.orderId === undefined) {
                    $scope.orderId = 0;
                }
                $scope.gridOptions.data = repositoryService.getDataById(
                    _entityOrderDetail, $scope.orderId);
            }


            $scope.$on(_productDetailEvent, function (event, data) {
                if (!data || !data.id) {
                    return;
                }
                var id = data.id;
                commonService.showProductModal(id);
            });

            $scope.$on(_eventDeleteProduct, function (event, data) {
                if (!data || !data.id) {
                    return;
                }
                var id = data.id;
                deleteProduct(id);
            });

            function deleteProduct(id) {

                dialogService.confirmModal('Delete', 'Are you sure you want to delete this product?', delete_product);

                function delete_product() {
                    repositoryService.deleteDataById(_entityDeleteOrderDetail, id).then(function (data) {
                        if (data) {
                            _message.success("Delete Successful");
                            getProducts();
                        }
                    }, function (data, status, headers, config) {
                        //logService.logError(data);
                    });
                }

            }

        }   // controller

    }


    function setGridOptions(showDelete, showEdit) {
        return {
            columnDefs: getColumnDefs(showDelete, showEdit),
            pageSize: 5,
            idField: 'OrderID',
            title: 'Order Details',
            deleteLink: {
                enable: true,
                funcEvent: _eventDeleteProduct,
                funcIdField: 'DetailID',
                place:3
            }
        };
    }

    function getColumnDefs(showDelete, showEdit) {
        return [
            {
                field: 'OrderID',
                displayName: 'Id',
                isHidden: true
            },
            {
                field: 'DetailID',
                displayName: 'DetailID',
                isHidden: true
            },
            {
                field: 'ProductID',
                displayName: 'ProductID',
                isHidden: true
            },
            {
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
            /*,
            {
                field: 'fa fa-times',
                //displayName: 'Delete',
                isIcon: true,
                isHidden: !showDelete,
                linkFunc: {funcEvent: _eventDeleteProduct, funcIdField: 'DetailID'}
            },
            {
                field: 'fa fa-pencil-square-o',
                displayName: '',
                isIcon: true,
                isHidden: !showEdit,
                linkFunc: {funcEvent: _eventDeleteProduct, funcIdField: 'DetailID'}
            }*/
        ];
    }
})();