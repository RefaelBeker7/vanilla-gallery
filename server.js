var express = require('express');
var app = express();
var path = require('path');
var https = require('https');
var fs = require('fs');

const PORT=8080; 

var url = 'https://picsum.photos/v2/list?page=1&limit=100';

var cached_images = {};
https.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var response = JSON.parse(body);
        for (var i = 0; i < response.length; i++) {
            cached_images[response[i].id] = {
                "author": response[i].author,  
                "width": response[i].width, 
                "height": response[i].height, 
                "url": response[i].url, 
                "download_url": response[i].download_url
            };
        }
        var app = express(); 
        app.use( '/' , express.static(path.join(__dirname, 'public')));
        
        app.get('/', function(req, res){
            res.sendFile('./public/views/index.html',{root: __dirname});
        });
        app.get('/images', function(req, res) {
            var keys = Object.keys(cached_images);
            var result = [];
            for (var i = 0; i < 5; i++) {
                result.push(cached_images[keys[Math.floor(Math.random() * keys.length)]]);
            }
            res.send(result);
        });
        app.get('/images/:id', function(req, res) {
            if (cached_images.hasOwnProperty(req.params.id)) {
                res.send(cached_images[req.params.id]);
            } else {
                res.send({"error": "Image not found"})
            }
        });
        app.listen(3000);                       
        console.log('Listening on port 3000...');
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});






