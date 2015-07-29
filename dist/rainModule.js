angular.module('rainMenu',
    [
        //'ngAnimate'
    ]);
(function () {
    angular.module('rainMenu').directive('rainMenuItem', rainMenuItem);


    function rainMenuItem() {
        return {
            restrict: 'AE',
            require: '^rainMenu',
            transclude: true,
            scope: {
                label: '@',
                icon: '@',
                route: '@'
            },
            templateUrl: 'rainModules/rainMenu/rainMenuItem/rainMenuItemTemplate.html',
            link: link
        }
    }

    function link(scope, element, attr, rainMenuCtrl) {

        scope.isActive = function () {
            return element === rainMenuCtrl.getActiveElement();
        };

        scope.isVertical = function () {
            return rainMenuCtrl.isVertical();
        };

        element.on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            scope.$apply(function () {
                rainMenuCtrl.setActiveElement(element);
                rainMenuCtrl.setRoute(scope.route);
                if (!scope.isVertical()) {
                    rainMenuCtrl.closeCurrentMenu();
                }
            })
        })
    }
})();

(function () {
    angular.module('rainMenu').directive('rainMenuGroup', rainMenuGroup);


    function rainMenuGroup() {
        return {
            restrict: 'AE',
            require: '^rainMenu',
            transclude: true,
            scope: {
                label: '@',
                icon: '@'
            },
            templateUrl: 'rainModules/rainMenu/rainMenuGroup/rainMenuGroupTemplate.html',
            link: link
        }
    }

    function link(scope, element, attr, rainMenuCtrl) {

        scope.isOpen = false;

        scope.closeMenu = function () {
            scope.isOpen = false;
        };

        scope.isActiveGroup = function () {
            return element === rainMenuCtrl.getActiveGroupElement();
        };

        scope.clicked = function () {
            if (!scope.isOpen) {
                rainMenuCtrl.closeCurrentMenu();
            }
            scope.isOpen = !scope.isOpen;

            if (!scope.isVertical()) {
                setSubMenuPosition();
            }
            // pass the current scope to rainMenuCtrl
            rainMenuCtrl.setOpenMenuScope(scope);
        };

        scope.isVertical = function () {
            return rainMenuCtrl.isVertical();
        };

        element.on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            scope.$apply(function () {
                rainMenuCtrl.setActiveGroupElement(element);
                rainMenuCtrl.setRoute(scope.route);
            })
        });

        function setSubMenuPosition() {
            var pos = element.offset();
            var menuGroup = element.find('.r-menu-group-horizontal');
            var height = 40;
            if (menuGroup) {
                height = menuGroup.height();
            }
            element.find('.r-menu-sub-section').css({'left': pos.left + 2, top: height + 6});
        }
    }
})();

(function () {
    var app=angular.module('rainGrid', []);

    var config = {
        baseUrl: 'rainModules/rainGrid/',
        version: '1.0.0'
    };

    app.value("rainGridConfig", config);

})();
(function () {
    angular.module('rainGrid').directive('rainGridMenu', [rainGridMenu]);

    function rainGridMenu() {
        return {
            restrict: "AE",
            templateUrl: "rainModules/rainGrid/rainGridMenu/rainGridMenuTemplate.html",
            replace: false,
            scope: {
                filterData: '&',
                gridOptions: '='
            },
            controller: 'rainGrid.menu.controller'
        }
    }

})();
(function () {
    angular.module('rainGrid').controller('rainGrid.menu.controller',
        ['$scope', 'rainGridService', rainGridMenuCtrl]);

    function rainGridMenuCtrl($scope, rainGridService) {

        activate();

        function activate() {
            menuConfig();
            $scope.filters = [
                {col: {}, constraint: {}, expression: ''}
            ];
            verifyFilterStatus();
        }

        // event handlers

        $scope.doFilter = function () {
            var modalInstance = rainGridService.showFilterModal($scope.gridOptions, $scope.filters);
            modalInstance.then(function (data) {
                if (!data.isCancel) {
                    $scope.filters = data.filters;
                    verifyFilterStatus();
                    $scope.filterData({filters: $scope.filters});
                }
            });
        };

        $scope.removeFilters = function () {
            $scope.filters = [
                {col: {}, constraint: {}, expression: ''}
            ];
            verifyFilterStatus();
            $scope.filterData({filters: $scope.filters});
        };

        function verifyFilterStatus() {
            if ($scope.filters.length === 0) {
                $scope.hasFiltered = false;
            } else {
                var filter = $scope.filters[0];
                $scope.hasFiltered = !!filter.col && !!filter.constraint
                    && filter.expression !== undefined && filter.expression !== '';
            }
        }

        // menu config
        function menuConfig() {
            $scope.status = {
                isOpen: false
            };

            $scope.toggled = function (open) {
                console.log('Dropdown is now: ', open);
            };

            $scope.toggleDropdown = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.status.isOpen = !$scope.status.isOpen;
            };
        }
    }
})();
(function () {
    angular.module('rainGrid').directive('rainGridFilter', [rainGridFilter]);

    /*-- Function Directive --*/
    function rainGridFilter() {
        return {
            restrict: 'AE',
            templateUrl: 'rainModules/rainGrid/rainGridFilterInput/rainGridFilterInputTemplate.html',
            replace: false,
            scope: {
                filter: '=',
                columns: '=',
                deleteFilter: '&'
            },
            controller: 'rainGrid.filterInput.controller'
        };

    }   // end of fieldSelect


})();

