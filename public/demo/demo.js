'use strict';

require('../my-user-grid/my-user-grid');

var app = angular.module('demo', ['myUserGrid']);

$.get('/demo/data/mock.json', function (data) {
    localStorage.setItem('my-data', JSON.stringify(data));
});
