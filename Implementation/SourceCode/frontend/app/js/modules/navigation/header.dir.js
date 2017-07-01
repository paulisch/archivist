(function (angular) {
    angular.module('archivist.navigation')
    
    /**
     * header
     * header directive for displaying the header of the navigation-section of the app.
     */
    .directive('header', [function() {
        return {
            templateUrl: 'partials/header.tpl.html',
            scope: { },
            restrict: 'E',
            controller: ['$scope', '$attrs', 'NavigationService', '$timeout', '$window', function ($scope, $attrs, NavigationService, $timeout, $window) {
                $scope.editMode = false;
                $scope.orgName = NavigationService.getOrganisationName();

                //Initiates the edit mode for the organisation name
                $scope.edit = function() {
                    $scope.editMode = true;
                    $timeout(function() {
                        //Focus and select all of the text of the organisation input field
                        var element = $window.document.getElementById('orgNameInp');
                        if(element) {
                            element.focus();
                            element.setSelectionRange(0, element.value.length);
                        }
                    });
                };
                
                //Quits edit mode and saves the defined organisation name to local storage
                $scope.saveOrgName = function(orgName) {
                    $scope.orgName = orgName;
                    NavigationService.setOrganisationName($scope.orgName);
                    $scope.editMode = false;
                };
            }],
            link: function (scope) { }
        };
    }]);
})(angular);