(function () {
    angular.module('rainGrid').controller('rainGrid.filterInput.controller',
        ['$scope', 'rainGridService', rainGridFilterInputCtrl]);

    function rainGridFilterInputCtrl($scope, rainGridService) {

        activate();

        function activate() {
            getFilterColumn();
            setConstraints($scope.filter.col);
            buildBoolValues();
            $scope.isBool = $scope.filter.col.isBoolean;
        }


        // event handlers
        $scope.columnChanged = setConstraints;

        $scope.removeFilter = function (col) {
            $scope.deleteFilter({col: col})
        };

        function getFilterColumn() {
            var index = -1;
            for (var i = 0; i < $scope.columns.length; i++) {
                if ($scope.columns[i].value === $scope.filter.col.value) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                $scope.filter.col = {}
            } else {
                $scope.filter.col = $scope.columns[index];
            }
        }

        function setConstraints(col) {
            $scope.constraints = rainGridService.getFilterConstraintsByColumnType(col);

            if ($scope.filter.constraint) {
                var index = -1;
                for (var i = 0; i < $scope.constraints.length; i++) {
                    if ($scope.constraints[i].value === $scope.filter.constraint.value) {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    $scope.filter.constraint = {};
                } else {
                    $scope.filter.constraint = $scope.constraints[index];
                }
            }
            $scope.isBool = $scope.filter.col.isBoolean;
        }

        function buildBoolValues() {
            $scope.boolValues = [{label: 'true', value: true}, {label: 'false', value: false}];
        }
    }
})();
(function () {
    angular.module('rainGrid').controller('rainGrid.filterModal.controller',
        ['$modalInstance', 'columnDefs', 'filters', '$scope', rainGridFilterModalCtrl]);

    function rainGridFilterModalCtrl($modalInstance, columnDefs, filters, $scope) {

        $scope.columns = _.map(columnDefs, function (col) {
            return {
                label: col.displayName,
                value: col.field,
                isNumber: col.isNumber,
                isCurrency: col.isCurrency,
                isBoolean: col.isBoolean || col.isCheckbox,
                isDate: col.isDate
            }
        });

        $scope.filters = filters;

        // event handlers

        $scope.addFilter = addFilter;
        $scope.deleteFilter = deleteFilter;
        $scope.doFilter = doFilter;
        $scope.doCancel = doCancel;

        // event handler functions

        function addFilter() {
            $scope.filters.push({col: {}, constraint: {}, expression: ''});
        }

        function deleteFilter(col) {
            _.remove($scope.filters, function (filter) {
                return filter.col.value === col.value;
            });
            if ($scope.filters.length === 0) {
                $scope.filters.push({col: {}, constraint: {}, expression: ''});
            }
        }

        function doFilter() {
            cleanFilters();
            $modalInstance.close({filters: $scope.filters, isCancel: false});
        }

        function doCancel() {
            cleanFilters();
            $modalInstance.close({filters: $scope.filters, isCancel: true});
        }

        function cleanFilters() {
            _.remove($scope.filters, function (filter) {
                return !filter.col || !filter.constraint || filter.expression === undefined || filter.expression === ''
            });
            if ($scope.filters.length === 0) {
                $scope.filters.push({col: {}, constraint: {}, expression: ''});
            }
        }
    }


})();
(function () {
    angular.module('rainGrid').directive('gridCell', [gridCell]);

    /*-- Function Directive --*/
    function gridCell() {

        return {
            restrict: 'AE',
            templateUrl: 'rainModules/rainGrid/rainGridCell/rainGridCellTemplate.html',
            replace: false,
            scope: {
                gridCell: '=',
                isDate: '=',
                isCurrency: '=',
                isNumber: '=',
                isCheckbox: '=',
                isLink: '=',
                isButton: '=',
                isHidden: '=',
                decimal:'=',
                funcLink: '&'
            },
            link: link

        };

        function link(scope, el, attr) {
            scope.value = scope.gridCell;
            if (scope.isLink || scope.isButton) {
                scope.linkFunc = function () {
                    scope.funcLink();
                }
            }

        }


    }
})();
(function () {
    angular.module('rainService',[]);
})();

(function () {
    var module = angular.module('rainService');

    module.factory('rainService.repository', ['$http', '$timeout', repositoryService]);

    // entity is defined in dbEntityConfig

    function repositoryService($http, $timeout) {
        return {
            getDataList: getDataList,
            getDataById: getDataById,
            deleteDataById: deleteDataById,
            addOrUpdateData: addOrUpdateData
        };


        function getDataList(entity) {
            // simulate delay of getting data from backend
            return $timeout(function () {
                return $http.get(entity.url).then(function (result) {
                    return result.data;
                });
            }, 200);

            /* return $http.get(entity.url).then(function (result) {
             return result.data;
             });*/
        }

        function getDataById(entity, id) {
            return $http.get(entity.url + '/' + id).then(function (result) {
                return result.data;
            });
        }

        function deleteDataById(entity, id) {
            return $http.delete(entity.url + '/' + id).then(function (result) {
                return result.data;
            });
        }

        function addOrUpdateData(entity, object) {
            return $http.post(entity.url,object).then(function (result) {
                return result.data;
            });
        }

    }
})();


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

(function () {
    angular.module('rainService').factory('rainService.localStorage', ['$window', localStorage]);

    function localStorage($window) {
        var store = $window.localStorage;

        return {
            add: add,
            get: get,
            remove: remove
        };

        // service functions

        function add(key, value) {
            value = angular.toJson(value);
            store.setItem(key, value);
        }

        function get(key) {
            var value = store.getItem(key);
            if (value) {
                value = angular.fromJson(value);
            }
            return value;
        }

        function remove(key) {
            store.removeItem(key);
        }
    }
})();
(function () {
    var module = angular.module('rainService');

    // -- service: addToken -- //

    module.factory('rainService.addToken', ['$q', 'rainService.currentUser', addToken]);

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

    module.factory('rainService.loginRedirect', ['$q', '$rootScope', '$location', loginRedirect]);

    function loginRedirect($q, $rootScope, $location) {

        var responseError = function (response) {
            if (response.status == 401 || response.status == 403) {

                // controller of application level should handle this event
                $rootScope.$broadcast('AUTHENTICATION_EVENT', {
                    // show error message according to the status code
                    statusCode: response.status,
                    // can be redirected to this path after authenticated
                    requestedPath: $location.path(),
                    // for debug
                    eventSource:'rainService.loginRedirect.responseError'
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
        $httpProvider.interceptors.push('rainService.addToken');
    });
    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push('rainService.loginRedirect');
    });
})();

/*
 * usage:
 * rainService.dialog.confirmModal('Confirm','Are you sure?',function_Ok);
 *
 * */

(function () {

    angular.module('rainService').factory('rainService.dialog', ['$modal', rainConfirm]);

    function rainConfirm($modal) {

        return {
            confirmModal: confirmModal,
            messageModal: messageModal
        };

        // confirmModal
        function confirmModal(title, message, func_ok) {

            title = title || 'Confirm';
            message = message || 'Are you sure?';

            var modalInstance = $modal.open({
                //templateUrl: 'deleteUserModal.html',
                //size:'sm',
                template: getConfirmTemplate(title, message),
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        if (func_ok && angular.isFunction(func_ok)) {
                            func_ok();
                            //return;
                        }
                        $modalInstance.close(true)
                    };
                    $scope.cancel = function () {
                        $modalInstance.close(false)
                    };
                }
            });
            return modalInstance.result;
        }

        function getConfirmTemplate(title, message) {
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

        // messageModal
        function messageModal(title, markup, func_ok) {

            title = title || 'Information';
            markup = markup || '<p></p>';

            var modalInstance = $modal.open({
                //size:'sm',
                template: getMessageTemplate(title, markup),
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        if (func_ok && angular.isFunction(func_ok)) {
                            func_ok();
                            //return;
                        }
                        $modalInstance.close(true)
                    };
                }
            });
            return modalInstance.result;
        }

        function getMessageTemplate(title, markup) {
            return '<div class="modal-header">'
                + '<h3 class="modal-title">' + title + '</h3>'
                + '</div>'
                + '<div class="modal-body">'
                + markup
                + '</div>'
                + '<div class="modal-footer">'
                + '<button class="btn btn-primary" ng-click="ok()">Close</button>'
                + '</div>';
        }
    }
})();
(function () {
    angular.module('rainService').factory('rainService.currentUser',
        ['rainService.localStorage', currentUser]);

    function currentUser(localStorage) {

        var _userKey = 'tokenKey';
        var profile = getProfile();

        return {
            setProfile: setProfile,
            profile: profile,
            logout: logout
        };

        // Service Functions

        function setProfile(username, token) {
            profile.username = username;
            profile.token = token;
            localStorage.add(_userKey, profile);
        }

        function getProfile() {
            var profile = {
                username: '',
                token: '',
                get loggedIn() {
                    return !!this.token;
                }
            };

            // try to get the profile from local storage
            var localUser = localStorage.get(_userKey);
            if (localUser) {
                profile.username = localUser.username;
                profile.token = localUser.token;
            }
            return profile;
        }

        function logout() {
            profile.username = '';
            profile.token = '';
            localStorage.remove(_userKey);
        }
    }
})();

