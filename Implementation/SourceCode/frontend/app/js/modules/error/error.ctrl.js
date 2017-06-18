(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.error');
    ngmod.controller('ErrorCtrl', [
        '$scope', '$stateParams',
        function ($scope, $stateParams) {
            $scope.error = $stateParams.error;
        }]);
})(angular);