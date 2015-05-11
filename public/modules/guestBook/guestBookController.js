
// The guest book module. Defined in guestBookModel.js.
angular.module('guestBook')

.controller('guestBookController', function ($scope, guestBookModelSvc) {
  
   //phone number regex pattern for validation. Based on NANP standard (I did not write this expression :) ).
    $scope.phoneNumberPattern = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

  	//get all available guest book messages
    $scope.getAllMessages = function ()
    {
        guestBookModelSvc.getGuestBookMessages().then(function (result) {
        	 $scope.allMessages = result.reverse(); //show the latest message entries first
        }, function (error) {
        	$scope.dataError = error;
        });
    },

    $scope.getAllMessages(); //preload

    //add a new message through the guestBookModelSvc model service
	$scope.addMessage = function (message, phoneNo)
    {
        guestBookModelSvc.addGuestBookMessage(message, phoneNo).then(function (result) {        	
        	$scope.getAllMessages(); //refresh the message list
        	$scope.message = null; //clear the UI fields
        	$scope.phoneNo = null;
        	$scope.messageReceived = true;
        }, function (error) {
        	$scope.dataError = error;
        });
    }   
})
