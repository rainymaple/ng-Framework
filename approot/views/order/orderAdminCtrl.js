(function () {
    var module = angular.module('app-framework');

    module.controller('orderAdminCtrl', [
        '$scope'
        , '$state'
        , '$stateParams'
        , orderAdminCtrl]);

    function orderAdminCtrl($scope, $state, $stateParams) {

        var _orderId = $stateParams.orderId;
        if (!_orderId && $state.data) {
            _orderId = $state.data.orderId;
        }

        $scope.orderActive = true;


        $scope.gotoOrder = gotoOrder;
        $scope.gotoOrderDetail = gotoOrderDetail;

        ////

        function gotoOrder() {
            $scope.orderDetailActive = false;
            $scope.orderActive = true;
            $state.go('order.orderEdit', _orderId)
        }

        function gotoOrderDetail() {
            $scope.orderActive = false;
            $scope.orderDetailActive = true;
            $state.go('order.orderDetailEdit', _orderId)
        }


    }

})();
