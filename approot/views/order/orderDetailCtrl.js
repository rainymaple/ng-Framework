(function(){
    var module = angular.module('app-framework');

    module.controller('orderDetailEditCtrl', [
        '$scope'
        , '$state'
        , 'rainService.repository'
        , 'dbEntityConfig'
        , orderDetailEditCtrl]);

    function orderDetailEditCtrl($scope,$state,repositoryService, dbEntityConfig){

    }

})();
