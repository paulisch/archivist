(function (angular) {
  'use strict';
  var ngmod = angular.module('archivist.webapp');

  ngmod.constant('AppConstants', {
      difficulties : [
          {
              id : 1,
              label : 'A'
          },
          {
              id : 2,
              label : 'B'
          },
          {
              id : 3,
              label : 'C'
          },
          {
              id : 4,
              label : 'D'
          },
          {
              id : 5,
              label : 'E'
          }
      ]
  });
})(angular);