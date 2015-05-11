
angular.module('states', [])

.constant("statesUrl", "http://localhost:8888/states") //we don't have a configuration module in this sample app, so using constants instead
.constant("statesAbbrUrl", "http://localhost:8888/states/abbreviations")
.constant("recsPerPage", 10)

.factory("statesModelSvc", function ($q, $http, statesUrl, statesAbbrUrl, recsPerPage)    
{
    return {

        /*
            Get states. 
            Params: sort field, sort direction, offset, and limit.
            If no parameters are specified, the first 10 records (sorted by name Asc) are fetched.
        */
        getStates : function (sortField, sortDirection, offset, limit) {
            
            var defer = $q.defer();

            if (!sortField || sortField == '')
            {
                sortField = 'name'; //default sort column
            }

            if (!sortDirection || sortDirection == '')
            {
                sortDirection = 'asc'; //default sort direction
            }

            if (!offset || offset == '' || parseInt(offset) < 0)
            {
                offset = 0; //default offset
            }


            if (!limit || limit == '' || parseInt(limit) < 1 || parseInt(limit) > 10) //max 10 recs enforced by the API
            {
                limit = recsPerPage; //default limit
            }

            //change grid-friendly property name back to their backend / API implementation
            switch (sortField)
            {
                case ("mostPopulousCity"):
                {
                    sortField="most-populous-city";
                    break;
                }
                case ("squareMiles"):
                {
                    sortField="square-miles";
                    break;
                }
                case ("timeZone1"):
                {
                    sortField="time-zone-1";
                    break;
                }
                case ("timeZone2"):
                {
                    sortField="time-zone-2";
                    break;
                }
                default:
                    break;
            }

            if (sortDirection == "desc") //server implementation adapter
            {
                sortField = "-" + sortField;
            }

            $http.get(statesUrl, {
                params: { 
                            sort: sortField,
                            offset: offset,
                            limit: limit
                        }
            })
            .success(function (data) {
                if (data)
                {
                    data.forEach(function (item, index, array) //allow automatic processing by ng-grid (which uses 'dot' syntax by default, which would fail with a dash in property name)
                    {
                        item.mostPopulousCity = item["most-populous-city"];
                        delete item["most-populous-city"];

                        item.squareMiles = item["square-miles"];
                        delete item["square-miles"];

                        item.timeZone1 = item["time-zone-1"];
                        delete item["time-zone-1"];

                        item.timeZone2 = item["time-zone-2"];
                        delete item["time-zone-2"];
                    });
                }
                defer.resolve(data);
            })
            .error(function (error) {
                defer.reject(error);
            });

            return defer.promise;
        },


        /*
            Get states abbreviations only. Retrieves all abbreviations in one round-trip.
        */
        getAllStatesAbbreviations : function () {
            
            var defer = $q.defer();

            $http.get(statesAbbrUrl, {
            })
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (error) {
                defer.reject(error);
            });

            return defer.promise;
        },

        /*
            Get the details of a single state. 
            Params: 2-letter abbreviation of the state
        */
        getStateDetails : function (stateAbbreviation) {
            
            var defer = $q.defer();

            if (!stateAbbreviation || stateAbbreviation.length != 2)
            {
                defer.reject("Invalid State Abbreviation");
            }

            var stateDetailResource = statesUrl + '/' + stateAbbreviation;

            $http.get(stateDetailResource, {
            })
            .success(function (data) {
                if (data)
                {
                    data.mostPopulousCity = data["most-populous-city"];
                    delete data["most-populous-city"];

                    data.squareMiles = data["square-miles"];
                    delete data["square-miles"];

                    data.timeZone1 = data["time-zone-1"];
                    delete data["time-zone-1"];

                    data.timeZone2 = data["time-zone-2"];
                    delete data["time-zone-2"];
                    
                }                
                defer.resolve(data);
            })
            .error(function (error) {
                defer.reject(error);
            });

            return defer.promise;
        }
    }
});