/**
 * Created by dalia on 09/09/16.
 */
'use strict';

angular.module('restful', ['ui.router'])
    .config(function($stateProvider){
        $stateProvider.state('restful', {
            url: '/restful',
            templateUrl: 'views/restful.html',
            controller: 'RestfulCtrl'
        });
    });
