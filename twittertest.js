/**
 * Created by 1606149 on 28/11/2016.
 */

var Twitter = require('twitter');
var http = require('http')
var port = process.env.PORT || 1337;


var client = new Twitter({
    consumer_key:'qvED2z2cuLV5cKOyqSs4yZBix',
    consumer_secret:'TDFzGHcevtD8Vx2q459eiV6LlunyMtBS0OgaKGXKH15tTHDlrH',
    access_token_key:' 803245930115899393-BSW3RbcjWKVSwN2IQPROrTn3YC3Nt8e',
    access_token_secret:'PNhqEJB7tza4juPuUzdZy6Pkx4VgJOUxulGZCjGUdtyaz'
});

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    client.get('search/tweets', {q: 'lolcats'}, function(error, tweets){
        console.log(tweets);
    });

}).listen(port);
