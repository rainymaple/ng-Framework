/*
* usage:
* var modalInstance = confirmModal.getModalInstance('Confirm','Are you sure?');
* modalInstance.result.then(function (ok) { ... })
* */

(function () {

    angular.module('rainService').factory('rainService.confirm', ['$modal', rainConfirm]);

    function rainConfirm($modal) {

        return {
            getModalInstance: getModalInstance

        };

        function getModalInstance(title, message) {

            title = title || 'Confirm';
            message = message || 'Are you sure?';

            return $modal.open({
                //templateUrl: 'deleteUserModal.html',
                //size:'sm',
                template: getTemplate(title, message),
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        $modalInstance.close(true)
                    };
                    $scope.cancel = function () {
                        $modalInstance.close(false)
                    };
                }
            });
        }

        function getTemplate(title, message) {
            return '<div class="modal-header">'
                + '<h3 class="modal-title">' + title + '</h3>'
                + '</div>'
                + '<div class="modal-body">'
                + '<p style="font-size: 16px;">' + message + '</p>'
                + '</div>'
                + '<div class="modal-footer">'
                + '<button class="btn btn-primary" ng-click="ok()">Yes</button>'
                + '<button class="btn btn-warning" ng-click="cancel()">No</button>'
                + '</div>';
        }
    }
})();