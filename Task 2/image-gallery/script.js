// Get all gallery images
const galleryImages = document.querySelectorAll(".gallery-item img");

// Get lightbox elements
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");


// Store current image index
let currentIndex = 0;


// Convert NodeList into an array
const images = Array.from(galleryImages);


// =========================
// OPEN LIGHTBOX
// =========================

function openLightbox(index) {

    currentIndex = index;

    lightboxImage.src = images[currentIndex].src;

    lightboxImage.alt = images[currentIndex].alt;

    lightbox.style.display = "flex";

    // Prevent background scrolling
    document.body.style.overflow = "hidden";
}


// =========================
// CLOSE LIGHTBOX
// =========================

function closeLightbox() {

    lightbox.style.display = "none";

    // Enable scrolling again
    document.body.style.overflow = "auto";
}


// =========================
// SHOW PREVIOUS IMAGE
// =========================

function showPrevious() {

    currentIndex--;

    // Go to last image if at first image
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    lightboxImage.src = images[currentIndex].src;

    lightboxImage.alt = images[currentIndex].alt;
}


// =========================
// SHOW NEXT IMAGE
// =========================

function showNext() {

    currentIndex++;

    // Go to first image if at last image
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    lightboxImage.src = images[currentIndex].src;

    lightboxImage.alt = images[currentIndex].alt;
}


// =========================
// IMAGE CLICK EVENTS
// =========================

images.forEach(function(image, index) {

    image.addEventListener("click", function() {

        openLightbox(index);

    });

});


// =========================
// BUTTON EVENTS
// =========================

closeBtn.addEventListener("click", function() {

    closeLightbox();

});


prevBtn.addEventListener("click", function() {

    showPrevious();

});


nextBtn.addEventListener("click", function() {

    showNext();

});


// =========================
// CLICK OUTSIDE IMAGE
// =========================

lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// =========================
// KEYBOARD EVENTS
// =========================

document.addEventListener("keydown", function(event) {

    // Escape = close
    if (event.key === "Escape") {

        closeLightbox();

    }


    // Left arrow = previous
    if (event.key === "ArrowLeft") {

        showPrevious();

    }


    // Right arrow = next
    if (event.key === "ArrowRight") {

        showNext();

    }

});