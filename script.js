/* =========================================================
   RISKCURITY — INTERACTIVE CONTROLLER
   Calm, smooth scroll-driven reveals, animated risk-score dial,
   stat counters, and accessible keyboard interactions.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- 1. Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '☰';
      });
    });
  }

  // --- 2. Hero Risk Score Dial Gauge Animation ---
  const gaugeNumber = document.getElementById('gaugeNumber');
  const gaugeArc = document.getElementById('gaugeArc');
  const gaugeStatus = document.getElementById('gaugeStatus');
  let gaugeAnimated = false;

  function animateRiskGauge() {
    if (gaugeAnimated) return;
    gaugeAnimated = true;

    if (prefersReducedMotion) {
      if (gaugeNumber) gaugeNumber.textContent = '2.1';
      if (gaugeNumber) gaugeNumber.style.color = 'var(--accent-teal)';
      if (gaugeArc) {
        gaugeArc.style.strokeDashoffset = '200';
        gaugeArc.style.stroke = 'var(--accent-teal)';
      }
      if (gaugeStatus) {
        gaugeStatus.textContent = 'Resolved · Low Risk';
        gaugeStatus.classList.add('resolved');
      }
      return;
    }

    const startVal = 7.8;
    const endVal = 2.1;
    const duration = 1800; // ms
    const startTime = performance.now();

    // Arc stroke-dasharray is 283.
    // 7.8 corresponds to ~60 dashoffset (Amber/High)
    // 2.1 corresponds to ~200 dashoffset (Teal/Low)
    if (gaugeArc) {
      setTimeout(() => {
        gaugeArc.style.strokeDashoffset = '200';
        gaugeArc.style.stroke = 'var(--accent-teal)';
      }, 100);
    }

    function updateGauge(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const currentVal = (startVal - (startVal - endVal) * easeProgress).toFixed(1);
      if (gaugeNumber) {
        gaugeNumber.textContent = currentVal;
        if (progress > 0.65) {
          gaugeNumber.style.color = 'var(--accent-teal)';
        }
      }

      if (progress < 1) {
        requestAnimationFrame(updateGauge);
      } else {
        if (gaugeStatus) {
          gaugeStatus.textContent = 'Resolved · Low Risk';
          gaugeStatus.classList.add('resolved');
        }
      }
    }

    requestAnimationFrame(updateGauge);
  }

  // Trigger Gauge on Load or Hero Visible
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateRiskGauge();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(heroVisual);
  } else {
    animateRiskGauge();
  }

  // --- 3. Case Study Narrative Stage Reveal (Scroll-Driven) ---
  const stagePanels = document.querySelectorAll('.stage-panel');
  if (stagePanels.length > 0) {
    const stageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.3 });

    stagePanels.forEach(panel => stageObserver.observe(panel));
  }

  // --- 4. Methodology Timeline Step Reveal ---
  const methodSteps = document.querySelectorAll('.method-step-card');
  if (methodSteps.length > 0) {
    const methodObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.2 });

    methodSteps.forEach(step => methodObserver.observe(step));
  }

  // --- 5. General Reveal-on-Scroll Elements ---
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => revealObserver.observe(el));
  }

  // --- 6. Contact Form Handling ---
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }

      setTimeout(() => {
        if (contactForm) contactForm.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
      }, 800);
    });
  }
});
