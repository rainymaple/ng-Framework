(function () {
    var module = angular.module('rainService');

    module.factory('rainService.oauth', ['$http', 'rainService.currentUser', oauth]);

    // -- service -- //
    function oauth($http, currentUser) {
        return {
            login: login,
            logout: logout,
            token: {
                createToken: createToken,
                decryptToken: decryptToken
            }
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


        function createToken(username, password, role) {
            var roleString = '';
            if (role) {
                roleString = '&role=' + role.key.trim();
            }
            return 'username=' + username.trim() + '&password=' + password.trim() + roleString;
        }

        function decryptToken(token) {
            var profile = parseQueryString(token);
            return profile;
        }

        function parseQueryString(queryString) {
            var params = {}, queries, temp, i, l;

            // Split into key/value pairs
            queries = queryString.split("&");

            // Convert the array of strings into an object
            for (i = 0, l = queries.length; i < l; i++) {
                temp = queries[i].split('=');
                params[temp[0]] = temp[1];
            }

            return params;
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
