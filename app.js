var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
    res.status(404);
});

module.exports = app;
