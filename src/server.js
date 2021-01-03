const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
const fs = require('fs');
const hbs = require('hbs');

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
var id_keys = [];

https.get(url, async (res) => {
    var body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });
    await res.on('end', async () => {
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
        id_keys = Object.keys(cached_images);
        console.log('get images data');

        app.get('/home2', async (req, res) => {    
            await res.render('home2');
        });

        app.get('/', async (req, res) => {    
            checkKeysImg(cached_images);
            console.log(id_keys.length);
            await res.render('home', { images: getFiveRandomImg(id_keys, cached_images) });
        });

        app.get('/getNextChunk', async (req, res) => {
            checkKeysImg(cached_images);
            console.log(id_keys.length);
            await res.send({ images: getFiveRandomImg(id_keys, cached_images) });
        });

        app.get('/images', async (req, res) => {
            await res.send({ images : cached_images });
        });

        app.get('/images/:id', (req, res) => {
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

function getFiveRandomImg(index, images) {
    let random_num, result = [], random_index;
    for (let i = 0; i < 5; i++) {
        random_index = Math.floor(Math.random() * index.length);
        random_num = index[random_index];
        result.push(images[random_num]);
        index.splice(random_index, 1);
    }     
    return result;
}

function isEmptyKeysImg(keys, imgs) {
    if (keys.length || keys === null) {
        return false;
    }
    return true;
}

function checkKeysImg(imgs) {
    if (isEmptyKeysImg(id_keys, imgs)) {
        id_keys = Object.keys(imgs);
    }
    return;
}
