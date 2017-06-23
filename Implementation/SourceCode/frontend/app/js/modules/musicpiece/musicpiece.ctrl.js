(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.musicpiece');
    ngmod.controller('MusicPieceCtrl', [
        '$scope', 'MusicPieceService', 'AppConstants', '$stateParams', '$filter', '$state', '$timeout',
        function ($scope, MusicPieceService, AppConstants, $stateParams, $filter, $state, $timeout) {
            
            //Init
            $scope.musicPieceId = $stateParams.musicPieceId;
            $scope.difficulties = AppConstants.difficulties;
            $scope.musicpiece = null;
            $scope.musicpieceForEditing = null;
            $scope.musicpieceLoaded = false;
            
            loadGenres();
            
            if ($scope.musicPieceId) {
                $scope.mode = "view";
                loadMusicPiece($scope.musicPieceId);
            }
            else {
                $scope.mode = "edit";
                $('#titleInput').focus();
                $scope.musicpieceForEditing = { };
                $scope.musicpieceLoaded = true;
            }
                        
            //Action bar
            $scope.header = {
                text : "Neues Musikstück",
                showBackButton : true
            };
            $scope.actionButtons = [
                {
                    label: "Bearbeiten",
                    icon: "fa fa-pencil",
                    disabled: editActionDisabled,
                    onclick: onEditAction,
                    hidden: function() { return $scope.mode != "view"; }
                },
                {
                    label: "Löschen",
                    icon: "fa fa-trash",
                    disabled: deleteActionDisabled,
                    onclick: onDeleteAction,
                    hidden: function() { return $scope.mode != "view"; }
                },
                {
                    label: "Speichern",
                    icon: "fa fa-floppy-o",
                    disabled: saveActionDisabled,
                    onclick: onSaveAction,
                    hidden: function() { return $scope.mode != "edit"; }
                },
                {
                    label: "Abbrechen",
                    icon: "fa fa-window-close",
                    disabled: cancelActionDisabled,
                    onclick: onCancelAction,
                    hidden: function() { return $scope.mode != "edit"; }
                }
            ];
            $scope.getDifficultyLabel = getDifficultyLabel;
            
            //Action bar methods
            function deleteActionDisabled() {
                return $scope.mode != "view";
            }
            function onDeleteAction() {
                MusicPieceService.deleteMusicPiece($scope.musicpiece.musicPieceId).then(function successCallback(response) {
                    goHome();
                }, function errorCallback(response) {
                    console.log(response);
                });
            }
            
            function editActionDisabled() {
                return $scope.mode != "view";
            }
            function onEditAction() {
                $scope.musicpieceForEditing = angular.extend({ }, $scope.musicpiece);
                $scope.musicpieceForEditing.selectedDifficulty = findByProperty(AppConstants.difficulties, "id", $scope.musicpiece.difficulty)[0];
                $scope.mode = "edit";
                $('#titleInput').focus();
            }
            
            function saveActionDisabled() {
                return $scope.mode != "edit";
            }
            function onSaveAction() {
                $scope.MusicPieceForm.titleInput.$setDirty();
                $scope.MusicPieceForm.genreSelect.$setDirty();
                $scope.MusicPieceForm.composerInput.$setDirty();
                $scope.MusicPieceForm.difficultySelect.$setDirty();
                $scope.MusicPieceForm.archiveNoInput.$setDirty();
                
                //Post form if valid
                if (!$scope.MusicPieceForm.$valid) {
                    return;
                }
                
                var isNewMusicpiece = $scope.musicpiece === null;
                $scope.musicpieceForEditing.difficulty = $scope.musicpieceForEditing.selectedDifficulty.id;
                $scope.musicpiece = $scope.musicpieceForEditing;
                $scope.header.text = $scope.musicpiece.musicPieceName;
                
                if(!isNewMusicpiece) {
                    $scope.mode = "view";
                }
                
                MusicPieceService.addOrUpdateMusicpiece($scope.musicpiece).then(function successCallback(response) {
                    
                }, function errorCallback(response) {
                    console.log(response);
                }).finally(function() {
                    if (isNewMusicpiece) {
                        goHome();
                    }
                });
            }
            
            function cancelActionDisabled() {
                return $scope.mode != "edit";
            }
            function onCancelAction() {
                var isNewMusicpiece = $scope.musicpiece === null;
                
                if(!isNewMusicpiece) {
                    $scope.mode = "view";
                }
                
                if (isNewMusicpiece) {
                    goHome();
                }
            }
            
            
            //Controller methods
            function loadMusicPiece(id) {
                MusicPieceService.getMusicPiece(id).then(function successCallback(response) {
                    $scope.musicpiece = response.data;
                    $scope.header.text = $scope.musicpiece.musicPieceName;                    
                    $scope.musicpieceLoaded = true;
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.musicpieceLoaded = true;
                });
            }
            
            function loadGenres() {
                MusicPieceService.getGenres().then(function successCallback(response) {
                    $scope.genres = response.data;
                    for (var i=0; i<$scope.genres.length; i++) {
                        if ($scope.genres[i].genre) {
                            $scope.genres[i].genre = findByProperty($scope.genres, "genreId", $scope.genres[i].genre.genreId)[0];
                        }
                    }
                    $scope.genres = $filter('orderBy')($scope.genres, ['genreName']);
                    
                }, function errorCallback(response) {
                    console.log(response);
                });
            }
            
            function goHome() {
                $state.go('home', null, { location: 'replace' });
            }
            
            function getDifficultyLabel(difficulty) {
                var difficulties = AppConstants.difficulties;
                var result = null;
                for(var i=0; i<difficulties.length; i++) {
                    var diff = difficulties[i];
                    if (diff.id == difficulty) {
                        result = diff.label;
                    }
                }
                return result;
            }
            
            function findByProperty(array, property, compareValue) {
                var result = [];
                for(var i=0; i<array.length; i++) {
                    var elem = array[i];
                    if (elem[property] == compareValue) {
                        result.push(elem);
                    }
                }
                return result;
            }
    }]);
})(angular);