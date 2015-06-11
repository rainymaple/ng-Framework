(function () {

    var module = angular.module('app-framework');

    module.factory('commonService', ['$modal', commonService]);

    function commonService($modal) {
        return {
            showProductModal: showProductModal
        };

        // Service Functions

        function showProductModal(productId) {
            var modalInstance = $modal.open({
                templateUrl: 'approot/views/product/productModal.html',
                controller: 'productModalCtrl',
                resolve: {
                    productId: function () {
                        return productId;
                    }
                }
            });

            return modalInstance.result;
            /*modalInstance.result.then(function (obj) {
             // return value from $modalInstance.close(obj)
             }, function () {
             });*/
        }

    }
})();
