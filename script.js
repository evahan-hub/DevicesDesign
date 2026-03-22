// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    const pageTitle = document.querySelector('.page-title');
    const placeholderText = document.querySelector('.placeholder-text');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the page name
            const pageName = this.dataset.page;
            const pageLabel = this.querySelector('.nav-label').textContent;
            
            // Update page title
            pageTitle.textContent = pageLabel;
            
            // Update placeholder content
            placeholderText.textContent = `${pageLabel} content goes here`;
            
            console.log(`Navigated to: ${pageName}`);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value;
        console.log('Search term:', searchTerm);
        
        // You can add search functionality here
        if (searchTerm.length > 0) {
            // Filter or search logic
        }
    });

    // Icon button functionality
    const iconButtons = document.querySelectorAll('.icon-button');
    
    iconButtons.forEach(button => {
        button.addEventListener('click', function() {
            const label = this.getAttribute('aria-label');
            console.log(`${label} button clicked`);
            
            // You can add specific functionality for each button here
            if (label === 'Notifications') {
                // Show notifications
                alert('Notifications feature coming soon!');
            } else if (label === 'User profile') {
                // Show user profile
                alert('User profile feature coming soon!');
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press '/' to focus search
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Press 'Escape' to clear search
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            searchInput.blur();
        }
    });

    console.log('Dashboard initialized successfully!');
});
