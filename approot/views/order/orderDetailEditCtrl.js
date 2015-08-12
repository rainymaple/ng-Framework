(function () {
    var module = angular.module('app-framework');

    module.controller('orderDetailEditCtrl', [
        '$scope'
        , '$q'
        , '$stateParams'
        , 'rainService.repository'
        , 'dbEntityConfig'
        , 'commonService'
        , orderDetailEditCtrl]);

    function orderDetailEditCtrl($scope, $q, $stateParams, repositoryService, dbEntityConfig, commonService) {

        var _orderId = $stateParams.orderId;
        var _entityOrderDetail = dbEntityConfig.entities.editOrderDetail;
        var _message = commonService.showMessage;

        $scope.eventEdit = 'orderDetailEditCtrl.eventEdit';
        $scope.orderNotFound = !_orderId;
        $scope.orderId = !_orderId ? 0 : _orderId;
        $scope.orderDetail = {};
        $scope.showDelete = true;
        $scope.showEdit = true;
        $scope.refresh = 1;
        $scope.saveOrderDetail = saveOrderDetail;
        $scope.newOrderDetail = newOrderDetail;

        activate();

        // controller functions

        function activate() {
            $q.all(getLookupDataPromises()).then(function () {
                setEvents();
            });

        }

        function setEvents() {
            $scope.$on($scope.eventEdit, function (event, data) {
                if (!data || !data.id) {
                    return;
                }
                var id = data.id;
                getOrderDetail(id);
            });
        }

        function getLookupDataPromises() {
            var p1 = repositoryService.getDataList(dbEntityConfig.entities.product)
                .then(function (data) {
                    $scope.products = data;
                });
            return [p1];
        }

        function getOrderDetail(orderDetailId) {
            var isEdit = !!orderDetailId;
            $scope.isEditMode = isEdit;
            //$scope.title = isEdit ? "Edit Order" : "Add Order";
            if (isEdit) {
                repositoryService.getDataById(_entityOrderDetail, orderDetailId).then(function (data) {
                    if (!data || data.length === 0) {
                        return;
                    }
                    var orderDetail = data[0];
                    var product = _.find($scope.products, function (e) {
                        return e.ProductID === orderDetail.ProductID;
                    });

                    $scope.orderDetail = {
                        orderId: orderDetail.OrderID,
                        product: product,
                        productId: orderDetail.ProductID,
                        productName: orderDetail.ProductName,
                        unitPrice: orderDetail.UnitPrice,
                        quantity: orderDetail.Quantity,
                        discount: orderDetail.Discount,
                        detailID: orderDetail.DetailID
                    }
                });
            }
        }

        function saveOrderDetail(formOrderDetail) {
            if (!formOrderDetail || formOrderDetail.$invalid) {
                _message.warning('Please fix the validation error');
                return;
            }

            var orderDetail = {
                "OrderID": _orderId,
                "ProductID": $scope.orderDetail.product.ProductID,
                "ProductName": $scope.orderDetail.product.ProductName,
                "UnitPrice": $scope.orderDetail.unitPrice,
                "Quantity": $scope.orderDetail.quantity,
                "Discount": $scope.orderDetail.discount,
                "DetailID": $scope.orderDetail.detailID
            };
            /**/

            repositoryService.addOrUpdateData(_entityOrderDetail, orderDetail)
                .then(function (data) {
                    if (data.error) {
                        _message.warning(data.error.message);
                    } else {
                        _orderId = data.OrderID;
                        // refresh the "orderDetailListDir" directive
                        $scope.refresh++;
                        $scope.orderId = _orderId;
                        newOrderDetail();
                        _message.success("Saved Successfully");
                    }
                },
                function (data, status, headers, config) {
                    //logService.logError(data);
                });
        }

        function newOrderDetail() {
            $scope.orderDetail = {};
            $scope.formOrderDetail.$setPristine();
            $scope.isEditMode = false;
        }
    }

})();
