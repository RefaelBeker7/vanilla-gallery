    var slideIndex = 1;
    window.onload = function() {
    fetch("http://localhost:3000/images").then(response => response.json())
    .then(data => {
        var prologue = '', epilogue = '';
        for(var i = 0; i < data.length; i++) {
            prologue += `<div class="mySlides">
    <div class="numbertext">${i+1} / 6</div>
    <img src="${data[i]['download_url']}" style="width:1024px;">
    </div>`;
            epilogue += `
    <div class="column">
    <img class="cursor" src="${data[i]['download_url']}" style="width: 256px;" onclick="currentSlide(${i + 1})" alt="${data[i]['author']}">
    </div>`;
        }
        var slides_html = prologue + `

    <!-- Next and previous buttons -->
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>

    <!-- Image text -->
    <div class="caption-container">
    <p id="caption"></p>
    </div>

    <!-- Thumbnail images -->
    <div class="row">
    ` + epilogue + `
    </div>`;


        console.log(slides_html);
        document.getElementsByClassName("container")[0].innerHTML = slides_html;

        showSlides(slideIndex);
    })
    .catch(console.error);
    };

    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        var captionText = document.getElementById("caption");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
        captionText.innerHTML = dots[slideIndex-1].alt;
    }