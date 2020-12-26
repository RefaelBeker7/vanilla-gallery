var express = require('express');
var app = express();
var path = require('path');
var https = require('https');
var fs = require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000

var url = 'https://picsum.photos/v2/list?page=1&limit=100';

const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './views')
const partialsPath = path.join(__dirname, './views/layouts')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

var cached_images = {};
var id_array = [];

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
            id_array.push(response[i].id);
        }
        
        console.log('get images data')
        
        app.get('/getNextChunk', function (req, res) {
            const randomImage = [];
            for (let i = 0; i < 5; i++) {
                const randomNum = id_array[Math.floor(Math.random() * id_array.length)];
                randomImage.push(cached_images[randomNum]);
                id_array.splice(randomNum, 1);
            }
            res.render('home', {images: randomImage});
        })

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
    res.on('error', function(e){
        console.log("Got an error: ", e);
  }); 
}).on('error', function(e){
      console.log("Got an error: ", e);
});

