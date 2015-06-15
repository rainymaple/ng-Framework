(function () {
    var module = angular.module('app-framework');

    module.controller('loginController', [
        '$scope'
        , '$stateParams'
        , 'rainService.oauth'
        , 'commonService'
        , 'appConfig'
        , loginController]);

    function loginController($scope, $stateParams, oauth, commonService, appConfig) {

        var _message = commonService.showMessage;

        $scope.username = '';
        $scope.password = '';

        var loginError = 'The user name or password is incorrect';

        activate();

        // controller functions

        // --- appCtrl handles 'SetAuthentication' event to toggle some features

        function activate() {
            oauth.logout();
            //$scope.$emit('AUTHENTICATION_EVENT', {statusCode: 401});
        }

        $scope.login = function (loginForm) {
            if (loginForm && loginForm.$invalid) {
                // client side validation shows error messages
                return;
            }
            oauth.login(appConfig.loginEndpoint, $scope.username, $scope.password)
                .then(function (response) {
                    if (response) {
                        $scope.$emit('AUTHENTICATION_EVENT', {statusCode: response.status});
                        if (response.status !== 200) {
                            var message = response.statusText || loginError;
                            _message.error(message);
                        }
                    }
                }, function (response) {
                })
        };
    }
})();