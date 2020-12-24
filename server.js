var express = require('express');
var app = express();
var path = require('path');
var https = require('https');
var fs = require('fs');
const hbs = require('hbs');

var app = express(); 

const port = process.env.PORT || 3000
//app.use( '/' , express.static(path.join(__dirname, 'public')));        

var url = 'https://picsum.photos/v2/list?page=1&limit=100';


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './views')
const partialsPath = path.join(__dirname, './views/layouts')

// install = npm i hbs@4.0.1
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('home');
});


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
        // app.get('/', function(req, res){
        //     res.sendFile('./public/views/index.hbs',{root: __dirname});
        // });
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

        app.listen(port, () => {
            console.log('Server is up on port ' + port)
        })
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});


