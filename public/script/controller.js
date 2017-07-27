angular.module('myApp')
    .controller('controller', ['$rootScope', '$scope', '$location', '$localStorage', 'Auth','urls',
        function ($rootScope, $scope, $location, $localStorage, Auth,urls) {
            function successAuth(res) {
                $localStorage.token = res.token;
                window.location = "/";
            }

            $scope.signin = function () {
                var formData = {
                    email: $scope.email,
                    password: $scope.password
                };
                console.log("email: " + $scope.email + " senha: "+$scope.password);

                Auth.signin(formData, successAuth, function (erro) {
                    $rootScope.error = erro;
                });


            };
            //função para teste========
            $scope.teste = function () {
                Auth.getTeste();
            }
            //====================
            $scope.signup = function () {
                var formData = {
                    name:$scope.name,
                    email: $scope.email,
                    password: $scope.password
                };

                Auth.signup(formData, successAuth, function () {
                    $scope.errou = "Erro ao Se logar";
                    $rootScope.error = 'Failha Ao Registrar-se';
                })
            };

            $scope.logout = function () {
                Auth.logout(function () {
                    window.location = urls.BASE;
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

