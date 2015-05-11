angular.module("states")

//State Details directive. A report-like view of a single state's data.
.directive("stateDetails", function (statesModelSvc) { 


    return {
        
        restrict: "EA",

        //avoid rendering in the link function, using template instead
        templateUrl: "/components/stateDetails/stateDetails.html",

        //isolate scope
        scope: {
            stateAbbr: '@'
        },
        
        link: function (scope, element, attrs, ngModel) 
        {
            //get the state information
            var updateData = function(){
                statesModelSvc.getStateDetails(scope.stateAbbr).then(function (data) {
                    scope.currentStateDetails = data;
                }, function (error) {
                    scope.dataError = error;
                })
            }

            updateData();

            //watch for state selection change
            scope.$watch("stateAbbr", function(newVal, oldVal) {
                if (newVal)
                {
                    updateData();
                }
            })
        }        
    };
});