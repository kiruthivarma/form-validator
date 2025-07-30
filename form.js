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

    if (usernameInput.value === '') { 
        usernameError.textContent = 'Username is required.'; 
        isValid = false; 
    } else if (usernameInput.value.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters long.'; 
        isValid = false; 
    } else {
        usernameError.textContent = ''; 
    }

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

    if (passwordInput.value === '') { 
        passwordError.textContent = 'Password is required.'; 
        isValid = false; 
    } else if (passwordInput.value.length < 6) { 
        passwordError.textContent = 'Password must be at least 6 characters long.'; 
        isValid = false; 
    } else {
        passwordError.textContent = ''; 
    }

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
        submitForm();
    }
}

async function submitForm() {
    const formData = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Registration successful!');
            form.reset();
        } else {
            alert(`Registration failed: ${result.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please try again.');
    }
}