const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

// buttoane
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// counter
let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// button listeners
nextBtn.addEventListener('click', () => {
    nextImage();
});

prevBtn.addEventListener('click', () => {
    prevImage();
});

carouselSlide.addEventListener('transitionend', () => {
    handleTransitionEnd();
});

// Auto Scroll
let autoScrollInterval;

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        nextImage();
    }, 2000); // Schimbă imaginea la fiecare 2 secunde (poți ajusta intervalul)
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Functia pentru a muta la urmatoarea imagine
function nextImage() {
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

// Functia pentru a muta la imaginea anterioara
function prevImage() {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

// Functia pentru a gestiona evenimentul de tranzitie la sfarsit
function handleTransitionEnd() {
    if (carouselImages[counter].id === 'lastClone') {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if (carouselImages[counter].id === 'firstClone') {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
}

// incepe auto scroll câad pagina se încarca
startAutoScroll();
