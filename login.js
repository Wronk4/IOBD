
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const loginForm = document.querySelector('.login-form');
        const registerForm = document.querySelector('.register-form');
        const accountType = document.querySelector('.account-type');
        const formContainer = document.querySelector('.form-container');

        function updateFormContainerHeight(form) {
            const formHeight = form.offsetHeight;
            formContainer.style.height = formHeight + 'px';
        }

        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');

            loginForm.style.transform = 'translateX(0)';
            loginForm.style.opacity = '1';
            loginForm.style.zIndex = '1';

            registerForm.style.transform = 'translateX(100%)';
            registerForm.style.opacity = '0';
            registerForm.style.zIndex = '0';

            setTimeout(() => {
                updateFormContainerHeight(loginForm);
            }, 100);
        });

        registerTab.addEventListener('click', () => {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');

            registerForm.style.transform = 'translateX(0)';
            registerForm.style.opacity = '1';
            registerForm.style.zIndex = '1';

            loginForm.style.transform = 'translateX(-100%)';
            loginForm.style.opacity = '0';
            loginForm.style.zIndex = '0';

            accountType.classList.add('visible');

            setTimeout(() => {
                updateFormContainerHeight(registerForm);
            }, 100);
        });

        const personalBtn = document.getElementById('personal-btn');
        const businessBtn = document.getElementById('business-btn');

        const nameLabel = document.getElementById('name-label');
        const nipField = document.querySelector('.nip-field');

        personalBtn.addEventListener('click', () => {
            personalBtn.classList.add('active');
            businessBtn.classList.remove('active');
            nameLabel.textContent = 'Imię i Nazwisko';
            nipField.style.display = 'none';
            document.getElementById('register-nip').removeAttribute('required');

            setTimeout(() => {
                updateFormContainerHeight(registerForm);
            }, 100);
        });

        businessBtn.addEventListener('click', () => {
            businessBtn.classList.add('active');
            personalBtn.classList.remove('active');
            nameLabel.textContent = 'Nazwa Firmy';
            nipField.style.display = 'block';
            document.getElementById('register-nip').setAttribute('required', 'required');

            setTimeout(() => {
                updateFormContainerHeight(registerForm);
            }, 100);
        });


        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();

            console.log('Logowanie:', {
                email: document.getElementById('login-email').value,
                password: document.getElementById('login-password').value
            });

        });

        document.getElementById('register-form').addEventListener('submit', function(e) {
            e.preventDefault();

            const accountTypeValue = document.getElementById('personal-btn').classList.contains('active')
                ? 'osoba'
                : 'firma';
            const registrationData = {
                name: document.getElementById('register-name').value,
                email: document.getElementById('register-email').value,
                password: document.getElementById('register-password').value,
                accountType: accountTypeValue
            };

            if (accountTypeValue === 'firma') {
                registrationData.nip = document.getElementById('register-nip').value;
            }

            console.log('Rejestracja:', registrationData);

        });

        window.addEventListener('load', () => {
            updateFormContainerHeight(loginForm);
        });

        window.addEventListener('resize', () => {
            const activeForm = loginTab.classList.contains('active') ? loginForm : registerForm;
            updateFormContainerHeight(activeForm);
        });