(function () {
    var module = angular.module('app-framework');
    module.directive('permissionAccess', [
        'rainService.dialog'
        , permissionAccess]);


    var _roleAdmin = 'role-admin';

    function permissionAccess(dialogService) {
        return {
            restrict: 'AE',
            scope: {
                permission: '=',
                roles: '='
            },
            templateUrl: 'approot/views/admin/permissionAccessTemplate.html',
            controller: controller
        };

        function controller($scope) {

            $scope.addRole = addRole;
            $scope.deleteRole = deleteRole;
            $scope.onRoleModifyChanging = onRoleModifyChanging;

            activate();

            function activate() {
                updatePermissionRoles();
            }

            function addRole() {
                if ($scope.permission.selectedRole) {
                    $scope.permission.roles.push(
                        {key: $scope.permission.selectedRole.key, modify: false, read: false});
                    $scope.permission.selectedRole = null;
                }
                updatePermissionRoles();
            }

            function deleteRole(role) {
                dialogService.confirmModal('Delete', 'Are you sure to delete this role?', delete_role);

                function delete_role() {
                    _.remove($scope.permission.roles, function (r) {
                        return role.key === r.key;
                    });
                    updatePermissionRoles();
                }
            }

            function updatePermissionRoles() {
                $scope.permission.rolesForAdd = angular.copy($scope.roles);
                $scope.permission.selectedRole = null;
                angular.forEach($scope.permission.roles, function (r) {
                    _.remove($scope.permission.rolesForAdd, function (ra) {
                        return ra.key === r.key;
                    });
                    //todo: remove role that contains _roleAdmin
                    r.readonly = r.key === _roleAdmin;
                    // populate the role name since the role in permission only has the key
                    var role = _.find($scope.roles, function (ro) {
                        return ro.key === r.key;
                    });
                    if (role) {
                        r.name = role.name;
                    }
                })

            }

            function onRoleModifyChanging(role) {
                // role.modify is not changed yet when this event happens
                var modify = !role.modify;
                if (modify === true) {
                    role.read = true;
                }
            }
        }
    }
})();
