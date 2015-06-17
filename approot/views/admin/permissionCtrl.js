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

        //$scope.permissions = getPermissions();
        getRoles();


        function getPermissions(roles) {
            var permissions = northWindRequests.getPermissions();
            angular.forEach(permissions, function (p) {
                p.rolesAvailable=angular.copy($scope.roles);
                angular.forEach(p.roles, function (r) {
                    _.remove(p.rolesAvailable,function(ra){
                        return ra.key=== r.name;
                    });
                    r.readonly = r.name === _roleAdmin;
                })
            });
            return permissions;
        }

        function getRoles() {
            return repositoryService.getDataList(_entityRole).then(function (data) {
                $scope.roles = data;
                $scope.permissions =getPermissions($scope.roles);
            });
        }
    }

    // rainGrid functions


})();