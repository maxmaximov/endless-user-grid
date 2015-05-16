'use strict';

var grid = angular.module('myUserGrid');

grid.service('localstorageDataProvider', ['$http', '$q', '$window', function($http, $q, $window) {
    this.prefix;

    function sort(sortKey, sortOrder, a, b) {
        if (a[sortKey] > b[sortKey]) return sortOrder;
        if (a[sortKey] < b[sortKey]) return sortOrder * -1;
        return 0;
    }

    this.get = function (from, to, sortKey, sortOrder) {
        var deferred = $q.defer();

        try {
            var _data = JSON.parse($window.localStorage.getItem(this.prefix + '-data'))
                .sort(sort.bind(this, sortKey, sortOrder))
                .slice(from, to);

            deferred.resolve(_data);
        } catch (e) {
            deferred.reject();
        }

        return deferred.promise;
    }
}]);
