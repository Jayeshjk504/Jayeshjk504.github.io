// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    });
});

// Gallery Page - Tab Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
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

// Contact Form Submission - Now handled by Formspree
// The form submits directly to Formspree, no JavaScript needed
// Formspree will send you an email with all booking details

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

// Gallery Lightbox Functionality
const lightbox = document.getElementById('imageLightbox');
const lightboxImg = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

// Get all gallery images
let galleryItems = [];
let currentImageIndex = 0;
let galleryImages = [];

// Function to initialize gallery
function initializeGallery() {
    // Clear previous data
    galleryImages = [];
    
    // Get all gallery images (works for both index.html and gallery.html)
    galleryItems = document.querySelectorAll('.gallery-item img');
    
    // Store gallery images data
    galleryItems.forEach((img, index) => {
        galleryImages.push({
            src: img.src,
            alt: img.alt
        });
        
        // Add click event to each gallery item
        img.parentElement.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });
}

// Initialize on page load
if (lightbox) {
    initializeGallery();
    
    // Re-initialize when switching tabs (for gallery.html)
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(() => {
                initializeGallery();
            }, 100);
        });
    });
}

// Open lightbox
function openLightbox(index) {
    if (!lightbox) return;
    currentImageIndex = index;
    lightbox.style.display = 'block';
    lightboxImg.src = galleryImages[index].src;
    lightboxCaption.textContent = galleryImages[index].alt;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close lightbox
function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Show next image
function showNext() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxCaption.textContent = galleryImages[currentImageIndex].alt;
}

// Show previous image
function showPrev() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxCaption.textContent = galleryImages[currentImageIndex].alt;
}

// Event listeners
if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
}
if (nextBtn) {
    nextBtn.addEventListener('click', showNext);
}
if (prevBtn) {
    prevBtn.addEventListener('click', showPrev);
}

// Close lightbox when clicking outside image
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNext();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        }
    }
});
