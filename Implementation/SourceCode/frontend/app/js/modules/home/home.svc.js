(function (angular) {
  var ngmod = angular.module('archivist.home');

  ngmod.service('HomeService', ['MainService', function(MainService) {
      'use strict';
      
      function getMusicPieces() {
          return MainService.httpRequest('GET', '/musicpieces/get');
      }
      
      //Return service object
      return {
          getMusicPieces : getMusicPieces
      };
    }
  ]);
})(angular);