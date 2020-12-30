const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
const fs = require('fs');
const hbs = require('hbs');
const { getFiveImg } = require('./utils/helper');

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');
const partialsPath = path.join(__dirname, '../views/layouts');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
/*
 * Implement a function that fetch 100 element to public api.
 * Store all the element in a dict while the key is the id and value is the author, width, height, url, download_url.
 * Implement an endpoint that sends 5 random images from the dict.
 * Implement an endpoint that receives and return the dowload_url.
 * Implement an endpoint that is the front html.
*/
var url = 'https://picsum.photos/v2/list?page=1&limit=100';
var cached_images = {};
var id_array = [];

https.get(url, async (res) => {
    var body = '';
    res.on('data', async (chunk) => {
        body += chunk;
    });
    res.on('end', async () => {
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
        id_array = Object.keys(cached_images);
        //cache.addAll(cached_images);
        console.log('get images data');
        
        app.get('/getNextChunk', async (req, res) => {
            res.render('home', {images: getFiveImg(id_array, cached_images)});
        })

        app.get('/images', async (req, res) => {
            res.send(getFiveImg(id_array, cached_images));
        });

        app.get('/images/:id', async (req, res) => {
            if (cached_images.hasOwnProperty(req.params.id)) {
                res.send(cached_images[req.params.id]);
            } else {
                res.send({"error": "Image not found"});
            }
        });
        app.listen(port, () => {
            console.log('Server is up on port ' + port);
        });
    });
    res.on('error', function(e){
        console.log("Got an error: ", e);
  }); 
}).on('error', function(e){
      console.log("Got an error: ", e);
});

