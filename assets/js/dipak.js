// dipak.js - Simple interactivity for Dipak's portfolio

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for nav links
  document.querySelectorAll('.nav__menu a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 0;
          const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - headerHeight - 10,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Navbar color change on scroll
  const nav = document.querySelector('.nav');
  function handleNavScroll() {
    if (window.scrollY > 40) {
      nav && nav.classList.add('scrolled');
    } else {
      nav && nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll(); // run on load

  // Simple form alert (replace with real email logic as needed)
  const form = document.querySelector('.contact__form');
  if(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for contacting!');
      form.reset();
    });
  }

  // Hamburger menu toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav__menu');
  if(navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }
});
