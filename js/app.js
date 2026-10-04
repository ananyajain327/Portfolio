/**
 * ANANYA JAIN — PORTFOLIO CLIENT APPLICATION
 * Features: Soft Theme Toggle, Filterable Projects, Modal Controller,
 * Copy-to-Clipboard, Interactive Contact Form, and Scroll Spy.
 */

// Certificate data registry for dynamic modal population
const CERTIFICATE_DATA = {
  jncia: {
    issuer: 'Juniper Networks',
    title: 'Certified Associate, Junos (JNCIA-Junos)',
    id: '5f0dc439-f889-4fda-b1ef-2a4ebd419c63',
    date: 'Sep 20, 2026 (Valid thru Sep 20, 2029)',
    badgeImg: 'assets/images/badges/jncia.png',
    credlyUrl: 'https://www.credly.com/badges/5f0dc439-f889-4fda-b1ef-2a4ebd419c63',
    skills: 'Networking Fundamentals, Junos OS CLI, Routing Policies, Firewall Filters, Interface Configuration',
    status: 'Verified Official Credential • Issued Sep 2026'
  },
  csa: {
    issuer: 'ServiceNow',
    title: 'Certified System Administrator (CSA)',
    id: '953e6765-8237-4836-957d-b2d559bccb50',
    date: 'Mar 24, 2026',
    badgeImg: 'assets/images/badges/csa.png',
    credlyUrl: 'https://www.credly.com/badges/953e6765-8237-4836-957d-b2d559bccb50',
    skills: 'System Config, User Administration, Automated Workflows, CMDB Governance, Incident Management',
    status: 'Verified Official Credential • Issued Mar 2026'
  },
  cad: {
    issuer: 'ServiceNow',
    title: 'Certified Application Developer (CAD)',
    id: 'a0022584-70b6-4c8b-81be-8d0537f0ab6e',
    date: 'May 29, 2026',
    badgeImg: 'assets/images/badges/cad.png',
    credlyUrl: 'https://www.credly.com/badges/a0022584-70b6-4c8b-81be-8d0537f0ab6e',
    skills: 'Scoped Application Architecture, Business Rules, Client Scripts, UI Actions, REST APIs',
    status: 'Verified Official Credential • Issued May 2026'
  },
  gcp: {
    issuer: 'Google Cloud',
    title: 'Google Cloud Engineering Certificate',
    id: 'fabc687f-6b0a-44df-b910-029409bcf33c',
    date: 'Nov 25, 2025',
    badgeImg: 'assets/images/badges/gcp.png',
    credlyUrl: 'https://www.credly.com/badges/fabc687f-6b0a-44df-b910-029409bcf33c',
    skills: 'Cloud Architecture, Compute Infrastructure, IAM Security, Cloud Storage & Networks',
    status: 'Verified Official Credential • Issued Nov 2025'
  }
};

let currentCertId = '';

document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initTheme();
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initCurrentYear();
});

/* --- Initialize Lucide Icons & Brand SVG Polyfills --- */
function initLucideIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Polyfill for brand icons (GitHub, LinkedIn) removed from recent Lucide releases
  const githubSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>';
  const linkedinSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>';

  document.querySelectorAll('i[data-lucide="github"]').forEach(el => {
    el.innerHTML = githubSvg;
    el.style.display = 'inline-flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
  });

  document.querySelectorAll('i[data-lucide="linkedin"]').forEach(el => {
    el.innerHTML = linkedinSvg;
    el.style.display = 'inline-flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
  });
}

/* --- Theme Controller (Light Cream <-> Midnight Velvet) --- */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('ananya_theme') || 'light';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ananya_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Midnight Velvet' : 'Soft Day Cream'} mode`, 'sun-moon');
    });
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeIcon');
  if (!themeIcon) return;

  if (theme === 'dark') {
    themeIcon.setAttribute('data-lucide', 'sun');
  } else {
    themeIcon.setAttribute('data-lucide', 'moon');
  }
  initLucideIcons();
}

/* --- Header Scroll Effect --- */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --- Mobile Menu Controller --- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      menuBtn.innerHTML = isOpen 
        ? '<i data-lucide="x"></i>' 
        : '<i data-lucide="menu"></i>';
      initLucideIcons();
    });

    // Close on nav link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuBtn.innerHTML = '<i data-lucide="menu"></i>';
        initLucideIcons();
      });
    });
  }
}

/* --- Scroll Spy for Navigation Links --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --- Current Year --- */
function initCurrentYear() {
  const yr = document.getElementById('currentYear');
  if (yr) {
    yr.textContent = new Date().getFullYear();
  }
}

/* --- Project Filter --- */
function filterProjects(category, btnElement) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  }

  const projectCards = document.querySelectorAll('.editorial-project-card');

  projectCards.forEach(card => {
    const cardCategories = card.getAttribute('data-category') || '';
    if (category === 'all' || cardCategories.includes(category)) {
      card.style.display = 'grid';
      card.style.animation = 'fadeInUp 0.4s var(--ease-chic) forwards';
    } else {
      card.style.display = 'none';
    }
  });
}

/* --- Modals Controller --- */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    initLucideIcons();
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleBackdropClick(event, modalId) {
  if (event.target.id === modalId) {
    closeModal(modalId);
  }
}

// ESC key closes any open modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
});

/* Modal trigger shortcuts */
function openCommutoModal() {
  openModal('commutoModal');
}

function openResumeModal() {
  openModal('resumeModal');
}

