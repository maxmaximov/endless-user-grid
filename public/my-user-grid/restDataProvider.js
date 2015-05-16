'use strict';

var grid = angular.module('myUserGrid');

grid.service('restDataProvider', ['$http', '$q', function($http, $q) {
    this.url;

    function sort(sortKey, sortOrder, a, b) {
        if (a[sortKey] > b[sortKey]) return sortOrder;
        if (a[sortKey] < b[sortKey]) return sortOrder * -1;
        return 0;
    }

    this.get = function (from, to, sortKey, sortOrder) {
        var deferred = $q.defer();

        $http.get('/demo/data/mock.json').
            success(function(data, status, headers, config) {
                var _data = data.sort(sort.bind(this, sortKey, sortOrder)).slice(from, to);
                deferred.resolve(_data);
            }).
            error(function(data, status, headers, config) {
                console.error(status, data);
                deferred.reject();
            });

        return deferred.promise;
    }
}]);
