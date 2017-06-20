(function (angular) {
  var ngmod = angular.module('archivist.musicpiece');

  ngmod.service('MusicPieceService', ['MainService', function(MainService) {
      'use strict';
      
      function getMusicPiece(id) {
          return MainService.httpRequest('GET', '/musicpieces/get/'+id);
      }
      
      //Return service object
      return {
          getMusicPiece : getMusicPiece
      };
    }
  ]);
})(angular);