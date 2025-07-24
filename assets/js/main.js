// Loader hide logic
window.addEventListener('load', function() {
  document.getElementById('loader').style.display = 'none';
});

// Animate name letter by letter
// DOMContentLoaded ke andar sab kuch

document.addEventListener('DOMContentLoaded', function() {
  // Animate skill bars
  setTimeout(function() {
    document.querySelectorAll('.skill__fill').forEach(function(bar) {
      const width = bar.getAttribute('style').match(/width:([0-9]+)%/);
      if (width) {
        bar.style.width = width[1] + '%';
      }
    });
  }, 300);
  // About section typing effect
  const aboutTexts = [
    "aspiring Full Stack Developer.",
    "passionate about clean and responsive websites.",
    "ready to build your next digital experience."
  ];
  const aboutEl = document.getElementById('aboutAnimated');
  if (aboutEl) {
    let aboutIndex = 0;
    let i = 0;
    let isErasing = false;
    function aboutTypeEffect() {
      const aboutText = aboutTexts[aboutIndex];
      if (!isErasing && i <= aboutText.length) {
        aboutEl.textContent = aboutText.substring(0, i);
        i++;
        setTimeout(aboutTypeEffect, 90);
      } else if (isErasing && i >= 0) {
        aboutEl.textContent = aboutText.substring(0, i);
        i--;
        setTimeout(aboutTypeEffect, 40);
      } else {
        if (!isErasing) {
          isErasing = true;
          setTimeout(aboutTypeEffect, 1200);
        } else {
          isErasing = false;
          aboutIndex = (aboutIndex + 1) % aboutTexts.length;
          setTimeout(aboutTypeEffect, 600);
        }
      }
    }
    aboutTypeEffect();
  }
  const texts = ["Full Stack Developer", "BCA Final Year Student"];
  const el = document.getElementById('animatedRole');
  if (el) {
    let textIndex = 0;
    let i = 0;
    let isErasing = false;
    function typeEffect() {
      const text = texts[textIndex];
      if (!isErasing && i <= text.length) {
        el.textContent = text.substring(0, i);
        i++;
        setTimeout(typeEffect, 90);
      } else if (isErasing && i >= 0) {
        el.textContent = text.substring(0, i);
        i--;
        setTimeout(typeEffect, 40);
      } else {
        if (!isErasing) {
          isErasing = true;
          setTimeout(typeEffect, 1200);
        } else {
          isErasing = false;
          textIndex = (textIndex + 1) % texts.length;
          setTimeout(typeEffect, 600);
        }
      }
    }
    typeEffect();
  }

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

  // Hamburger menu toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav__menu');
  if(navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Dark mode toggle logic
  const toggle = document.getElementById('darkModeToggle');
  const icon = document.getElementById('darkModeIcon');
  function setDarkMode(on) {
    if(on) {
      document.body.classList.add('darkmode');
      icon.textContent = '☀️';
      localStorage.setItem('darkmode', 'on');
    } else {
      document.body.classList.remove('darkmode');
      icon.textContent = '🌙';
      localStorage.setItem('darkmode', 'off');
    }
  }
  // Initial mode
  setDarkMode(localStorage.getItem('darkmode') === 'on');
  toggle.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('darkmode'));
  });

  // EmailJS integration for contact form
  var form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (window.emailjs) {
        emailjs.sendForm('service_e6tenad', 'template_hpsnqci', form, 'yDaPIGO2VRHV-IWfE')
          .then(function() {
            alert('Message sent successfully!');
            form.reset();
          }, function(error) {
            alert('Failed to send message. Please try again.');
            console.error('EmailJS error:', error);
          });
      } else {
        alert('Thank you for contacting!');
        form.reset();
      }
    });
  }

  // About section Read More/Read Less button
  var btn = document.getElementById('aboutReadMoreBtn');
  var more = document.getElementById('aboutMore');
  var expanded = false;
  if (btn && more) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      expanded = !expanded;
      if (expanded) {
        more.style.display = 'inline';
        btn.textContent = 'Read Less';
      } else {
        more.style.display = 'none';
        btn.textContent = 'Read More';
        window.location.hash = '#about';
      }
    });
  }

  // 1. Loader fade-out with requestAnimationFrame
  window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    if (loader) {
      var wrapper = loader.classList.contains('loader-wrapper') ? loader : loader.parentElement;
      if (wrapper) {
        wrapper.classList.add('hide');
        setTimeout(function() {
          wrapper.style.display = 'none';
        }, 700);
      }
    }
  });

  // 2. Scroll Reveal Animation (IntersectionObserver)
  function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.13 });
      reveals.forEach(function(el) { obs.observe(el); });
    } else {
      // fallback
      reveals.forEach(function(el) { el.classList.add('revealed'); });
    }
  }
  document.addEventListener('DOMContentLoaded', revealOnScroll);

  // 3. Scroll Progress Bar (requestAnimationFrame)
  var scrollBar = document.getElementById('scrollProgressBar');
  var lastScroll = 0;
  function updateScrollBarRAF() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (scrollTop / docHeight) * 100;
    if (scrollBar) scrollBar.style.width = scrolled + '%';
    lastScroll = scrollTop;
  }
  var ticking = false;
  function onScrollRAF() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateScrollBarRAF();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScrollRAF);
  window.addEventListener('resize', updateScrollBarRAF);
  updateScrollBarRAF();

  // 4. 3D Tilt Card Hover Effect (requestAnimationFrame)
  function add3DTiltEffect(selector) {
    var cards = document.querySelectorAll(selector);
    cards.forEach(function(card) {
      var rafId = null;
      var target = {x:0, y:0};
      function applyTilt() {
        card.style.transform = 'rotateX(' + -target.y + 'deg) rotateY(' + target.x + 'deg) scale(1.04)';
        card.style.zIndex = 10;
        card.style.boxShadow = '0 12px 32px rgba(0,188,212,0.18), 0 2px 8px rgba(0,0,0,0.10)';
      }
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        target.x = ((x - centerX) / centerX) * 10;
        target.y = ((y - centerY) / centerY) * 10;
        if (!rafId) {
          rafId = requestAnimationFrame(function() {
            applyTilt();
            rafId = null;
          });
        }
      });
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
        card.style.zIndex = '';
        card.style.boxShadow = '';
      });
      card.addEventListener('mouseenter', function() {
        card.style.transition = 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s';
      });
    });
  }
  add3DTiltEffect('.project__card');
  add3DTiltEffect('.service__card');

  // 5. Smooth scroll for anchor links (ensure no jerk)
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // 6. 3D Parallax Background Objects (mouse + scroll parallax)
  (function() {
    var parallaxObjs = document.querySelectorAll('.parallax-obj');
    if (!parallaxObjs.length) return;
    var mouse = { x: 0.5, y: 0.5 };
    var scrollY = 0;
    var ticking = false;
    function updateParallax() {
      var winW = window.innerWidth;
      var winH = window.innerHeight;
      parallaxObjs.forEach(function(obj) {
        var depth = parseFloat(obj.getAttribute('data-depth')) || 0.2;
        var moveX = (mouse.x - 0.5) * 60 * depth;
        var moveY = (mouse.y - 0.5) * 60 * depth + (scrollY / winH) * 60 * depth;
        obj.style.transform = 'translate3d(' + moveX + 'px, ' + moveY + 'px, 0)';
      });
      ticking = false;
    }
    function requestUpdate() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    window.addEventListener('mousemove', function(e) {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
      requestUpdate();
    });
    window.addEventListener('scroll', function() {
      scrollY = window.scrollY || window.pageYOffset;
      requestUpdate();
    });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();
  })();

  // 7. Hero section animated icons: click = smooth scroll + highlight
  document.querySelectorAll('.hero-icon-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth'});
        // Remove highlight from all
        document.querySelectorAll('.hero-icon-link').forEach(function(l) { l.classList.remove('clicked'); });
        // Add highlight to clicked
        this.classList.add('clicked');
        // Remove highlight after 1s
        setTimeout(() => this.classList.remove('clicked'), 1000);
      }
    });
  });

  // 8. Animated Scrolling Camera Simulation (background parallax)
  (function() {
    var ticking = false;
    function updateBgParallax() {
      var scrollY = window.scrollY || window.pageYOffset;
      var winH = window.innerHeight;
      // Calculate subtle shift (max 60px)
      var shift = Math.min(1, scrollY / (winH * 2));
      // Shift mesh blobs in body::before
      var bgPos = `
        ${10 + shift * 10}% ${18 + shift * 8}%,
        ${80 - shift * 8}% ${30 + shift * 10}%,
        ${60 + shift * 6}% ${80 - shift * 10}%
      `;
      document.body.style.setProperty('--mesh1', `${10 + shift * 10}% ${18 + shift * 8}%`);
      document.body.style.setProperty('--mesh2', `${80 - shift * 8}% ${30 + shift * 10}%`);
      document.body.style.setProperty('--mesh3', `${60 + shift * 6}% ${80 - shift * 10}%`);
      ticking = false;
    }
    function requestUpdate() {
      if (!ticking) {
        requestAnimationFrame(updateBgParallax);
        ticking = true;
      }
    }
    window.addEventListener('scroll', requestUpdate);
    window.addEventListener('resize', requestUpdate);
    // Initial
    requestUpdate();
  })();

  // 9. Sticky Header with Scroll Hide/Show
  (function() {
    var header = document.querySelector('.header');
    if (!header) return;
    var lastScroll = window.scrollY;
    var ticking = false;
    function onScroll() {
      var curr = window.scrollY;
      if (curr > lastScroll && curr > 80) {
        header.classList.add('header--hidden');
        header.classList.remove('header--visible');
      } else {
        header.classList.remove('header--hidden');
        header.classList.add('header--visible');
      }
      lastScroll = curr;
      ticking = false;
    }
    function requestScroll() {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }
    window.addEventListener('scroll', requestScroll);
    // Initial state
    header.classList.add('header--visible');
  })();

  // 10. Scroll-to-Top Button
  (function() {
    var btn = document.getElementById('scrollTopBtn');
    if (!btn) return;
    function toggleBtn() {
      if (window.scrollY > 300) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    }
    window.addEventListener('scroll', toggleBtn);
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    // Initial state
    toggleBtn();
  })();

  // 11. Project Modal Popup
  (function() {
    var modal = document.getElementById('projectModal');
    var overlay = document.getElementById('projectModalOverlay');
    var closeBtn = document.getElementById('projectModalClose');
    var imgDiv = document.getElementById('projectModalImg');
    var titleDiv = document.getElementById('projectModalTitle');
    var descDiv = document.getElementById('projectModalDesc');
    var linksDiv = document.getElementById('projectModalLinks');
    if (!modal) return;
    // Project data (static, can be dynamic)
    var projects = [
      {
        selector: '.projects__grid .project__card:nth-child(1)',
        img: 'assets/img/WhatsApp Image 2025-02-28 at 23.58.34_9f0f37dd.jpg',
        title: 'Project One',
        desc: 'Short description of the project.',
        links: [
          { href: '#', text: 'Live Demo' },
          { href: '#', text: 'GitHub' }
        ]
      },
      {
        selector: '.projects__grid .project__card:nth-child(2)',
        img: 'assets/img/Screenshot 2025-07-14 160119.png',
        title: 'Weather App',
        desc: 'Weather App: Get real-time weather updates for any city using OpenWeatherMap API. Responsive UI, search, and weather icons included.',
        links: [
          { href: 'https://dipakyadav9123.github.io/Weather-App/', text: 'Live Demo', target: '_blank' },
          { href: 'https://github.com/DipakYadav9123/Weather-App', text: 'GitHub', target: '_blank' }
        ]
      }
    ];
    function openModal(data) {
      imgDiv.innerHTML = data.img ? `<img src="${data.img}" alt="${data.title}" />` : '';
      titleDiv.textContent = data.title || '';
      descDiv.textContent = data.desc || '';
      linksDiv.innerHTML = '';
      (data.links || []).forEach(function(link) {
        var a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        if (link.target) a.target = link.target;
        linksDiv.appendChild(a);
      });
      modal.style.display = 'block';
      setTimeout(function() { modal.classList.add('open'); }, 10);
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }
    function closeModal() {
      modal.classList.remove('open');
      setTimeout(function() { modal.style.display = 'none'; }, 300);
      document.body.style.overflow = '';
    }
    projects.forEach(function(proj) {
      var card = document.querySelector(proj.selector);
      if (card) {
        card.style.cursor = 'pointer';
        card.setAttribute('tabindex', '0');
        card.addEventListener('click', function() { openModal(proj); });
        card.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { openModal(proj); } });
      }
    });
    closeBtn && closeBtn.addEventListener('click', closeModal);
    overlay && overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
      if (modal.style.display === 'block' && (e.key === 'Escape' || e.key === 'Esc')) closeModal();
    });
  })();

  // 12. Animated Counters (Skills)
  (function() {
    var counters = document.querySelectorAll('.skill__percent[data-count]');
    if (!counters.length) return;
    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var curr = 0;
      var duration = 900;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        curr = Math.floor(progress * target);
        el.textContent = curr + '%';
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + '%';
      }
      requestAnimationFrame(step);
    }
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach(function(el) { obs.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }
  })();

  // 13. Typewriter/Animated Text in Hero
  (function() {
    var el = document.getElementById('animatedRole');
    if (!el) return;
    var texts = ["Full Stack Developer", "BCA Final Year Student"];
    var textIndex = 0;
    var i = 0;
    var isErasing = false;
    var cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.textContent = '|';
    el.parentNode.appendChild(cursor);
    function typeEffect() {
      var text = texts[textIndex];
      if (!isErasing && i <= text.length) {
        el.textContent = text.substring(0, i);
        i++;
        setTimeout(typeEffect, 90);
      } else if (isErasing && i >= 0) {
        el.textContent = text.substring(0, i);
        i--;
        setTimeout(typeEffect, 40);
      } else {
        if (!isErasing) {
          isErasing = true;
          setTimeout(typeEffect, 1200);
        } else {
          isErasing = false;
          textIndex = (textIndex + 1) % texts.length;
          setTimeout(typeEffect, 600);
        }
      }
    }
    typeEffect();
  })();

  // 14. Contact Form Validation (frontend)
  (function() {
    var form = document.querySelector('.contact__form');
    if (!form) return;
    var name = form.querySelector('[name="user_name"]');
    var email = form.querySelector('[name="user_email"]');
    var subject = form.querySelector('[name="subject"]');
    var message = form.querySelector('[name="message"]');
    var errorBox = document.createElement('div');
    errorBox.className = 'form-error-box';
    errorBox.style.display = 'none';
    errorBox.style.color = '#ff5e62';
    errorBox.style.marginBottom = '0.7rem';
    form.insertBefore(errorBox, form.firstChild);
    function validateEmail(val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }
    form.addEventListener('submit', function(e) {
      errorBox.style.display = 'none';
      errorBox.textContent = '';
      if (!name.value.trim()) {
        e.preventDefault(); errorBox.textContent = 'Please enter your name.'; errorBox.style.display = 'block'; name.focus(); return;
      }
      if (!email.value.trim() || !validateEmail(email.value.trim())) {
        e.preventDefault(); errorBox.textContent = 'Please enter a valid email address.'; errorBox.style.display = 'block'; email.focus(); return;
      }
      if (!subject.value.trim()) {
        e.preventDefault(); errorBox.textContent = 'Please enter a subject.'; errorBox.style.display = 'block'; subject.focus(); return;
      }
      if (!message.value.trim()) {
        e.preventDefault(); errorBox.textContent = 'Please enter your message.'; errorBox.style.display = 'block'; message.focus(); return;
      }
    });
  })();

  // 15. Font Switcher Toggle
  (function() {
    var btn = document.getElementById('fontSwitcher');
    if (!btn) return;
    function setFont(mode) {
      if (mode === 'serif') {
        document.body.classList.add('serif');
        localStorage.setItem('fontMode', 'serif');
      } else {
        document.body.classList.remove('serif');
        localStorage.setItem('fontMode', 'sans');
      }
    }
    btn.addEventListener('click', function() {
      if (document.body.classList.contains('serif')) setFont('sans');
      else setFont('serif');
    });
    // Restore on load
    if (localStorage.getItem('fontMode') === 'serif') setFont('serif');
  })();

  // (AI ChatBot logic ka pura block hata diya gaya)
}); 