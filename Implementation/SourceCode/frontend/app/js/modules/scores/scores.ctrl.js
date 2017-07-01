(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.scores');
    
    /**
     * ScoresCtrl
     * Scores controller for displaying the scores-page of the app.
     */
    ngmod.controller('ScoresCtrl', [
        '$scope', 'MusicPieceService', 'ScoresService', 'MainService', 'AppConstants', '$stateParams', '$state', '$http', '$window',
        function ($scope, MusicPieceService, ScoresService, MainService, AppConstants, $stateParams, $state, $http, $window) {
            
            //Init
            $scope.musicPieceId = $stateParams.musicPieceId;
            $scope.musicpiece = null;
            $scope.musicpieceLoaded = false;
            $scope.onCheck = onCheck;
            $scope.onAddAction = onAddAction;
            $scope.getScoreName = MainService.getScoreName;
            $scope.getScoreHref = ScoresService.getScoreHref;
            
            $scope.openScoreInNewTab = function(score) {
                var href = $scope.getScoreHref(score);                
                $http({
                      method: 'GET',
                      url: href,
                      responseType:'arraybuffer'
                    })
                .then(function (data) {
                    var file = new Blob([data.data], {type: 'application/pdf'});
                    var fileURL = URL.createObjectURL(file);
                    $window.open(fileURL);
                });
                
                return false;
            };
            
            //Load the musicpiece and the scores if musicPieceId provided
            if ($scope.musicPieceId) {
                loadMusicPiece($scope.musicPieceId);
            }
            else {
                $scope.musicpieceLoaded = true;
            }
                        
            //Action bar
            $scope.header = {
                text : "Noten",
                showBackButton : true
            };
            $scope.actionButtons = [
                {
                    label: "Hinzufügen",
                    icon: "fa fa-plus-square",
                    disabled: addActionDisabled,
                    onclick: onAddAction,
                    hidden: function() { return false; }
                },
                {
                    label: "Löschen",
                    icon: "fa fa-trash",
                    disabled: deleteActionDisabled,
                    onclick: onDeleteAction,
                    hidden: function() { return false; }
                }
            ];
            
            //Action bar methods
            function deleteActionDisabled() {
                if ($scope.musicpiece && $scope.musicpiece.scores) {
                    for(var i=0; i<$scope.musicpiece.scores.length; i++) {
                        if($scope.musicpiece.scores[i].isSelected)
                            return false;
                    }
                }
                return true;
            }            
            function onDeleteAction() {
                var deleteConfirmed = confirm("Wollen Sie die ausgewählten Noten für "+$scope.musicpiece.musicPieceName+" wirklich löschen?");
                if (deleteConfirmed) {
                    var toDelete = [];
                    
                    //Add all selected items to an array
                    for(var i=0; i<$scope.musicpiece.scores.length; i++) {
                        var score = $scope.musicpiece.scores[i];
                        if(score.isSelected) {
                            toDelete.push(score.scoreId);
                        }
                    }
                    deleteScores(toDelete);
                }
            }
            
            //Deletes the given items of the list of scores and sends and delete HTTP request to the backend
            function deleteScores(scoreIds) {
                for(var i=0; i<scoreIds.length; i++) {
                    
                    //Remove the items from the displayed list
                    for(var j=0; j<$scope.musicpiece.scores.length; j++) {
                        if($scope.musicpiece.scores[j].scoreId == scoreIds[i]) {
                            $scope.musicpiece.scores.splice(j, 1);
                            break;
                        }
                    }
                }
                
                //Delete items on the backend
                ScoresService.deleteScores(scoreIds).then(function successCallback(response) {    
                }, function errorCallback(response) {
                    console.log(response);
                });
            }
            
            function addActionDisabled() {
                return false;
            }
            function onAddAction() {
                $state.go('addscore', { musicPieceId : $scope.musicPieceId });
            }
            
            
            //Controller methods
            function onCheck(score) {
                score.isSelected = !score.isSelected;
            }
            
            function loadMusicPiece(id) {
                MusicPieceService.getMusicPiece(id).then(function successCallback(response) {
                    $scope.musicpiece = response.data;                    
                    $scope.header.text = $scope.musicpiece.musicPieceName + " - Noten";    
                    
                    //Set all scores to unselected
                    if ($scope.musicpiece.scores) {
                        for(var i=0; i<$scope.musicpiece.scores.length; i++) {
                            $scope.musicpiece.scores[i].isSelected = false;
                        }
                    }
                        
                    $scope.musicpieceLoaded = true;
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.musicpieceLoaded = true;
                });
            }
    }]);
})(angular);