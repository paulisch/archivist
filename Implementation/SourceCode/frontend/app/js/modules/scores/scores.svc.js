(function (angular) {
  var ngmod = angular.module('archivist.musicpiece');

  ngmod.service('ScoresService', ['MainService', function(MainService) {
      'use strict';
      
      function deleteScores(scoreIds) {
          var idsAsStr = "";
          for(var i = 0; i<scoreIds.length; i++) {
              idsAsStr += scoreIds[i] + ",";
          }
          idsAsStr = idsAsStr.substr(0, idsAsStr.length - 1);
          return MainService.httpRequest('DELETE', '/scores/delete/' + idsAsStr);
      }
      
      //Return service object
      return {
          deleteScores : deleteScores
      };
    }
  ]);
})(angular);