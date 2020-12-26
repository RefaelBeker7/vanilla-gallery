const slides = document.querySelectorAll('.slide');
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

window.setTimeout(function () {
  window.location.reload();
  alert("Loading new random images..");
}, 30000);