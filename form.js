const form = document.getElementById('registrationForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');


form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    validateForm();
});


function validateForm() {
    let isValid = true; 

    // Check username
    if (usernameInput.value === '') { 
        usernameError.textContent = 'Username is required.'; 
        isValid = false; 
    } else if (usernameInput.value.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters long.'; 
        isValid = false; 
    } else {
        usernameError.textContent = ''; 
    }

    // Check email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (emailInput.value === '') { 
        emailError.textContent = 'Email is required.'; 
        isValid = false; 
    } else if (!emailPattern.test(emailInput.value)) { 
        emailError.textContent = 'Please enter a valid email address.'; 
        isValid = false; 
    } else {
        emailError.textContent = ''; 
    }

    // Check password
    if (passwordInput.value === '') { 
        passwordError.textContent = 'Password is required.'; 
        isValid = false; 
    } else if (passwordInput.value.length < 6) { 
        passwordError.textContent = 'Password must be at least 6 characters long.'; 
        isValid = false; 
    } else {
        passwordError.textContent = ''; 
    }

    // Check confirm password
    if (confirmPasswordInput.value === '') { 
        confirmPasswordError.textContent = 'Confirm Password is required.'; 
        isValid = false; 
    } else if (confirmPasswordInput.value !== passwordInput.value) { 
        confirmPasswordError.textContent = 'Passwords do not match.'; 
        isValid = false; 
    } else {
        confirmPasswordError.textContent = ''; 
    }

    
    if (isValid) {
        alert('Form submitted successfully!');
        form.reset(); 
    }
}