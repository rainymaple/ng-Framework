(function () {

    var _eventEditUser = 'userAdminCtrl.editUser';
    var _eventDeleteUser = 'userAdminCtrl.deleteUser';

    var module = angular.module('app-framework');

    module.controller("permissionCtrl", [
        "$scope"
        , 'northWindRequests'
        ,'commonService'
        , "rainService.repository"
        , "dbEntityConfig"
        , 'rainService.confirm'
        , permissionCtrl]);

    function permissionCtrl($scope,northWindRequests,commonService, repositoryService, dbEntityConfig, confirmModal) {

        var _entityUser = dbEntityConfig.entities.user;
        var _entityRole = dbEntityConfig.entities.role;
        var _message = commonService.showMessage;

        $scope.requests =northWindRequests.getRequest();

    }

    // rainGrid functions


})();