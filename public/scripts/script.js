const slides = document.querySelectorAll('.slide');
const slides_img = document.querySelectorAll('.slide img');
const thumbnails = document.querySelectorAll('.thumb-img img');
const captionText = document.getElementById('caption');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const url_images = 'http://localhost:3000/images';
const cacheName = 'website-cache';
let slideIndex = 0;

//document.getElementById("imageid").src="../template/save.png";
function prevSlide() {
  if (slideIndex < 1) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex--;
  }
  
  slideImages(slideIndex);
}


function nextSlide() {
  if (slideIndex >= slides.length - 1) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }
  slideImages(slideIndex);
}

function showSlide(event) {
  let n = event.target.parentElement.id;
  slideImages(n);
}

function slideImages(n) {
  slides.forEach(slide => {
    slide.style.display = 'none'
  });
  
  thumbnails.forEach(thumbnail => {
    thumbnail.className = thumbnail.className.replace(' active', '');
  });
  
  slides[n].style.display = 'block';
  thumbnails[n].classList.add('active');
  captionText.textContent = thumbnails[n].alt;
}

prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);
thumbnails.forEach(thumbnail => thumbnail.addEventListener('click', showSlide));

slideImages(slideIndex);

window.onload = caches.delete(cacheName).then(() => {
  console.log('Cache deleted');
});

setInterval(function(){
  reloadNewFiveImg()
}, 30000);

function reloadNewFiveImg() {
  alert("Loading new random images.");
  console.log("Loading new random images.");
  fetch("http://localhost:3000/images").then(response => response.json())
  .then(data => {
      let randomNum, index = Object.keys(data['images']);
      for(let i = 0; i < 5; i++) {
          randomNum = index[Math.floor(Math.random() * index.length)];
          slides_img[i].src = data['images'][randomNum]['download_url'];
          thumbnails[i].src = data['images'][randomNum]['download_url'];
          index.splice(randomNum, 1);
      }
  })
  .catch(console.error);
};



