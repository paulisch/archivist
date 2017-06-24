(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.scores');
    ngmod.controller('ScoresCtrl', [
        '$scope', 'MusicPieceService', 'ScoresService', 'MainService', 'AppConstants', '$stateParams', '$state',
        function ($scope, MusicPieceService, ScoresService, MainService, AppConstants, $stateParams, $state) {
            
            //Init
            $scope.musicPieceId = $stateParams.musicPieceId;
            $scope.musicpiece = null;
            $scope.musicpieceLoaded = false;
            $scope.onCheck = onCheck;
            $scope.onAddAction = onAddAction;
            $scope.getScoreName = MainService.getScoreName;
            $scope.getScoreHref = ScoresService.getScoreHref;
            
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
                    for(var i=0; i<$scope.musicpiece.scores.length; i++) {
                        var score = $scope.musicpiece.scores[i];
                        if(score.isSelected) {
                            toDelete.push(score.scoreId);
                        }
                    }
                    deleteScores(toDelete);
                }
            }
            
            function deleteScores(scoreIds) {
                for(var i=0; i<scoreIds.length; i++) {
                    for(var j=0; j<$scope.musicpiece.scores.length; j++) {
                        if($scope.musicpiece.scores[j].scoreId == scoreIds[i]) {
                            $scope.musicpiece.scores.splice(j, 1);
                            break;
                        }
                    }
                }
                
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