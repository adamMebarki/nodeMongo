/**
 * Created by 1606149 on 21/11/2016.
 */

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//and our HTTP server
var http = require('http');
//setup our port
var port = process.env.PORT || 1337;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://mebaad:mebaad@ds050879.mlab.com:50879/mongonododb'
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Connecting \n');
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        response.write('Connection Made \n');
        if (err) {
            response.write('Unable to connect to the mongoDB server. Error:' + err + "\n");
            //Error so close connection
            db.close();
        } else {
            //HURRAY!! We are connected. :)
            response.write('Connection established to ' + url +"\n");

            // Get the documents collection
            var collection = db.collection('users');

            //We have a cursor now with our find criteria
            var results = collection.find();
            //Lets iterate on the result
            results.sort({name : -1});
            
            results.each(function (err, result) {
                //if the result is null, there are no more results, it’s ok to close everything
                if (result == null) {
                    response.end('Completed');
                    db.close();
                }
                if (err) {
                    response.write(err);
                } else {

                    response.write('Fetched: ' + result.name + " : " + result.age + " : " + result.roles.toString() +'\n');
                }
            });

            collection.update({name : 'modulus user'},{$set: {enabled : false}},function(err,numUpdated){
                if (err) {
                    response.write(err);
                } else if (numUpdated) {
                    response.write ('Updated Successfully : ' + numUpdated + "\n");
                } else {
                    response.write ('No document found with defined "find" criteria!');
                }
                db.close;
                response.end('DB closed');

            });

        }
        // asynchronous task send the function to be start and continue to read the file
        // meet the close and close the db before the fucntion send have the time to finish.
        //Done Close connection
        //db.close();
        //response.end('Finished, Connection closed \n');
    });

}).listen(port);