
//login module definition
var login = angular.module('login',['userSession']);

//login controller
login.controller('loginController', function($scope, $location, authSvc) {

	/*
		Exposes the authentication method of the authSvc in userSessiionService.js
		Redirects to the States module on successful login
		Sets AuthenticationError property on the scope if authentication fails
	*/
    $scope.authenticate = function (user, pass) {

        authSvc.authenticate(user, pass).then(function (result) {
        	$location.path("/states");
        }, function (error) {
        	$scope.authenticationError = error;
        })
    }
})


