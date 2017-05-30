var app = angular.module('apiApp', ['ngRoute','ngStorage']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
            templateUrl : 'pages/main.html',
            controller  : 'mainController'
        })
        .when('/login', {
            templateUrl : 'pages/login.html',
            controller  : 'loginController'
        })
        .when('/userlists', {
            templateUrl : 'pages/userlists.html',
            controller  : 'userListsController'
          })
        .when('/userdetails/:id', {
            templateUrl : 'pages/userdetail.html',
            controller  : 'userDetailsController'
        })
        .when('/logout', {
            templateUrl : 'pages/logout.html',
            controller  : 'logoutController'
        }).otherwise({redirectTo: '/login'});
});

app.controller('mainController', function($rootScope,$scope,$localStorage) {
    $scope.message = 'Everyone come and see how good I look!';
    if(typeof($localStorage.token) != "undefined"){
        $scope.loginBtn=false;
        $scope.logoutBtn=true;
        $scope.userListBtn=true;
    }else{
        $scope.loginBtn=true;
        $scope.logoutBtn=false;
        $scope.userListBtn=false;
    }

    $rootScope.$on("loginBtnVisibility", function(event,args){
        $scope.loginBtn=args.loginBtn;
    });

    $rootScope.$on("logoutBtnVisibility", function(event,args){
        $scope.logoutBtn=args.logoutBtn;
    });

    $rootScope.$on("userListBtnVisibility", function(event,args){
        $scope.userListBtn=args.userListBtn;
    });
});

app.controller('loginController', function($rootScope,$http,$scope,$localStorage,$location) {
    $scope.message = 'Look! I am an login page.';
    $scope.$storage = $localStorage;

    if(typeof($localStorage.token) != "undefined"){
        $location.path( "/" );
    }

    $scope.login = function () {
        $scope.dataLoading = true;
        $http({
            url: 'http://test.com/api/index.php/Login',
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            params: {username: $scope.username, password: $scope.password}
        })
        .then(function(response) {
              $scope.dataLoading = false;
              if(response.data.error==false){
                  delete $scope.$storage.token;
                  delete $localStorage.token;
                  $scope.$storage = $localStorage.$default({
                      token:response.data.token
                  });

                  $rootScope.$broadcast('loginBtnVisibility', { loginBtn: false });
                  $rootScope.$broadcast('logoutBtnVisibility', { logoutBtn: true });
                  $rootScope.$broadcast('userListBtnVisibility', { userListBtn: true });

                  $location.path( "/" );
              }else{
                  $scope.error="Böyle bir kayıt bulunamadı!";
              }
        });
    };
});

app.controller('logoutController', function($rootScope,$scope,$http,$localStorage) {
    $scope.message = 'Goodby Look! I am an logout page.';
    $scope.$storage = $localStorage;

    $http({
        url: 'http://test.com/api/index.php/Logout',
        method: "GET",
    })
    .then(function(response) {
        if(response.data.error==false){
            delete $scope.$storage.token;
            delete $localStorage.token;

            $rootScope.$broadcast('loginBtnVisibility', { loginBtn: true });
            $rootScope.$broadcast('logoutBtnVisibility', { logoutBtn: false });
            $rootScope.$broadcast('userListBtnVisibility', { userListBtn: false });
        }
    });
});

app.controller('userListsController', function($rootScope,$http,$scope,$localStorage,$location) {
    $scope.message = 'Look! I am an UserList page.';

    $scope.$storage = $localStorage;
    if(typeof($localStorage.token) == "undefined"){
        $location.path( "/" );
    }

    $rootScope.$broadcast('loginBtnVisibility', { loginBtn: false });
    $rootScope.$broadcast('logoutBtnVisibility', { logoutBtn: true });
    $rootScope.$broadcast('userListBtnVisibility', { userListBtn: true });

    $scope.dataLoading = true;

    $http({
        url: 'http://test.com/api/index.php/UserList',
        method: "GET",
        headers: {'Token-Authorization-X': 'Basic '+$localStorage.token}
    })
    .then(function(response) {
        $scope.dataLoading = false;
        $scope.lists=response.data;
    }, function errorCallback(response) {
        $scope.dataLoading = false;
        $scope.lists=response.data;
    });
});

app.controller('userDetailsController', function($rootScope,$http,$scope,$localStorage,$location,$routeParams) {
    $scope.message = 'Look! I am an UserGet page.';

    $scope.$storage = $localStorage;
    if(typeof($localStorage.token) == "undefined"){
        $location.path( "/" );
    }

    $rootScope.$broadcast('loginBtnVisibility', { loginBtn: false });
    $rootScope.$broadcast('logoutBtnVisibility', { logoutBtn: true });
    $rootScope.$broadcast('userListBtnVisibility', { userListBtn: true });

    $scope.dataLoading = true;

    $http({
        url: 'http://test.com/api/index.php/UserGet/'+$routeParams.id,
        method: "GET",
        headers: {'Token-Authorization-X': 'Basic '+$localStorage.token}
    })
    .then(function(response) {
        $scope.dataLoading = false;
        $scope.detail=response.data;
    }, function errorCallback(response) {
        $scope.dataLoading = false;
        $scope.detail=response.data;
    });
});