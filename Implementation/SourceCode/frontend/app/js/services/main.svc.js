(function (angular) {
  var ngmod = angular.module('archivist.webapp');

  ngmod.service('MainService', [
      '$http', '$state',
      function($http, $state) {
      'use strict';
      
      var rootUrl = "http://localhost:8080";
      var baseUrl = rootUrl + "/archivist/api";
          //baseUrl = "/archivist/api";
      
      function httpRequest(method, url, data, params) {
            return $http(
                {
                    method: method,
                    url: baseUrl + url,
                    headers: {
                        'Accept' : 'application/json'
                    },
                    data : data,
                    params : params
                }
            ).then(function (response) {
                return response;
            }, function (httpError) {
                //if(httpError.status == 404 || httpError.status == -1) {
                    //404: not found
                    //-1:  timed out
                    $state.go('error', {error : httpError});
                //}
                throw httpError;
            });
        }
      
      //Return service object
      return {
          httpRequest : httpRequest
      };
    }
  ]);
})(angular);