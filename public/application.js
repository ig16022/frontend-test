
/*
	Application-level module
*/
angular.module('statesApp', ['ngRoute', 'ngAnimate', 'states','guestBook','login','userSession', 'ngStorage', 'ngGrid'])


.config(function($routeProvider, $httpProvider) {

	$httpProvider.defaults.withCredentials = true; //app's API access with credentials only

    $routeProvider

        // setup routes for the app modules
        .when('/states', {
            templateUrl : 'modules/states/states.html',
            controller  : 'statesController'
        })

        .when('/guestBook', {
            templateUrl : 'modules/guestBook/guestBook.html',
            controller  : 'guestBookController'
        })

        .when('/login', {
            templateUrl : 'modules/login/login.html',
            controller  : 'loginController',
            isLogin : true //allow anonymous access
        })
	    
	    .otherwise({
	        redirectTo: "/login" //path will switch to the /login defined above.
	    });
})


//app-level controller
.controller('appController', function ($scope, authSvc, $location, $rootScope) {
	
	//prevent app navigation of unauthorized users
	$rootScope.$on('$routeChangeStart', function (event, next) {

	        var userAuthenticated = authSvc.isAuthenticated(); /* Check if the user is logged in */

	        if (!userAuthenticated && !next.isLogin) {	            	      
	            $location.path('/login');
	        }
	    });

	//provide access to the logout functionality of the authSvc service	
	$scope.logout = function ()
    {
        authSvc.logout();
        $location.path('/login');
    }

    //expose isAuthenticated method on the scope to allow views to remove sensitive elements for unauthenticated users
    $scope.isUserAuthenticated = function ()
    {
        return authSvc.isAuthenticated();
    }
})