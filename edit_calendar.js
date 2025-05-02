document.addEventListener('DOMContentLoaded', function() {
    initCompanyAppointments();
});

function initCompanyAppointments() {
    let currentDate = new Date();
    let selectedDate = new Date(2025, 4, 20);
    let copiedSchedule = null;
    
    updateCalendar(currentDate);

    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    
    if (prevMonthBtn && nextMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar(currentDate);
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar(currentDate);
        });
    }
    

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('calendar-day') && !e.target.classList.contains('prev-month') && !e.target.classList.contains('next-month')) {

            const activeDays = document.querySelectorAll('.calendar-day.active');
            activeDays.forEach(day => day.classList.remove('active'));
            
            e.target.classList.add('active');
            
            const day = parseInt(e.target.textContent);
            selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            
            updateSelectedDateDisplay();
            

        }
    });
    
    const copyScheduleBtn = document.querySelector('.copy-schedule');
    const pasteScheduleBtn = document.querySelector('.paste-schedule');
    const clearScheduleBtn = document.querySelector('.clear-schedule');
    
    if (copyScheduleBtn) {
        copyScheduleBtn.addEventListener('click', function() {
            copiedSchedule = [];
            const serviceSlots = document.querySelectorAll('.service-slot input[type="checkbox"]');
            serviceSlots.forEach(checkbox => {
                copiedSchedule.push(checkbox.checked);
            });
            
            showNotification('Harmonogram skopiowany');
        });
    }
    
    if (pasteScheduleBtn) {
        pasteScheduleBtn.addEventListener('click', function() {
            if (!copiedSchedule) {
                showNotification('Brak skopiowanego harmonogramu', 'error');
                return;
            }
            
            const serviceSlots = document.querySelectorAll('.service-slot input[type="checkbox"]');
            serviceSlots.forEach((checkbox, index) => {
                if (index < copiedSchedule.length) {
                    checkbox.checked = copiedSchedule[index];
                    
                    const slot = checkbox.closest('.service-slot');
                    if (checkbox.checked) {
                        slot.classList.add('available');
                    } else {
                        slot.classList.remove('available');
                    }
                }
            });
            
            showNotification('Harmonogram wklejony');
        });
    }
    
    if (clearScheduleBtn) {
        clearScheduleBtn.addEventListener('click', function() {
            const serviceSlots = document.querySelectorAll('.service-slot input[type="checkbox"]');
            serviceSlots.forEach(checkbox => {
                checkbox.checked = false;
                

                const slot = checkbox.closest('.service-slot');
                slot.classList.remove('available');
            });
            
            showNotification('Harmonogram wyczyszczony');
        });
    }
    
    const saveDayButton = document.querySelector('.save-day-button');
    if (saveDayButton) {
        saveDayButton.addEventListener('click', function() {

            showNotification('Harmonogram zapisany');
        });
    }
    
    document.addEventListener('change', function(e) {
        if (e.target.closest('.service-slot')) {
            const checkbox = e.target;
            const slot = checkbox.closest('.service-slot');
            
            if (checkbox.checked) {
                slot.classList.add('available');
            } else {
                slot.classList.remove('available');
            }
        }
    });
    
    const bulkEditButton = document.querySelector('.bulk-edit-button');
    const bulkEditOverlay = document.querySelector('.bulk-edit-overlay');
    const closeBulkEditBtn = document.querySelector('.bulk-edit-overlay .close-modal');
    const cancelBulkEditBtn = document.querySelector('.bulk-edit-overlay .cancel-button');
    const applyBulkEditBtn = document.querySelector('.bulk-edit-overlay .apply-bulk-button');
    
    if (bulkEditButton && bulkEditOverlay) {
        bulkEditButton.addEventListener('click', function() {
            bulkEditOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        if (closeBulkEditBtn) {
            closeBulkEditBtn.addEventListener('click', function() {
                bulkEditOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        if (cancelBulkEditBtn) {
            cancelBulkEditBtn.addEventListener('click', function() {
                bulkEditOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        if (applyBulkEditBtn) {
            applyBulkEditBtn.addEventListener('click', function() {
                bulkEditOverlay.classList.remove('active');
                document.body.style.overflow = '';
                

                showNotification('Zmiany zastosowane');
            });
        }
        
        bulkEditOverlay.addEventListener('click', function(e) {
            if (e.target === bulkEditOverlay) {
                bulkEditOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    const templateButtons = document.querySelectorAll('.template-item .edit-template');
    const templateOverlay = document.querySelector('.template-edit-overlay');
    const closeTemplateBtn = document.querySelector('.template-edit-overlay .close-modal');
    const cancelTemplateBtn = document.querySelector('.template-edit-overlay .cancel-button');
    const saveTemplateBtn = document.querySelector('.template-edit-overlay .save-template-button');
    
    if (templateButtons.length && templateOverlay) {
        templateButtons.forEach(button => {
            button.addEventListener('click', function() {
                const templateName = this.closest('.template-item').querySelector('.template-name').textContent;
                
                const templateNameInput = document.getElementById('template-name');
                if (templateNameInput) {
                    templateNameInput.value = templateName;
                }
                
                templateOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        if (closeTemplateBtn) {
            closeTemplateBtn.addEventListener('click', function() {
                templateOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        if (cancelTemplateBtn) {
            cancelTemplateBtn.addEventListener('click', function() {
                templateOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        if (saveTemplateBtn) {
            saveTemplateBtn.addEventListener('click', function() {
                templateOverlay.classList.remove('active');
                document.body.style.overflow = '';
                
                showNotification('Szablon zapisany');
            });
        }
        
        templateOverlay.addEventListener('click', function(e) {
            if (e.target === templateOverlay) {
                templateOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    const applyTemplateButtons = document.querySelectorAll('.template-item .apply-template');
    
    if (applyTemplateButtons.length) {
        applyTemplateButtons.forEach(button => {
            button.addEventListener('click', function() {
                const templateName = this.closest('.template-item').querySelector('.template-name').textContent;
                
                showNotification(`Szablon "${templateName}" zastosowany`);
            });
        });
    }
    
    const deleteTemplateButtons = document.querySelectorAll('.template-item .delete-template');
    
    if (deleteTemplateButtons.length) {
        deleteTemplateButtons.forEach(button => {
            button.addEventListener('click', function() {
                const templateItem = this.closest('.template-item');
                const templateName = templateItem.querySelector('.template-name').textContent;
                
                if (confirm(`Czy na pewno chcesz usunąć szablon "${templateName}"?`)) {
                    templateItem.remove();
                    
                    showNotification(`Szablon "${templateName}" usunięty`);
                }
            });
        });
    }
    
    const addTemplateButton = document.querySelector('.add-template-button');
    
    if (addTemplateButton) {
        addTemplateButton.addEventListener('click', function() {
            const templateNameInput = document.getElementById('template-name');
            if (templateNameInput) {
                templateNameInput.value = 'Nowy szablon';
            }
            
            templateOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    updateSelectedDateDisplay();
    

    function updateCalendar(date) {
        const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
        
        const currentMonthElement = document.querySelector('.current-month');
        if (currentMonthElement) {
            currentMonthElement.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        }
        
    }
    
    function updateSelectedDateDisplay() {
        const selectedDateElement = document.querySelector('.selected-date');
        if (selectedDateElement && selectedDate) {
            const day = selectedDate.getDate();
            const monthNames = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
            const month = monthNames[selectedDate.getMonth()];
            const year = selectedDate.getFullYear();
            
            selectedDateElement.textContent = `${day} ${month} ${year}`;
        }
    }
    
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: -60px;
        left: 50%;
        transform: translateX(-50%);
        background-color: white;
        color: #333;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transition: top 0.3s ease;
    }
    
    .notification.show {
        top: 20px;
    }
    
    .notification.success {
        border-left: 4px solid #2ecc71;
    }
    
    .notification.error {
        border-left: 4px solid #e74c3c;
    }
`;
document.head.appendChild(notificationStyles);