(function () {
    var module =angular.module('rainNumberOnly',[]);
    module.directive('numberOnly',numberOnly);
    function numberOnly(){
        return {
            restrict: 'EA',
            require: 'ngModel',

            link: function (scope, element, attrs, ngModel) {
                scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                    if(!newValue) return;
                    var splitArray = String(newValue).split("");
                    if (splitArray.length === 0) return;
                    if (splitArray.length === 1
                        && (splitArray[0] == '-'
                        || splitArray[0] === '.' )) return;
                    if (splitArray.length === 2
                        && newValue === '-.') return;
                    if (splitArray.indexOf('.') > 0) {
                        var decimal = attrs['numberOnly'];
                        if (['0', '1', '2', '3', '4', '5'].indexOf(decimal) >= 0) {
                            decimal = parseInt(decimal);
                            if (splitArray.length - splitArray.indexOf('.') > decimal + 1) {
                                ngModel.$setViewValue(oldValue);
                                ngModel.$render();
                            }
                        }
                    }

                    /*Check it is number or not.*/
                    if (isNaN(newValue)) {
                        ngModel.$setViewValue(oldValue);
                        ngModel.$render();
                    }
                });
            }
        };
    }
})();

angular.module("rainMenu").run(["$templateCache", function($templateCache) {$templateCache.put("rainModules/rainMenu/rainMenuTemplate.html","<div class=\"r-menu-area\" ng-show=\"showMenu\"\r\n     ng-class=\"{\'r-menu-area-horizontal\':!isVertical,\'r-menu-area-vertical\':isVertical}\">\r\n    <ul class=\"r-menu\">\r\n        <div ng-transclude ng-class=\"{\'r-menu-vertical\':isVertical,\'r-menu-horizontal\':!isVertical}\"></div>\r\n        <a class=\"btn r-menu-layout-button\" ng-click=\"toggleMenuOrientation()\"\r\n                                            ng-show=\"allowHorizontalMenu\"\r\n                                            ng-class=\"{\'r-menu-layout-button-horizontal\':!isVertical}\">\r\n        <i class=\"fa\" ng-class=\"{\' fa-chevron-up\':isVertical,\' fa-chevron-left\':!isVertical}\"></i>\r\n    </a></ul>\r\n\r\n</div>");
$templateCache.put("rainModules/rainMenu/rainMenuGroup/rainMenuGroupTemplate.html","<li class=\"r-selectable-item r-no-select\" ng-click=\"clicked()\"\r\n    ng-class=\"{\'r-menu-group-horizontal\':!isVertical(),\'isActiveGroup\':isActiveGroup()||isOpen}\">\r\n    <div class=\"r-no-select group-title\">\r\n        <i class=\"fa {{icon}} r-menu-icon\"></i>\r\n        {{label}}\r\n    </div>\r\n    <i class=\"fa fa-angle-left  r-menu-group-indicator\" ng-if=\"isVertical()\"\r\n       ng-class=\"{\'fa-rotate-270\':isOpen}\"></i>\r\n\r\n    <!--<div ng-show=\"isOpen\" class=\"r-menu-sub-section r-menu-fade-in-animation\" ng-class=\"{\'r-menu-popup\':!isVertical()}\">-->\r\n    <div ng-show=\"isOpen\" class=\"r-menu-sub-section animated fadeIn\"\r\n         ng-class=\"{\'r-menu-popup\':!isVertical()}\">\r\n        <ul ng-transclude></ul>\r\n    </div>\r\n</li>");
$templateCache.put("rainModules/rainMenu/rainMenuItem/rainMenuItemTemplate.html","<li class=\"r-selectable-item r-no-select r-menu-item\" ng-class=\"{\'r-menu-item-active\':isActive()}\">\r\n    <div class=\"r-no-select\">\r\n        <i class=\"fa {{icon}} r-menu-icon\"></i>\r\n        {{label}}\r\n    </div>\r\n    <!--<i class=\"fa fa-2x fa-angle-left  r-menu-active-indicator\" ng-if=\"isActive()\"></i>-->\r\n</li>");}]);
(function () {
    angular.module('rainMenu').directive('rainMenu',['$timeout',rainMenu] );


    function rainMenu($timeout) {
        return {
            restrict:'AE',
            transclude: true,
            scope: {
                horizontalMenu:'='
            },
            controller: 'rainMenu.controller',
            templateUrl: 'rainModules/rainMenu/rainMenuTemplate.html',
            link: link
        };

        // open the first menu section
        function link(scope,element,attr){

            //openFirstMenu();

            function openFirstMenu() {
                var item = element.find('.r-selectable-item:first');
                if (item) {
                    $timeout(function () {
                        item.trigger('click');
                    })
                }
            }
        }
    }

})();

/*
 * event to broadcast:   'rain-menu-item-selected-event','rain-menu-orientation-changed-event'
 * event to watch:       'rain-menu-show'
 * */
(function () {
    angular.module('rainMenu').controller('rainMenu.controller', ['$scope', '$rootScope', rainMenuCtrl]);

    function rainMenuCtrl($scope, $rootScope) {

        var isHorizontalMenu = $scope.horizontalMenu;
        $scope.showMenu = true;
        $scope.isVertical = true;
        $scope.openMenuScope = null;
        $scope.allowHorizontalMenu = true;

        var _self = this;

        activate(_self);

        // --- functions --- //

        function activate(self) {
            setPublicFunctions(self);
            setEventHandlers();
            //if the menu needs to be horizontal initially
            if(isHorizontalMenu) {
                $scope.toggleMenuOrientation();
            }
        }

        function setPublicFunctions(self) {
            self.setActiveElement = function (el) {
                $scope.activeElement = el;
            };
            self.getActiveElement = function () {
                return $scope.activeElement;
            };
            self.setActiveGroupElement = function (el) {
                $scope.activeGroupElement = el;
            };
            self.getActiveGroupElement = function () {
                return $scope.activeGroupElement;
            };
            self.isVertical = function () {
                return $scope.isVertical;
            };
            self.setOpenMenuScope = function (scope) {
                $scope.openMenuScope = scope;
            };
            self.closeCurrentMenu = function () {
                if ($scope.openMenuScope) {
                    $scope.openMenuScope.closeMenu();
                }
            };
            self.setRoute = function (route) {
                if (route) {
                    $rootScope.$broadcast('rain-menu-item-selected-event', {route: route});
                }
            };
        }

        function setEventHandlers() {
            $scope.$on('rain-menu-show', function (event, data) {
                $scope.showMenu = data.show;
                $scope.isVertical = data.isVertical;
                $scope.allowHorizontalMenu = data.allowHorizontalMenu;
            });

            $scope.toggleMenuOrientation = function () {
                $scope.isVertical = !$scope.isVertical;
                $rootScope.$broadcast('rain-menu-orientation-changed-event', {isMenuVertical: $scope.isVertical});
            };

            // if there's a click out of menu when the menu is horizontal, close the current opened menu
            angular.element(document).bind('click', function (e) {
                if ($scope.openMenuScope && !$scope.isVertical) {
                    if ($(e.target).parent().hasClass('r-selectable-item')) {
                        return;
                    }
                    $scope.$apply(function () {
                        $scope.openMenuScope.closeMenu();
                    });
                    e.preventDefault();
                    e.stopPropagation();
                }
            })
        }
    }
})();


