// Zestora — Smooth interactions

// 1. Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// 2. Nav Scroll effect & Scroll Top button
const nav = document.querySelector('.nav');
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.boxShadow = '0 10px 30px rgba(183,19,26,0.1)';
    nav.style.background = 'rgba(255,248,247,0.95)';
  } else {
    nav.style.boxShadow = 'none';
    nav.style.background = 'rgba(255,248,247,0.85)';
  }

  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 3. Animate elements on scroll (Optimized)
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Performance optimization
    }
  });
}, observerOptions);

// Select elements to reveal
document.querySelectorAll('.feature-card, .price-card, .hero-content, .hero-visual, .section-title').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// 4. Animate chart bars on load
const animateBars = () => {
  document.querySelectorAll('.bar').forEach((bar, i) => {
    bar.style.transition = `height 1s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.05}s`;
  });
};

// Start bar animation after a small delay
setTimeout(animateBars, 500);

// 5. Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const navHeight = document.querySelector('.nav').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

console.log('🍽️ Zestora — Smart POS System Loaded Successfully');
