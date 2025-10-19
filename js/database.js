// Database operations using localStorage

const Database = {
    // Initialize database with default data
    initialize: function() {
        if (!localStorage.getItem('users')) {
            const defaultUsers = [
                {
                    id: 1,
                    name: "Admin User",
                    email: "admin@techpro.com",
                    password: "admin123",
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }
    },

    // Get all users
    getUsers: function() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    },

    // Add new user
    addUser: function(user) {
        const users = this.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return user;
    },

    // Find user by email
    findUserByEmail: function(email) {
        const users = this.getUsers();
        return users.find(user => user.email === email);
    },

    // Find user by email and password
    findUserByCredentials: function(email, password) {
        const users = this.getUsers();
        return users.find(user => user.email === email && user.password === password);
    },

    // Update user last login
    updateUserLastLogin: function(userId) {
        const users = this.getUsers();
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            users[userIndex].lastLogin = new Date().toISOString();
            localStorage.setItem('users', JSON.stringify(users));
        }
    },

    // Get current logged in user
    getCurrentUser: function() {
        return JSON.parse(localStorage.getItem('currentUser') || 'null');
    },

    // Set current logged in user
    setCurrentUser: function(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    },

    // Remove current user (logout)
    removeCurrentUser: function() {
        localStorage.removeItem('currentUser');
    },

    // Check if user is logged in
    isLoggedIn: function() {
        return this.getCurrentUser() !== null;
    },

    // Validate email format
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate password strength
    validatePassword: function(password) {
        return password.length >= 6;
    }
};

// Initialize database when script loads
Database.initialize();