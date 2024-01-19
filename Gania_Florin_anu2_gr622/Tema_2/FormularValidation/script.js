document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenim comportamentul implicit de submit al formularului

        // Validare pentru câmpul de e-mail
        const emailInput = document.querySelector('input[type="email"]');
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Adresa de e-mail nu este validă');
        } else {
            hideError(emailInput);
        }

        // Validare pentru câmpul de parolă
        const passwordInput = document.querySelector('input[type="password"]');
        if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Parola trebuie să conțină cel puțin 6 caractere');
        } else {
            hideError(passwordInput);
        }

        // Validare pentru câmpul de confirmare a parolei
        const confirmPasswordInput = document.querySelectorAll('input[type="password"]')[1];
        if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordInput, 'Parola de confirmare nu corespunde');
        } else {
            hideError(confirmPasswordInput);
        }

        // Aici poți adăuga și alte condiții de validare pentru alte câmpuri

        // Dacă toate câmpurile sunt validate, poți adăuga aici acțiunile pentru trimiterea formularului
    });

    function validateEmail(email) {
        // Simplă validare pentru adresa de e-mail (o poti adapta dupa necesitati)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;

        // Adaugă mesajul de eroare după input
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }

    function hideError(input) {
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            // Elimină mesajul de eroare dacă există
            errorElement.remove();
        }
    }
});
