/* =================================================
   RISKCURITY — Main JS
   Gauge · Scroll reveals · Contact form · Riskmate AI
   ================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Nav toggle ── */
  const toggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.textContent = open ? '✕' : '☰';
    });
    navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navList.classList.remove('open');
      toggle.textContent = '☰';
    }));
  }

  /* ── Risk gauge ── */
  const gaugeNum   = document.getElementById('gaugeNum');
  const gaugeArc   = document.getElementById('gaugeArc');
  const gaugeBadge = document.getElementById('gaugeBadge');
  let gaugeRan = false;

  function runGauge() {
    if (gaugeRan) return;
    gaugeRan = true;

    if (rm) {
      if (gaugeNum)   { gaugeNum.textContent = '2.1'; gaugeNum.style.color = 'var(--teal)'; }
      if (gaugeArc)   { gaugeArc.style.strokeDashoffset = '200'; gaugeArc.style.stroke = 'var(--teal)'; }
      if (gaugeBadge) { gaugeBadge.textContent = 'Resolved'; gaugeBadge.classList.add('ok'); }
      return;
    }

    // Arc: dasharray 261; 50 = high risk (amber); 200 = low risk (teal)
    setTimeout(() => {
      if (gaugeArc) {
        gaugeArc.style.strokeDashoffset = '200';
        gaugeArc.style.stroke = 'var(--teal)';
      }
    }, 80);

    const start = 7.8, end = 2.1, dur = 1900;
    const t0 = performance.now();

    function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const v = (start - (start - end) * ease).toFixed(1);
      if (gaugeNum) {
        gaugeNum.textContent = v;
        if (p > 0.6) gaugeNum.style.color = 'var(--teal)';
      }
      if (p < 1) requestAnimationFrame(tick);
      else if (gaugeBadge) { gaugeBadge.textContent = 'Resolved'; gaugeBadge.classList.add('ok'); }
    }
    requestAnimationFrame(tick);
  }

  const gaugeCard = document.querySelector('.gauge-card');
  if (gaugeCard) {
    new IntersectionObserver(([e], ob) => {
      if (e.isIntersecting) { runGauge(); ob.disconnect(); }
    }, { threshold: 0.25 }).observe(gaugeCard);
  }

  /* ── Generic reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target); } });
    }, { threshold: 0.1 });
    reveals.forEach(el => ro.observe(el));
  }

  /* ── Case study stage panels ── */
  const stages = document.querySelectorAll('.stage');
  if (stages.length) {
    const so = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
    }, { threshold: 0.28 });
    stages.forEach(s => so.observe(s));
  }

  /* ── Methodology cards ── */
  const mCards = document.querySelectorAll('.m-card');
  if (mCards.length) {
    const mo = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
    }, { threshold: 0.2 });
    mCards.forEach(c => mo.observe(c));
  }

  /* ── Contact form ── */
  const cForm = document.getElementById('contactForm');
  const cSuccess = document.getElementById('contactSuccess');
  if (cForm) {
    cForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = cForm.querySelector('[type=submit]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      setTimeout(() => {
        if (cForm) cForm.style.display = 'none';
        if (cSuccess) cSuccess.style.display = 'block';
      }, 700);
    });
  }

  /* ── Riskmate AI widget ── */
  const rmTrigger = document.getElementById('rmTrigger');
  const rmPanel   = document.getElementById('rmPanel');
  const rmClose   = document.getElementById('rmClose');
  const rmGate    = document.getElementById('rmGate');
  const rmChat    = document.getElementById('rmChat');
  const rmGateForm= document.getElementById('rmGateForm');
  const rmMsgs    = document.getElementById('rmMsgs');
  const rmInput   = document.getElementById('rmInput');
  const rmChatForm= document.getElementById('rmChatForm');

  if (!rmTrigger || !rmPanel) return;

  function openPanel()  { rmPanel.classList.add('open');  rmTrigger.setAttribute('aria-expanded','true');  trapFocus(rmPanel); }
  function closePanel() { rmPanel.classList.remove('open'); rmTrigger.setAttribute('aria-expanded','false'); rmTrigger.focus(); }

  rmTrigger.addEventListener('click', () => {
    rmPanel.classList.contains('open') ? closePanel() : openPanel();
  });
  rmClose.addEventListener('click', closePanel);

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && rmPanel.classList.contains('open')) closePanel();
  });

  // Focus trap
  function trapFocus(el) {
    const focusable = el.querySelectorAll('button,input,textarea,select,[tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    el.addEventListener('keydown', function trap(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last)  { e.preventDefault(); first.focus(); }
      if (!rmPanel.classList.contains('open')) el.removeEventListener('keydown', trap);
    });
    setTimeout(() => { if (focusable[0]) focusable[0].focus(); }, 50);
  }

  // Gate form submit
  if (rmGateForm) {
    rmGateForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('rmName')?.value.trim() || 'there';
      rmGate.style.display = 'none';
      rmChat.style.display = 'flex';
      addBotMsg(`Hi ${name} — I'm Riskmate, Riskcurity's assistant. I can tell you about any of our six services, walk you through the case study results, or help you set up a call with the team. What would you like to know?`);
      addChips();
      setTimeout(() => { if (rmInput) rmInput.focus(); }, 80);
    });
  }

  // Chat form submit
  if (rmChatForm && rmInput) {
    rmChatForm.addEventListener('submit', e => {
      e.preventDefault();
      const q = rmInput.value.trim();
      if (!q) return;
      addUserMsg(q);
      rmInput.value = '';
      setTimeout(() => addBotMsg(answer(q)), 550);
    });
  }

  // Quick chips
  document.querySelectorAll('.rm-chip').forEach(c => {
    c.addEventListener('click', () => {
      const q = c.dataset.q;
      addUserMsg(q);
      setTimeout(() => addBotMsg(answer(q)), 480);
    });
  });

  function addBotMsg(html) {
    const d = document.createElement('div');
    d.className = 'rm-msg bot'; d.innerHTML = html;
    rmMsgs.appendChild(d); rmMsgs.scrollTop = rmMsgs.scrollHeight;
  }
  function addUserMsg(txt) {
    const d = document.createElement('div');
    d.className = 'rm-msg user'; d.textContent = txt;
    rmMsgs.appendChild(d); rmMsgs.scrollTop = rmMsgs.scrollHeight;
  }
  function addChips() {
    const wrap = document.createElement('div');
    wrap.className = 'rm-chips';
    [['Pen testing','What is pen testing?'],['Compliance','How does compliance automation work?'],['SOC monitoring','Tell me about 24/7 monitoring'],['Pricing','How does pricing work?']]
      .forEach(([label, q]) => {
        const b = document.createElement('button');
        b.className = 'rm-chip'; b.dataset.q = q; b.textContent = label;
        b.addEventListener('click', () => { addUserMsg(q); setTimeout(() => addBotMsg(answer(q)), 480); });
        wrap.appendChild(b);
      });
    rmMsgs.appendChild(wrap);
  }

  function answer(q) {
    const l = q.toLowerCase();
    if (/pen.test|vapt|penetrat|break.in|hack/.test(l))
      return "We try to break into your systems the way a real attacker would — web apps, APIs, mobile, and cloud — and then give your engineers the exact code fixes, not just a list of problems. <em>(That's VAPT: Vulnerability Assessment & Penetration Testing.)</em> Sprints typically take 5–7 days.";
    if (/compli|iso|soc.?2|pci|audit|certif/.test(l))
      return "We handle the paperwork side of security certification. Instead of your team manually collecting evidence, we automate it continuously so when an ISO 27001, SOC 2, or PCI DSS auditor asks for proof, it's already there.";
    if (/monitor|soc|watch|24|alert/.test(l))
      return "We watch your systems around the clock. When something looks wrong — an unusual login, a spike in traffic, a config change — we investigate and contain it before it becomes a real incident. Response SLA is under 15 minutes.";
    if (/ai|agent|automat|bot/.test(l))
      return "We build AI assistants that can safely look up and act on your company's own data, with limits so they can't do anything risky without a human checking first. Useful for automating SOC alert triage or compliance evidence collection.";
    if (/price|cost|fee|budget|quote/.test(l))
      return "We charge a flat fee per project — no hourly billing, no retainer surprises. Re-testing after you've fixed issues is included. <a href='#contact' style='color:var(--teal);text-decoration:underline'>Book a call</a> and we'll send a proposal within 24 hours.";
    if (/case.?study|result|proof|example|8.week|7\.8|2\.1/.test(l))
      return "One recent engagement: a payments company had 23 critical security findings blocking a banking deal. We reduced that to 1 in 8 weeks — cutting their risk score from 7.8 to 2.1 and reducing false security alerts by 68%.";
    return "Good question. The fastest way to get a specific answer is to <a href='#contact' style='color:var(--teal);text-decoration:underline'>book a 30-min call</a> or email <a href='mailto:riskecurity@gmail.com' style='color:var(--teal);text-decoration:underline'>riskecurity@gmail.com</a> — we'll reply within 24 hours.";
  }
});
