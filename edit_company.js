document.addEventListener('DOMContentLoaded', function() {
    const companyForm = document.querySelector('.company-form');
    if (companyForm) {
        companyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const companyData = {
                name: document.getElementById('companyName').value,
                address: document.getElementById('companyAddress').value,
                phone: document.getElementById('companyPhone').value,
                description: document.getElementById('companyDescription').value,
                hours: document.getElementById('companyHours').value
            };
            console.log('Zapisano podstawowe informacje o firmie:', companyData);
            showNotification('Podstawowe informacje zostały zaktualizowane.');
        });
    }

    const addImageButton = document.querySelector('.add-image');
    const fileInput = document.getElementById('uploadImage');

    if (addImageButton && fileInput) {
        addImageButton.addEventListener('click', function() {
            fileInput.click();
        });

        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                for (let i = 0; i < this.files.length; i++) {
                    const file = this.files[i];
                    if (!file.type.match('image.*')) {
                        alert('Proszę wybrać plik graficzny.');
                        continue;
                    }
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const galleryItem = document.createElement('div');
                        galleryItem.className = 'gallery-item';
                        galleryItem.innerHTML = `
                            <img src="${e.target.result}" alt="Nowe zdjęcie">
                            <div class="gallery-item-actions">
                                <button class="delete-image-btn" title="Usuń zdjęcie">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                                    </svg>
                                </button>
                            </div>
                        `;
                        const galleryPreview = document.querySelector('.gallery-preview');
                        galleryPreview.insertBefore(galleryItem, addImageButton);
                        const deleteButton = galleryItem.querySelector('.delete-image-btn');
                        deleteButton.addEventListener('click', function() {
                            galleryItem.remove();
                            showNotification('Zdjęcie zostało usunięte.');
                        });
                    };
                    reader.readAsDataURL(file);
                }
                showNotification('Zdjęcia zostały dodane do galerii.');
            }
        });
    }

    const deleteImageButtons = document.querySelectorAll('.delete-image-btn');
    deleteImageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const galleryItem = this.closest('.gallery-item');
            galleryItem.style.opacity = '0';
            galleryItem.style.transform = 'scale(0.8)';
            setTimeout(() => {
                galleryItem.remove();
                showNotification('Zdjęcie zostało usunięte.');
            }, 300);
        });
    });

    const addServiceButton = document.querySelector('.add-service-button');
    const servicesList = document.querySelector('.services-list');

    if (addServiceButton && servicesList) {
        addServiceButton.addEventListener('click', function() {
            const newServiceItem = document.createElement('div');
            newServiceItem.className = 'service-item';
            newServiceItem.innerHTML = `
                <div class="service-details">
                    <div class="service-header">
                        <input type="text" class="service-name" placeholder="Nazwa usługi">
                        <div class="service-actions">
                            <button class="delete-service-btn" title="Usuń usługę">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <textarea class="service-description" placeholder="Opis usługi..."></textarea>
                    <div class="service-details-row">
                        <div class="service-price-container">
                            <label>Cena:</label>
                            <div class="price-input-container">
                                <input type="number" class="service-price" value="0">
                                <span class="price-currency">zł</span>
                            </div>
                        </div>
                        <div class="service-time-container">
                            <label>Czas wykonania:</label>
                            <div class="time-input-container">
                                <input type="number" class="service-time" value="30">
                                <span class="time-unit">min</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            servicesList.insertBefore(newServiceItem, addServiceButton);
            const deleteButton = newServiceItem.querySelector('.delete-service-btn');
            deleteButton.addEventListener('click', function() {
                removeServiceItem(newServiceItem);
            });
            setTimeout(() => {
                newServiceItem.style.opacity = '1';
            }, 10);
            newServiceItem.querySelector('.service-name').focus();
            showNotification('Dodano nową usługę.');
        });

        const deleteServiceButtons = document.querySelectorAll('.delete-service-btn');
        deleteServiceButtons.forEach(button => {
            button.addEventListener('click', function() {
                const serviceItem = this.closest('.service-item');
                removeServiceItem(serviceItem);
            });
        });

        function removeServiceItem(serviceItem) {
            serviceItem.style.opacity = '0';
            serviceItem.style.transform = 'translateX(30px)';
            setTimeout(() => {
                serviceItem.remove();
                showNotification('Usługa została usunięta.');
            }, 300);
        }

        const saveServicesButton = document.querySelector('.save-services-button');
        if (saveServicesButton) {
            saveServicesButton.addEventListener('click', function() {
                const services = [];
                const serviceItems = document.querySelectorAll('.service-item');
                serviceItems.forEach(item => {
                    const name = item.querySelector('.service-name').value;
                    const description = item.querySelector('.service-description').value;
                    const price = item.querySelector('.service-price').value;
                    const time = item.querySelector('.service-time').value;
                    if (name && description) {
                        services.push({
                            name,
                            description,
                            price,
                            time
                        });
                    }
                });
                console.log('Zapisano usługi:', services);
                showNotification('Lista usług została zaktualizowana.');
            });
        }
    }

    function showNotification(message) {
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
            if (!document.getElementById('notification-styles')) {
                const style = document.createElement('style');
                style.id = 'notification-styles';
                style.textContent = `
                    .notification {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        background-color: #2ecc71;
                        color: white;
                        padding: 15px 20px;
                        border-radius: 5px;
                        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                        transition: all 0.3s ease;
                        opacity: 0;
                        transform: translateY(20px);
                        z-index: 1000;
                    }
                    .notification.show {
                        opacity: 1;
                        transform: translateY(0);
                    }
                `;
                document.head.appendChild(style);
            }
        }
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});