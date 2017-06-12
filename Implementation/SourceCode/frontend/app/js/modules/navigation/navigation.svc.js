(function (angular) {
  var ngmod = angular.module('archivist.navigation');

  ngmod.service('NavigationService', ['localStorageService', function(localStorageService) {
      'use strict';
      
      function getOrganisationName() {
          var name = "<Name der Organisation>";
          
          var storedName = localStorageService.get('org_name');
          
          if (storedName) {
              name = storedName;
          }
          
          return name;
      }
      
      function setOrganisationName(orgName) {
          localStorageService.set('org_name', orgName);
      }
      
      //Return service object
      return {
          getOrganisationName : getOrganisationName,
          setOrganisationName : setOrganisationName
      };
    }
  ]);
})(angular);