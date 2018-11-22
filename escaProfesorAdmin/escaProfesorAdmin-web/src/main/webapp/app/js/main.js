var app = angular.module('administracion', ['ngRoute']);

app.factory('servicesLoc', function () {
    return '../webresources/';
});

app.controller('welcomeController',
        function () {
        });

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});

app.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider) {
//        $sceDelegateProvider.resourceUrlWhitelist([
//            // Allow same origin resource loads.
//            'self',
//            // Allow loading from our assets domain.  Notice the difference between * and **.
//            'http://localhost:8081/mansysSS/professor/generic/*'
//        ]);
//
//        // The blacklist overrides the whitelist so the open redirect here is blocked.
//        $sceDelegateProvider.resourceUrlBlacklist([
//            'http://myapp.example.com/clickThru**'
//        ]);
        $routeProvider.when('/', {
            templateUrl: 'welcome.html',
            controller: 'welcomeController'
        });
        $routeProvider.when('/profesor', {
            templateUrl: 'profesor.html',
            controller: 'profesorController'
        });
        $routeProvider.when('/profesor/detail/:personId', {
            templateUrl : 'profesor_detail.html',
            controller : 'profDetailsController'
        });
        $routeProvider.when('/curso', {
            templateUrl: 'curso.html',
            controller: 'cursoController'
        });
        $routeProvider.when('/periodo', {
            templateUrl: 'periodo.html',
            controller: 'periodoController'
        });
        $routeProvider.when('/calificacion', {
            templateUrl: 'calificacion.html',
            controller: 'calificacionController'
        });
        $routeProvider.when('/cambioContra', {
            templateUrl: 'cambioContra.html',
            controller: 'cambioContraController'
        });
        $routeProvider.when('/oposicion', {
            templateUrl: 'oposicion.html',
            controller: 'oposicionController'
        });
        $routeProvider.when('/archivo', {
            templateUrl: 'archivo.html',
            controller: 'arvhivoController'
        });
        $routeProvider.when('/perfil', {
            templateUrl: 'perfil.html',
            controller: 'perfilController'
        });
// .otherwise({
// redirectTo : 'databases.html'
// });
// $locationProvider.html5Mode(true); //Remove the '#' from URL.
    }
]);

app.controller('profesorController', ['$scope', '$http', '$location', '$routeParams', 'servicesLoc',
    function ($scope, $http, $location, $routeParams, servicesLoc) {

        $scope.searchResult = [];
        $scope.queryProfessors = function () {
            if ($scope.query !== undefined && validQuery($scope.query))
                $http.get(servicesLoc + "professor/generic/" + $scope.query)
                        .success(function (data) {
                            $scope.searchResult = data;
                        })
                        .error(function (error, status) {
                            alert("An error ocurs: " + error + " " + status);
                        });
        };

        validQuery = function (query) {
            var validChars = /^[a-zA-Z!@#\$%\^\&*\) ]+$/g;
            if (query === undefined || query.length === 0 || !validChars.test(query))
                return false;
            return true;
        };

        $scope.getProfessorDetails = function (profesor) {
            $scope.changeView('/profesor/detail/' + profesor.idProfesor);
        };

        $scope.changeView = function (view) {
            $location.path(view); // path not hash
        };
    }]);


app.controller('profDetailsController', ['$scope', '$http', '$location', '$routeParams','servicesLoc',
    function ($scope, $http, $location, $routeParams,servicesLoc) {

//        alert("Get the id: "+$routeParams.personId);
        $http({
            method: 'GET',
            url: servicesLoc+'professor/detail/' + $routeParams.personId
        }).then(function (response) {
            $scope.professorDetail = response.data;
        }, function (response) {
            alert("An error ocurs" + response.data);
        });

        $scope.changeView = function (view) {
            $location.path(view); // path not hash
        };
    }]);
