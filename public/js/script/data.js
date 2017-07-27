angular.module('myApp')
    .factory('Data', ['$http','urls', function ($http,urls) {

        return {
            getRestrictedData: function (success, error) {
                $http.get(urls.BASE + 'ver').then(function (success) {
                    console.log(success);
                    return success;
                },function (error) {
                    return error;
                });
            },
            getApiData: function (success, error) {
                $http.get(urls.BASE + 'ver').then(function (success) {
                    console.log(success);
                    return success;
                },function (error) {
                    return error;
                });
            }
        };
    }
    ]);