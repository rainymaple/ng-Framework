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
