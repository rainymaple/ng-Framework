(function () {
    var module = angular.module('app-framework');

    module.controller('loginController', ['$scope', 'rainService.oauth', 'rainService.loginRedirect',
        loginController]);

    function loginController($scope, oauth, loginRedirect) {

        $scope.username = '';
        $scope.password = '';

        var loginError = 'The user name or password is incorrect';

        activate();

        // controller functions

        // --- appCtrl handles 'SetAuthentication' event to toggle some features

        function activate() {
            oauth.logout();
            $scope.$emit('SetAuthentication', false);
        }

        $scope.login = function (loginForm) {
            if (loginForm && loginForm.$invalid) {
                // client side validation shows error messages
                return;
            }
            oauth.login(config.loginEndpoint, $scope.username, $scope.password)
                .then(function (response) {
                    if (response) {
                        $scope.$emit('SetAuthentication', response);
                        if (response.status !== 200) {
                            var message = response.statusText || loginError;
                            toastr.error(message);
                        } else {
                            loginRedirect.redirectPostLogin();
                        }
                    }
                }, function (response) {
                })
        };
    }
})();