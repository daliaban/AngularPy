/**
 * Created by dalia on 09/09/16.
 */

'use strict';

angular.module('restful')
    .controller('WorkerCtrl',function($scope,$uibModalInstance, worker){
        $scope.worker = worker;

        $scope.cancel = function(){
            $uibModalInstance.dismiss('cancel');
        };

        $scope.ok = function(){
            $uibModalInstance.close($scope.worker);
        };
    });
