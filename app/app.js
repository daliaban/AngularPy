/**
 * Created by dalia on 09/09/16.
 */
'use strict';
/*global angular */

angular.module(
    'AngularPy',
    [   'ui.router',
        'ui.bootstrap',
        'restangular',
        'restful'
    ])
    .config(function($stateProvider, RestangularProvider, configuration){

        var baseUrl = configuration.apiUrl;
        RestangularProvider.setBaseUrl(baseUrl);


        $stateProvider.state('main', {
            url: '/main',
            templateUrl: 'views/help.html',
            controller: 'HelpCtrl'
        });

    });