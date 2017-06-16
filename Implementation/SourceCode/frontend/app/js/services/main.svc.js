(function (angular) {
  var ngmod = angular.module('archivist.webapp');

  ngmod.service('MainService', ['$http', function($http) {
      'use strict';
      
      var rootUrl = "http://localhost:8080";
      var baseUrl = rootUrl + "/archivist/api";
      
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
                throw httpError;
            });
        };
      
      //Return service object
      return {
          httpRequest : httpRequest
      };
    }
  ]);
})(angular);