angular.module('myApp')
    .controller('controller', ['$rootScope', '$scope', '$location', '$localStorage', 'Auth',
        function ($rootScope, $scope, $location, $localStorage, Auth) {
            function successAuth(res) {
                $localStorage.token = res.token;
                window.location = "/";
            }

            $scope.signin = function () {
                var formData = {
                    email: $scope.email,
                    password: $scope.password
                };

                Auth.signin(formData, successAuth, function () {
                    $rootScope.error = 'Invalid credentials.';
                })
            };

            $scope.signup = function () {
                var formData = {
                    email: $scope.email,
                    password: $scope.password
                };

                Auth.signup(formData, successAuth, function () {
                    $rootScope.error = 'Failed to signup';
                })
            };

            $scope.logout = function () {
                Auth.logout(function () {
                    window.location = "/"
                });
            };
            $scope.token = $localStorage.token;
            $scope.tokenClaims = Auth.getTokenClaims();
        }])


    .controller('verController', ['$rootScope', '$scope', 'Data', function ($rootScope, $scope, Data) {
    Data.getRestrictedData(function (res) {
        $scope.data = res.data;
    }, function () {
        $rootScope.error = 'Falha ao Buscar Conteudo Restrito.';
    });
    Data.getApiData(function (res) {
        $scope.api = res.data;
    }, function () {
        $rootScope.error = 'Falha ao Buscar Conteudo restrito na API.';
    });
}]);

