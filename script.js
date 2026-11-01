function showToast(type, message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '';
    if (type === 'success') {
        icon = '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
    } else if (type === 'error') {
        icon = '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
    } else {
        icon = '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>';
    }

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function shakeCard(cardId) {
    const card = document.getElementById(cardId);
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 400);
}

function setError(groupId, hasError) {
    const group = document.getElementById(groupId);
    if (hasError) {
        group.classList.add('error');
    } else {
        group.classList.remove('error');
    }
    return !hasError;
}

function setupPasswordToggle(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);

    toggle.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text';
            toggle.innerHTML = '<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>';
        } else {
            input.type = 'password';
            toggle.innerHTML = '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
        }
    });
}

setupPasswordToggle('login-password', 'toggle-login-pass');
setupPasswordToggle('reg-password', 'toggle-reg-pass');
setupPasswordToggle('reg-confirm', 'toggle-reg-confirm');

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-password');
    const email = emailInput.value.trim();
    const pass = passInput.value;

    setError('login-group-email', false);
    setError('login-group-pass', false);

    let isValid = true;

    if (!email) {
        setError('login-group-email', true);
        isValid = false;
    }
    if (!pass) {
        setError('login-group-pass', true);
        isValid = false;
    }

    if (!isValid) {
        shakeCard('card-login');
        showToast('error', 'Harap isi semua kolom!');
        return;
    }

    showToast('success', 'Login Berhasil! Selamat datang kembali.');
    setTimeout(() => {
        alert('Anda berhasil masuk ke Dashboard!');
    }, 1000);
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const userInput = document.getElementById('reg-username');
    const emailInput = document.getElementById('reg-email');
    const passInput = document.getElementById('reg-password');
    const confirmInput = document.getElementById('reg-confirm');
    const termsInput = document.getElementById('reg-terms');
    const termsError = document.getElementById('terms-error');

    const username = userInput.value.trim();
    const email = emailInput.value.trim();
    const pass = passInput.value;
    const confirm = confirmInput.value;
    const isTermsChecked = termsInput.checked;

    setError('reg-group-username', false);
    setError('reg-group-email', false);
    setError('reg-group-pass', false);
    setError('reg-group-confirm', false);
    setError('reg-group-terms', false);
    termsError.style.display = 'none';

    let isValid = true;

    if (!username) {
        setError('reg-group-username', true);
        isValid = false;
    }
    if (!email) {
        setError('reg-group-email', true);
        isValid = false;
    }
    if (!pass) {
        setError('reg-group-pass', true);
        isValid = false;
    }
    if (!confirm) {
        setError('reg-group-confirm', true);
        isValid = false;
    }
    if (!isTermsChecked) {
        setError('reg-group-terms', true);
        termsError.style.display = 'block';
        isValid = false;
    }

    if (!isValid) {
        shakeCard('card-register');
        showToast('error', 'Harap lengkapi semua data dan setujui syarat!');
        return;
    }

    if (pass !== confirm) {
        setError('reg-group-pass', true);
        setError('reg-group-confirm', true);
        shakeCard('card-register');
        showToast('error', 'Password dan Konfirmasi Password tidak cocok!');
        return;
    }

    if (pass.length < 8) {
        setError('reg-group-pass', true);
        shakeCard('card-register');
        showToast('error', 'Password minimal harus 8 karakter!');
        return;
    }

    showToast('success', 'Registrasi Berhasil! Silakan Login.');
    
    document.getElementById('registerForm').reset();
    
    setTimeout(() => {
        switchCard('login');
        document.getElementById('login-email').value = email;
    }, 1500);
});

function switchCard(type) {
    const loginSec = document.getElementById('login-section');
    const registerSec = document.getElementById('register-section');

    if (type === 'register') {
        loginSec.classList.remove('active');
        registerSec.classList.add('active');
        resetTilt('card-register');
    } else {
        registerSec.classList.remove('active');
        loginSec.classList.add('active');
        resetTilt('card-login');
    }
}

function initTilt(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;

    const maxTilt = 5;

    card.addEventListener('mousemove', (e) => {
        if (getComputedStyle(card.parentElement).opacity !== '1') return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('pointerleave', () => {
        card.style.transform = `perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.setProperty('--mouse-x', `50%`);
        card.style.setProperty('--mouse-y', `50%`);
    });
}

function resetTilt(cardId) {
    const card = document.getElementById(cardId);
    if(card) {
        card.style.transform = `perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.setProperty('--mouse-x', `50%`);
        card.style.setProperty('--mouse-y', `50%`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initTilt('card-login');
    initTilt('card-register');
});