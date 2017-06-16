(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.home');
    ngmod.controller('HomeCtrl', [
        '$scope', 'HomeService',
        function ($scope, HomeService) {
            
            //Init
            $scope.musicpieces = null;
            $scope.noSearchResult = false;
            $scope.searchText = "";
            $scope.createAction = createAction;
            $scope.search = search;
            
            loadMusicPieces();
            
            
            //Action bar
            $scope.header = "Übersicht";
            $scope.actionButtons = [
                {
                    label: "Löschen",
                    icon: "fa fa-trash",
                    disabled: deleteActionDisabled,
                    onclick: deleteAction,
                    hidden: musicpiecesEmpty
                },
                {
                    label: "Neu",
                    icon: "fa fa-plus-square",
                    disabled: createActionDisabled,
                    onclick: createAction,
                    hidden: musicpiecesEmpty
                }
            ];
            
            //Action bar methods
            function deleteActionDisabled() {
                return true;
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
            
            
            //Controller methods            
            function search() {
                alert("search");
            }
            
            function musicpiecesEmpty() {
                return !$scope.musicpieces;
            }
            
            
            //Initialization methods
            function loadMusicPieces() {
                HomeService.getMusicPieces().then(function successCallback(response) {
                    $scope.musicpieces = response.data;
                }, function errorCallback(response) {
                    console.log(response);
                });
            }
    }]);
})(angular);