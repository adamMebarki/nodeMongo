/**
 * Created by 1606149 on 21/11/2016.
 */

// lets require/import the mongodb native drivers.
var mongodb = require('mongondb');
// and our HHTP server
var http = require('http');
// setup our port
var port = process.env.PORT || 1337;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://<mebaad>:<mebaad>@ds050879.mlab.com:50879/mongonododb'
// We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;