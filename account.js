document.addEventListener('DOMContentLoaded', function() {
    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const opinionCard = this.closest('.opinion-details');
            const companyName = opinionCard.querySelector('.opinion-company').textContent;
            const serviceName = opinionCard.querySelector('.opinion-service').textContent;
            const opinionText = opinionCard.querySelector('.opinion-text').textContent.trim();
            const stars = opinionCard.querySelectorAll('.star.selected');
            const rating = stars.length;

            document.querySelector('.popup-company').textContent = companyName;
            document.querySelector('.popup-service').textContent = serviceName;
            document.getElementById('reviewText').value = opinionText;

            updateRating(rating);
            updateStars(rating);
            currentRating = rating;

            reviewPopupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
});

const menuItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        menuItems.forEach(menuItem => menuItem.classList.remove('active'));
        this.classList.add('active');
        const sectionId = this.getAttribute('data-section');
        contentSections.forEach(section => section.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');
    });
});

const reviewButtons = document.querySelectorAll('.review-button:not([disabled])');
const reviewPopupOverlay = document.querySelector('.review-popup-overlay');
const closePopupButton = document.querySelector('.close-popup');
const cancelButton = document.querySelector('.cancel-button');
const reviewForm = document.querySelector('.review-form');
const stars = document.querySelectorAll('.star');
const selectedRatingSpan = document.querySelector('.selected-rating');

function openReviewPopup(companyName, serviceName) {
    document.querySelector('.popup-company').textContent = companyName;
    document.querySelector('.popup-service').textContent = serviceName;
    reviewPopupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeReviewPopup() {
    reviewPopupOverlay.classList.remove('active');
    document.body.style.overflow = '';
    resetForm();
}

function resetForm() {
    reviewForm.reset();
    stars.forEach(star => {
        star.classList.remove('selected', 'hover', 'half');
    });
    selectedRatingSpan.textContent = '0';
}

reviewButtons.forEach(button => {
    button.addEventListener('click', function() {
        const appointmentCard = this.closest('.appointment-card');
        const companyName = appointmentCard.querySelector('.appointment-company').textContent;
        const serviceName = appointmentCard.querySelector('.appointment-service').textContent;

        openReviewPopup(companyName, serviceName);
    });
});

closePopupButton.addEventListener('click', closeReviewPopup);
cancelButton.addEventListener('click', closeReviewPopup);

reviewPopupOverlay.addEventListener('click', function(e) {
    if (e.target === reviewPopupOverlay) {
        closeReviewPopup();
    }
});

reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const companyName = document.querySelector('.popup-company').textContent;
    const rating = parseFloat(selectedRatingSpan.textContent);
    const reviewText = document.getElementById('reviewText').value;

    console.log({
        company: companyName,
        rating: rating,
        review: reviewText
    });

    alert(`Twoja opinia została wysłana. Dziękujemy za ocenę ${rating}/5!`);
    closeReviewPopup();
});

let currentRating = 0;

function updateRating(rating) {
    selectedRatingSpan.textContent = rating.toFixed(1);
}

function updateStars(rating) {
    stars.forEach(star => {
        const starValue = parseFloat(star.getAttribute('data-value'));
        star.classList.remove('selected', 'half');

        if (starValue <= rating) {
            star.classList.add('selected');
        } else if (starValue - 0.5 === rating) {
            star.classList.add('half', 'selected');
        }
    });
}

stars.forEach(star => {
    star.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const starWidth = rect.width;
        const position = e.clientX - rect.left;

        stars.forEach(s => s.classList.remove('hover', 'half'));

        const starValue = parseFloat(this.getAttribute('data-value'));

        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            const sValue = parseFloat(s.getAttribute('data-value'));

            if (sValue < starValue) {
                s.classList.add('hover');
            }
        }

        if (position < starWidth / 2) {
            this.classList.add('hover', 'half');
        } else {
            this.classList.add('hover');
        }
    });

    star.addEventListener('click', function(e) {
        const starValue = parseFloat(this.getAttribute('data-value'));
        const rect = this.getBoundingClientRect();
        const starWidth = rect.width;
        const position = e.clientX - rect.left;

        if (position < starWidth / 2) {
            currentRating = starValue - 0.5;
        } else {
            currentRating = starValue;
        }

        updateRating(currentRating);
        updateStars(currentRating);
    });

    star.addEventListener('mouseenter', function() {
        const value = parseFloat(this.getAttribute('data-value'));

        stars.forEach(s => {
            const starValue = parseFloat(s.getAttribute('data-value'));
            s.classList.remove('hover');

            if (starValue <= value) {
                s.classList.add('hover');
            }
        });
    });

    star.addEventListener('mouseleave', function() {
        stars.forEach(s => {
            s.classList.remove('hover');
        });
    });
});

const starsContainer = document.querySelector('.stars-container');
starsContainer.addEventListener('mouseleave', function() {
    updateStars(currentRating);
});