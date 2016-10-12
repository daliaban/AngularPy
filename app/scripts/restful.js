/**
 * Created by dalia on 09/09/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name ceres.restful.controller:RestfulCtrl
 * @description
 * # RestfulCtrl
 * Controller of the ceres.restful
 */
angular.module('restful')
    .controller('RestfulCtrl', function ($scope, $uibModal, $window, $filter, myTableService, restfulRepository) {

        var onEditClick =  function(entity){
            var copyentity = angular.copy(entity);
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'sample_code/restful/edit-worker.html',
                controller: 'WorkerCtrl',
                resolve: {
                    worker: function(){
                        return copyentity
                    }
                }
            });
            modalInstance.result.then(function (worker){
                restfulRepository.editOne(worker).then(function(results){
                    $scope.updateData();
                });
            });
        };

        var onDeleteClick =  function(entity){
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'sample_code/restful/delete-worker.html',
                controller: 'WorkerCtrl',
                resolve: {
                    worker: function(){
                        return entity
                    }
                }
            });
            modalInstance.result.then(function (worker){
                restfulRepository.deleteOne(worker.id).then(function(results){
                    $scope.updateData();
                });
            });
        };

        $scope.tableOptions = myTableService.addTextColumn('id','ID')
            .addTextColumn('name', 'Name')
            .addTextColumn('age', 'Age')
            .addTextColumn('type', 'Type')
            .addColumnWithTemplateAndClick('edit','Edit','<a ng-click="onClick()" class="edit actionlink">Edit</a>', onEditClick)
            .addColumnWithTemplateAndClick('delete','Delete','<a ng-click="onClick()" class="delete actionlink">Delete</a>', onDeleteClick)
            .build();

        $scope.pagingOptions = {pageSize: 5, currentPage: 1, totalPages: 0};
        $scope.data = {paged: []};
        $scope.sortOptions = {fieldName:'id', direction: 'desc'};
        $scope.workers = [];

        $scope.updateData = function(){
            restfulRepository.findAll().then(function(results){
                $scope.workers = results.objects;
                $scope.pagingOptions.totalPages = Math.ceil($scope.workers.length/$scope.pagingOptions.pageSize);
                doLocalSorting();
                changePage($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
            });
        };
        $scope.updateData();
        $scope.addWorker = function(){
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: 'sample_code/restful/add-worker.html',
                controller: 'WorkerCtrl',
                resolve: {
                    worker: function(){
                        return {name: ''}
                    }
                }
            });
            modalInstance.result.then(function (worker){
                restfulRepository.createOne(worker).then(function(results){

                    $scope.updateData();
                });
            });
        };

        var doLocalSorting = function(){
            if ($scope.sortOptions.direction == 'asc'){
                $scope.workers = $filter('orderBy')($scope.workers, $scope.sortOptions.fieldName);
            }else{
                $scope.workers = $filter('orderBy')($scope.workers, "-" + $scope.sortOptions.fieldName);
            }
        };
        $scope.onSortClick = function(){
            doLocalSorting();
            changePage($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
        };

        function changePage(currentPage, pageSize) {
            $scope.data.paged = [];
            for (var i = 0; i < Math.min(pageSize, ($scope.workers.length - (pageSize * (currentPage-1)))); i++) {
                $scope.data.paged[i] = $scope.workers[(currentPage - 1) * pageSize + i];
            }
        }

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                changePage($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
            }
        }, true);

    });
