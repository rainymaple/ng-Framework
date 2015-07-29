(function () {

    var module = angular.module('app-framework');

    module.directive('productModal', [
        'rainService.repository'
        , 'dbEntityConfig'
        , productModal]);

    function productModal(repositoryService, dbEntityConfig) {
        return {
            restrict: 'AE',
            scope: {
                productId: '='
            },
            templateUrl: 'approot/views/product/productModalTemplate.html',
            controller: ['$scope', controller]
        };

        function controller($scope) {
            repositoryService.getDataById(dbEntityConfig.entities.product, $scope.productId).then(function (data) {
                $scope.product = data[0];
            });
        }
    }
})();