/**
 * Created by dalia on 09/09/16.
 */
'use strict';

angular.module("restful")
    .factory("restfulRepository",function(Restangular){
        return {
            findAll: function(){
                return Restangular.one('worker').get();
            },
            findOne: function(id){
                return Restangular.one('worker', id).get();
            },
            createOne: function(data){
                return Restangular.all('worker').post(data);
            },
            editOne: function(data){
                return this.findOne(data.id).then(function(element){
                    return Restangular.one('worker', data.id).customPUT(data);
                });
            },
            deleteOne: function(id){
                return Restangular.one('worker', id).remove();
            }
        }
    });
