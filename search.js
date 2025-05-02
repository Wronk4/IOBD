document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            console.log('Sortowanie według:', this.value);
            animateResults();
        });
    }

    const categorySelect = document.getElementById('category-select');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            console.log('Filtrowanie według kategorii:', this.value);
            animateResults();
        });
    }

    const ratingSelect = document.getElementById('rating-select');
    if (ratingSelect) {
        ratingSelect.addEventListener('change', function() {
            console.log('Filtrowanie według oceny:', this.value);
            animateResults();
        });
    }

    const dateFilter = document.getElementById('date-filter');
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            console.log('Filtrowanie według daty:', this.value);
            animateResults();
        });
    }

    const checkboxFilters = document.querySelectorAll('.filter-checkboxes input');
    checkboxFilters.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log('Filtr:', this.id, 'Stan:', this.checked);
            animateResults();
        });
    });

    const removeFilterButtons = document.querySelectorAll('.remove-filter');
    removeFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterTag = this.parentElement;
            filterTag.remove();
            animateResults();
        });
    });

    const clearFiltersButton = document.querySelector('.clear-filters');
    if (clearFiltersButton) {
        clearFiltersButton.addEventListener('click', function() {
            const filterTags = document.querySelectorAll('.filter-tag');
            filterTags.forEach(tag => tag.remove());

            document.getElementById('sort-select').value = 'relevance';
            document.getElementById('category-select').value = 'all';
            document.getElementById('rating-select').value = 'all';
            document.getElementById('date-filter').value = '2025-05-02';

            document.querySelectorAll('.filter-checkboxes input').forEach(checkbox => {
                checkbox.checked = false;
            });

            document.getElementById('free-today').checked = true;

            animateResults();
        });
    }

    const pageItems = document.querySelectorAll('.page-item');
    pageItems.forEach(item => {
        item.addEventListener('click', function() {
            pageItems.forEach(page => page.classList.remove('active'));
            this.classList.add('active');
            console.log('Zmiana strony na:', this.textContent);
            animateResults();
        });
    });

    const pageArrows = document.querySelectorAll('.page-arrow:not(.disabled)');
    pageArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            const activePage = document.querySelector('.page-item.active');
            const activeIndex = Array.from(pageItems).indexOf(activePage);
            const isNext = this.querySelector('svg polyline').getAttribute('points') === '9 18 15 12 9 6';

            if (isNext && activeIndex < pageItems.length - 1) {
                pageItems[activeIndex].classList.remove('active');
                pageItems[activeIndex + 1].classList.add('active');
            } else if (!isNext && activeIndex > 0) {
                pageItems[activeIndex].classList.remove('active');
                pageItems[activeIndex - 1].classList.add('active');
            }

            updateArrowStates();
            animateResults();
        });
    });

    function updateArrowStates() {
        const activePage = document.querySelector('.page-item.active');
        const activeIndex = Array.from(pageItems).indexOf(activePage);

        const prevArrow = document.querySelector('.page-arrow:first-child');
        const nextArrow = document.querySelector('.page-arrow:last-child');

        if (activeIndex === 0) {
            prevArrow.classList.add('disabled');
        } else {
            prevArrow.classList.remove('disabled');
        }

        if (activeIndex === pageItems.length - 1) {
            nextArrow.classList.add('disabled');
        } else {
            nextArrow.classList.remove('disabled');
        }
    }

    const viewProfileButtons = document.querySelectorAll('.view-profile');
    viewProfileButtons.forEach(button => {
        button.addEventListener('click', function() {
            const businessCard = this.closest('.business-card');
            const businessName = businessCard.querySelector('.business-name').textContent;
            console.log('Przekierowanie na profil firmy:', businessName);
            alert('Przekierowanie na profil firmy: ' + businessName);
        });
    });

    const timeSlots = document.querySelectorAll('.slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            const businessCard = this.closest('.business-card');
            const businessName = businessCard.querySelector('.business-name').textContent;
            const time = this.textContent;
            console.log('Rezerwacja terminu:', time, 'w', businessName);
            alert('Rezerwacja terminu: ' + time + ' w ' + businessName);
        });
    });

    function animateResults() {
        const results = document.querySelectorAll('.business-card');
        results.forEach(result => {
            result.style.animation = 'none';
            result.offsetHeight;
            result.style.opacity = '0';
        });
        results.forEach((result, index) => {
            result.style.animation = `fadeIn 0.6s forwards ${index * 0.1}s`;
        });
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchText = this.value.trim();
                if (searchText) {
                    document.querySelector('.search-header h1').textContent = `Wyniki wyszukiwania: "${searchText}"`;
                    animateResults();
                }
            }
        });
    }
});