/**
 * Created by dalia on 09/09/16.
 */
'use strict';

describe('Testing Restful', function(){
    beforeEach(module('restful'));
    var scope, controller, q,  Restangular, httpBackend,dummyResponse, baseUrl, dummyData, dummyFactory, dummyResponse2 ;
    dummyResponse = [{id: 1, name: "Dalia Banerjee", age: 20, type: "Employee"}];
    dummyResponse2 = [];

    dummyFactory = function(){};
    /* findOne: function(id){
     return dummyResponse;
     },
     createOne: function(data){
     return dummyResponse;
     },
     editOne: function(data){
     return dummyResponse
     },
     deleteOne: function(id){
     return dummyResponse2
     }*/


    beforeEach(module(function ($provide) {
        $provide.service('restfulRepository', dummyFactory);
    }));

    beforeEach(inject(function($controller, $rootScope, $q){
        scope = $rootScope.$new();
        controller = $controller('RestfulCtrl', {
            $scope: scope
        });
        q = $q;
    }));

    it('Should update table with all resources', function(){
        dummyFactory.prototype.findAll = function(){
            var defer = q.defer();
            defer.resolve(dummyResponse);
            return defer.promise;
        };
        scope.updateData();
        expect(scope.workers).toBe(dummyResponse[0]);
    });

    xit('Should find one resource', inject(function(restfulRepository){
        spyOn(Restangular, 'all').and.callThrough();
        httpBackend.whenGET(baseUrl+'/worker/1').respond(200, dummyResponse);
        restfulRepository.findOne(1).then(function(response){
            expect(response[0]).toEqual(dummyResponse[0]);
        });
        httpBackend.flush();
    }));


});
