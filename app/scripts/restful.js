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
    .controller('RestfulCtrl', function ($scope) {

        $scope.pagingOptions = {pageSize: 5, currentPage: 1, totalPages: 0};
        $scope.data = {allworkers: [], paged: []};
        $scope.sortOptions = {fieldName:'id', direction: 'desc'};

    });
