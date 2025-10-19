// Dashboard functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!Database.isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }

    // DOM Elements
    const dashboardUserName = document.getElementById('dashboardUserName');
    const dashboardUserEmail = document.getElementById('dashboardUserEmail');
    const logoutBtn = document.getElementById('logoutBtn');
    const contactForm = document.getElementById('contactForm');

    // Load user data
    const currentUser = Database.getCurrentUser();
    if (currentUser) {
        dashboardUserName.textContent = currentUser.name;
        dashboardUserEmail.textContent = currentUser.email;
    }

    // Handle logout
    logoutBtn.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin logout?')) {
            Database.removeCurrentUser();
            window.location.href = 'index.html';
        }
    });

    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
            const message = contactForm.querySelector('textarea').value;
            
            // In a real application, you would send this data to a server
            console.log('Contact form submitted:', {
                name,
                email,
                subject,
                message,
                submittedBy: currentUser.email,
                timestamp: new Date().toISOString()
            });
            
            // Show success message
            alert('Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Add some interactive features
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            alert(`Anda memilih layanan: ${serviceName}\n\nHubungi kami untuk informasi lebih lanjut!`);
        });
    });

    // Auto-logout after 30 minutes of inactivity (optional)
    let inactivityTimer;
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(function() {
            if (confirm('Sesi Anda akan berakhir karena tidak ada aktivitas. Apakah Anda ingin tetap login?')) {
                resetInactivityTimer();
            } else {
                Database.removeCurrentUser();
                window.location.href = 'index.html';
            }
        }, 30 * 60 * 1000); // 30 minutes
    }

    // Reset timer on user activity
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    resetInactivityTimer();
});