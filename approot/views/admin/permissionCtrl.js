(function () {

    var module = angular.module('app-framework');

    module.controller("permissionCtrl", [
        "$scope"
        , 'northWindRequests'
        , 'commonService'
        , "rainService.repository"
        , "dbEntityConfig"
        , 'rainService.dialog'
        , permissionCtrl]);

    function permissionCtrl($scope, northWindRequests, commonService, repositoryService, dbEntityConfig, dialogService) {

        var _entityUser = dbEntityConfig.entities.user;
        var _entityRole = dbEntityConfig.entities.role;
        var _message = commonService.showMessage;
        $scope.permissions = null;
        $scope.roles = null;

        activate();


        function activate() {
            getRoles();
        }

        function getRoles() {
            return repositoryService.getDataList(_entityRole).then(function (data) {
                $scope.roles = data;
                $scope.permissions = getPermissions();
            });
        }

        function getPermissions() {
            var permissions = northWindRequests.getPermissions();
            return permissions;
        }

    }


})();