(function () {
    angular.module('rainGrid').directive('rainGrid', [rainGridDirective]);

    function rainGridDirective() {
        return {
            restrict: 'AE',
            templateUrl: 'rainModules/rainGrid/_rainGridTemplate.html',
            replace: false,
            scope: {
                rainGrid: '='
            },
            controller: 'rainGrid.controller'

        };
    }   // end of rainGrid
})();

(function () {

    angular.module('rainGrid').controller('rainGrid.controller', ['$scope', '$rootScope', 'rainGridService',
        rainGridController]);

    /*-- Function Controller --*/

    function rainGridController($scope, $rootScope, rainGridService) {

        $scope.gridOptions = {};
        var _dataRows = []; // _dataRows is original(neither sorted nor filtered)
        var _dataList = []; // _dataList might be sorted and/or filtered
        var _sortings = [null, 'ASC', 'DSC'];
        var _sortIndex = 0;
        var _sortField = null;
        var _isFiltered = false;
        var _dataRowsFiltered = [];

        $scope.$watch('rainGrid.data', function () {
            activate();
        });

        activate();

        // controller functions

        function activate() {
            buildGridOptions();
            $scope.gridOptions.data.then(
                function (dataList) {
                    initRainGrid(dataList);
                }
            )
        }

        function buildGridOptions() {
            $scope.gridOptions = {enablePage: true, pageSize: 10, selectable: false, showToolMenu: true};
            $scope.gridOptions = _.assign($scope.gridOptions, $scope.rainGrid);
            $scope.selectable = $scope.gridOptions.selectable;
            $scope.showToolMenu = $scope.gridOptions.showToolMenu;
            $scope.title = $scope.gridOptions.title;
        }

        function initRainGrid(dataList) {
            $scope.gridOptions.dataList = dataList;
            $scope.gridData = getGridData($scope.gridOptions);
            initPage();
            initData($scope.gridData);
            rainGridService.modifyPaginationIcons();
            //cfpLoadingBar.complete();
        }

        function initPage() {
            $scope.enablePage = $scope.gridOptions.enablePage;
            $scope.currentPage = 1;
            $scope.maxSize = 3;
            $scope.pageSizes = [
                {label: ' 5', value: 5},
                {label: '10', value: 10},
                {label: '15', value: 15},
                {label: '20', value: 20}
            ];
            $scope.pageSize = $scope.pageSizes[1];
            if ($scope.gridOptions.pageSize) {
                var pageSize = _.find($scope.pageSizes, function (size) {
                    return size.value == $scope.gridOptions.pageSize;
                });
                if (pageSize) {
                    $scope.pageSize = pageSize;
                }
            }

        }

        $scope.filterData = function (filters) {
            _dataList = rainGridService.filterData(_dataRows, filters);

            _isFiltered = (filters.length > 0 && !!filters[0].col);
            if (_isFiltered) {
                _dataRowsFiltered = _dataList;
            }

            // after filtering, remove sorting and go to the first page
            $scope.rowCount = _dataList.length;
            $scope.enablePage = $scope.gridOptions.enablePage && ($scope.rowCount > $scope.pageSizes[0].value);
            $scope.sortField = null;
            $scope.sortOrder = null;
            $scope.currentPage = 1;
            getPageData(_dataList);
        };

        function initData(gridData) {

            $scope.currentPage = 1;
            _sortIndex = 0;
            _sortField = null;

            _dataRows = gridData.rows;

            $scope.header = gridData.header;
            $scope.rowCount = _dataRows.length;
            $scope.enablePage = $scope.gridOptions.enablePage && ($scope.rowCount > $scope.pageSizes[0].value);

            // _dataRows is original(neither sorted nor filtered), _dataList might be sorted and/or filtered;
            _dataList = _dataRows;
            getPageData(_dataList);
        }

        function getPageData(dataList) {
            if (!$scope.enablePage) {
                $scope.list = dataList;
                return $scope.list;
            }
            var pagedDataList = rainGridService.getDataListByPage(dataList, $scope.currentPage, $scope.pageSize.value);

            if (pagedDataList) {
                $scope.list = pagedDataList;
                angular.forEach($scope.list, function (row) {
                    if (row.rowSelected) {
                        if (row != $scope.selectedRow) {
                            row.rowSelected = false;
                        }
                    }
                })
            }
            return $scope.list;
        }

        // Building the header and rows
        function getGridData(gridOptions) {
            var gridList = rainGridService.buildGridData(gridOptions);
            if (gridList.rows.length > 0 && gridList.rows[0].rowSelected) {
                $scope.selectedRow = gridList.rows[0];
            }
            return gridList;
        }   // end of getGridData


        // page event handlers

        $scope.linkTo = function (row, funcEvent, funcIdField) {
            // execute the link function of this field
            var field = _.find(row, function (col) {
                return col.fieldName === funcIdField;
            });
            if (field) {
                var id = field.value;
                $rootScope.$broadcast(funcEvent, {id: id});
            }
        };

        $scope.pageSizeChanged = function (pageSize) {
            $scope.currentPage = 1;
            getPageData(_dataList);
        };

        $scope.pageChanged = function () {
            getPageData(_dataList);
        };

        $scope.sortingChanged = function (sortField) {
            if (_sortField !== sortField) {
                _sortIndex = 1;
            } else {
                _sortIndex = _sortIndex + 1;
                if (_sortIndex > 2) {
                    _sortIndex = 0;
                }
            }
            _sortField = sortField;
            $scope.sortField = sortField;
            $scope.sortOrder = _sortings[_sortIndex];

            var rows = _isFiltered ? _dataRowsFiltered : _dataRows;
            _dataList = rainGridService.sortData(rows, _sortings, _sortField, _sortIndex);
            getPageData(_dataList);
        };

        $scope.selectRow = function (row) {
            if (!$scope.selectable) {
                return;
            }
            var isSelected = row.rowSelected;
            angular.forEach($scope.list, function (row) {
                row.rowSelected = false;
            });
            row.rowSelected = !isSelected;
            if (row.rowSelected) {
                $scope.selectedRow = row;
            }
            if (row.rowSelected && $scope.gridOptions.rowSelectedEvent) {
                var funcEvent = $scope.gridOptions.rowSelectedEvent.funcEvent;
                $rootScope.$broadcast(funcEvent, {id: row.id});
            }
        };


    }   // end of controller

})();
angular.module("rainGrid").run(["$templateCache", function($templateCache) {$templateCache.put("rainModules/rainGrid/_rainGridTemplate.html","<div class=\"rain-grid-panel panel panel-success\">\r\n    <div class=\"panel-heading\">\r\n        <div class=\"clearfix\">\r\n            <div class=\"pull-left\" style=\"margin-top: 4px;\">\r\n                <i class=\"fa fa-arrow-circle-up\" style=\"font-size: 18px;\" ng-show=\"sortOrder===\'ASC\'\"></i>\r\n                <i class=\"fa fa-arrow-circle-down\" style=\"font-size: 18px;\" ng-show=\"sortOrder===\'DSC\'\"></i>\r\n                <i class=\"fa fa-file-o \" style=\"font-size: 18px;\" ng-show=\"!sortOrder\"></i>\r\n                <span style=\"margin-left: 5px;font-weight: bold;\">{{title}}</span>\r\n            </div>\r\n            <div class=\"rain-page pull-right\">\r\n                <div class=\"clearfix\">\r\n\r\n                    <div class=\"pull-left\" ng-if=\"showToolMenu\">\r\n                        <div rain-grid-menu filter-data=\"filterData(filters)\" grid-options=\"gridOptions\"></div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"panel-body\">\r\n        <table class=\"table table-striped table-bordered table-hover table-condensed rain-grid-table\">\r\n            <tbody>\r\n            <tr>\r\n                <th ng-repeat=\"field in header\" ng-click=\"sortingChanged(field.fieldName)\"\r\n                    ng-class=\"{dsc:field.fieldName===sortField&&sortOrder===\'DSC\',\r\n                            asc:field.fieldName===sortField&&sortOrder===\'ASC\'}\"\r\n                    ng-if=\"!field.isHidden\">\r\n                    <span>\r\n                        {{field.displayName}}\r\n                    </span>\r\n                </th>\r\n            </tr>\r\n            <tr ng-repeat=\"row in list\" ng-click=\"selectRow(row)\" ng-class=\"{\'row-selected\':row.rowSelected}\">\r\n                <td ng-repeat=\"field in row.rowData\" ng-if=\"!field.isHidden\">\r\n                    <div style=\"display: inline-block;\" ng-class=\"{\'cell-center\':field.isButton}\"\r\n                         grid-cell=\"field.value\"\r\n                         is-date=\"field.isDate\"\r\n                         is-checkbox=\"field.isCheckbox\"\r\n                         is-currency=\"field.isCurrency\"\r\n                         is-number=\"field.isNumber\"\r\n                         is-link=\"field.isLink\"\r\n                         is-button=\"field.isButton\"\r\n                         is-hidden=\"field.isHidden\"\r\n                         decimal=\"field.decimal\"\r\n                         func-link=\"linkTo(row.rowData,field.linkFunc.funcEvent,field.linkFunc.funcIdField)\">\r\n                        <!--{{field.value}}-->\r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            </tbody>\r\n        </table>\r\n        <div class=\"col-xs-12 rain-grid-pagination\">\r\n            <div class=\"clearfix\" style=\"display: inline-block;height: 30px;\">\r\n                <div class=\"pull-left\" style=\"margin: 5px 5px 5px 0;\">\r\n                    <span style=\"margin-right: 5px;\">Count:</span>\r\n                    <span style=\"color: #337AB7;font-weight: bold;\">{{rowCount}}</span>\r\n                </div>\r\n            </div>\r\n            <div class=\"clearfix\" style=\"display: inline-block;\" ng-show=\"enablePage\">\r\n                <div class=\"pull-left\" style=\"width: 160px;\">\r\n                    <div class=\"clearfix\">\r\n                        <div class=\"pull-left\" style=\"margin: 5px 5px 0 0;\">Page size:</div>\r\n                        <div class=\"pull-left\">\r\n                            <select class=\"form-control input-sm\" ng-model=\"pageSize\" style=\"\"\r\n                                    ng-change=\"pageSizeChanged(pageSize)\"\r\n                                    ng-options=\"size as size.label for size in pageSizes\">\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"clearfix\" style=\"display: inline-block;height: 30px;\">\r\n                <div class=\"pull-left\" ng-show=\"enablePage\">\r\n                    <pagination total-items=\"rowCount\" ng-model=\"currentPage\" max-size=\"maxSize\"\r\n                                class=\"pagination-sm\" boundary-links=\"true\" rotate=\"false\"\r\n                                first-text=\"<<\" previous-text=\"<\" next-text=\">\" last-text=\">>\"\r\n                                items-per-page=\"pageSize.value\" ng-change=\"pageChanged()\">\r\n                    </pagination>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n\r\n");
$templateCache.put("rainModules/rainGrid/rainGridCell/rainGridCellTemplate.html","<div ng-if=\"isCheckbox\" rain-checkbox=\"value\" readonly=\"true\" style=\"padding-right: 10px;\"></div>\r\n\r\n<span ng-if=\"isLink\">\r\n    <a ng-click=\"linkFunc()\">{{value}}</a>\r\n</span>\r\n\r\n<div style=\"display: inline-block;\" ng-if=\"isButton\">\r\n    <a class=\"btn btn-primary btn-xs\" ng-click=\"linkFunc()\">{{value}}</a>\r\n</div>\r\n\r\n<div class=\"clearfix\" ng-if=\"isCurrency\">\r\n    <div class=\"pull-right\">\r\n        {{value|currency}}\r\n    </div>\r\n</div>\r\n\r\n<div class=\"clearfix\" ng-if=\"isDate\">\r\n    <div class=\"pull-right\">\r\n        {{value|date: \'yyyy-MM-dd\'}}\r\n    </div>\r\n</div>\r\n\r\n<div class=\"clearfix\" ng-if=\"isNumber\">\r\n    <div class=\"pull-right\">\r\n        <span ng-if=\"decimal==1\">{{value|number:1}}</span>\r\n        <span ng-if=\"decimal==2\">{{value|number:2}}</span>\r\n        <span ng-if=\"decimal==3\">{{value|number:3}}</span>\r\n        <span ng-if=\"decimal==4\">{{value|number:4}}</span>\r\n        <span ng-if=\"!decimal || decimal > 4\">{{value}}</span>\r\n    </div>\r\n</div>\r\n\r\n<span ng-if=\"!isCheckbox && !isLink && !isButton && !isCurrency && !isNumber && !isDate && !isHidden\">\r\n    {{value}}\r\n</span>\r\n\r\n");
$templateCache.put("rainModules/rainGrid/rainGridFilterInput/rainGridFilterInputTemplate.html","<form name=\"formFilter\" class=\"form-horizontal\">\r\n    <div class=\"well well-sm\">\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-12\">\r\n                <div class=\"col-sm-4\">\r\n                    <select class=\"form-control input-sm\" ng-model=\"filter.col\" ng-change=\"columnChanged(filter.col)\"\r\n                            ng-options=\"colDef as colDef.label for colDef in columns\">\r\n                    </select>\r\n                </div>\r\n                <div class=\"col-sm-4\">\r\n                    <select class=\"form-control input-sm\" ng-model=\"filter.constraint\"\r\n                            ng-options=\"con as con.label for con in constraints\">\r\n                    </select>\r\n                </div>\r\n                <div class=\"col-sm-3\" ng-if=\"!isBool\">\r\n                    <input type=\"text\" class=\"form-control input-sm\" ng-model=\"filter.expression\">\r\n                </div>\r\n                <div class=\"col-sm-3\" ng-if=\"isBool\">\r\n                    <select class=\"form-control input-sm\" ng-model=\"filter.expression\"\r\n                            ng-options=\"bool.value as bool.label for bool in boolValues\">\r\n                    </select>\r\n                </div>\r\n                <div class=\"col-sm-1\" style=\"padding-top: 3px;\">\r\n                    <button class=\"btn btn-warning btn-xs\" ng-click=\"removeFilter(filter.col)\">\r\n                        <i class=\"glyphicon glyphicon-minus\"></i>\r\n                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>\r\n");
$templateCache.put("rainModules/rainGrid/rainGridFilterModal/rainGridFilterModalTemplate.html","<div>\r\n    <div class=\"modal-header\">\r\n        <div style=\"display:inline-block;margin-left: 10px;font-size: 16px;font-weight: bold;\">Filters</div>\r\n        <div class=\"pull-right\">\r\n            <button class=\"btn btn-sm btn-success\" ng-click=\"addFilter()\">\r\n                <i class=\"glyphicon glyphicon-plus \"></i>Add filter\r\n            </button>\r\n        </div>\r\n    </div>\r\n    <div style=\"margin:10px;padding-right: 10px;\">\r\n\r\n        <div>\r\n            <div ng-repeat=\"filter in filters\">\r\n                <div rain-grid-filter filter=\"filter\" columns=\"columns\" delete-filter=\"deleteFilter(col)\"></div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-primary\" ng-click=\"doFilter()\">Filter</button>\r\n        <button class=\"btn btn-warning\" ng-click=\"doCancel()\">Cancel</button>\r\n    </div>\r\n</div>");
$templateCache.put("rainModules/rainGrid/rainGridMenu/rainGridMenuTemplate.html","<div>\r\n    <div class=\"btn-group\" dropdown is-open=\"status.isOpen\" style=\"cursor: pointer;\">\r\n        <i class=\"fa fa-cog  dropdown-toggle\" style=\"font-size: 23px;margin-left: 10px;\"\r\n           dropdown-toggle ng-disabled=\"disabled\"></i>\r\n        <ul class=\"dropdown-menu\" role=\"menu\" style=\"left:auto;right: -12px;\">\r\n            <li>\r\n                <a ng-click=\"doFilter()\">\r\n                    <i class=\"glyphicon glyphicon-filter\" style=\"margin-right: 5px;color: #337AB7;\"></i>\r\n\r\n                    <div style=\"display: inline-block;\">Filter</div>\r\n                </a>\r\n            </li>\r\n            <li ng-if=\"hasFiltered\">\r\n                <a href=\"#\" ng-click=\"removeFilters()\">\r\n                    <i class=\"fa fa-times\" style=\"margin-right: 5px;color: #337AB7;\"></i>\r\n\r\n                    <div style=\"display: inline-block;\">Remove Filters</div>\r\n                </a>\r\n            </li>\r\n            <li class=\"divider\"></li>\r\n            <li>\r\n                <a>\r\n                    <i class=\"fa fa-file-excel-o\" style=\"margin-right: 5px;color: green;\"></i>\r\n                    <span>Export To Excel</span>\r\n                </a>\r\n            </li>\r\n            <li>\r\n                <a>\r\n                    <i class=\"fa fa-file-pdf-o\" style=\"margin-right: 5px;color: red;\"></i>\r\n                    <span>Export To PDF</span>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n\r\n</div>\r\n\r\n");}]);
(function () {
    angular.module('rainGrid').factory('rainGridService',
        ['$parse', '$modal', 'rainGridConfig', rainGridService]);

    function rainGridService($parse, $modal, rainGridConfig) {
        var baseUrl = rainGridConfig.baseUrl;
        return {
            baseUrl: baseUrl,
            rainGridLinkFunc: rainGridLinkFunc,
            modifyPaginationIcons: modifyPaginationIcons,
            getDataListByPage: getDataListByPage,
            buildGridData: buildGridData,
            sortData: sortData,
            showFilterModal: showFilterModal,
            getFilterConstraintsByColumnType: getFilterConstraintsByColumnType,
            filterData: filterData
        };

        // Service Functions

        function rainGridLinkFunc(params, linkFunctions) {
            var field = _.find(params.row, function (col) {
                return col.fieldName === params.funcIdField;
            });
            if (field) {
                var id = field.value;
                var func = params.funcName + '(' + id + ')';
                var parseFunc = $parse(func);
                parseFunc(linkFunctions);
            }
        }

        function getDataListByPage(dataList, page, pageSize) {
            // page starts with 1
            if (!dataList || page <= 0) {
                return null;
            }
            try {
                //dataList = sortData(dataList);

                var start = (page - 1) * pageSize;
                var pagedData = _.slice(dataList, start, start + pageSize);
                if (!pagedData) {
                    return null;
                }
                return pagedData;
            } catch (e) {
                console.log(e.message);
                return null;
            }
        }   // end of getDataListByPage

        function buildHeader(columnDefs) {
            var row = [];
            angular.forEach(columnDefs, function (col) {
                row.push({
                    fieldName: col.field,
                    displayName: col.displayName,
                    isHidden: col.isHidden
                });
            });
            return row;
        }   // end of buildHeader

        function buildGridData(gridOptions) {
            var list = gridOptions.dataList;
            var columnDefs = gridOptions.columnDefs;
            var idField = null;
            var id = null;


            var gridList = {rows: [], header: buildHeader(columnDefs)};
            if (list.length == 0) {
                return gridList;
            }
            gridList.rows = _.map(list, function (rowData) {
                var row = [];
                if (!columnDefs) {
                    for (var property in rowData) {
                        if (rowData.hasOwnProperty(property)) {
                            row.push(
                                {
                                    fieldName: property,
                                    value: rowData[property],
                                    displayName: property
                                });
                        }
                    }
                } else {
                    idField = gridOptions.idField;
                    if (idField) {
                        id = rowData[gridOptions.idField];
                    }
                    angular.forEach(columnDefs, function (col) {
                        row.push({
                            id: rowData[gridOptions.idField],
                            fieldName: col.field,
                            value: rowData[col.field]||col.field,
                            displayName: col.displayName,
                            isCheckbox: col.isCheckbox,
                            isCurrency: col.isCurrency,
                            isNumber: col.isNumber,
                            decimal: col.decimal,
                            isLink: col.isLink,
                            isButton: col.isButton,
                            isDate: col.isDate,
                            isHidden: col.isHidden || false,
                            linkFunc: col.linkFunc || {funcName: '', funcIdField: ''}
                        });
                    });
                }
                return {rowData: row, rowSelected: false, idField: idField, id: id};
            });
            if (gridOptions.selectFirstRow && gridList.rows.length > 0) {
                gridList.rows[0].rowSelected = true;
            }

            return gridList;
        }   // end of buildGridData

        // Sorting
        function sortData(dataList, sortings, sortField, sortIndex) {
            var sortOrder = sortings[sortIndex];
            if (!sortField || !sortOrder) {
                return dataList;
            }
            var sortedData = _.sortBy(dataList, function (row) {
                var rowData = row.rowData;
                var sortedValue = null;
                for (var i = 0; i < rowData.length; i++) {
                    if (rowData[i].fieldName === sortField) {
                        sortedValue = rowData[i].value;
                        return sortedValue;
                    }
                }
            });
            return sortOrder === sortings[1] ? sortedData : sortedData.reverse();
        }   // end of sortData

        function modifyPaginationIcons() {
            $('ul.pagination a:contains("<<"):first').html("<i class='fa fa-angle-double-left page-arrow'></i>");
            $('ul.pagination a:contains(">>"):first').html("<i class='fa fa-angle-double-right page-arrow'></i>");
            $('ul.pagination a:contains("<"):first').html("<i class='fa fa-angle-left page-arrow'></i>");
            $('ul.pagination a:contains(">"):first').html("<i class='fa fa-angle-right page-arrow'></i>");
        }

        // Filtering
        function showFilterModal(gridOptions, filters) {
            var modalInstance = $modal.open({
                templateUrl: baseUrl + 'rainGridFilterModal/rainGridFilterModalTemplate.html',
                controller: 'rainGrid.filterModal.controller',
                resolve: {
                    columnDefs: function () {
                        return gridOptions.columnDefs;
                    },
                    filters: function () {
                        return filters;
                    }
                }
            });

            return modalInstance.result;
            /*modalInstance.result.then(function (obj) {
             // return value from $modalInstance.close(obj)
             }, function () {
             });*/
        }   // end of showFilterModal

        function getFilterConstraintsByColumnType(col) {
            var constraints = [];
            var type = 'text';
            if (col.isNumber || col.isCurrency) {
                type = 'number';
            } else if (col.isBoolean) {
                type = 'bool';
            } else if (col.isDate) {
                type = 'date';
            }
            switch (type) {
                case 'number':
                    constraints = [
                        {label: 'equal to', value: 'equalTo'},
                        {label: 'greater than', value: 'greaterThan'},
                        {label: 'less than', value: 'lessThan'}
                    ];
                    break;
                case 'bool':
                    constraints = [
                        {label: 'equal to', value: 'equalTo'}
                    ];
                    break;
                case 'date':
                    constraints = [
                        {label: 'equal to', value: 'equalTo'},
                        {label: 'greater than', value: 'greaterThan'},
                        {label: 'less than', value: 'lessThan'}
                    ];
                    break;
                default :
                    constraints = [
                        {label: 'equal to', value: 'equalTo'},
                        {label: 'greater than', value: 'greaterThan'},
                        {label: 'less than', value: 'lessThan'},
                        {label: 'contains', value: 'contains'},
                        {label: 'starts with', value: 'startsWith'}
                    ];
            }
            return constraints;
        }   // end of getFilterConstraintsByColumnType

        function filterData(_dataRows, filters) {

            var _dataList = [];

            // if there's not filter, just return the original data list
            if (filters.length === 0 || !filters[0].col) {
                _dataList = _dataRows;
                return _dataList;
            }

            _dataList = _.filter(_dataRows, function (row) {
                var rowData = row.rowData;
                var condition = true;
                for (var i = 0; i < rowData.length; i++) {
                    var column = rowData[i];
                    for (var j = 0; j < filters.length; j++) {
                        var filter = filters[j];
                        var filteredField = filter.col.value;
                        var filterConstraint = filter.constraint.value;
                        var filterExpression = filter.expression;
                        if (column.fieldName === filteredField) {
                            switch (filterConstraint) {
                                case 'equalTo':
                                    condition = condition && column.value == filterExpression;
                                    break;
                                case 'greaterThan':
                                    condition = condition && column.value > filterExpression;
                                    break;
                                case 'lessThan':
                                    condition = condition && column.value < filterExpression;
                                    break;
                                case 'contains':
                                    condition = condition && column.value.indexOf(filterExpression) >= 0;
                                    break;
                                case 'startsWith':
                                    condition = condition && column.value.indexOf(filterExpression) === 0;
                                    break;
                            }
                            if (!condition) {
                                break;
                            }
                        }
                    }
                    if (!condition) {
                        break;
                    }
                }
                return condition;
            });

            return _dataList;
        }   // end of filterData
    }
})();

