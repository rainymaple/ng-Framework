(function () {

    var module = angular.module('app-framework');

    module.factory('commonService', [
        'appConfig'
        , 'rainService.dialog'
        , commonService]);

    function commonService(appConfig, dialogService) {
        return {
            showProductModal: showProductModal,
            showMessage: showMessage()

        };

        //-- Service Functions --/

        //showProductModal

        function showProductModal(productId) {

            var titleMarkup = '<div style="display:inline-block;margin-left: 10px;' +
                'font-size: 16px;font-weight: bold;">' + 'Product Detail</div>';
            var modalMarkup = '<product-modal product-id="' + productId + '"></product-modal>';

            dialogService.messageModal(titleMarkup, modalMarkup);
        }

        // showMessage

        function showMessage() {
            return {
                info: function (msg) {
                    showMsg(msg, 'info')
                },
                warning: function (msg) {
                    showMsg(msg, 'warning')
                },
                success: function (msg) {
                    showMsg(msg, 'success')
                },
                error: function (msg) {
                    showMsg(msg, 'error')
                }
            };

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
        }


    }
})();
