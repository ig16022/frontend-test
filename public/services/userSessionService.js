
angular.module('userSession', ['ngStorage'])

.constant("authUrl", "http://localhost:8888/login") //we don't have a configuration module in this simple app, so using constants instead
.constant("logOutUrl", "http://localhost:8888/logout")

.factory("authSvc", function ($q, $http, $localStorage, authUrl, logOutUrl)    
{ 
    //private - save user data to local storage. These details should not be exposed to service consumers - they are abstracted in the public methods.
    var setUser = function (user) {
        $localStorage.currentUser = user;
    }

    //private - remove user data from local storage (logout helper)
    var removeUser = function () {
        delete $localStorage.currentUser;
    }

    return {

        /*
            Authenticate against the API using username/password combination
        */
        authenticate : function (user, pass) {
            
            var defer = $q.defer();

            $http.post(authUrl, {
                user: user,
                password: pass,
                headers:  {
                    'Content-Type': 'application/json'                    
                }                
            }).success(function (data) {
                setUser(user);
                defer.resolve(user);
            }).error(function (error) {
                removeUser();
                defer.reject(error);
            });

            return defer.promise;
        },


        /*
            Is current user authenticated?
        */
        isAuthenticated : function () {
            
            return !(!$localStorage.currentUser);
        },


        /*
            Logout the user (security cookie will be removedd)   
            Remove the currentUser from authSvc         
        */
        logout : function() {

            removeUser();
            $http.get(logOutUrl).success(function (data) {}).error(function (error) {}); //cookie cleanup
        }
    }
});