/*
 * Accepted attributes: title, sub-title, router, icon-file
 * */
angular.module('rainFramework', ['rainMenu']);

angular.module("rainFramework").run(["$templateCache", function($templateCache) {$templateCache.put("rainModules/rainFramework/rainFrameworkTemplate.html","<div class=r-title-bar><div class=row><div class=\"r-logo-area col-sm-6\"><img ng-src={{iconFile}} alt class=r-icon><div class=r-title-area><p class=r-logo-title>{{headerTitle}}</p><p class=r-logo-subtitle>{{headerSubTitle}}</p></div><div ng-if=isMenuButtonVisible class=\"r-collapsed-menu pull-right\"><button class=\"btn r-nav-button\" ng-click=menuButtonClicked()><i class=\"fa fa-bars\"></i></button></div></div><div class=\"r-right-side-controls col-sm-6\"><div><div style=\"display: inline-block;margin-top: 5px;margin-right: 10px;\">Welcome <strong>{{username}}!</strong></div><button class=\"btn btn-sm btn-default btn-hover-border\" ng-click=logout()><i class=\"fa fa-sign-out\"></i> Log out</button></div><div class=pull-right></div></div></div></div><div ng-transclude></div><div ng-switch=routerName class=rain-view ng-class=\"{\'rain-view-full-width\':isFullWidth()}\"><div ng-switch-when=NGNEWROUTER><ng-viewport>{{routeString}}</ng-viewport></div><div ng-switch-when=UIROUTER><div ui-view></div></div><div ng-switch-default><div ng-view>{{routeString}}</div></div></div>");}]);
/*
* Accepted attributes: title, sub-title, router, icon-file
* */

