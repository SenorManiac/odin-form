const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const form = document.getElementById('form');
const submit = document.getElementById('submit');
let error;

form.addEventListener('submit', (e) => {
    checkInputs();
    if (error == true) {
        e.preventDefault();
    }
});


function checkInputs() {
    error = false;
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();
       

    if(firstnameValue === '') {
        setErrorFor(firstname, 'First Name cannot be blank');
    } else {
        setSuccessFor(firstname);
    }

    if(lastnameValue === '') {
        setErrorFor(lastname, 'Last Name cannot be blank');
    } else {
        setSuccessFor(lastname);
    }

    if(emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email is not valid');
    } else {
        setSuccessFor(email);
    }

    if(phoneValue === '') {
        setErrorFor(phone, 'Phone cannot be blank');
    } else {
        setSuccessFor(phone);
    }

    if(passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } else if(passwordValue.length < 8) {
        setErrorFor(password, 'Password must be at least 8 characters');
    } else if (!isPassword(passwordValue)) {
        setErrorFor(password, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character');
    } else {
        setSuccessFor(password);
    }

    if(confirmPasswordValue === '') {
        setErrorFor(confirmPassword, 'Confirm Password cannot be blank');
    } else if(passwordValue !== confirmPasswordValue) {
        setErrorFor(confirmPassword, 'Passwords do not match');
    } else {
        setSuccessFor(confirmPassword);
    }
}
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    error = true;

    // Create and display the popup
    createPopup(input, message);
}

function createPopup(input, message) {
    // Create the popup element
    const popup = document.createElement('div');
    popup.className = 'error-popup';
    popup.innerText = message;

    // Position the popup relative to the input element
    const inputRect = input.getBoundingClientRect();
    popup.style.top = `${inputRect.top + window.scrollY}px`;
    popup.style.left = `${inputRect.left + window.scrollX}px`;

    // Append the popup to the body
    document.getElementById('form').appendChild(popup);
    // Remove the popup after 3 seconds
    setTimeout(() => {
        popup.remove();
    }, 1500);
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-0]{1,3}\.[0-0]{1,3}\.[0-0]{1,3}\.[0-0]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password);
}