function openCertModal(certKey) {
  const cert = CERTIFICATE_DATA[certKey];
  if (!cert) return;

  const issuerEl = document.getElementById('certModalIssuer');
  const titleEl = document.getElementById('certModalTitle');
  const idEl = document.getElementById('certModalId');
  const dateEl = document.getElementById('certModalDate');
  const skillsEl = document.getElementById('certModalSkills');
  const badgeImgEl = document.getElementById('certModalBadgeImg');
  const credlyLinkEl = document.getElementById('certModalCredlyLink');

  if (issuerEl) issuerEl.textContent = cert.issuer;
  if (titleEl) titleEl.textContent = cert.title;
  if (idEl) idEl.textContent = cert.id;
  if (dateEl) dateEl.textContent = cert.date;
  if (skillsEl) skillsEl.textContent = cert.skills;
  if (badgeImgEl && cert.badgeImg) badgeImgEl.src = cert.badgeImg;
  if (credlyLinkEl && cert.credlyUrl) credlyLinkEl.href = cert.credlyUrl;

  currentCertId = cert.id;
  openModal('certModal');
}

function copyCertId() {
  if (currentCertId) {
    copyToClipboard(currentCertId, `Credential ID ${currentCertId} copied to clipboard!`);
  }
}

/* --- Clipboard Copy Utility with Toast Notification --- */
function copyToClipboard(text, customMessage = 'Copied to clipboard!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(customMessage, 'check');
    }).catch(() => {
      fallbackCopy(text, customMessage);
    });
  } else {
    fallbackCopy(text, customMessage);
  }
}

function fallbackCopy(text, customMessage) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast(customMessage, 'check');
  } catch (err) {
    showToast('Failed to copy. Please manually copy: ' + text, 'alert-circle');
  }
  document.body.removeChild(textarea);
}

/* --- Toast Notification Controller --- */
function showToast(message, iconName = 'sparkles') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="toast-icon" style="width: 16px; height: 16px;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  initLucideIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

/* --- Contact Form Submission Handler --- */
async function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const btn = document.getElementById('submitFormBtn');

  if (!name || !email || !message) {
    showToast('Please fill out all required fields.', 'alert-circle');
    return;
  }

  // Button loading state
  const originalText = btn.innerHTML;
  btn.innerHTML = `
    <span class="pulse-dot" style="background: #FFFFFF;"></span>
    <span>Sending message...</span>
  `;
  btn.disabled = true;

  const mailSubject = subject ? `[Portfolio Message] ${subject}` : `[Portfolio Message] New inquiry from ${name}`;
  const mailBody = `Hello Ananya,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  // Helper to open Gmail Web Compose fallback
  const openGmailFallback = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ananyajain729@gmail.com&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  try {
    const response = await fetch('https://formsubmit.co/ajax/ananyajain729@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        _subject: mailSubject,
        message: message,
        _captcha: 'false',
        _template: 'table'
      })
    });

    const data = await response.json();

    if (data.success === 'true' || data.success === true) {
      btn.innerHTML = `
        <i data-lucide="check" style="width: 16px; height: 16px;"></i>
        <span>Message Sent Directly!</span>
      `;
      initLucideIcons();

      showToast(`Thank you, ${name}! Your message was delivered straight to Ananya's inbox.`, 'check');
      document.getElementById('contactForm').reset();
    } else if (data.message && data.message.includes('Activation')) {
      // First-time activation pending
      btn.innerHTML = `
        <i data-lucide="mail" style="width: 16px; height: 16px;"></i>
        <span>Opening Gmail...</span>
      `;
      initLucideIcons();

      showToast("Activation link sent to Ananya's Gmail! Opening web compose backup...", 'send');
      openGmailFallback();
      document.getElementById('contactForm').reset();
    } else {
      // Fallback to Gmail Web Compose
      btn.innerHTML = `
        <i data-lucide="mail" style="width: 16px; height: 16px;"></i>
        <span>Opening Gmail...</span>
      `;
      initLucideIcons();

      showToast('Opening Gmail web compose to ensure delivery...', 'send');
      openGmailFallback();
      document.getElementById('contactForm').reset();
    }
  } catch (error) {
    console.error('Contact submission fallback:', error);
    btn.innerHTML = `
      <i data-lucide="mail" style="width: 16px; height: 16px;"></i>
      <span>Opening Gmail...</span>
    `;
    initLucideIcons();

    showToast('Redirecting to Gmail compose in browser...', 'send');
    openGmailFallback();
  } finally {
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      initLucideIcons();
    }, 3500);
  }
}

/* --- Resume Modal Tab Switcher --- */
function switchResumeTab(tabName) {
  const pdfView = document.getElementById('resumePdfView');
  const textView = document.getElementById('resumeTextView');
  const tabPdfBtn = document.getElementById('tabPdfBtn');
  const tabTextBtn = document.getElementById('tabTextBtn');

  if (tabName === 'pdf') {
    if (pdfView) pdfView.style.display = 'block';
    if (textView) textView.style.display = 'none';
    if (tabPdfBtn) tabPdfBtn.classList.add('active');
    if (tabTextBtn) tabTextBtn.classList.remove('active');
  } else {
    if (pdfView) pdfView.style.display = 'none';
    if (textView) textView.style.display = 'block';
    if (tabPdfBtn) tabPdfBtn.classList.remove('active');
    if (tabTextBtn) tabTextBtn.classList.add('active');
  }
  initLucideIcons();
}

