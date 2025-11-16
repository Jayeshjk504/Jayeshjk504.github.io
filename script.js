// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(45, 80, 22, 1)';
    } else {
        navbar.style.background = 'rgba(45, 80, 22, 0.95)';
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        guests: document.getElementById('guests').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send this data to your server
    // For now, we'll just show a success message
    console.log('Booking Request:', formData);
    
    // Show success message
    showSuccessMessage(contactForm, 'Thank you! Your booking request has been received. We will contact you shortly!');
    
    // Reset form
    contactForm.reset();
});

// Review Form Submission
const reviewForm = document.getElementById('reviewForm');
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get review data
    const reviewData = {
        name: document.getElementById('reviewerName').value,
        rating: document.getElementById('reviewRating').value,
        text: document.getElementById('reviewText').value,
        date: new Date().toLocaleDateString()
    };
    
    console.log('New Review:', reviewData);
    
    // Add review to the page
    addReviewToPage(reviewData);
    
    // Show success message
    showSuccessMessage(reviewForm, 'Thank you for your review! It has been submitted successfully.');
    
    // Reset form
    reviewForm.reset();
});

// Function to show success message
function showSuccessMessage(form, message) {
    // Check if success message already exists
    let successMsg = form.parentElement.querySelector('.success-message');
    
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        form.parentElement.insertBefore(successMsg, form);
    }
    
    successMsg.textContent = message;
    successMsg.classList.add('show');
    
    // Hide message after 5 seconds
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 5000);
}

// Function to add review to the page
function addReviewToPage(reviewData) {
    const reviewsContainer = document.querySelector('.reviews-container');
    
    // Create review card
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    reviewCard.style.animation = 'fadeInUp 0.5s ease';
    
    // Create stars HTML
    let starsHTML = '';
    for (let i = 0; i < parseInt(reviewData.rating); i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    for (let i = parseInt(reviewData.rating); i < 5; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    reviewCard.innerHTML = `
        <div class="stars">
            ${starsHTML}
        </div>
        <p class="review-text">"${reviewData.text}"</p>
        <div class="reviewer">
            <strong>${reviewData.name}</strong>
            <span>${reviewData.date}</span>
        </div>
    `;
    
    // Add to container
    reviewsContainer.insertBefore(reviewCard, reviewsContainer.firstChild);
    
    // If there are more than 6 reviews, remove the last one
    const allReviews = reviewsContainer.querySelectorAll('.review-card');
    if (allReviews.length > 6) {
        allReviews[allReviews.length - 1].remove();
    }
}

// Gallery Image Click (Optional - for future lightbox implementation)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        // You can add a lightbox/modal here if desired
        console.log('Gallery item clicked');
    });
});

// Form Validation Enhancement
function setMinDate() {
    const dateInput = document.getElementById('date');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const minDate = tomorrow.toISOString().split('T')[0];
    dateInput.setAttribute('min', minDate);
}

// Set minimum date when page loads
setMinDate();

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.review-card, .gallery-item, .feature, .info-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// Add animation keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
