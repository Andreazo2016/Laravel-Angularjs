angular.module('myApp')
    .factory('Auth', ['$http', '$localStorage','urls', function ($http, $localStorage, urls) {
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getClaimsFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var tokenClaims = getClaimsFromToken();

        return {
            signup: function (data, success, error) {
                $http.post(urls.BASE + '/signup', data).then(function (success) {
                    console.log("Sucesso Signup "+success);
                    alert("Sucesso Ao se Cadastrar");
                    window.location = urls.BASE;
                },function (error) {
                    console.log("Error Signup" +error);
                    alert("Ops! Aconteceu um error. kk");
                });
            },
            signin: function (data, success, error) {
                $http.post(urls.BASE + '/signin', data).then(function (res) {
                    $localStorage.token =  res.data.token;
                    console.log("Sucesso Signin => " + res.data.token);
                    alert("Bem-vindo.");
                    window.location = urls.BASE;
                },function (error) {
                    console.log("Error Signin"+ error);
                    alert("Erro o se Logar..");
                    alert("Usuario não Autorizado");

                });
            },
            logout: function (success) {
                tokenClaims = {};
                delete $localStorage.token;
                success();
            },
            getTokenClaims: function () {
                return tokenClaims;
            },
            //Função de Teste==========
            getTeste: function () {
                $http.get(urls.BASE_API + "/restrita")
                    .then(function (sucesso) {
                        console.log(sucesso.data);
                        console.log("retorn sucesso Teste");
                    },function (erro) {

                        console.log("retorn teste error");
                    });

            }
            //=============================
        };
    }
    ]);
