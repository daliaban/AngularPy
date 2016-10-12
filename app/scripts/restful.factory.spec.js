/**
 * Created by dalia on 09/09/16.
 */
/**
 * Created by dalia on 13/07/16.
 */
'use strict';

describe('Restful Factory', function(){
    beforeEach(module('restful'));
    var scope, Restangular, httpBackend,dummyResponse, baseUrl, dummyData, dummyResponse2 ;
    dummyResponse = [{id: 1, name: "Dalia Banerjee", age: 20, type: "Employee"}];
    dummyResponse2 = [];
    dummyData = {id: 1, name: "Dalia Banerjee", age: 20, type: "Employee"};
    baseUrl = 'http://0.0.0.0:5000/skylabc/api';

    beforeEach(inject(function($controller, $rootScope, _Restangular_, _$httpBackend_){
        scope = $rootScope.$new();
        Restangular = _Restangular_;
        httpBackend = _$httpBackend_;
    }));

    it('Should find all resources', inject(function(restfulRepository){
        spyOn(Restangular, 'all').and.callThrough();
        httpBackend.whenGET(baseUrl+'/worker').respond(200, dummyResponse);
        restfulRepository.findAll().then(function(response){
            expect(response[0]).toEqual(dummyResponse[0]);
        });
        httpBackend.flush();
    }));

    xit('Should find one resource', inject(function(restfulRepository){
        spyOn(Restangular, 'all').and.callThrough();
        httpBackend.whenGET(baseUrl+'/worker/1').respond(200, dummyResponse);
        restfulRepository.findOne(1).then(function(response){
            expect(response[0]).toEqual(dummyResponse[0]);
        });
        httpBackend.flush();
    }));

    it('Should create resource', inject(function(restfulRepository){
        spyOn(Restangular, 'all').and.callThrough();
        httpBackend.whenPOST(baseUrl+'/worker').respond(200, dummyResponse);
        restfulRepository.createOne(dummyData).then(function(response){
            expect(response[0]).toEqual(dummyData);
        });
        httpBackend.flush();
    }));

    it('Should edit resource', inject(function(restfulRepository){
        spyOn(Restangular, 'all').and.callThrough();
        httpBackend.whenPUT(baseUrl+'/worker/1').respond(200, dummyResponse);
        httpBackend.whenGET(baseUrl+'/worker/1').respond(200, dummyResponse);
        restfulRepository.editOne(dummyData).then(function(response){
            expect(response[0]).toEqual(dummyData);
        });
        httpBackend.flush();
    }));

    it('Should delete resource', inject(function(restfulRepository){
        spyOn(Restangular, 'all').and.callThrough();
        httpBackend.whenDELETE(baseUrl+'/worker/1').respond(200, dummyResponse2);
        restfulRepository.deleteOne(1).then(function(response){
            expect(response.length).toEqual(0);
        });
        httpBackend.flush();
    }));

});
