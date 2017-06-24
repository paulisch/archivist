(function (angular) {
    'use strict';
    var ngmod = angular.module('archivist.scores');
    ngmod.controller('AddScoreCtrl', [
        '$scope', 'MusicPieceService', 'ScoresService', 'MainService', 'AppConstants', '$stateParams', '$window', '$filter', '$q',
        function ($scope, MusicPieceService, ScoresService, MainService, AppConstants, $stateParams, $window, $filter, $q) {
            
            //Init
            $scope.musicPieceId = $stateParams.musicPieceId;
            
            $scope.musicpiece = null;            
            $scope.instruments = null;
            $scope.instrument = null;
            
            $scope.dataLoaded = false;
            
            $scope.instrumentNos = fetchInstrumentNos();
            $scope.instrumentNo = null;
            
            $scope.file = null;
            $scope.readingFile = false;
            
            $scope.getInstrumentLabel = getInstrumentLabel;
            
            if ($scope.musicPieceId) {
                loadData($scope.musicPieceId);
            }
            else {
                $scope.dataLoaded = true;
            }
            
            $scope.$watch('instrument', function() {
                onInstrumentChanged();
            });
            
            $scope.setFile = function(element) {
                $scope.$apply(function ($scope) {
                    $scope.file = element.files[0];
                });
            };
            
            //Action bar
            $scope.header = {
                text : "Neue Stimme",
                showBackButton : true
            };
            $scope.actionButtons = [
                {
                    label: "Speichern",
                    icon: "fa fa-floppy-o",
                    disabled: saveActionDisabled,
                    onclick: onSaveAction,
                    hidden: function() { return false; }
                },
                {
                    label: "Abbrechen",
                    icon: "fa fa-window-close",
                    disabled: cancelActionDisabled,
                    onclick: onCancelAction,
                    hidden: function() { return false; }
                }
            ];
            
            //Action bar methods
            function saveActionDisabled() {
                return false;
            }
            function onSaveAction() {                
                $scope.ScoreForm.instrumentNoSelect.$setDirty();
                $scope.ScoreForm.instrumentSelect.$setDirty();
                $scope.ScoreForm.fileInput.$setDirty();
                
                if (!$scope.ScoreForm.$valid) {
                    return;
                }
                
                var score = {
                    instrument : {
                        instrumentId : $scope.instrument.instrumentId
                    },
                    instrumentNo : $scope.instrumentNo,
                    musicpiece : {
                        musicPieceId : $scope.musicpiece.musicPieceId
                    }
                };
                
                //ScoresService.addScore(score).then(function successCallback(response) {
                //    onCancelAction();
                //}, function errorCallback(response) {
                //    console.log(response);
                //});
                
                ScoresService.uploadScore(score, $scope.file).then(function successCallback(response) {
                    onCancelAction();
                }, function errorCallback(response) {
                    console.log(response);
                });
            }
            
            function cancelActionDisabled() {
                return false;
            }
            function onCancelAction() {
                $window.history.back();
            }
            
            
            //Controller methods
            function loadData(id) {
                $q.all([MusicPieceService.getMusicPiece(id), MusicPieceService.getInstruments()]).then(function successCallback(response) {
                    $scope.musicpiece = response[0].data;
                    $scope.instruments = response[1].data;
                    
                    $scope.header.text = "Neue Stimme für " + $scope.musicpiece.musicPieceName;
                    
                    $scope.instruments = $filter('orderBy')($scope.instruments, 'instrumentName');
                    $scope.instrument = $scope.instruments[0];
                    
                    $scope.dataLoaded = true;
                }, function errorCallback(response) {
                    console.log(response);
                    $scope.dataLoaded = true;
                });
            }
            
            function getInstrumentLabel(instrument) {
                var result = instrument.instrumentName;
                if (instrument.tune) {
                    result = result + " (" + instrument.tune + ")";
                }
                return result;
            }
            
            function onInstrumentChanged() {
                $scope.instrumentNos = fetchInstrumentNos();
                $scope.instrumentNo = $scope.instrumentNos[0];
            }
            
            function fetchInstrumentNos() {
                var nos = [];
                var i=0;
                for (i=0; i<AppConstants.instrumentNos.length; i++) {
                    nos.push(AppConstants.instrumentNos[i]);
                }
                
                if ($scope.musicpiece !== null && $scope.instruments !== null && $scope.instrument !== null && $scope.musicpiece.scores && $scope.musicpiece.scores.length > 0) {
                    var sameInstrumentScores = MainService.findByProperty($scope.musicpiece.scores, "instrument.instrumentId", $scope.instrument.instrumentId);
                    
                    if (sameInstrumentScores.length > 0) {
                        var nosToRemove = [];
                        for (i=0; i<nos.length; i++) {
                            var no = nos[i];
                            var existing = MainService.findByProperty(sameInstrumentScores, "instrumentNo", no);
                            if (existing.length > 0) {
                                nosToRemove.push(no);
                            }
                        }
                        
                        for (i=0; i<nosToRemove.length; i++) {
                            var noToRemove = nosToRemove[i];
                            for (var j=0; j<nos.length; j++) {
                                if (nos[j] == noToRemove) {
                                    nos.splice(j, 1);
                                    break;
                                }
                            }
                        }
                    }
                }
                return nos;
            }
            
            function clearFile() {
                $('#inputFile').val(null);
                $scope.file = null;
            }
            
            function uploadFile() {
                if ($scope.file !== null) {
                    $scope.readingFile = true;

                    var fileReader = new FileReader();
                    fileReader.onload = function(e) {
                        var contents = e.target.result;                            
                        $scope.$apply(function() {
                            var fileData = FilesSvc.buildFileData($scope.file.name, $attrs.target, contents);
                            FilesSvc.postFile(fileData).then(function (response) {
                                loadFiles();
                            }, function (response) {
                                loadFiles();
                                console.log(response);
                            }).finally(function() {
                                $scope.readingFile = false;
                                clearFile();
                            });                                
                        });
                    };
                    fileReader.readAsDataURL($scope.file);
                }
            }
    }]);
})(angular);