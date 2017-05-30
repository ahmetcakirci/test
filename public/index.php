<!DOCTYPE html>
<html ng-app="apiApp">
<head>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" />
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.0/css/font-awesome.css" />

    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.6/ngStorage.min.js"></script>
    <script src="assets/js/script.js"></script>
</head>
<body ng-controller="mainController">
<nav class="navbar navbar-default">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="/">SPA Angular Restful API with PHP Slim Framework</a>
        </div>
        <ul class="nav navbar-nav navbar-right">
            <li><a href="#!/"><i class="fa fa-home"></i> Home</a></li>
            <li ng-if="loginBtn"><a href="#!/login"><i class="fa fa-sign-in"></i>Login</a></li>
            <li ng-if="userListBtn"><a href="#!/userlists"><i class="fa fa-user"></i>UserList</a></li>
            <li ng-if="logoutBtn"><a href="#!/logout"><i class="fa fa-sign-out"></i>Logout</a></li>
        </ul>
    </div>
</nav>

<div class="jumbotron">
    <div class="container">
        <div class="col-xs-offset-2 col-xs-8">
            <div ng-view></div>
        </div>
    </div>
</div>

<footer class="text-center">
    <p>Hasko SPA RESTFUL API</p>
</footer>
</body>
</html>