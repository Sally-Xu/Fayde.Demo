﻿/// <reference path="server/typings/express/express.d.ts" />
var http = require('http');
var express = require('express');

var app = express.createServer();

var home = process.env.deployPath || '';
var api = home + '/api';
var apiCollection = home + '/api/:collectionName';
var apiObject = home + '/api/:collectionName/:id';

var monk = require('monk');
var db = monk('localhost/SIMDB');

app.use(express.favicon());
app.use(express.logger());
//app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get(api, function (req, res) {
    res.send('hello world from api at ' + process.env.deployPath);
});

app.get(apiCollection, function (req, res) {
    var collection = db.get(req.params.collectionName.toLowerCase());
    collection.find({}, {}, function (err, data) {
        if (err) {
            res.send("Error: " + err);
        } else {
            res.json(data);
        }
    });
});

app.get(apiObject, function (req, res) {
    var collection = db.get(req.params.collectionName.toLowerCase());
    collection.findOne({ _id: req.params.id}, {}, function (err, data) {
        if (err) {
            res.send("Error: " + err);
        } else {
            res.json(data);
        }
    });
});

// POST
app.post(apiCollection, function (req, res) {
    var data = req.body;
    if (data._id == null) {
        res.send('/ object must contains _id for updating');
        return;
    }
    var collection = db.get(req.params.collectionName.toLowerCase());
    collection.update({ _id: data._id }, data, false);
    res.send('/ Update OK');
});

// PUT
app.put(apiCollection, function (req, res) {
    var data = req.body;
    var collection = db.get(req.params.collectionName.toLowerCase());
    collection.insert(data);    
    res.send('/ Insert OK');
});

// DELETE
app.delete(apiCollection, function (req, res) {
    var filter = JSON.parse(req.body);
    if (!filter) {
        res.send('/ DELETE Faile, no object to delete');
        return;
    }
    var collection = db.get(req.params.collectionName.toLowerCase());
    collection.find(filter, {}, function (err, data) {
        if (err) {
            res.send("/ Delete Error: " + err);
        } else {
            data.forEach(function (d) {
                collection.remove(d);
            });
            res.send('/ DELETE ' + req.params.collectionName + ' OK');
        }
    });
});

// DELETE
app.delete(apiObject, function (req, res) {
    var collection = db.get(req.params.collectionName.toLowerCase());
    var obj = { _id: req.params.id };
    collection.findOne(obj, {}, function (err, data) {
        if (err) {
            res.send("/ Delete Error: " + err);
        } else {
            collection.remove(obj);
            res.send('/ DELETE ' + req.params.collectionName + ' id ' + req.params.id + ' OK');
        }
    });
});

// PATCH
app.patch(api, function (req, res) {
    res.send('/ PATCH OK');
});

// OPTIONS request to the root URL
app.options(api, function (req, res) {
    res.send('/ OPTIONS OK');
});

//// M-SEARCH request to the root URL
//app['m-search']('/', function (req, res) {
//    res.send('/ M-SEARCH OK');
//});

//// NOTIFY request to the root URL
//app.notify('/', function (req, res) {
//    res.send('/ NOTIFY OK');
//});

//// SUBSCRIBE request to the root URL
//app.subscribe('/', function (req, res) {
//    res.send('/ SUBSCRIBE OK');
//});

//// UNSUBSCRIBE request to the root URL
//app.unsubscribe('/', function (req, res) {
//    res.send('/ UNSUBSCRIBE OK');
//});

//app.all('/api/*', requireAuthentication);

app.listen(process.env.PORT);