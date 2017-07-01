(function (angular) {
    var ngmod = angular.module('archivist.navigation');

    /**
     * NavigationService
     * Service for navigation-section of the app.
     */
    ngmod.service('NavigationService', ['localStorageService', function(localStorageService) {
        'use strict';

        //Gets the organisation name. If no organisation name is stored
        //in local storage, a default value will be returned.
        function getOrganisationName() {
            var name = "<Name der Organisation>";

            var storedName = localStorageService.get('org_name');

            if (storedName) {
                name = storedName;
            }

            return name;
        }

        //Save an organisation name to local storage
        function setOrganisationName(orgName) {
            localStorageService.set('org_name', orgName);
        }

        //Return service object
        return {
            getOrganisationName : getOrganisationName,
            setOrganisationName : setOrganisationName
        };
    }]);
})(angular);