
// The states module
angular.module('states')

.controller('statesGridController', function ($scope, statesModelSvc) {

    /*
        Get a batch of state records for the grid view
    */
    $scope.getStates = function (sortField, sortDirection, offset, limit) {

        statesModelSvc.getStates(sortField, sortDirection, offset, limit).then(function (data) {
            $scope.gridStates = data;
        }, function (error) {
            $scope.dataError = error;
        })
    }

    $scope.sortInfo = { fields: ['name'], columns: [], directions: ['asc'] };

    $scope.pagingOptions = { 
        pageSizes: [10],
        pageSize: 10,
        currentPage: 1        
    };


    //fetch the initial set of records to populate the grid
    //$scope.getStates($scope.sortInfo.fields[0], $scope.sortInfo.directions[0], 0, $scope.pagingOptions.pageSize);


    // watch for user grid paging action (page change)
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getStates($scope.sortInfo.fields[0], $scope.sortInfo.directions[0],  ($scope.pagingOptions.currentPage-1) * $scope.pagingOptions.pageSize, $scope.pagingOptions.pageSize);
        }
    }, true);


    //custom sorting implementation allowing server-side sorting activated by clicking on a column header
     $scope.$watch('sortInfo', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            var fieldSort = newVal.fields[0];
            var sortDir = newVal.directions[0];

            $scope.getStates(fieldSort, sortDir,  ($scope.pagingOptions.currentPage-1) * $scope.pagingOptions.pageSize, $scope.pagingOptions.pageSize);
        }
    }, true);


    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: false
    };

    $scope.totalServerItems = 50; //we need an API endpoint to retrieve the state count for the grid's pager, without retrieving all the states

    $scope.pagingOptions = { 
        pageSizes: [10],
        pageSize: 10,
        currentPage: 1        
    };

    $scope.gridOptions = {
        data: 'gridStates',
        enablePaging: true,
        showFooter: true,
        footerTemplate: "/content/ngGridFtrTemplate.html", //For this app we don't need most of the features that are enabled in the footer template by default
        totalServerItems:'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        enableColumnResize: true,
        enablePinning: true,
        multiSelect: false,
        showColumnMenu: false,
        enableSorting: true,
        useExternalSorting: true,
        sortInfo: $scope.sortInfo,
        columnDefs: [
                     {field:'name', displayName:'Name',resizable:true},
                     {field:'abbreviation', displayName:'Abbreviation', width:60,resizable:true, pinnable:false},
                     {field:'capital', displayName:'Capital',resizable:true},
                     {field:'mostPopulousCity', displayName:'Most Populous City',resizable:true, pinnable:false},
                     {field:'population', displayName:'Population',resizable:true, width:120},
                     {field:'squareMiles', displayName:'Size (Sq. Miles)',resizable:true, width:120, pinnable:false},
                     {field:'timeZone1', displayName:'Time Zone',resizable:true, width:100, pinnable:false},
                     {field:'timeZone2', displayName:'Second Time Zone',resizable:true, width:100, pinnable:false},
                     {field:'dst', displayName:'DST',resizable:true,width:60, pinnable:false}
                    ]
    };
})

