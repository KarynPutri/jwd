// Authentication functionality for login page

document.addEventListener('DOMContentLoaded', function() {
    // Redirect to dashboard if already logged in
    if (Database.isLoggedIn()) {
        window.location.href = 'dashboard.html';
        return;
    }

    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');

    // Switch between login and register forms
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Validate inputs
        if (!Database.validateEmail(email)) {
            alert('Format email tidak valid!');
            return;
        }
        
        // Find user by credentials
        const user = Database.findUserByCredentials(email, password);
        
        if (user) {
            // Update last login
            Database.updateUserLastLogin(user.id);
            
            // Set current user and redirect
            Database.setCurrentUser(user);
            window.location.href = 'dashboard.html';
        } else {
            alert('Email atau password salah!');
        }
    });

    // Handle register form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        // Validate inputs
        if (!name.trim()) {
            alert('Nama lengkap harus diisi!');
            return;
        }
        
        if (!Database.validateEmail(email)) {
            alert('Format email tidak valid!');
            return;
        }
        
        if (!Database.validatePassword(password)) {
            alert('Password harus minimal 6 karakter!');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak cocok!');
            return;
        }
        
        // Check if email already exists
        if (Database.findUserByEmail(email)) {
            alert('Email sudah terdaftar!');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            name: name.trim(),
            email: email.toLowerCase(),
            password: password,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };
        
        // Add user to database
        Database.addUser(newUser);
        
        alert('Pendaftaran berhasil! Silakan login.');
        registerForm.reset();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
});