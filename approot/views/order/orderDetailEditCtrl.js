(function () {
    var module = angular.module('app-framework');

    module.controller('orderDetailEditCtrl', [
        '$scope'
        , '$state'
        , '$stateParams'
        , 'rainService.repository'
        , 'dbEntityConfig'
        , orderDetailEditCtrl]);

    function orderDetailEditCtrl($scope, $state, $stateParams, repositoryService, dbEntityConfig) {
        var _orderId = $stateParams.orderId;
        if (!_orderId && $state.$current.parent.data) {
            _orderId = $state.$current.parent.data.orderId;
            if(_orderId) {
                $state.go('order.orderDetailEdit', parseInt(_orderId));
            }
        }

        $scope.orderNotFound=!_orderId;

    }

})();
