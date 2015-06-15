(function () {

    var module = angular.module('app-framework');

    module.factory('commonService', ['$modal', 'appConfig', commonService]);

    function commonService($modal, appConfig) {
        return {
            showProductModal: showProductModal,
            showMessage: {
                warning: warning,
                success: success,
                error: error,
                info:info
            }
        };

        //-- Service Functions --/

        //showProductModal

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

            /*modalInstance.then(function (obj) {
             // return value from $modalInstance.close(obj)
             }, function () {
             });*/
        }

        // showMessage

        function showMsg(msg, tool) {
            if (appConfig.messageConfig.toastr) {
                toastr.options.closeButton = true;
                toastr.options.progressBar = true;
                switch (tool) {
                    case 'error':
                        toastr.error(msg);
                        break;
                    case 'success':
                        toastr.success(msg);
                        break;
                    case 'warning':
                        toastr.warning(msg);
                        break;
                    default :
                        toastr.info(msg);
                        break;
                }

            } else if (appConfig.messageConfig.alert) {
                alert(msg);
            }
            if (appConfig.messageConfig.consoleLog) {
                console.log(msg);
            }
        }

        function info(msg) {
            showMsg(msg, 'info')
        }

        function warning(msg) {
            showMsg(msg, 'warning')
        }

        function success(msg) {
            showMsg(msg, 'success')
        }

        function error(msg) {
            showMsg(msg, 'error')
        }

    }
})();
