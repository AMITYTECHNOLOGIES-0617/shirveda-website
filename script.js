/**
 * SHIRVEDA DAIRY PRODUCTS - GLOBAL JAVASCRIPT
 * Pure Vanilla JS handling Responsive Nav, Dynamic Filter, Validation & WhatsApp Integration
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
    });
  }

  // 2. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 3. Product Filter Logic (On products.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-item');

  if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Form Validation Handler
  const forms = document.querySelectorAll('.needs-validation');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const requiredInputs = form.querySelectorAll('[required]');
      requiredInputs.forEach(input => {
        const group = input.closest('.form-group');
        if (!input.value.trim()) {
          isValid = false;
          if (group) group.classList.add('invalid');
        } else {
          if (group) group.classList.remove('invalid');
        }

        if (input.type === 'email' && input.value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input.value)) {
            isValid = false;
            if (group) group.classList.add('invalid');
          }
        }
      });

      if (isValid) {
        const successMsg = form.querySelector('.form-success-message');
        if (successMsg) {
          successMsg.style.display = 'block';
          form.reset();
        }
      }
    });
  });
});

/**
 * Global Configurable WhatsApp Enquiry Function
 * Replace verified Phone Number here before deployment.
 */
const SHIRVEDA_WHATSAPP_NUMBER = "919021017719"; // Just country code and 10 digits, no '+' or spaces

function triggerWhatsAppEnquiry(contextSubject) {
  if (SHIRVEDA_WHATSAPP_NUMBER === "910000000000" || !SHIRVEDA_WHATSAPP_NUMBER) {
    alert("Notice: WhatsApp contact number is pending configuration in js/script.js.");
    return;
  }
  
  const text = encodeURIComponent(`Hello Shirveda Dairy Team, I am interested in details regarding: ${contextSubject}. Please share more information.`);
  const url = `https://wa.me/${SHIRVEDA_WHATSAPP_NUMBER}?text=${text}`;
  window.open(url, '_blank');
}