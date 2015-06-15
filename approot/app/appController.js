(function () {
    var module = angular.module('app-framework');

    module.controller('appController', [
        '$scope'
        , 'appConfig'
        , '$state'
        , '$location'
        , 'rainService.currentUser'
        , appController]);

    function appController($scope, appConfig, $state, $location, currentUser) {

        var _authorizedState = 'authorized';
        var _unauthorizedState = 'unauthorized';

        if (currentUser.profile.loggedIn) {
            $scope.loginState = _authorizedState;
        } else {
            $scope.loginState = _unauthorizedState;
            $location.path('/');
        }
        //

        var _homeState = 'home';
        var _requestedPath = null;

        // rainFramework attributes
        $scope.router = appConfig.router;
        $scope.headerTitle = "ng-Northwind";
        $scope.headerSubTitle = "with Responsive Design";
        $scope.username = currentUser.profile.username;

        $scope.$on('rain-menu-item-selected-event', function (event, data) {
            if (!data && !data.route) {
                return;
            }
            var routeName = data.route;
            try {
                $state.go(routeName);
            } catch (e) {

            }
        });

        // from rainService.loginRedirect
        $scope.$on('AUTHENTICATION_EVENT', function (event, data) {
            if (!data || !data.statusCode) {
                return;
            }
            if (data.statusCode === 200) {
                $scope.loginState = _authorizedState;
                if (!_requestedPath) {
                    $state.go(_homeState);
                } else {
                    $location.path(_requestedPath);
                    _requestedPath = null;
                }
            } else {
                if (data.statusCode === 401){
                    $location.path('/');
                }
                $scope.loginState = _unauthorizedState;
                // if authentication failed, redirect to login with the previous requested url
                if (data.requestedPath) {
                    // e.g. '/account/user'
                    _requestedPath = data.requestedPath;
                }
            }
        });

/*        $scope.$watch('loginState', function (newValue, oldValue) {
            if (newValue !== _authorizedState) {
                $location.path('/');
            }
        })*/
    }
})();
