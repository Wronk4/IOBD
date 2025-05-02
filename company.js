document.addEventListener('DOMContentLoaded', function() {
    const services = {
        'instalacja': {
            price: 'od 3500 zł',
            duration: '3-5 dni'
        },
        'modernizacja': {
            price: 'od 2800 zł',
            duration: '2-4 dni'
        },
        'oswietlenie': {
            price: 'od 800 zł',
            duration: '1 dzień'
        },
        'naprawa': {
            price: 'od 200 zł',
            duration: '1-4 godziny'
        },
        'fotowoltaika': {
            price: 'od 15000 zł',
            duration: '3-5 dni'
        }
    };
    
    const popup = document.getElementById('appointment-popup');
    const appointmentButton = document.querySelector('.appointment-button');
    const closeButton = document.querySelector('.close-popup');
    
    if (appointmentButton) {
        appointmentButton.addEventListener('click', function() {
            popup.style.display = 'flex';
            setTimeout(() => {
                popup.classList.add('active');
            }, 10);
        });
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            popup.classList.remove('active');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        });
    }
    
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('active');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        }
    });
    
    const serviceSelect = document.getElementById('service-select');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            const selectedService = this.value;
            if (services[selectedService]) {
                this.classList.add('pulse');
                
                const priceElement = document.getElementById('selected-price');
                const durationElement = document.getElementById('selected-duration');
                
                if (priceElement) {
                    priceElement.style.transform = 'translateY(10px)';
                    priceElement.style.opacity = '0';
                    setTimeout(() => {
                        priceElement.textContent = services[selectedService].price;
                        priceElement.style.transform = 'translateY(0)';
                        priceElement.style.opacity = '1';
                    }, 200);
                }
                
                if (durationElement) {
                    durationElement.style.transform = 'translateY(10px)';
                    durationElement.style.opacity = '0';
                    setTimeout(() => {
                        durationElement.textContent = services[selectedService].duration;
                        durationElement.style.transform = 'translateY(0)';
                        durationElement.style.opacity = '1';
                    }, 200);
                }
                
                const serviceDetails = document.querySelector('.service-details');
                if (serviceDetails) {
                    serviceDetails.style.transform = 'translateY(5px)';
                    setTimeout(() => {
                        serviceDetails.style.transform = 'translateY(0)';
                    }, 200);
                }
                
                setTimeout(() => {
                    this.classList.remove('pulse');
                }, 1000);
            }
        });
    }
    
    const calendarDays = document.querySelectorAll('.calendar-day.available');
    const selectedDateSpan = document.getElementById('selected-date');
    const selectedDateContainer = document.querySelector('.selected-date-container');
    
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            document.querySelectorAll('.calendar-day.selected').forEach(selected => {
                selected.classList.remove('selected');
            });
            this.classList.add('selected');
            if (selectedDateContainer) {
                selectedDateContainer.classList.add('has-date');
            }
            const selectedDay = this.textContent;
            if (selectedDateSpan) {
                selectedDateSpan.style.opacity = '0';
                selectedDateSpan.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    selectedDateSpan.textContent = `${selectedDay} kwietnia 2025`;
                    selectedDateSpan.style.opacity = '1';
                    selectedDateSpan.style.transform = 'translateY(0)';
                }, 200);
            }
        });
    });
    
    const submitButton = document.getElementById('submit-appointment');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            const selectedDate = document.getElementById('selected-date').textContent;
            const selectedService = document.getElementById('service-select').options[document.getElementById('service-select').selectedIndex].text;
            
            if (selectedDate !== 'nie wybrano') {
                this.classList.add('success');
                this.innerHTML = '<span class="success-text">Umówiono pomyślnie!</span>';
                setTimeout(() => {
                    const popup = document.getElementById('appointment-popup');
                    popup.classList.remove('active');
                    setTimeout(() => {
                        popup.style.display = 'none';
                        this.classList.remove('success');
                        this.innerHTML = 'Umów wizytę';
                        alert(`Dziękujemy! Twoja wizyta na usługę "${selectedService}" została zaplanowana na ${selectedDate}. Wkrótce skontaktujemy się z Tobą w celu potwierdzenia.`);
                    }, 300);
                }, 1000);
            } else {
                this.classList.add('error');
                setTimeout(() => {
                    this.classList.remove('error');
                    alert('Proszę wypełnić wszystkie wymagane pola i wybrać datę.');
                }, 500);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery img');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    let currentIndex = 0;
    
    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }
    
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });
    
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });
    
    setInterval(function() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }, 5000);
});