(function (angular) {
  var ngmod = angular.module('archivist.musicpiece');
    
    /**
     * ScoresService
     * Service for scores-page of the app.
     */
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

        //Uploads a new score including the score object and the score PDF file
        function uploadScore(score, file) {
          var formData = new FormData();

          formData.append("file", file);
          formData.append("score", JSON.stringify(score));

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
              $state.go('error', {error : httpError});
              throw httpError;
          });
        }

        function getScoreHref(score) {
            return MainService.buildUrl('/scores/files/' + score.fileName);
        }

        //Return service object
        return {
            deleteScores : deleteScores,
            uploadScore : uploadScore,
            getScoreHref : getScoreHref
        };
    }]);
})(angular);