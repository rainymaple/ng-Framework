(function () {

    var _eventEditUser = 'userAdminCtrl.editUser';
    var _eventDeleteUser = 'userAdminCtrl.deleteUser';

    var _roleAdmin = 'role-admin';
    var module = angular.module('app-framework');

    module.controller("permissionCtrl", [
        "$scope"
        , 'northWindRequests'
        , 'commonService'
        , "rainService.repository"
        , "dbEntityConfig"
        , 'rainService.confirm'
        , permissionCtrl]);

    function permissionCtrl($scope, northWindRequests, commonService, repositoryService, dbEntityConfig, confirmModal) {

        var _entityUser = dbEntityConfig.entities.user;
        var _entityRole = dbEntityConfig.entities.role;
        var _message = commonService.showMessage;
        $scope.permissions = null;
        $scope.roles = null;
        $scope.addRole = addRole;
        $scope.deleteRole = deleteRole;
        $scope.onRoleModifyChanging =onRoleModifyChanging;

        //$scope.permissions = getPermissions();
        getRoles();


        function addRole() {
            angular.forEach($scope.permissions, function (p) {
                if (p.selectedRole) {
                    p.roles.push({key: p.selectedRole.key, modify: false, read: false});
                    p.selectedRole = null;
                }
            });
            updatePermissionRoles($scope.permissions);
        }

        function deleteRole(permission, role) {
            var permissionFound = _.find($scope.permissions, function (p) {
                return permission.resource === p.resource;
            });
            if (permissionFound) {
                _.remove(permissionFound.roles, function (r) {
                    return role.key === r.key;
                });
                updatePermissionRoles($scope.permissions);
            }
        }

        function getPermissions() {
            var permissions = northWindRequests.getPermissions();
            updatePermissionRoles(permissions);
            return permissions;
        }

        function getRoles() {
            return repositoryService.getDataList(_entityRole).then(function (data) {
                $scope.roles = data;
                $scope.permissions = getPermissions();
            });
        }

        function updatePermissionRoles(permissions) {
            angular.forEach(permissions, function (p) {
                p.rolesForAdd = angular.copy($scope.roles);
                p.selectedRole = null;
                angular.forEach(p.roles, function (r) {
                    _.remove(p.rolesForAdd, function (ra) {
                        return ra.key === r.key;
                    });
                    r.readonly = r.key === _roleAdmin;
                    var role = _.find($scope.roles, function (ro) {
                        return ro.key === r.key;
                    });
                    if (role) {
                        r.name = role.name;
                    }
                })
            });
        }

        function onRoleModifyChanging(role) {
            // role.modify is not changed yet when this event happens
            var modify = !role.modify;
            if(modify===true){
                role.read=true;
            }
        }
    }

    // rainGrid functions


})();