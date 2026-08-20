/* =================================================
   RISKCURITY — script.js
   Gauge · Scroll reveals · Contact form · Riskmate AI
   ================================================= */

const W3F_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // replace with your free key from web3forms.com

document.addEventListener('DOMContentLoaded', () => {

  /* ════════════════════════════════
     1. NAV TOGGLE
  ════════════════════════════════ */
  const navToggle = document.getElementById('navToggle');
  const navList   = document.getElementById('navList');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.textContent = open ? '\u2715' : '\u2630';
    });
    navList.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '\u2630';
      })
    );
  }

  /* ════════════════════════════════
     2. RISK GAUGE
  ════════════════════════════════ */
  const gaugeNum   = document.getElementById('gaugeNum');
  const gaugeArc   = document.getElementById('gaugeArc');
  const gaugeBadge = document.getElementById('gaugeBadge');
  let gaugeRan     = false;
  const rm         = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function runGauge() {
    if (gaugeRan) return;
    gaugeRan = true;

    if (rm) {
      if (gaugeNum)   { gaugeNum.textContent = '2.1'; gaugeNum.style.color = 'var(--teal)'; }
      if (gaugeArc)   { gaugeArc.style.strokeDashoffset = '200'; gaugeArc.style.stroke = 'var(--teal)'; }
      if (gaugeBadge) { gaugeBadge.textContent = 'Resolved'; gaugeBadge.classList.add('ok'); }
      return;
    }

    setTimeout(() => {
      if (gaugeArc) { gaugeArc.style.strokeDashoffset = '200'; gaugeArc.style.stroke = 'var(--teal)'; }
    }, 120);

    const start = 7.8, end = 2.1, dur = 1900, t0 = performance.now();
    (function tick(now) {
      const p     = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v     = (start - (start - end) * eased).toFixed(1);
      if (gaugeNum) { gaugeNum.textContent = v; if (p > 0.6) gaugeNum.style.color = 'var(--teal)'; }
      if (p < 1) requestAnimationFrame(tick);
      else if (gaugeBadge) { gaugeBadge.textContent = 'Resolved'; gaugeBadge.classList.add('ok'); }
    })(t0);
  }

  const gaugeCard = document.querySelector('.gauge-card');
  if (gaugeCard) {
    new IntersectionObserver(([e], ob) => {
      if (e.isIntersecting) { runGauge(); ob.disconnect(); }
    }, { threshold: 0.25 }).observe(gaugeCard);
  }

  /* ════════════════════════════════
     3. SCROLL REVEALS
  ════════════════════════════════ */
  function observe(sel, threshold, keepWatching) {
    const els = document.querySelectorAll(sel);
    if (!els.length) return;
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); if (!keepWatching) ob.unobserve(e.target); }
      });
    }, { threshold });
    els.forEach(el => ob.observe(el));
  }
  observe('.reveal',  0.1);
  observe('.stage',   0.22, true);
  observe('.m-card',  0.18, true);

  /* ════════════════════════════════
     4. CONTACT FORM
  ════════════════════════════════ */
  const cForm    = document.getElementById('contactForm');
  const cSuccess = document.getElementById('contactSuccess');
  if (cForm) {
    cForm.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = cForm.querySelector('[type=submit]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending\u2026'; }
      const data = Object.fromEntries(new FormData(cForm).entries());
      try {
        const res  = await fetch('https://api.web3forms.com/submit', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ access_key: W3F_KEY, subject: 'New Assessment Request — Riskcurity', ...data })
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
      } catch (_) { /* still show success */ }
      if (cForm)    cForm.style.display    = 'none';
      if (cSuccess) cSuccess.style.display = 'block';
    });
  }

  /* ════════════════════════════════
     5. RISKMATE AI
  ════════════════════════════════ */
  const rmTrigger  = document.getElementById('rmTrigger');
  const rmPanel    = document.getElementById('rmPanel');
  const rmClose    = document.getElementById('rmClose');
  const rmGate     = document.getElementById('rmGate');
  const rmChatArea = document.getElementById('rmChat');
  const rmGateForm = document.getElementById('rmGateForm');
  const rmMsgs     = document.getElementById('rmMsgs');
  const rmInput    = document.getElementById('rmInput');
  const rmChatForm = document.getElementById('rmChatForm');

  if (!rmTrigger || !rmPanel || !rmMsgs || !rmInput || !rmChatForm) return;

  let chatUser  = { name: '', email: '' };
  let chatLog   = [];
  let emailSent = false;
  let isBusy    = false;   // prevents double-reply during typing delay

  /* ── open / close ── */
  function openPanel() {
    rmPanel.classList.add('open');
    rmTrigger.setAttribute('aria-expanded', 'true');
    setTimeout(() => {
      const el = rmPanel.querySelector('input:not([disabled]), button:not([disabled])');
      if (el) el.focus();
    }, 60);
  }

  function closePanel() {
    rmPanel.classList.remove('open');
    rmTrigger.setAttribute('aria-expanded', 'false');
    rmTrigger.focus();
    if (chatLog.length && !emailSent) { emailSent = true; sendTranscript(); }
  }

  rmTrigger.addEventListener('click', () =>
    rmPanel.classList.contains('open') ? closePanel() : openPanel()
  );
  if (rmClose) rmClose.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && rmPanel.classList.contains('open')) closePanel();
  });

  /* ── gate form ── */
  if (rmGateForm) {
    rmGateForm.addEventListener('submit', e => {
      e.preventDefault();
      chatUser.name  = (document.getElementById('rmName')?.value  || '').trim() || 'there';
      chatUser.email = (document.getElementById('rmEmail')?.value || '').trim();

      rmGate.style.display      = 'none';
      rmChatArea.style.display  = 'flex';

      botSay(`Hi ${chatUser.name} — I'm Riskmate, Riskcurity's assistant. Ask me about any of our services, the case study, or how to get started. What would you like to know?`);
      addChips();
      setTimeout(() => rmInput.focus(), 80);
    });
  }

  /* ── chat form — THE CORE FIX ── */
  rmChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const q = rmInput.value.trim();
    if (!q || isBusy) return;

    isBusy = true;
    rmInput.value    = '';
    rmInput.disabled = true;

    userSay(q);
    showTyping(q);
  });

  /* ── helpers ── */

  function userSay(text) {
    chatLog.push({ role: 'user', text });
    const d = document.createElement('div');
    d.className   = 'rm-msg user';
    d.textContent = text;
    rmMsgs.appendChild(d);
    scrollChat();
  }

  function botSay(html) {
    chatLog.push({ role: 'bot', text: html.replace(/<[^>]+>/g, '') });
    const d = document.createElement('div');
    d.className = 'rm-msg bot';
    d.innerHTML = html;
    rmMsgs.appendChild(d);
    scrollChat();
  }

  function showTyping(question) {
    // Create typing bubble
    const bubble = document.createElement('div');
    bubble.className = 'rm-msg bot rm-typing';
    bubble.innerHTML = '<span></span><span></span><span></span>';
    rmMsgs.appendChild(bubble);
    scrollChat();

    // After delay, remove bubble and show real reply
    setTimeout(() => {
      // Safe remove — only remove if still in DOM
      if (bubble.parentNode === rmMsgs) {
        rmMsgs.removeChild(bubble);
      }
      botSay(getAnswer(question));

      // Re-enable input for next message
      rmInput.disabled = false;
      rmInput.focus();
      isBusy = false;
    }, 650);
  }

  function scrollChat() {
    rmMsgs.scrollTop = rmMsgs.scrollHeight;
  }

  function addChips() {
    const wrap = document.createElement('div');
    wrap.className = 'rm-chips';
    [
      ['Pen testing',  'What is pen testing?'],
      ['Compliance',   'How does compliance automation work?'],
      ['SOC 24/7',     'Tell me about 24/7 SOC monitoring'],
      ['Pricing',      'How does pricing work?']
    ].forEach(([label, q]) => {
      const btn = document.createElement('button');
      btn.type        = 'button';
      btn.className   = 'rm-chip';
      btn.textContent = label;
      btn.addEventListener('click', () => {
        if (isBusy) return;
        isBusy           = true;
        rmInput.disabled = true;
        userSay(q);
        showTyping(q);
      });
      wrap.appendChild(btn);
    });
    rmMsgs.appendChild(wrap);
    scrollChat();
  }

  /* ── answer engine ── */
  function getAnswer(q) {
    const l = q.toLowerCase();

    if (/pen.?test|vapt|penetrat|break.in|hack|attack|vulnerab/.test(l))
      return "We simulate a real attacker trying to break into your systems — web apps, APIs, mobile apps, and cloud infrastructure. Every finding comes with a working proof-of-concept and a code-level fix, not just a list. Sprints take 5–7 days, and re-testing after you've fixed things is always included.";

    if (/compli|iso.?27001|soc.?2|pci|audit|certif|evidence|paperwork/.test(l))
      return "We automate the evidence collection for ISO 27001, SOC 2, and PCI DSS — pulling data from AWS, GitHub, Okta, and other tools continuously, so it's ready when your auditor asks for it. No more manual screenshot collection before every review.";

    if (/monitor|soc\b|watch|24.?7|alert|incident|threat|detect/.test(l))
      return "We watch your infrastructure around the clock. When something suspicious appears — an unusual login, a config change, unexpected traffic — our analysts investigate and contain it before it escalates. Response SLA is under 15 minutes.";

    if (/ai|agent|automat|bot|llm|langchain/.test(l))
      return "We build AI tools that can safely look up and take actions on your internal data, with human-in-the-loop guardrails so nothing risky happens automatically. Common uses: SOC alert triage, compliance evidence extraction, and DevSecOps automation.";

    if (/siem|alert.?rule|false.?alarm|false.?positive|noise|log/.test(l))
      return "We tune your SIEM and detection rules to surface real threats and drop the noise. Most setups produce hundreds of false alarms a day. After one recent engagement we cut false positives by 68% — the team went from alert fatigue to actually catching real issues.";

    if (/price|cost|fee|budget|quote|charge|billing|invoice/.test(l))
      return "We charge a flat fee per project — quoted up front before we start. No hourly billing, no retainer, no surprises. Re-testing is included. Fill in the form below and we'll send a written proposal within 24 hours.";

    if (/case.?study|result|proof|example|8.?week|7\.8|2\.1|23|payment/.test(l))
      return "A payments company came to us with 23 security findings blocking a banking integration. We closed 22 of them in 8 weeks — risk score dropped from 7.8 to 2.1, false alerts cut by 68%, banking deal closed on schedule.";

    if (/how.?long|timeline|time|fast|quick|duration/.test(l))
      return "A penetration test or compliance gap audit typically takes 5–7 days from kickoff. Full compliance automation (ISO 27001 / SOC 2) runs 4–8 weeks depending on your stack. We'll confirm your timeline in the proposal.";

    if (/start|begin|get.?start|next.?step|process|how.?work/.test(l))
      return "The fastest way to start: fill in the contact form below — 2 minutes, then we send a written proposal within 24 hours. No discovery call required to get a quote.";

    if (/hello|hi\b|hey|good morning|good afternoon/.test(l))
      return `Good to hear from you, ${chatUser.name || 'there'}! I can answer questions about any of our services — penetration testing, compliance automation, 24/7 monitoring, SIEM engineering, AI tooling, or secure development. What's on your mind?`;

    if (/thank|thanks|cheers/.test(l))
      return "Happy to help. If you have more questions later, just ask — or <a href='#contact' style='color:var(--teal);text-decoration:underline'>send us a message</a> and the team will reply within 24 hours.";

    // Default fallback
    return `Good question. For anything specific, the fastest way to a real answer is to <a href='#contact' style='color:var(--teal);text-decoration:underline'>fill in the contact form</a> or email <a href='mailto:riskecurity@gmail.com' style='color:var(--teal);text-decoration:underline'>riskecurity@gmail.com</a> — we reply within 24 hours, not with an auto-responder.`;
  }

  /* ── transcript email ── */
  async function sendTranscript() {
    if (!chatLog.length) return;
    const lines = chatLog.map(m => `[${m.role.toUpperCase()}]: ${m.text}`).join('\n\n');
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: W3F_KEY,
          subject: `Riskmate AI chat — ${chatUser.name} (${chatUser.email || 'no email'})`,
          from_name: 'Riskmate AI Widget',
          name: chatUser.name,
          email: chatUser.email || 'no-email@riskcurity.com',
          message: `Chat transcript\n${'='.repeat(40)}\nVisitor : ${chatUser.name}\nEmail   : ${chatUser.email}\nTime    : ${new Date().toLocaleString()}\n\n${lines}\n${'='.repeat(40)}`
        })
      });
    } catch (_) {}
  }



  /* ════════════════════════════════
     RATING WIDGET
  ════════════════════════════════ */
  (function initRating() {
    const stars      = Array.from(document.querySelectorAll('.star'));
    const starHint   = document.getElementById('starHint');
    const submitBtn  = document.getElementById('ratingSubmit');
    const ratingForm = document.getElementById('ratingForm');
    const ratSuccess = document.getElementById('ratingSuccess');
    const rsStars    = document.getElementById('rsStars');

    if (!stars.length || !ratingForm) return;

    const hints = { 1:'Poor', 2:'Fair', 3:'Good', 4:'Very good', 5:'Excellent' };
    let selected = 0;

    // Highlight stars up to index
    function paint(upTo, cls) {
      stars.forEach((s, i) => {
        s.classList.toggle(cls, i < upTo);
      });
    }

    // Mouse enter star
    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const v = parseInt(star.dataset.v);
        paint(v, 'hovered');
        if (starHint) starHint.textContent = hints[v] || '';
      });
      star.addEventListener('mouseleave', () => {
        paint(0, 'hovered');
        if (starHint) starHint.textContent = selected ? hints[selected] : '\u00a0';
      });
      star.addEventListener('click', () => {
        selected = parseInt(star.dataset.v);
        paint(selected, 'selected');
        if (starHint) starHint.textContent = hints[selected];
        // Animate the clicked star
        star.style.transform = 'scale(1.35)';
        setTimeout(() => { star.style.transform = ''; }, 220);
        if (submitBtn) submitBtn.disabled = false;
      });
    });

    // Form submit
    ratingForm.addEventListener('submit', async e => {
      e.preventDefault();
      if (!selected) return;

      const btn = submitBtn;
      btn.disabled = true;
      btn.textContent = 'Submitting\u2026';

      const name     = document.getElementById('rv-name')?.value.trim()     || 'Anonymous';
      const email    = document.getElementById('rv-email')?.value.trim()    || '';
      const feedback = document.getElementById('rv-feedback')?.value.trim() || '';
      const stars5   = '\u2605'.repeat(selected) + '\u2606'.repeat(5 - selected);

      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: W3F_KEY,
            subject: `Client Rating: ${selected}/5 ${stars5} — ${name}`,
            from_name: name,
            email: email || 'no-email@riskcurity.com',
            message: [
              'CLIENT RATING — RISKCURITY',
              '='.repeat(40),
              `Name    : ${name}`,
              `Email   : ${email || 'not provided'}`,
              `Rating  : ${selected}/5  ${stars5}`,
              `Date    : ${new Date().toLocaleString()}`,
              '',
              'FEEDBACK:',
              feedback || '(no written feedback provided)',
              '='.repeat(40)
            ].join('\n')
          })
        });
      } catch (_) { /* show success anyway */ }

      // Show success
      ratingForm.style.display = 'none';
      ratSuccess.style.display = 'flex';

      // Render chosen stars in success state
      if (rsStars) {
        rsStars.innerHTML = '';
        for (let i = 0; i < 5; i++) {
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('viewBox', '0 0 24 24');
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z');
          if (i < selected) {
            svg.style.fill   = 'var(--amber)';
            svg.style.stroke = 'var(--amber)';
          } else {
            svg.style.fill   = '#E8E5DA';
            svg.style.stroke = '#E8E5DA';
          }
          svg.appendChild(path);
          rsStars.appendChild(svg);
        }
        // Animate stars in
        rsStars.querySelectorAll('svg').forEach((s, i) => {
          s.style.opacity   = '0';
          s.style.transform = 'scale(0.4)';
          s.style.transition= `opacity 0.3s ${i * 0.07}s ease, transform 0.3s ${i * 0.07}s cubic-bezier(.16,1,.3,1)`;
          setTimeout(() => { s.style.opacity = '1'; s.style.transform = 'scale(1)'; }, 60);
        });
      }
    });
  })();

}); // end DOMContentLoaded
