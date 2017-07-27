angular.module('myApp',['ngStorage', 'ngRoute', 'angular-loading-bar'])
    .constant('urls', {
        BASE: '/localhost/Laravel-Angularjs/public/api/',
        BASE_API: ''
    })
    .config(function ($routeProvider, $httpProvider) {

        $routeProvider.
            when('/',{
                templateUrl:'partiarls/home.html',
                controller:'controller'
        }).when('/signin',{
            templateUrl:'partiarls/signin.html',
            controller:'controller'
        }).when('/signup',{
            templateUrl:'partiarls/signup.html',
            controller:'controller'
        }).when('/ver',{
            templateUrl:'partiarls/home.html',
            controller:'verController'
        }).when('/teste',{
            templateUrl:'partiarls/teste.html'

        })
            .otherwise({
            redirectTo: '/'
        });
        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);



    });

