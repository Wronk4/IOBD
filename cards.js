document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.cs-carousel-container');
    const prevBtn = document.querySelector('.cs-prev-btn');
    const nextBtn = document.querySelector('.cs-next-btn');
    const cardWidth = document.querySelector('.cs-service-card').offsetWidth + 20;
    let position = 0;

    const cards = document.querySelectorAll('.cs-service-card');
    const visibleCards = Math.floor(document.querySelector('.cs-carousel').offsetWidth / cardWidth);
    const maxPosition = cards.length - visibleCards;

    prevBtn.addEventListener('click', function () {
      if (position > 0) {
        position--;
        updateCarouselPosition();
      }
    });

    nextBtn.addEventListener('click', function () {
      if (position < maxPosition) {
        position++;
        updateCarouselPosition();
      }
    });

    function updateCarouselPosition() {
      carousel.style.transform = `translateX(-${position * cardWidth}px)`;
    }

    window.addEventListener('resize', function () {
      position = 0;
      updateCarouselPosition();
    });
  });