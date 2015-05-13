'use strict';

var grid = angular.module('my-grid', []);

grid.directive('myGrid', function () {
    return {
        template: '<div class="my-grid"></div>',
    //templateUrl
        replace: true
    }
});
