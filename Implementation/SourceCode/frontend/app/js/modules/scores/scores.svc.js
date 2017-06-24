(function (angular) {
  var ngmod = angular.module('archivist.musicpiece');

  ngmod.service('ScoresService', ['MainService', '$http', function(MainService, $http) {
      'use strict';
      
      function deleteScores(scoreIds) {
          var idsAsStr = "";
          for(var i = 0; i<scoreIds.length; i++) {
              idsAsStr += scoreIds[i] + ",";
          }
          idsAsStr = idsAsStr.substr(0, idsAsStr.length - 1);
          return MainService.httpRequest('DELETE', '/scores/delete/' + idsAsStr);
      }
      
      function addScore(score) {
          return MainService.httpRequest('POST', '/scores/add', score);
      }
      
      function uploadScore(score, file) {
          var formData = new FormData();
          
          formData.append("file", file);
          formData.append("score", JSON.stringify(score));
          //formData.append("score", score);
          
          return $http(
              {
                  method: "POST",
                  url: MainService.buildUrl('/scores/upload'),
                  headers: {
                      'Content-Type' : undefined
                  },
                  data : formData,
                  transformRequest: function (data, headersGetterFunction) {
                      return data;
                  }
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
          deleteScores : deleteScores,
          addScore : addScore,
          uploadScore : uploadScore
      };
    }
  ]);
})(angular);