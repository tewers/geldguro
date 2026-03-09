/**
 * GELDGURO.DE – Script
 * Interaktionen: Navigation, Scroll-Animationen, FAQ-Akkordeon, Cookie-Banner
 */
document.addEventListener('DOMContentLoaded', () => {
  // ── Sticky Header ──
  const header = document.querySelector('.header');
  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  // ── Mobile Navigation ──
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });
  // Schließe Mobile-Nav bei Linkklick
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  // ── Scroll-Animationen (Intersection Observer) ──
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });
  fadeElements.forEach(el => observer.observe(el));
  // ── FAQ Akkordeon ──
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Alle schließen
      faqItems.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });
      // Aktuelles öffnen (falls nicht schon offen)
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
  // ── Smooth Scroll für Anker-Links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
  // ── Cookie-Banner ──
  const cookieBanner = document.querySelector('.cookie-banner');
  const cookieAccept = document.getElementById('cookie-accept');
  const cookieReject = document.getElementById('cookie-reject');
  const cookieSettings = document.getElementById('cookie-settings');
  // Zeige Banner nach kurzer Verzögerung, falls noch nicht akzeptiert
  if (!localStorage.getItem('geldguro-cookies')) {
    setTimeout(() => {
      cookieBanner.classList.add('visible');
    }, 1500);
  }
  const closeCookieBanner = () => {
    cookieBanner.classList.remove('visible');
    localStorage.setItem('geldguro-cookies', 'true');
  };
  cookieAccept.addEventListener('click', closeCookieBanner);
  cookieReject.addEventListener('click', closeCookieBanner);
  cookieSettings.addEventListener('click', closeCookieBanner);
  // ── Legal Overlays ──
  document.querySelectorAll('[data-legal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const id = trigger.getAttribute('data-legal');
      const overlay = document.getElementById(id);
      if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  document.querySelectorAll('.legal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.legal-section').classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  // Schließe Legal-Overlay bei Klick auf Hintergrund
  document.querySelectorAll('.legal-section').forEach(section => {
    section.addEventListener('click', (e) => {
      if (e.target === section) {
        section.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  // ── Kontaktformular (nur visuell, kein Backend) ──
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Vielen Dank für Ihre Nachricht! (Dies ist eine Demo – kein Backend verbunden.)');
      contactForm.reset();
    });
  }
});
