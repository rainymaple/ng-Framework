(function () {
    angular.module('rain.Service').factory('rain.Service.localStorage', ['$window', localStorage]);
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