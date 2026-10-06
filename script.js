// A. Live JS Countdown Timer
function initCountdown() {
    // सेट करें कि इवेंट कब है (जैसे आज से 10 दिन आगे की तारीख)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10); 

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(timerInterval);
            document.getElementById('days').innerText = "00";
            document.getElementById('hours').innerText = "00";
            document.getElementById('minutes').innerText = "00";
            document.getElementById('seconds').innerText = "00";
            return;
        }

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = d < 10 ? '0' + d : d;
        document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
        document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
        document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
    }, 1000);
}

// B. Vanilla JS Registration Form Validation
const form = document.getElementById('regForm');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    const small = formControl.querySelector('small');
    small.innerText = '';
}

function checkEmail(input) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
        return true;
    } else {
        showError(input, 'Please enter a valid email address');
        return false;
    }
}

function checkRequired(inputArr) {
    let isAllFilled = true;
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isAllFilled = false;
        } else {
            showSuccess(input);
        }
    });
    return isAllFilled;
}

function getFieldName(input) {
    return input.id === 'fullname' ? 'Full Name' : 'Email';
}

// Form Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const requiredFilled = checkRequired([fullname, email]);
    let emailValid = false;
    
    if (requiredFilled) {
        emailValid = checkEmail(email);
    }

    if (requiredFilled && emailValid) {
        alert('Registration Successful for InnovateX 2026!');
        form.reset();
        fullname.parentElement.className = 'form-control';
        email.parentElement.className = 'form-control';
    }
});

// Real-time input checking
fullname.addEventListener('input', () => {
    if(fullname.value.trim() !== '') showSuccess(fullname);
});
email.addEventListener('input', () => {
    if(email.value.trim() !== '') checkEmail(email);
});

// Initialize elements on load
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
});
