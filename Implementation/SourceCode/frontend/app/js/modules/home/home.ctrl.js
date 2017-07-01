(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.home');
    
    /**
     * HomeCtrl
     * Home controller for displaying the home-page of the app.
     */
    ngmod.controller('HomeCtrl', [
        '$scope', 'HomeService', 'MainService', 'AppConstants', '$state',
        function ($scope, HomeService, MainService, AppConstants, $state) {
            
            //Init
            $scope.musicpieces = null;
            $scope.musicpiecesLoaded = false;
            $scope.noSearchResult = false;
            $scope.searchText = "";
            $scope.onCreateAction = onCreateAction;
            $scope.onSearch = onSearch;
            $scope.getDifficultyLabel = MainService.getDifficultyLabel;
            $scope.getOrderBy = getOrderBy;
            $scope.onCheck = onCheck;
            
            //Filter function for musicpieces; filter by: musispiece name, composer, archive number, genre
            $scope.filterFunction = function(musicPiece)
            {
                if (!$scope.searchText || $scope.searchText === "" ||
                    (musicPiece.musicPieceName.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) ||
                    (musicPiece.composer && musicPiece.composer.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) ||
                    (musicPiece.archiveNo && musicPiece.archiveNo.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) ||
                    (musicPiece.genre && musicPiece.genre.genreName.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1)
                   ) {
                    return true;
                }
                return false;
            };
            
            loadMusicPieces();
            
            //Sorting control; one of them can be enabled at the same time and specifies ascending or descending order
            $scope.sort = {
                archiveNo : {
                    ascending : false,
                    enabled : false,
                    property : 'archiveNo'
                },
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
            $scope.header = {
                text : "Übersicht",
                showBackButton : false
            };
            $scope.actionButtons = [
                {
                    label: "Neu",
                    icon: "fa fa-plus-square",
                    disabled: createActionDisabled,
                    onclick: onCreateAction,
                    hidden: musicpiecesEmpty
                },
                {
                    label: "Löschen",
                    icon: "fa fa-trash",
                    disabled: deleteActionDisabled,
                    onclick: onDeleteAction,
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
                    
                    //Push all selected items to the array
                    for(var i=0; i<$scope.musicpieces.length; i++) {
                        if($scope.musicpieces[i].isSelected) {
                            toDelete.push($scope.musicpieces[i].musicPieceId);
                        }
                    }
                    deleteMusicPieces(toDelete);
                }
            }
            
            function deleteMusicPieces(musicPieceIds) {
                //Remove items from displayed list
                for(var i=0; i<musicPieceIds.length; i++) {
                    for(var j=0; j<$scope.musicpieces.length; j++) {
                        if($scope.musicpieces[j].musicPieceId == musicPieceIds[i]) {
                            $scope.musicpieces.splice(j, 1);
                            break;
                        }
                    }
                }
                
                //Delete items on backend
                HomeService.deleteMusicPieces(musicPieceIds).then(function successCallback(response) {
                    
                }, function errorCallback(response) {
                    console.log(response);
                });
            }
            
            function createActionDisabled() {
                return false;
            }
            function onCreateAction() {
                $state.go('musicpiece');
            }
            
            
            //Controller methods            
            function onSearch() {
                
            }
            
            function musicpiecesEmpty() {
                return !$scope.musicpieces;
            }
            
            function onSort(column) {
                var sort = $scope.sort[column];
                if (sort.enabled) {
                    //Toggle enabled sorting column (ascending/descending)
                    sort.ascending = !sort.ascending;
                } else {
                    //Enable another sorting column and disable all others
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
            
            //Returns the orderby-clause of the enabled sorting column
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
            
            //Select/unselect a musicpiece
            function onCheck(musicpiece) {
                musicpiece.isSelected = !musicpiece.isSelected;
            }
            
            function loadMusicPieces() {
                HomeService.getMusicPieces().then(function successCallback(response) {
                    $scope.musicpieces = response.data;
                    
                    if ($scope.musicpieces) {
                        for(var i = 0; i<$scope.musicpieces.length; i++) {
                            $scope.musicpieces[i].isSelected = false;
                        }

                        //Default ordering is musicpiece name
                        onSort('title');
                    }                        
                    
                    $scope.musicpiecesLoaded = true;
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.musicpiecesLoaded = true;
                });
            }
    }]);
})(angular);