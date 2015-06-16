(function () {
    "use strict";

    var _users = [];    // populated below

    var _currentUser = {};

    var error401 = 'You are not authenticated to access this resource.';
    var error403 = "You are not authorized to access this resource.";


    var app = angular.module("northwindDbMock", ["ngMockE2E"]);

    app.run(setupBackend);

    function setupBackend($httpBackend, northWindRequests, NorthWindDb) {

        var northwindDb = NorthWindDb.getNorthwindDb();

        // populate the _users array

        var requests = northWindRequests.getRequest();
        getAllUsers();

        // pass through any local request

        $httpBackend.whenGET(/approot/).passThrough();

        $httpBackend.whenGET(/rainModules/).passThrough();



        function getAllUsers() {
            angular.forEach(northwindDb[requests.user.entities], function (user) {
                _users.push({
                    username: user.username,
                    password: user.password,
                    role: user.role,
                    get token() {
                        return createToken(this.username, this.password, this.role);
                    }
                })
            });
        }

        angular.forEach(requests, function (request) {

            /* -- e.g. url = "api/employee" --*/
            $httpBackend.whenGET(request.endpoint).respond(function (method, url, data, headers) {

                var errorResult = validatePermission(headers, method, request, url);
                if (errorResult) {
                    return errorResult;
                }

                return [200, northwindDb[request.entities], {}];
            });

            /* -- e.g. url = "api/employee/2" --*/
            var editingRegex = new RegExp(request.endpoint + "/[0-9][0-9]*", '');

            $httpBackend.whenGET(editingRegex).respond(function (method, url, data, headers) {

                var errorResult = validatePermission(headers, method, request, url);
                if (errorResult) {
                    return errorResult;
                }

                var entity = []; // return this if not found

                var filterId = request.filterId || request.idField;

                var entities = northwindDb[request.entities];
                var parameters = url.split('/');
                var length = parameters.length;
                var id = parameters[length - 1];

                if (id > 0) {
                    for (var i = 0; i < entities.length; i++) {
                        if (entities[i][filterId] == id) {
                            entity.push(entities[i]); // find the entity with this id
                        }
                    }
                }
                return [200, entity, {}];
            });

            /* -- e.g. "DELETE api/employee/2" --*/

            $httpBackend.whenDELETE(editingRegex).respond(function (method, url, data, headers) {

                var errorResult = validatePermission(headers, method, request, url);
                if (errorResult) {
                    return errorResult;
                }

                var entity = []; // return this if not found

                var filterId = request.filterId || request.idField;

                var entities = northwindDb[request.entities];
                var parameters = url.split('/');
                var length = parameters.length;
                var id = parameters[length - 1];

                var index = -1;
                if (id > 0) {
                    for (var i = 0; i < entities.length; i++) {
                        if (entities[i][filterId] == id) {
                            index = i;
                            entity = entities[i];
                            break;
                        }
                    }
                }
                if (index >= 0) {
                    entities.splice(index, 1);
                }
                return [200, entity, {}];
            });
            /* -- e.g. post: url = "api/employee" --*/

            $httpBackend.whenPOST(request.endpoint).respond(function (method, url, data, headers) {

                var errorResult = validatePermission(headers, method, request, url);
                if (errorResult) {
                    return errorResult;
                }

                // deserialize the posted data
                var postData = angular.fromJson(data);

                var entities = northwindDb[request.entities];

                if (!postData[request.idField]) {
                    // new entity
                    postData[request.idField] = entities[entities.length - 1][request.idField] + 1;
                    northwindDb[request.entities].push(postData);
                } else {
                    // update entity
                    for (var i = 0; i < entities.length; i++) {
                        if (entities[i][request.idField] == postData[request.idField]) {
                            entities[i] = postData;
                            break;
                        }
                    }
                }
                // refresh variable _users
                getAllUsers();
                return [200, postData, {}];
            });
        });

        $httpBackend.whenPOST('/api/login').respond(function (method, url, data, headers) {

            // deserialize the posted data
            var credential = parseQueryString(data);

            var loggedInUser = getLoggedInUser(credential.username, credential.password);
            if (!loggedInUser) {
                return [401, {status: 'error 401'}, headers, 'The user name or password is incorrect']
            }

            var tokenData = {
                access_token: loggedInUser.token
            };

            return [200, tokenData, {}];
        });


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

    function getLoggedInUser(username, password) {
        var loggedInUser = null;
        if (username && password) {
            for (var i = 0; i < _users.length; i++) {
                if (_users[i].username === username && _users[i].password === password) {
                    loggedInUser = _users[i];
                    break;
                }
            }
        }

        return loggedInUser;
    }

    function isAuthenticated(headers) {
        var loggedIn = false;
        var token = '';
        if (headers && headers.Authorization) {
            for (var i = 0; i < _users.length; i++) {
                token = _users[i].token;
                if (headers.Authorization.indexOf(token) >= 0) {
                    loggedIn = true;
                    _currentUser = decryptToken(token);
                    break;
                }
            }
        }
        return loggedIn;
    }

    function isAuthorized(requiredRoles, method) {
        var isAuthorized = false;

        var requiredRole = _.find(requiredRoles, function (r) {
            return r.name === _currentUser.role;
        });
        if (!requiredRole) {
            return false;
        }
        if (method !== 'GET') {
            isAuthorized = requiredRole.modify === true;
        } else {
            isAuthorized = requiredRole.read === true;
        }

        return isAuthorized;
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

    function validatePermission(headers, method, request, url) {

        if (!isAuthenticated(headers)) {
            return [401, {'request url': url}, headers, error401]
        }
        if (!isAuthorized(request.roles, method)) {
            return [403, {'request url': url}, headers, error403]
        }

        return false;
    }
})();
