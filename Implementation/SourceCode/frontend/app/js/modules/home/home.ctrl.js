(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.home');
    ngmod.controller('HomeCtrl', [
        '$scope', 'HomeService',
        function ($scope, HomeService) {
            
            //Init
            $scope.musicpieces = null;
            $scope.musicpiecesLoaded = false;
            $scope.noSearchResult = false;
            $scope.searchText = "";
            $scope.onCreateAction = onCreateAction;
            $scope.onSearch = onSearch;
            
            loadMusicPieces();
            
            //Sorting methods
            $scope.sort = {
                title : {
                    ascending : false,
                    enabled : false
                },
                genre : {
                    ascending : false,
                    enabled : false
                },
                composer : {
                    ascending : false,
                    enabled : false
                },
                difficulty : {
                    ascending : false,
                    enabled : false
                }
            };
            
            $scope.onSort = onSort;
            
            //Action bar
            $scope.header = "Übersicht";
            $scope.actionButtons = [
                {
                    label: "Löschen",
                    icon: "fa fa-trash",
                    disabled: deleteActionDisabled,
                    onclick: onDeleteAction,
                    hidden: musicpiecesEmpty
                },
                {
                    label: "Neu",
                    icon: "fa fa-plus-square",
                    disabled: createActionDisabled,
                    onclick: onCreateAction,
                    hidden: musicpiecesEmpty
                }
            ];
            
            //Action bar methods
            function deleteActionDisabled() {
                return true;
            }
            function onDeleteAction() {
                alert("delete");
            }
            
            function createActionDisabled() {
                return false;
            }
            function onCreateAction() {
                alert("create");
            }
            
            
            //Controller methods            
            function onSearch() {
                alert("search");
            }
            
            function musicpiecesEmpty() {
                return !$scope.musicpieces;
            }
            
            function onSort(column) {
                var sort = $scope.sort[column];
                if (sort.enabled) {
                    sort.ascending = !sort.ascending;
                } else {
                    for (var property in $scope.sort) {
                        if ($scope.sort.hasOwnProperty(property)) {
                            $scope.sort[property].enabled = false;
                            $scope.sort[property].ascending = false;
                        }
                    }
                    
                    sort.ascending = true;
                    sort.enabled = true;
                }
            }
            
            
            //Initialization methods
            function loadMusicPieces() {
                HomeService.getMusicPieces().then(function successCallback(response) {
                    $scope.musicpieces = response.data;
                    onSort('title');
                    $scope.musicpiecesLoaded = true;
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.musicpiecesLoaded = true;
                });
            }
    }]);
})(angular);