(function () {
    angular.module('rainFramework').directive('rainFramework', rainFramework);

    function rainFramework() {
        return {
            transclude: true,
            scope: {
                headerTitle:'@',
                headerSubTitle:'@',
                iconFile:'@',
                router:'@'
            },
            controller: 'rainFramework.controller',
            templateUrl: 'rainModules/rainFramework/rainFrameworkTemplate.html'
        }
    }
})();

/*
 * event to broadcast:   'rain-menu-show','rain-change-route-event'
 * event to watch:       'rain-menu-item-selected-event','rain-menu-orientation-changed-event'
 * router:               'ngRoute','uiRouter','ngNewRouter'
 * */

(function () {
    angular.module('rainFramework').controller('rainFramework.controller', [
        '$scope'
        , '$window'
        , '$timeout'
        , '$rootScope'
        , 'rainService.currentUser'
        , 'rainService.oauth'
        , rainFrameworkCtrl]);

    function rainFrameworkCtrl($scope, $window, $timeout, $rootScope, currentUser,oauth) {

        $scope.isMenuButtonVisible = true;
        $scope.isVerticalMenuVisible = true;
        $scope.isMenuVertical = true;
        $scope.routerName = $scope.router.trim().toUpperCase();
        $scope.username = currentUser.profile.username;
        $scope.logout = logout;
        $scope.isFullWidth = function () {
            return !$scope.isMenuVertical || !$scope.isVerticalMenuVisible;
        };

        activate();

        //---- functions ----//

        function activate() {
            setupEvents();

            // avoid from running within the digest cycle, wrap it in $timeout with delay=0
            $timeout(function () {
                checkWidth();
            }, 0);
        }

        function setupEvents() {
            $scope.$on('rain-menu-item-selected-event', function (event, data) {
                $scope.routeString = data.route;
                if ($scope.routeString) {
                    broadcastRoute($scope.routeString);
                }
                checkWidth();
            });

            $scope.$on('rain-menu-orientation-changed-event', function (event, data) {
                $scope.isMenuVertical = data.isMenuVertical;
            });


            // in jQuery, we can add a namespace to an event (here is 'rainFramework')
            $($window).on('resize.rainFramework', function () {
                $scope.$apply(function () {
                    checkWidth();
                })
            });

            $($window).on('$destroy', function () {
                // remove the handler
                $($window).off('resize.rainFramework');
            });

            $scope.menuButtonClicked = function () {
                $scope.isVerticalMenuVisible = !$scope.isVerticalMenuVisible;
                var width = Math.max($window.innerWidth, $($window).width());
                $scope.isMenuVertical = (width < 768);
                broadcastMenuState();
                //$scope.$apply();
            }
        }

        function broadcastMenuState() {
            $rootScope.$broadcast('rain-menu-show', {
                show: $scope.isVerticalMenuVisible,
                isVertical: $scope.isMenuVertical,
                allowHorizontalMenu: !$scope.isMenuButtonVisible
            })
        }

        function logout() {
            oauth.logout();
            $scope.$emit('AUTHENTICATION_EVENT', {
                statusCode: 401,
                eventSource:'rainFramework.controller.logout'
            });
        }

        // inform the application to switch route
        function broadcastRoute(routeString) {
            $rootScope.$broadcast('rain-change-route-event', {route: routeString});
        }

        function checkWidth() {
            var width = Math.max($window.innerWidth, $($window).width());
            $scope.isVerticalMenuVisible = (width >= 768);
            $scope.isMenuButtonVisible = !$scope.isVerticalMenuVisible;
            broadcastMenuState();
        }

    }
})();


