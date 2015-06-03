/*
* Accepted attributes: title, sub-title, router, icon-file
* */

(function () {
    angular.module('rain.framework').directive('rainFramework', rainFramework);

    function rainFramework() {
        return {
            transclude: true,
            scope: {
                headerTitle:'@',
                headerSubTitle:'@',
                iconFile:'@',
                router:'@'
            },
            controller: 'rain.framework.controller',
            templateUrl: 'rainModules/rainFramework/rainFrameworkTemplate.html'
        }
    }
})();
