const SEC_RELOAD_NEW_IMAGES = 30000;
const slides = document.querySelectorAll('.slide');
const slides_img = document.querySelectorAll('.slide img');
const thumbnails = document.querySelectorAll('.thumb-img img');
const captionText = document.getElementById('caption');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let slideIndex = 0;

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

setInterval(async function(){
  await reloadNewFIveImg();
}, SEC_RELOAD_NEW_IMAGES);

async function reloadNewFIveImg() {
  console.log("API provide 5 random elements");
  fetch("/getNextChunk").then(response => response.json())
  .then(data => {
    getRandomImg(data);
  })
    .catch(console.error);
}; 

function getRandomImg(JSON_data) {
  console.log("Retrieve the new data and bind it to a view");
  let cache_data = JSON_data['images'];
  for(let i = 0; i < 5; i++) {
      slides_img[i].src = cache_data[i].download_url;
      thumbnails[i].src = cache_data[i].download_url;
    }
  }

