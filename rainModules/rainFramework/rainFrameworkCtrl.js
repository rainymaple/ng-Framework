(function (module) {
    angular.module(module).controller('rainFrameworkCtrl', ['$scope',rainFrameworkCtrl]);


    function rainFrameworkCtrl($scope) {
        $scope.$on('rain-menu-item-selected-event',function(event,data){
            $scope.routeString = data.route;
        })
    }
})('rainFramework');

