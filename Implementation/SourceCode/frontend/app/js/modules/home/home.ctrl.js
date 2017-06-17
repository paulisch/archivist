(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.home');
    ngmod.controller('HomeCtrl', [
        '$scope', 'HomeService', 'AppConstants',
        function ($scope, HomeService, AppConstants) {
            
            //Init
            $scope.musicpieces = null;
            $scope.musicpiecesLoaded = false;
            $scope.noSearchResult = false;
            $scope.searchText = "";
            $scope.onCreateAction = onCreateAction;
            $scope.onSearch = onSearch;
            $scope.getDifficultyLabel = getDifficultyLabel;
            $scope.getOrderBy = getOrderBy;
            $scope.onCheck = onCheck;
            $scope.filterFunction = function(musicPiece)
            {
                if (!$scope.searchText || $scope.searchText == ""
                    || (musicPiece.musicPieceName.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1)
                    || (musicPiece.composer && musicPiece.composer.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1)
                    || (musicPiece.archiveNo && musicPiece.archiveNo.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1)
                    || (musicPiece.genre && musicPiece.genre.genreName.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1)
                   ) {
                    return true;
                }
                return false;
            };
            
            loadMusicPieces();
            
            //Sorting methods
            $scope.sort = {
                title : {
                    ascending : false,
                    enabled : false,
                    property : 'musicPieceName'
                },
                genre : {
                    ascending : false,
                    enabled : false,
                    property : 'genre.genreName'
                },
                composer : {
                    ascending : false,
                    enabled : false,
                    property : 'composer'
                },
                difficulty : {
                    ascending : false,
                    enabled : false,
                    property : 'difficulty'
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
                if ($scope.musicpieces) {
                    for(var i=0; i<$scope.musicpieces.length; i++) {
                        if($scope.musicpieces[i].isSelected)
                            return false;
                    }
                }
                return true;
            }
            function onDeleteAction() {
                var deleteConfirmed = confirm("Wollen Sie die ausgewählten Musikstücke wirklich löschen?");
                if (deleteConfirmed) {
                    var toDelete = [];
                    for(var i=0; i<$scope.musicpieces.length; i++) {
                        if($scope.musicpieces[i].isSelected) {
                            toDelete.push($scope.musicpieces[i].musicPieceId);
                        }
                    }
                    deleteMusicPieces(toDelete);
                }
            }
            
            function deleteMusicPieces(musicPieceIds) {
                for(var i=0; i<musicPieceIds.length; i++) {
                    for(var j=0; j<$scope.musicpieces.length; j++) {
                        if($scope.musicpieces[j].musicPieceId == musicPieceIds[i]) {
                            $scope.musicpieces.splice(j, 1);
                            break;
                        }
                    }
                }
                
                HomeService.deleteMusicPieces(musicPieceIds).then(function successCallback(response) {
                    //loadMusicPieces();
                }, function errorCallback(response) {
                    console.log(response);
                });
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
            
            function getOrderBy() {
                var result = "";
                for (var property in $scope.sort) {
                    if ($scope.sort.hasOwnProperty(property)) {
                        if ($scope.sort[property].enabled) {
                            result = ($scope.sort[property].ascending ? "" : "-") + $scope.sort[property].property;
                        }
                    }
                }
                return result;
            }
            
            function getDifficultyLabel(difficulty) {
                var difficulties = AppConstants.difficulties;
                var result = "";
                for(var i=0; i<difficulties.length; i++) {
                    var diff = difficulties[i];
                    if (diff.id == difficulty) {
                        result = diff.label;
                    }
                }
                return result;
            }
            
            function onCheck(musicpiece) {
                musicpiece.isSelected = !musicpiece.isSelected;
            }
            
            function loadMusicPieces() {
                HomeService.getMusicPieces().then(function successCallback(response) {
                    $scope.musicpieces = response.data;
                    
                    for(var i = 0; i<$scope.musicpieces.length; i++) {
                        $scope.musicpieces[i].isSelected = false;
                    }
                    
                    onSort('title');
                    
                    $scope.musicpiecesLoaded = true;
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.musicpiecesLoaded = true;
                });
            }
    }]);
})(angular);