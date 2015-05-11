
angular.module('guestBook', ['ngAnimate'])

.constant("guestBookReadUrl", "http://localhost:8888/read") //we don't have a configuration module in this sample app, so using constants instead to allow for unit testing and modularity
.constant("guestBookWriteUrl", "http://localhost:8888/write")

.factory("guestBookModelSvc", function ($q, $http, guestBookReadUrl, guestBookWriteUrl)    
{
    return {

        /*
            Get guest book records (All). 
        */
        getGuestBookMessages : function () {
            
            var defer = $q.defer();
            
            $http.get(guestBookReadUrl)
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (error) {
                defer.reject(error);
            });

            return defer.promise;
        },

        /*
            Create a new guest book entry
        */
        addGuestBookMessage : function (message, phone) {
            
            var defer = $q.defer();
            
            $http.post(guestBookWriteUrl, {
                message: message,
                phone: phone,
                headers:  {
                    'Content-Type': 'application/json'                    
                }
            })
            .success(function (data)
            {
                defer.resolve(data);
            })
            .error(function (error)
            {
                defer.reject(error);
            })

            return defer.promise;
        },
    }
});