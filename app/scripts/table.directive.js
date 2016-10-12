/**
 * Created by dalia on 12/10/16.
 */
'use strict';

angular.module('restful')
    .directive('tableDir', function(){

        var tableCtrl = function($scope, $uibModal, $filter, restfulRepository){
            $scope.onEditClick =  function(index){
                var copyentity = angular.copy($scope.data.paged[index]);
                var modalInstance = $uibModal.open({
                    animation:true,
                    templateUrl: 'views/edit-worker.html',
                    controller: 'WorkerCtrl',
                    resolve: {
                        worker: function(){
                            return copyentity
                        }
                    }
                });
                modalInstance.result.then(function (worker){
                    restfulRepository.editOne(worker).then(function(){
                        $scope.updateData();
                    });
                });
            };

            $scope.onDeleteClick =  function(index){
                var entity = $scope.data.paged[index];
                var modalInstance = $uibModal.open({
                    animation:true,
                    templateUrl: 'views/delete-worker.html',
                    controller: 'WorkerCtrl',
                    resolve: {
                        worker: function(){
                            return entity
                        }
                    }
                });
                modalInstance.result.then(function (worker){
                    restfulRepository.deleteOne(worker.id).then(function(){
                        $scope.updateData();
                    });
                });
            };

            var doLocalSorting = function(){
                if ($scope.sortOptions.direction == 'asc'){
                    $scope.allworkers = $filter('orderBy')($scope.allworkers, $scope.sortOptions.fieldName);
                }else{
                    $scope.allworkers = $filter('orderBy')($scope.allworkers, "-" + $scope.sortOptions.fieldName);
                }
            };

            var changePage = function(currentPage, pageSize) {
                $scope.data.paged = [];
                for (var i = 0; i < Math.min(pageSize, ($scope.allworkers.length - (pageSize * (currentPage-1)))); i++) {
                    $scope.data.paged[i] = $scope.allworkers[(currentPage - 1) * pageSize + i];
                }
            };

            $scope.updateData = function(){
                restfulRepository.findAll().then(function(results){
                    $scope.allworkers = results.objects;
                    $scope.pagingOptions.totalPages = Math.ceil($scope.allworkers.length/$scope.pagingOptions.pageSize);
                    doLocalSorting();
                    changePage($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
                });
            };
            $scope.updateData();
            $scope.addWorker = function(){
                var modalInstance = $uibModal.open({
                    animation:true,
                    templateUrl: 'views/add-worker.html',
                    controller: 'WorkerCtrl',
                    resolve: {
                        worker: function(){
                            return {name: ''}
                        }
                    }
                });
                modalInstance.result.then(function (worker){
                    restfulRepository.createOne(worker).then(function(){
                        $scope.updateData();
                    });
                });
            };

            $scope.onSortClick = function(){
                doLocalSorting();
                changePage($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
            };

            $scope.$watch('pagingOptions', function (newVal, oldVal) {
                if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                    changePage($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
                }
            }, true);

        };

        return {
            restrict: 'EA',
            controller: tableCtrl,
            templateUrl: 'views/table.html',
            scope: {
                data: "=",
                pagingOptions: "=",
                sortOptions: "="
            }
        }
    });