(function () {
    var module = angular.module('rainService');

    module.factory('rainService.repository', ['$http', '$timeout', repositoryService]);

    // entity is defined in dbEntityConfig

    function repositoryService($http, $timeout) {
        return {
            getDataList: getDataList,
            getDataById: getDataById,
            deleteDataById: deleteDataById,
            deleteDataByQueryString:deleteDataByQueryString,
            addOrUpdateData: addOrUpdateData
        };


        function getDataList(entity) {
            // simulate delay of getting data from backend
            return $timeout(function () {
                return $http.get(entity.url).then(function (result) {
                    return result.data;
                });
            }, 200);

            /* return $http.get(entity.url).then(function (result) {
             return result.data;
             });*/
        }

        function getDataById(entity, id) {
            return $http.get(entity.url + '/' + id).then(function (result) {
                return result.data;
            });
        }

        function deleteDataById(entity, id) {
            return $http.delete(entity.url + '/' + id).then(function (result) {
                return result.data;
            });
        }

        function deleteDataByQueryString(entity, queryString) {
            return $http.delete(entity.url + '?' + queryString).then(function (result) {
                return result.data;
            });
        }

        function addOrUpdateData(entity, object) {
            return $http.post(entity.url,object).then(function (result) {
                return result.data;
            });
        }

    }
})();

