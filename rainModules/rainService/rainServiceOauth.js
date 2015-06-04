(function () {
    var module = angular.module('rain.Service');

    module.factory('rain.Service.oauth', ['$http', '$q', 'rain.Service.currentUser', oauth]);

    module.factory('rain.Service.loginRedirect', ['$q', '$rootScope', '$location', loginRedirect]);

    // -- interceptors --//
    // about interceptor -- https://docs.angularjs.org/api/ng/service/$http
    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push('addToken');
    });

    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push('rain.Service.loginRedirect');
    });

    // -- service -- //
    function oauth($http, currentUser) {
        return {
            login: login,
            logout: logout,
            addToken: addToken,
            loginRedirect: loginRedirect
        };

        //-- Service Functions --//

        // login
        function login(loginEndpoint, username, password) {
            var httpConfig = {
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };
            var data = formEncode({
                username: username,
                password: password,
                grant_type: "password"
            });
            return $http.post(loginEndpoint, data, httpConfig).then(function (response) {
                currentUser.setProfile(username, response.data.access_token);
                return response;
            }, function (response) {
                return response;
            });
        }

        // logout
        function logout() {
            currentUser.logout();
        }


    }

    function addToken($q, currentUser) {

        var request = function (config) {
            if (currentUser.profile.loggedIn) {
                config.headers.Authorization = 'Bearer ' + currentUser.profile.token;
            }
            return $q.when(config);
        };
        // Interceptors convention, return a 'request' property
        return {
            request: request
        }
    }

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

    //-- helper functions --//

    function formEncode(data) {
        var pairs = [];
        for (var name in data) {
            pairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return pairs.join('&').replace(/%20/g, '+');
    }
})();
