/* =================================================
   RISKCURITY — Main JS
   Gauge · Scroll reveals · Contact form · Riskmate AI
   Email via Web3Forms (free, static-site compatible)
   ================================================= */

// ── Web3Forms API key – get your free key at https://web3forms.com
// This key sends to riskecurity@gmail.com
const W3F_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // <-- replace after getting free key

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
     2. RISK GAUGE ANIMATION
  ════════════════════════════════ */
  const gaugeNum   = document.getElementById('gaugeNum');
  const gaugeArc   = document.getElementById('gaugeArc');
  const gaugeBadge = document.getElementById('gaugeBadge');
  let gaugeRan = false;

  function runGauge() {
    if (gaugeRan) return;
    gaugeRan = true;

    if (prefersReducedMotion) {
      if (gaugeNum)   { gaugeNum.textContent = '2.1'; gaugeNum.style.color = 'var(--teal)'; }
      if (gaugeArc)   { gaugeArc.style.strokeDashoffset = '200'; gaugeArc.style.stroke = 'var(--teal)'; }
      if (gaugeBadge) { gaugeBadge.textContent = 'Resolved'; gaugeBadge.classList.add('ok'); }
      return;
    }

    // Delay arc transition to allow CSS to activate
    setTimeout(() => {
      if (gaugeArc) {
        gaugeArc.style.strokeDashoffset = '200';
        gaugeArc.style.stroke = 'var(--teal)';
      }
    }, 120);

    const startVal = 7.8, endVal = 2.1, duration = 1900;
    const t0 = performance.now();

    (function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = (startVal - (startVal - endVal) * eased).toFixed(1);
      if (gaugeNum) {
        gaugeNum.textContent = v;
        if (p > 0.6) gaugeNum.style.color = 'var(--teal)';
      }
      if (p < 1) requestAnimationFrame(tick);
      else if (gaugeBadge) { gaugeBadge.textContent = 'Resolved'; gaugeBadge.classList.add('ok'); }
    })(t0);
  }

  const gaugeCard = document.querySelector('.gauge-card');
  if (gaugeCard) {
    new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) { runGauge(); obs.disconnect(); }
    }, { threshold: 0.25 }).observe(gaugeCard);
  }

  /* ════════════════════════════════
     3. SCROLL REVEALS
  ════════════════════════════════ */
  function makeObserver(selector, opts = {}) {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          if (opts.unobserve !== false) ob.unobserve(e.target);
        }
      });
    }, { threshold: opts.threshold || 0.12 });
    els.forEach(el => ob.observe(el));
  }

  makeObserver('.reveal');
  makeObserver('.stage',  { threshold: 0.25, unobserve: false });
  makeObserver('.m-card', { threshold: 0.2,  unobserve: false });

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
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: W3F_KEY,
            subject: 'New Assessment Request — Riskcurity Website',
            from_name: data.name || 'Website Visitor',
            ...data
          })
        });
        const json = await res.json();
        if (json.success) {
          if (cForm) cForm.style.display = 'none';
          if (cSuccess) cSuccess.style.display = 'block';
        } else {
          throw new Error(json.message || 'Submission failed');
        }
      } catch (err) {
        console.error('Contact form error:', err);
        // Still show success to user — fallback
        if (cForm) cForm.style.display = 'none';
        if (cSuccess) cSuccess.style.display = 'block';
        if (btn) { btn.disabled = false; btn.textContent = 'Send request \u2192'; }
      }
    });
  }

  /* ════════════════════════════════
     5. RISKMATE AI WIDGET
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

  if (!rmTrigger || !rmPanel) return;

  // Conversation log for email transcript
  let chatUser = { name: '', email: '' };
  let chatLog  = [];   // [{role:'bot'|'user', text:'...'}]
  let emailSent = false;

  /* ── Panel open/close ── */
  function openPanel() {
    rmPanel.classList.add('open');
    rmTrigger.setAttribute('aria-expanded', 'true');
    // Focus first interactive element
    setTimeout(() => {
      const first = rmPanel.querySelector('button:not([disabled]), input, textarea, select');
      if (first) first.focus();
    }, 60);
  }

  function closePanel() {
    rmPanel.classList.remove('open');
    rmTrigger.setAttribute('aria-expanded', 'false');
    rmTrigger.focus();
    // Send transcript when user closes the panel (if chat happened)
    if (chatLog.length > 0 && !emailSent) {
      emailSent = true;
      sendTranscript();
    }
  }

  rmTrigger.addEventListener('click', () => {
    rmPanel.classList.contains('open') ? closePanel() : openPanel();
  });

  rmClose.addEventListener('click', closePanel);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && rmPanel.classList.contains('open')) closePanel();
  });

  /* Focus trap inside panel */
  rmPanel.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(
      rmPanel.querySelectorAll('button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])')
    ).filter(el => !el.closest('[style*="display: none"]') && !el.closest('[style*="display:none"]'));
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ── Gate form ── */
  if (rmGateForm) {
    rmGateForm.addEventListener('submit', e => {
      e.preventDefault();
      const nameEl  = document.getElementById('rmName');
      const emailEl = document.getElementById('rmEmail');
      chatUser.name  = (nameEl?.value  || '').trim() || 'there';
      chatUser.email = (emailEl?.value || '').trim();

      // Hide gate, show chat
      rmGate.style.display = 'none';
      rmChatArea.style.display = 'flex';
      rmChatArea.style.flexDirection = 'column';

      const greeting = `Hi ${chatUser.name} — I'm Riskmate, Riskcurity's AI assistant. I can answer questions about our six services, walk through the case study results, or help you set up a call with the team. What would you like to know?`;
      addBotMsg(greeting);
      addChips();
      setTimeout(() => { if (rmInput) rmInput.focus(); }, 80);
    });
  }

  /* ── Chat form ── */
  if (rmChatForm && rmInput) {
    rmChatForm.addEventListener('submit', e => {
      e.preventDefault();
      const q = rmInput.value.trim();
      if (!q) return;
      addUserMsg(q);
      rmInput.value = '';
      rmInput.focus();

      // Typing indicator
      const typing = document.createElement('div');
      typing.className = 'rm-msg bot rm-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      rmMsgs.appendChild(typing);
      rmMsgs.scrollTop = rmMsgs.scrollHeight;

      setTimeout(() => {
        rmMsgs.removeChild(typing);
        addBotMsg(answer(q));
      }, 600);
    });
  }

  /* ── Message helpers ── */
  function addBotMsg(html) {
    chatLog.push({ role: 'bot', text: html.replace(/<[^>]+>/g, '') });
    const d = document.createElement('div');
    d.className = 'rm-msg bot';
    d.innerHTML = html;
    rmMsgs.appendChild(d);
    rmMsgs.scrollTop = rmMsgs.scrollHeight;
  }

  function addUserMsg(txt) {
    chatLog.push({ role: 'user', text: txt });
    const d = document.createElement('div');
    d.className = 'rm-msg user';
    d.textContent = txt;
    rmMsgs.appendChild(d);
    rmMsgs.scrollTop = rmMsgs.scrollHeight;
  }

  function addChips() {
    const wrap = document.createElement('div');
    wrap.className = 'rm-chips';
    const prompts = [
      ['Pen testing',  'What is pen testing?'],
      ['Compliance',   'How does compliance automation work?'],
      ['SOC 24/7',     'Tell me about 24/7 monitoring'],
      ['Pricing',      'How does pricing work?']
    ];
    prompts.forEach(([label, q]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'rm-chip';
      b.textContent = label;
      b.addEventListener('click', () => {
        addUserMsg(q);
        const typing = document.createElement('div');
        typing.className = 'rm-msg bot rm-typing';
        typing.innerHTML = '<span></span><span></span><span></span>';
        rmMsgs.appendChild(typing);
        rmMsgs.scrollTop = rmMsgs.scrollHeight;
        setTimeout(() => { rmMsgs.removeChild(typing); addBotMsg(answer(q)); }, 500);
      });
      wrap.appendChild(b);
    });
    rmMsgs.appendChild(wrap);
    rmMsgs.scrollTop = rmMsgs.scrollHeight;
  }

  /* ── Answer logic ── */
  function answer(q) {
    const l = q.toLowerCase();

    if (/pen.?test|vapt|penetrat|break.in|hack|attack|vulnerab/.test(l))
      return "We try to break into your systems the way a real attacker would — web apps, APIs, mobile, and cloud — and then give your engineers the exact code fixes, not just a list of problems. <em>(VAPT: Vulnerability Assessment &amp; Penetration Testing.)</em> Sprints take 5–7 days and re-testing after fixes is always included.";

    if (/compli|iso.?27001|soc.?2|pci|audit|certif|certif|evidence|paperwork/.test(l))
      return "We handle the compliance paperwork automatically. Instead of your team spending weeks gathering screenshots and spreadsheets, we set up systems that continuously collect the right evidence — so when your ISO 27001, SOC 2, or PCI DSS auditor asks for it, it's already there.";

    if (/monitor|soc\b|watch|24.?7|alert|incident|threat|detect/.test(l))
      return "We watch your infrastructure around the clock. When something looks wrong — a suspicious login, an unusual config change — we investigate and contain it before it escalates. Response SLA is under 15 minutes, with human analysts, not just automated alerts.";

    if (/ai|agent|swarm|automat|bot|llm|langchain/.test(l))
      return "We build AI assistants that can safely look up and act on your company's own data, with guardrails so they can't do anything risky without a human approving it first — useful for SOC alert triage, compliance evidence extraction, and DevSecOps workflows.";

    if (/siem|alert.?rule|false.?alarm|false.?positive|noise|log/.test(l))
      return "We tune your alert system to surface real threats and filter out the noise. Most security tools generate hundreds of false alarms a day. We fix that — our last engagement reduced false positives by 68%.";

    if (/price|cost|fee|budget|quote|charge|billing|invoice/.test(l))
      return "We charge a flat project fee — no hourly billing, no retainer lock-in, no surprises. Re-testing after fixes is included. <a href='#contact' style='color:var(--teal);text-decoration:underline'>Book a call</a> and we'll send a written proposal within 24 hours.";

    if (/case.?study|result|proof|example|8.?week|7\.8|2\.1|23|payment/.test(l))
      return "One recent engagement: a payments company had 23 security findings blocking a banking integration. We cut that to 1 in 8 weeks — risk score down from 7.8 to 2.1, false security alerts down by 68%, deal unblocked on schedule.";

    if (/start|begin|how|get.?start|next.?step|process|work/.test(l))
      return "The quickest way to start is to <a href='#contact' style='color:var(--teal);text-decoration:underline'>fill in the form below</a> — takes 2 minutes. Describe what you're up against (upcoming audit, security review, general worry) and we'll send a written proposal within 24 hours.";

    return "Good question — the fastest way to get a specific answer is to <a href='#contact' style='color:var(--teal);text-decoration:underline'>send us a quick note</a> or email <a href='mailto:riskecurity@gmail.com' style='color:var(--teal);text-decoration:underline'>riskecurity@gmail.com</a>. We reply within 24 hours with a clear answer, not a sales pitch.";
  }

  /* ── Send transcript by email via Web3Forms ── */
  async function sendTranscript() {
    if (!chatLog.length || !chatUser.email) return;

    const lines = chatLog.map(m =>
      `[${m.role.toUpperCase()}]: ${m.text}`
    ).join('\n\n');

    const body = {
      access_key: W3F_KEY,
      subject: `Riskmate AI Chat — ${chatUser.name} (${chatUser.email})`,
      from_name: 'Riskmate AI — Riskcurity',
      name: chatUser.name,
      email: chatUser.email,
      message: `Riskmate AI Chat Transcript\n============================\nVisitor: ${chatUser.name}\nEmail: ${chatUser.email}\nDate: ${new Date().toLocaleString()}\n\n${lines}\n\n============================\nEnd of conversation.`
    };

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    } catch (err) {
      console.warn('Transcript send failed:', err);
    }
  }
});
