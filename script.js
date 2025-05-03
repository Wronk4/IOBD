document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.categories-slider');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const items = document.querySelectorAll('.category-item');

    const itemWidth = 180;
    let visibleItems = Math.floor(slider.offsetWidth / itemWidth);
    let currentPosition = 0;
    let maxPosition = items.length - visibleItems;

    function moveSlider(direction) {
        if (direction === 'next' && currentPosition < maxPosition) {
            currentPosition++;
        } else if (direction === 'prev' && currentPosition > 0) {
            currentPosition--;
        }

        slider.style.transform = `translateX(${-currentPosition * itemWidth}px)`;
        updateButtonState();
    }

    nextButton.addEventListener('click', () => moveSlider('next'));
    prevButton.addEventListener('click', () => moveSlider('prev'));

    function updateButtonState() {
        prevButton.style.opacity = currentPosition === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentPosition >= maxPosition ? '0.5' : '1';
    }

    window.addEventListener('resize', function() {
        visibleItems = Math.floor(slider.offsetWidth / itemWidth);
        maxPosition = items.length - visibleItems;

        if (currentPosition > maxPosition) {
            currentPosition = Math.max(0, maxPosition);
            slider.style.transform = `translateX(${-currentPosition * itemWidth}px)`;
        }

        updateButtonState();
    });

    updateButtonState();

    items.forEach(item => {
        item.addEventListener('click', () => {
            window.location.href = "search.html";
        });
    });
});

function goToCompany() {
    window.location.href = "company.html";
}

document.querySelectorAll('.cs-service-card').forEach(card => {
    card.addEventListener('click', () => {
        goToCompany();
    });
  });