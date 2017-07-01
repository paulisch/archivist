(function (angular) {
    var ngmod = angular.module('archivist.webapp');

    /**
     * MainService
     * Main service for the app providing repeatedly used methods.
     */
    ngmod.service('MainService', [
        '$http', '$state', 'AppConstants',
        function($http, $state, AppConstants) {
            'use strict';

            //URL for testing purposes
            //var baseUrl = "http://localhost:8080/archivist/api";

            //URL for release version
            var baseUrl = "/archivist/api";

            //Function for building an API request URL
            function buildUrl(url) {
              return baseUrl + url;
            }

            //App-wide function for sending HTTP requests
            function httpRequest(method, url, data, params) {
                return $http({
                      method: method,
                      url: buildUrl(url),
                      headers: {
                          'Accept' : 'application/json'
                      },
                      data : data,
                      params : params
                    }
                ).then(function (response) {
                    return response;
                }, function (httpError) {
                    if(httpError.status == 404 ||
                       httpError.status == 408 ||
                       httpError.status == 422 ||
                       httpError.status == 500 ||
                       httpError.status == 501 ||
                       httpError.status == 502 ||
                       httpError.status == -1) {
                        //404: not found
                        //408: request time-out
                        //422: Unprocessable entity
                        //500: internal server error
                        //501: not implemented
                        //502: bad gateway
                        //-1:  timed out
                        $state.go('error', {error : httpError});
                    }
                    throw httpError;
                });
            }

            //Finds all items in an array, where a specified (sub)property of each item matches the given compareValue
            //parameters:
            //   array...         array of objects
            //   property...      (sub)property to check for equality
            //   compareValue...  value to check for equality with the specified (sub)property of each item
            //returns:
            //   All items which have a specified property matching the compareValue
            function findByProperty(array, property, compareValue) {
                var result = [];
                var subProperties = property.split(".");

                //Iterate through items
                for(var i=0; i<array.length; i++) {
                    var elem = array[i];
                    
                    //(sub)property to check for
                    var prop = subProperties[subProperties.length - 1];

                    //Find the object owning the subproperty if possible
                    for(var j=0; j<subProperties.length - 1; j++) {
                        elem = elem[subProperties[j]];
                    }

                    //If value is equal to compareValue add the top level item to the result set
                    if (elem[prop] == compareValue) {
                        result.push(array[i]);
                    }
                }
                return result;
            }

            //Converts an integer (stored in database) to an readable label (see AppConstants) for displaying the difficulty of a musicpiece
            function getDifficultyLabel(difficulty) {
                var difficulties = AppConstants.difficulties;
                var result = null;
                for(var i=0; i<difficulties.length; i++) {
                    var diff = difficulties[i];
                    if (diff.id == difficulty) {
                        result = diff.label;
                    }
                }
                return result;
            }

            //Converts a given score to a human-readable version by considering the other scores of the musicpiece.
            //parameters:
            //   score...         score of a musicpiece to convert to human-readable version
            //   scores...        array of all scores of the musicpiece
            //returns:
            //   A string representing the score
            function getScoreName(score, scores) {
                var result = score.instrumentNo + ". " + score.instrument.instrumentName;

                //If there is no other instrument in the other scores of the musicpiece and the specified score has an instrumentNo of 1 --> just return the instrument name
                if (scores && score.instrumentNo == 1) {
                    var resultScores = findByProperty(scores, "instrument.instrumentId", score.instrument.instrumentId);
                    if (resultScores.length == 1) {
                        result = score.instrument.instrumentName;
                    }
                }
                
                //Add the tune of the instrument if specified
                if (score.instrument.tune) {
                    result = result + " (" + score.instrument.tune + ")";
                }
                return result;
            }

            //Return service object
            return {
                httpRequest : httpRequest,
                findByProperty : findByProperty,
                getDifficultyLabel : getDifficultyLabel,
                getScoreName : getScoreName,
                buildUrl : buildUrl
            };
        }
    ]);
})(angular);