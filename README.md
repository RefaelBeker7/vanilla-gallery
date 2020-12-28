# Vanilla Web-Based Gallery Mini-Project
Simple mini gallery project using nothing but HTML5, CSS & JavaScript. No JS or CSS frameworks, no libraries, etc.

### Heroku link
https://vanilla-gallery-beker.herokuapp.com/getNextChunk


### Each image element schema contains: 
```
{

"id": "<element identifier>",

"author": "<author name>",

"width": <image width>,

"height": <image height>,

"url": "<source page image url>",

"download_url": "<image url>"

}
```

Installation & Run
---
1. Clone the repository of Vanilla Gallery: <br />
```$ git clone git@github.com:refaelbeker7/vanilla-gallery.git```

2. Install dependencies: <br />
```npm install```

3. Run the application: <br />
```npm start```

4. Open url http://localhost:3000/getNextChunk in your browser.

Endpoints
---

### /getNextChunk

- Methods: **GET**
- Description: Gallery application

### /images

- Methods: **GET**
- Description: Return 100 images in JSON

### /images/id

- Methods: **GET**
- Description: Return a image by id in JSON

Screenshot
---
![screenshop application](https://github.com/RefaelBeker7/vanilla-gallery/blob/main/screenshot/screenshot_app.png)

License
---
MIT [@RefaelBeker](https://github.com/RefaelBeker7)


