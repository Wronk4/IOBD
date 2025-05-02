document.addEventListener('DOMContentLoaded', function() {
    const avatarUploadBtn = document.querySelector('.upload-avatar-btn');
    const avatarInput = document.getElementById('avatar-upload');
    const previewAvatar = document.getElementById('preview-avatar');
    const removeAvatarBtn = document.querySelector('.remove-avatar-btn');
    
    if (avatarUploadBtn && avatarInput) {
        avatarUploadBtn.addEventListener('click', function() {
            avatarInput.click();
        });
        
        avatarInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewAvatar.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    previewAvatar.appendChild(img);
                    
                    const sidebarAvatar = document.querySelector('.sidebar .big-avatar');
                    if (sidebarAvatar) {
                        sidebarAvatar.innerHTML = '';
                        const sidebarImg = document.createElement('img');
                        sidebarImg.src = e.target.result;
                        sidebarAvatar.appendChild(sidebarImg);
                    }
                };
                reader.readAsDataURL(file);
            }
        });
        
        if (removeAvatarBtn) {
            removeAvatarBtn.addEventListener('click', function() {
                const userName = document.getElementById('user-name').value;
                const initial = userName.charAt(0).toUpperCase();
                
                previewAvatar.innerHTML = initial;
                
                const sidebarAvatar = document.querySelector('.sidebar .big-avatar');
                if (sidebarAvatar) {
                    sidebarAvatar.innerHTML = initial;
                }
                
                avatarInput.value = '';
            });
        }
    }

    const profileForm = document.getElementById('profile-form');
    
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userName = document.getElementById('user-name').value;
            const userEmail = document.getElementById('user-email').value;
            const userPhone = document.getElementById('user-phone').value;
            
            if (!userName || !userEmail) {
                alert('Imię i nazwisko oraz adres e-mail są wymagane!');
                return;
            }
            
            console.log({
                name: userName,
                email: userEmail,
                phone: userPhone
            });
            
            const sidebarName = document.querySelector('.sidebar .profile-info h3');
            const sidebarPhone = document.querySelector('.sidebar .profile-info p');
            
            if (sidebarName) {
                sidebarName.textContent = userName;
            }
            
            if (sidebarPhone) {
                sidebarPhone.textContent = userPhone;
            }
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Dane zostały zaktualizowane!';
            
            profileForm.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }
    
    // Obsługa formularza zmiany hasła
    const passwordForm = document.getElementById('password-form');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    if (passwordForm && newPasswordInput && confirmPasswordInput) {
        // Obsługa przycisków pokaż/ukryj hasło
        const toggleButtons = document.querySelectorAll('.toggle-password');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    this.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                    `;
                } else {
                    input.type = 'password';
                    this.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    `;
                }
            });
        });
        
        newPasswordInput.addEventListener('input', validatePassword);
        
        function validatePassword() {
            const password = newPasswordInput.value;
            
            const lengthCheck = document.getElementById('length-check');
            if (password.length >= 8) {
                lengthCheck.classList.add('valid');
            } else {
                lengthCheck.classList.remove('valid');
            }
            
            const uppercaseCheck = document.getElementById('uppercase-check');
            if (/[A-Z]/.test(password)) {
                uppercaseCheck.classList.add('valid');
            } else {
                uppercaseCheck.classList.remove('valid');
            }
            
            const lowercaseCheck = document.getElementById('lowercase-check');
            if (/[a-z]/.test(password)) {
                lowercaseCheck.classList.add('valid');
            } else {
                lowercaseCheck.classList.remove('valid');
            }
            
            const numberCheck = document.getElementById('number-check');
            if (/[0-9]/.test(password)) {
                numberCheck.classList.add('valid');
            } else {
                numberCheck.classList.remove('valid');
            }
            
            const specialCheck = document.getElementById('special-check');
            if (/[^A-Za-z0-9]/.test(password)) {
                specialCheck.classList.add('valid');
            } else {
                specialCheck.classList.remove('valid');
            }
        }
        
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = newPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            if (!currentPassword || !newPassword || !confirmPassword) {
                alert('Wszystkie pola są wymagane!');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('Hasła muszą być identyczne!');
                return;
            }
            
            if (
                newPassword.length < 8 || 
                !/[A-Z]/.test(newPassword) || 
                !/[a-z]/.test(newPassword) || 
                !/[0-9]/.test(newPassword) || 
                !/[^A-Za-z0-9]/.test(newPassword)
            ) {
                alert('Hasło nie spełnia wszystkich wymagań!');
                return;
            }
            
            console.log({
                currentPassword,
                newPassword
            });
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Hasło zostało zmienione!';
            
            passwordForm.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
                
                passwordForm.reset();
                const checks = document.querySelectorAll('.password-requirements li');
                checks.forEach(check => check.classList.remove('valid'));
            }, 3000);
        });
    }
    
    const notificationsForm = document.getElementById('notifications-form');
    
    if (notificationsForm) {
        notificationsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailNotifications = document.getElementById('email-notifications').checked;
            const smsNotifications = document.getElementById('sms-notifications').checked;
            const marketingNotifications = document.getElementById('marketing-notifications').checked;
            
            console.log({
                emailNotifications,
                smsNotifications,
                marketingNotifications
            });
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Preferencje zostały zaktualizowane!';
            
            notificationsForm.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }
});