(function () {
    angular.module("rainForm", []);
})();
(function () {
    var module = angular.module("rainForm");

    module.directive("formInput", formInput);

    /*  -- directive formInput -- */

    function formInput ($compile) {

        return {
            restrict: "A",
            require: "^form",
            link: link($compile)
        };

    }

    // -- functions -- //

    var watcherFor = function (form, name) {
        return function () {
            if (name && form[name]) {
                if (form.$submitted) {
                    return form[name].$invalid;
                }
                if (!form[name].$dirty) {
                    return false;
                }
                return form[name].$invalid;
            }
        };
    };

    var updaterFor = function (element) {
        return function (hasError) {
            if (hasError) {
                element.addClass("has-error");
                element.find('.help-block').show();
                //.removeClass("has-success");
            } else {
                element.removeClass("has-error");
                element.find('.help-block').hide();
                //.addClass("has-success");
            }
        };
    };

    var setupDom = function (element, $compile, scope) {

        if (!element.hasClass('form-group') && element.find('.form-group').length === 0) {
            var html = element.html();
            var newHtml = '<div class="form-group form-group-sm">' + html + '</div>'
            element.html($compile(newHtml)(scope));
        } else {
            element.addClass('form-group-sm');
        }


        var label = element[0].querySelector("label");
        if (label) {
            label.classList.add("control-label");
        }

        var input = element[0].querySelector("input, textarea, select,[ng-model]");
        if (input) {
            var type = input.getAttribute("type");
            var name = input.getAttribute("name");
            if (type !== "checkbox" && type !== "radio") {
                input.classList.add("form-control");
            }
            return name;
        }
    };

    var addMessages = function (form, element, name, $compile, scope) {

        // if ng-messages block already exists, just return.
        if (element.find('div[ng-messages]').length > 0 || element.find('span[ng-messages]').length > 0) {
            return;
        }

        // adding the generic error messages template to the current form
        var formElement = element.closest('form');
        if ($('body').find('#rain-form-error-messages').length === 0) {
            var messageBlock = getGenericErrorMessages();
            $('body').prepend($compile(messageBlock)(scope));
        }

        // adding the ng-messages block
        var messages = "<span class='help-block' ng-messages='" +
            form.$name + "." + name + ".$error" +
            "' ng-messages-include='rain-form-error-messages'>" +
                //"<div ng-message='minlength'>length must be larger than 3</div>" +
            "<span>";
        element.append($compile(messages)(scope));
    };

    var link = function ($compile) {
        return function (scope, element, attributes, form) {
            var name = setupDom(element, $compile, scope);
            if (name) {
                //addMessages(form, element, name, $compile, scope);
            }
            scope.$watch(watcherFor(form, name), updaterFor(element));
        }
    };

    function getGenericErrorMessages() {

        var msg = '<script type="text/ng-template" id="rain-form-error-messages">' +
            '<span ng-message="required">This field is required</span>' +
            '<span ng-message="minlength">This field is too short</span>' +
            '</script>';
        return msg;
    }

})();


