
// The states module
angular.module('states')

//Main states controller. Responsible for managing the module views and the direct lookup feature that is 'always on'
.controller('statesController', function ($scope, statesModelSvc) {

    //fetch all abbreviations for a dropdown that will provide quick access to any state's details
    statesModelSvc.getAllStatesAbbreviations().then(function (data) {
        $scope.statesAbbreviations = data;
    }, function (error) {
        $scope.dataError = error;
    });

    $scope.screens = ["browse", "detail"]; //user can switch between browsing all available states or a details of a state view
    $scope.screenHeaders = [
        "Fifty states compose the United States of America. Want to learn more? We've assembled some great facts about each one below - take a look!",
        "State Details"
    ];
    $scope.currentScreen = $scope.screens[0]; //default view allows user to browse states
    $scope.currentScreenHeader = $scope.screenHeaders[0];

    //handle user request for a different feature
    $scope.setScreen = function (index)
    {
        if ($scope.currentScreen != $scope.screens[index])
        {
            $scope.currentScreen = $scope.screens[index];
            $scope.currentScreenHeader = $scope.screenHeaders[index];
        }

        if (index == 0)
        { $scope.currentState = ''; } //in browse mode there is no selected state        
    };

    //determine the feature that the user requested and load the appropriate template
    $scope.getScreen = function ()
    {
        return $scope.currentScreen == $scope.screens[0] ? "modules/states/partialViews/statesGrid.html" : "modules/states/partialViews/statesDetail.html";
    };

    $scope.stateSelected = function(stateAbbr)
    {
        $scope.setScreen(1); //activate the state details view
    }
})

