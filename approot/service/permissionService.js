(function () {

    var module = angular.module('app-framework');

    module.factory('permissionService', [
        '$q'
        , 'northWindRequests'
        , permissionService]);

    // for any request to 'approot/views', check the current users' role against the required role of view
    // if failed, reject this request with status 403
    function permissionService($q, northWindRequests) {

        var _permissions = getPermissions();

        return {
            response: permissionResponse
        };


        function permissionResponse(response) {
            var requestedUrl = response.config.url;
            var method = response.config.method;
            var statusCode = response.status;

            if (requestedUrl.toLowerCase().indexOf('approot/views') >= 0) {
                var requiredRoles = getRolesByUrl(requestedUrl);
                if (requiredRoles) {
                    var profile = decryptToken(response.config.headers.Authorization);
                    if (profile && profile.role) {
                        var role = profile.role;
                        var hasPermission = _.find(requiredRoles, function (r) {
                            return r.key === role && r.read === true;
                        });
                        if (!hasPermission) {
                            return $q.reject({status: 403});
                        }
                    }
                }
            }


            return response;

        }

        function getRolesByUrl(url) {
            var permission = _.find(_permissions, function (p) {
                var pathArray = p.path;
                var matchedPermission = _.find(pathArray, function (path) {
                    return url.toLowerCase().indexOf(path.toLowerCase()) >= 0;
                });
                return !!matchedPermission;
            });
            if (permission) {
                return permission.roles;
            }
            return null;
        }

        function getPermissions() {
            return northWindRequests.getPermissions();
        }
    }

    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push('permissionService');
    });


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

})();