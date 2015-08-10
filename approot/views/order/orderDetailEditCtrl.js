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

        $scope.orderNotFound = !_orderId;
        $scope.orderId = !_orderId ? 0 : _orderId;
        $scope.showDelete = true;
        $scope.showEdit = true;
    }

})();
