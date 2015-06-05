(function () {
    var module = angular.module('rain.Service');

    // -- service: addToken -- //

    module.factory('rain.service.addToken', ['$q', 'currentUser', addToken]);

    function addToken($q, currentUser) {

        var request = function (config) {
            if (currentUser.profile.loggedIn) {
                config.headers.Authorization = 'Bearer ' + currentUser.profile.token;
            }
            return $q.when(config);
        };
        return {
            request: request
        }
    }

    // -- service: loginRedirect -- //

    module.factory('rain.service.loginRedirect', ['$q', '$injector', '$location', loginRedirect]);

    function loginRedirect($q, $rootScope, $location) {

        var responseError = function (response) {
            if (response.status == 401 || response.status == 403) {

                // controller of application level should handle this event
                $rootScope.$broadcast('AUTHENTICATION_EVENT', {
                    // show error message according to the status code
                    status: response.status,
                    // can be redirected to this path after authenticated
                    requestedPath: $location.path()
                });
            }
            return $q.reject(response);
        };

        // Interceptors convention, return a 'responseError' property
        return {
            responseError: responseError
        }
    }



    // -- interceptors --//
    // about interceptor -- https://docs.angularjs.org/api/ng/service/$http

    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push('rain.service.addToken');
    });
    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push('rain.service.loginRedirect');
    });
})();
