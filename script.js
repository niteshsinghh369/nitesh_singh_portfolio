/**
 * Nitesh Singh - Personal Portfolio JavaScript
 * Handles typing effect, dark/light theme toggle, mobile navigation,
 * project filters, clipboard copying, form validation, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initNavigation();
  initScrollProgress();
  initScrollReveal();
  initProjectFilters();
  initCopyEmail();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine initial theme: localStorage > System Preference > Default 'dark'
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'dark');
  document.body.setAttribute('data-theme', initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }
}

/* ==========================================================================
   2. DYNAMIC HERO TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typedTextSpan = document.getElementById('typed-text');
  if (!typedTextSpan) return;

  const roles = [
    'Web Developer',
    'B.Tech CSE Student',
    'C++ Programmer',
    'Problem Solver',
    'Tech Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseBetweenWords = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      setTimeout(() => {
        isDeleting = true;
        type();
      }, pauseBetweenWords);
      return;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, move to next word
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 300);
      return;
    }

    const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, currentSpeed);
  }

  type();
}

/* ==========================================================================
   3. NAVIGATION (MOBILE MENU & ACTIVE NAV LINK)
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Toggle mobile drawer
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenuBtn.classList.toggle('open');
      mobileDrawer.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when clicking any nav link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('open');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close when clicking outside drawer
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') &&
          !mobileDrawer.contains(e.target) &&
          !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('open');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active section indicator on scroll
  window.addEventListener('scroll', () => {
    // Add shadow to navbar on scroll
    if (navbar) {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Determine current active section
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   4. SCROLL PROGRESS INDICATOR
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  });
}

/* ==========================================================================
   5. PROJECT FILTERING
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          // Trigger slight fade animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   6. COPY EMAIL CLIPBOARD ACTION
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  const emailToCopy = 'niteshsinghh369@gmail.com';
  const copyIcon = copyBtn.querySelector('.copy-icon');
  const checkIcon = copyBtn.querySelector('.check-icon');

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        // Fallback for non-https or older local setups
        const textarea = document.createElement('textarea');
        textarea.value = emailToCopy;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // Success feedback animation
      if (copyIcon && checkIcon) {
        copyIcon.classList.add('hidden');
        checkIcon.classList.remove('hidden');

        setTimeout(() => {
          copyIcon.classList.remove('hidden');
          checkIcon.classList.add('hidden');
        }, 2200);
      }

      showToast('Email copied to clipboard!');
    } catch (err) {
      showToast('Could not copy automatically. Email: ' + emailToCopy);
    }
  });
}

/* ==========================================================================
   7. CONTACT FORM VALIDATION & INTERACTION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setFieldState(input, isValid) {
    const parent = input.closest('.form-group');
    if (!parent) return;
    if (isValid) {
      parent.classList.remove('error');
    } else {
      parent.classList.add('error');
    }
  }

  // Remove error state on input
  [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
    if (field) {
      field.addEventListener('input', () => {
        setFieldState(field, true);
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      setFieldState(nameInput, false);
      isValid = false;
    } else {
      setFieldState(nameInput, true);
    }

    // Validate Email
    if (!validateEmail(emailInput.value.trim())) {
      setFieldState(emailInput, false);
      isValid = false;
    } else {
      setFieldState(emailInput, true);
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      setFieldState(subjectInput, false);
      isValid = false;
    } else {
      setFieldState(subjectInput, true);
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      setFieldState(messageInput, false);
      isValid = false;
    } else {
      setFieldState(messageInput, true);
    }

    if (isValid) {
      const submitBtn = document.getElementById('submit-btn');
      const originalText = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.innerHTML = '<span>Opening Mail Client...</span>';
        submitBtn.disabled = true;
      }

      // Prefill and open user's default email client
      const targetEmail = 'niteshsinghh369@gmail.com';
      const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value.trim()}`);
      const body = encodeURIComponent(
        `Hi Nitesh,\n\n${messageInput.value.trim()}\n\nFrom,\n${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}`
      );
      
      const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

      // Open mail client
      setTimeout(() => {
        window.location.href = mailtoUrl;

        showToast('Thank you! Opening your email app to send the message.');
        form.reset();

        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      }, 600);
    }
  });
}

/* ==========================================================================
   8. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   9. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/* ==========================================================================
   10. TOAST NOTIFICATION UTILITY
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
