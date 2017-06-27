(function (angular) {
  var ngmod = angular.module('archivist.webapp');

  ngmod.service('MainService', [
      '$http', '$state', 'AppConstants',
      function($http, $state, AppConstants) {
          'use strict';
          
          var rootUrl = "http://localhost:8080";
          var baseUrl = rootUrl + "/archivist/api";
          //baseUrl = "/archivist/api";
          
          function buildUrl(url) {
              return baseUrl + url;
          }
          
          function httpRequest(method, url, data, params) {
              return $http(
                  {
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
                  //if(httpError.status == 404 || httpError.status == -1) {
                  //404: not found
                  //-1:  timed out
                  $state.go('error', {error : httpError});
                  //}
                  throw httpError;
              });
          }
          
          function findByProperty(array, property, compareValue) {
              var result = [];
              var subProperties = property.split(".");
              for(var i=0; i<array.length; i++) {
                  var elem = array[i];
                  var prop = subProperties[subProperties.length - 1];
                  
                  for(var j=0; j<subProperties.length - 1; j++) {
                      elem = elem[subProperties[j]];
                  }
                  
                  if (elem[prop] == compareValue) {
                      result.push(array[i]);
                  }
              }
              return result;
          }
          
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
          
          function getScoreName(score, scores) {
              var result = score.instrumentNo + ". " + score.instrument.instrumentName;
                
              if (scores && score.instrumentNo == 1) {
                  var resultScores = findByProperty(scores, "instrument.instrumentId", score.instrument.instrumentId);
                  if (resultScores.length == 1) {
                      result = score.instrument.instrumentName;
                  }
              }
              
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