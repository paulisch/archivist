(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.home');
    ngmod.controller('HomeCtrl', [
        '$scope',
        function ($scope) {
            
            $scope.musicpieces = false;
            
            $scope.header = "Übersicht";
            $scope.actionButtons = [
                {
                    label: "Löschen",
                    icon: "fa fa-trash",
                    disabled: deleteActionDisabled,
                    onclick: deleteAction
                },
                {
                    label: "Neu",
                    icon: "fa fa-plus-square",
                    disabled: createActionDisabled,
                    onclick: createAction
                }
            ];
            function deleteActionDisabled() {
                return false;
            }
            function deleteAction() {
                alert("delete");
            }
            
            function createActionDisabled() {
                return false;
            }
            function createAction() {
                alert("create");
            }
    }]);
})(angular);