(function () {
    var app = angular.module('rainCheckbox', []);
    app.directive('rainCheckbox', [rainCheckboxDirective]);

    function rainCheckboxDirective() {
        return {
            restrict: "AE",
            template: getTemplate(),
            replace: false,
            scope: {
                rainCheckbox: '=',
                text: '@',
                readonly: '=',
                onChanging: '&'
            },
            controller: function ($scope) {
                $scope.onclick = function () {
                    if ($scope.readonly === true) {
                        return;
                    }
                    $scope.rainCheckbox = !$scope.rainCheckbox;
                    $scope.onChanging();
                };

            },
            link: function (scope, element) {
                setReadOnly();
                scope.$watch('readonly', function () {
                    setReadOnly();
                });
                function setReadOnly() {
                    var label = element.find('input:checkbox+label');
                    if (scope.readonly === true) {
                        label.addClass('readonly');
                    } else {
                        label.removeClass('readonly');
                    }
                }
            }
        }
    }

    function getTemplate() {
        return '<div class="rain-checkbox-container">' +
            '<div class="checkbox-image">' +
            '<div  class="rain-checkbox">' +
            '<input type="checkbox" ng-model="rainCheckbox" style="display: inline;"/>' +
            '<label class="checkbox-label" ng-click="onclick()"></label>' +
            '</div>' +
            '</div>' +
            '<div class="checkbox-text">' +
            '{{text}}</div>' +
            '</div>';
    }
})();