/* =========================================================
   RISKCURITY — INTERACTIVE CLIENT LOGIC & ENGINES
   - Particle Network Canvas Animation
   - IntersectionObserver Scroll Reveals
   - 4-Stage Interactive Methodology Timeline
   - Simulated SOC Live CLI Terminal Engine
   - Contact Form Web3Forms Lead Dispatch
   - Riskmate AI Conversational Agent & Technical Guide
   ========================================================= */

(function () {
  'use strict';

  /* ---------- 1. INTERACTIVE CYBER PARTICLE CANVAS ---------- */
  var canvas = document.getElementById('cyberCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = window.innerWidth < 768 ? 35 : 70;
    var mouse = { x: null, y: null, maxDist: 120 };

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', function (e) {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener('mouseout', function () {
      mouse.x = null;
      mouse.y = null;
    });

    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(0, 217, 255, ' : 'rgba(0, 255, 136, ';
    }

    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.maxDist) {
          this.x -= (dx / dist) * 1.5;
          this.y -= (dy / dist) * 1.5;
        }
      }
    };

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.7)';
      ctx.fill();
    };

    for (var i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            var opacity = (1 - dist / 130) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 217, 255, ' + opacity + ')';
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
        particles[a].update();
        particles[a].draw();
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ---------- 2. NAVBAR SCROLL & MOBILE TOGGLE ---------- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    if (nav) {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#060919';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid var(--line)';
      }
    });

    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 680) {
          navLinks.style.display = 'none';
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ---------- 3. SCROLL REVEAL (INTERSECTION OBSERVER) ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add('active');
    });
  }

  /* ---------- 4. 4-STAGE INTERACTIVE PROCESS TIMELINE ---------- */
  var stageBtns = document.querySelectorAll('.stage-btn');
  var processCards = document.querySelectorAll('.process-card');

  if (stageBtns.length && processCards.length) {
    stageBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var stageIndex = btn.getAttribute('data-stage');

        stageBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        processCards.forEach(function (card) { card.classList.remove('active'); });
        var targetCard = document.getElementById('stageCard' + stageIndex);
        if (targetCard) {
          targetCard.classList.add('active');
        }
      });
    });
  }

  /* ---------- 5. LIVE SOC INTERACTIVE TERMINAL SIMULATION ---------- */
  var terminalBody = document.getElementById('terminalBody');
  if (terminalBody) {
    var commands = [
      { cmd: "riskcurity soc --status", output: "<span class='term-success'>[OK]</span> 214 enterprise nodes monitored · SIEM pipeline active · 0 zero-day exposures" },
      { cmd: "riskcurity vapt --target webapp-cluster", output: "<span class='term-success'>[COMPLETE]</span> OWASP Top 10 assessment passed · Grade A+ defensive posture" },
      { cmd: "riskcurity grc --sync iso27001", output: "<span class='term-success'>[AUDIT READY]</span> 98.4% continuous evidence mapped · SOC 2 Type II compliant" },
      { cmd: "riskcurity agent --triage alerts", output: "<span class='term-cyan'>[AI ORCHESTRATION]</span> 14 Autonomous Agents triaging · 0 unreviewed runs" }
    ];

    var cmdIdx = 0;
    function runTerminalSequence() {
      if (!terminalBody) return;
      var item = commands[cmdIdx];
      
      var cmdLine = document.createElement('div');
      cmdLine.innerHTML = "<span class='term-dim'>&gt; </span><span class='term-cmd'></span><span class='pulse-dot' style='display:inline-block;'></span>";
      terminalBody.appendChild(cmdLine);
      terminalBody.scrollTop = terminalBody.scrollHeight;

      var spanCmd = cmdLine.querySelector('.term-cmd');
      var dot = cmdLine.querySelector('.pulse-dot');
      var charIdx = 0;

      function typeChar() {
        if (charIdx < item.cmd.length) {
          spanCmd.textContent += item.cmd.charAt(charIdx);
          charIdx++;
          setTimeout(typeChar, 35);
        } else {
          dot.style.display = 'none';
          setTimeout(function () {
            var outLine = document.createElement('div');
            outLine.innerHTML = "  " + item.output;
            terminalBody.appendChild(outLine);
            terminalBody.scrollTop = terminalBody.scrollHeight;

            cmdIdx = (cmdIdx + 1) % commands.length;
            setTimeout(runTerminalSequence, 2000);
          }, 300);
        }
      }
      typeChar();
    }

    setTimeout(runTerminalSequence, 1200);
  }

  /* ---------- 6. CONTACT FORM LEAD SUBMIT (WEB3FORMS) ---------- */
  var contactForm = document.getElementById('contactForm');
  var formResult = document.getElementById('formResult');
  var submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(contactForm);
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "<span>Transmitting Inquiry...</span> <span class='pulse-dot'></span>";
      }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          formResult.style.display = 'block';
          formResult.style.background = 'rgba(0, 255, 136, 0.1)';
          formResult.style.border = '1px solid var(--green)';
          formResult.style.color = 'var(--green)';
          formResult.innerHTML = "✓ <b>Inquiry Delivered!</b> Our security engineers will contact you at " + (formData.get('email') || 'your email') + " within 24 hours.";
          contactForm.reset();
        } else {
          throw new Error('Submission returned error');
        }
      })
      .catch(function () {
        formResult.style.display = 'block';
        formResult.style.background = 'rgba(255, 0, 85, 0.1)';
        formResult.style.border = '1px solid var(--danger)';
        formResult.style.color = '#ff6b8b';
        formResult.innerHTML = "Inquiry noted! You can also reach our team directly at <a href='mailto:riskecurity@gmail.com'>riskecurity@gmail.com</a>.";
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "<span>Send Message &amp; Book Review</span> <span class='btn-arrow'>→</span>";
        }
      });
    });
  }

  /* ---------- 7. RISKMATE AI CONVERSATIONAL AGENT & KNOWLEDGE ENGINE ---------- */
  var chatToggle = document.getElementById('hackerChatToggle');
  var chatWindow = document.getElementById('hackerChatWindow');
  var chatClose = document.getElementById('hackerChatClose');
  var chatReset = document.getElementById('hackerChatReset');
  var chatBody = document.getElementById('hackerChatBody');
  var chatForm = document.getElementById('hackerChatForm');
  var chatInput = document.getElementById('hackerChatInput');
  var chatTyping = document.getElementById('hackerTyping');
  var bubble = document.getElementById('hackerBubble');
  var bubbleClose = document.getElementById('hackerBubbleClose');
  var badge = document.getElementById('hackerBadge');
  var fserviceSelect = document.getElementById('fservice');

  var loginOverlay = document.getElementById('riskmateLoginOverlay');
  var loginForm = document.getElementById('riskmateLoginForm');
  var inputName = document.getElementById('riskmateName');
  var inputEmail = document.getElementById('riskmateEmail');
  var userStatusEl = document.getElementById('riskmateUserStatus');

  if (chatToggle && chatWindow) {
    var chatOpen = false;
    var currentUser = null;

    try {
      var saved = localStorage.getItem('riskmate_user');
      if (saved) { currentUser = JSON.parse(saved); }
    } catch (err) {}

    function initChatView() {
      if (currentUser && currentUser.name) {
        if (loginOverlay) loginOverlay.classList.add('hidden');
        if (userStatusEl) userStatusEl.textContent = 'Active · ' + currentUser.name;
        if (!chatBody.children.length) {
          renderWelcomeMsg();
        }
      } else {
        if (loginOverlay) loginOverlay.classList.remove('hidden');
      }
    }

    function renderWelcomeMsg() {
      var userName = currentUser ? currentUser.name : 'there';
      chatBody.innerHTML = '';
      appendMessage(
        '<p>Hello <b>' + userName + '</b>! 👋 Welcome to <b>Riskcurity</b>.<br>I\'m <b>Riskmate AI</b>, your technical guide for <b>Web Development, AI Automation, 24/7 SOC, SIEM &amp; GRC Compliance</b>.<br><br>How can I assist you today? Select a service below or ask any technical question!</p>',
        'bot',
        [
          { label: '🌐 Web Development', topic: 'web' },
          { label: '🤖 AI Automation', topic: 'ai' },
          { label: '👁️ 24/7 SOC Operations', topic: 'soc' },
          { label: '🛡️ GRC Compliance', topic: 'grc' },
          { label: '⚔️ VAPT Penetration Testing', topic: 'vapt' },
          { label: '🔄 How We Work (Process)', topic: 'process' },
          { label: '📩 Send Inquiry to Team', topic: 'lead', highlight: true }
        ]
      );
    }

    function toggleChat(state) {
      chatOpen = typeof state === 'boolean' ? state : !chatOpen;
      chatWindow.classList.toggle('active', chatOpen);
      chatWindow.setAttribute('aria-hidden', chatOpen ? 'false' : 'true');
      if (bubble) bubble.classList.remove('visible');
      if (badge) badge.style.display = 'none';

      if (chatOpen) {
        initChatView();
        if (currentUser && chatInput) {
          setTimeout(function () { chatInput.focus(); }, 300);
        }
      }
    }

    chatToggle.addEventListener('click', function () { toggleChat(); });
    if (chatClose) chatClose.addEventListener('click', function () { toggleChat(false); });
    if (bubbleClose) bubbleClose.addEventListener('click', function (e) { e.stopPropagation(); bubble.classList.remove('visible'); });
    if (bubble) bubble.addEventListener('click', function () { toggleChat(true); });

    setTimeout(function () {
      if (!chatOpen && bubble) {
        bubble.classList.add('visible');
      }
    }, 3500);

    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var n = inputName.value.trim();
        var em = inputEmail.value.trim();
        if (!n || !em) return;

        currentUser = { name: n, email: em };
        try {
          localStorage.setItem('riskmate_user', JSON.stringify(currentUser));
        } catch (err) {}

        var fname = document.getElementById('fname');
        var femail = document.getElementById('femail');
        if (fname && !fname.value) fname.value = n;
        if (femail && !femail.value) femail.value = em;

        initChatView();
      });
    }

    // Comprehensive Technical Knowledge Base & Step-by-Step Guides
    var kbAnswers = {
      web: {
        title: "🌐 Secure Web Development",
        text: "<b>How Our Web Development Works:</b><br>" +
              "1. <b>Architecture &amp; Threat Modeling:</b> We design secure data flows, RBAC permissions, and API boundaries from day one.<br>" +
              "2. <b>Hardened Engineering:</b> We build full-stack web applications, SaaS platforms, and enterprise portals hardened against the <b>OWASP Top 10</b> (XSS, SQLi, CSRF, IDOR, and auth bypass prevention).<br>" +
              "3. <b>Automated Security CI/CD:</b> Integrated SAST/DAST vulnerability scanners run on every commit before code reaches production.<br>" +
              "4. <b>Ultra-Fast Modern UX/UI:</b> Responsive design, sleek dark mode glassmorphism, and sub-second load times.",
        serviceVal: "Secure Web Development",
        followUps: [
          { label: '🤖 AI Automation', topic: 'ai' },
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '📩 Request Web Dev Proposal', topic: 'lead', highlight: true }
        ]
      },
      ai: {
        title: "🤖 AI Agents & Workflow Automation",
        text: "<b>How Our AI Automation Works:</b><br>" +
              "1. <b>Task &amp; Workflow Discovery:</b> We analyze your repetitive operational tasks, ticket queues, and data extraction pipelines.<br>" +
              "2. <b>Custom Autonomous Agent Architecture:</b> We build LLM RAG engines, vector search pipelines, and autonomous agent swarms (Python/Node, LangChain/CrewAI).<br>" +
              "3. <b>Strict Human-Supervised Guardrails:</b> Every agent action is bound by permission boundaries — zero destructive runs without human sign-off.<br>" +
              "4. <b>Integration &amp; Scaling:</b> Connects seamlessly into Slack, Jira, GitHub, AWS, and internal databases.",
        serviceVal: "Autonomous AI Agents & Automation",
        followUps: [
          { label: '👁️ 24/7 SOC Watch', topic: 'soc' },
          { label: '🛡️ GRC Compliance', topic: 'grc' },
          { label: '📩 Build an AI Agent', topic: 'lead', highlight: true }
        ]
      },
      soc: {
        title: "👁️ 24/7 SOC Operations & Threat Defense",
        text: "<b>How Our 24/7 SOC Works:</b><br>" +
              "1. <b>Continuous Ingestion:</b> Ingests logs from AWS, Azure, Google Cloud, firewalls, Okta, and endpoints 24/7/365.<br>" +
              "2. <b>Real-Time Analyst Triage (&lt; 2 min):</b> Our security analysts and automated AI filters investigate alerts, cutting through 99% of false alarms.<br>" +
              "3. <b>Active Incident Containment:</b> Upon anomalous behavior, we immediately isolate affected hosts, revoke breached tokens, and neutralize threats.<br>" +
              "4. <b>Transparent Executive Reports:</b> Weekly threat landscape analysis and compliance posture updates.",
        serviceVal: "24/7 SOC & SIEM Engineering",
        followUps: [
          { label: '📡 SIEM Engineering', topic: 'siem' },
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '📩 Get SOC 24/7 Coverage', topic: 'lead', highlight: true }
        ]
      },
      siem: {
        title: "📡 SIEM Engineering & Detection Rules",
        text: "<b>How Our SIEM Engineering Works:</b><br>" +
              "1. <b>Log Pipeline Architecture:</b> We structure log collectors, parsing rules, and schema normalization.<br>" +
              "2. <b>Detection Correlation:</b> Fine-tuned detection logic mapped against MITRE ATT&amp;CK matrices.<br>" +
              "3. <b>Zero-Noise Dashboards:</b> Custom telemetry visualizers that surface real zero-day intrusions without alert fatigue.",
        serviceVal: "24/7 SOC & SIEM Engineering",
        followUps: [
          { label: '👁️ 24/7 SOC Watch', topic: 'soc' },
          { label: '🛡️ GRC Compliance', topic: 'grc' },
          { label: '📩 Scope SIEM Project', topic: 'lead', highlight: true }
        ]
      },
      grc: {
        title: "🛡️ GRC Compliance Automation",
        text: "<b>How Our GRC Automation Works:</b><br>" +
              "1. <b>Control Mapping:</b> We map your controls against <b>ISO 27001</b>, <b>SOC 2 Type II</b>, NIST CSF, and GDPR.<br>" +
              "2. <b>Automated Evidence Collection:</b> Continuous API scrapers automatically gather proof from cloud infrastructure, CI/CD, and identity providers.<br>" +
              "3. <b>Live Audit Readiness:</b> Continuous compliance scoring, automated gap alerts, and instant auditor portal generation.",
        serviceVal: "GRC Automation (ISO 27001 / SOC 2)",
        followUps: [
          { label: '⚔️ VAPT Audit', topic: 'vapt' },
          { label: '🔄 Our 4-Stage Process', topic: 'process' },
          { label: '📩 Book GRC Audit Review', topic: 'lead', highlight: true }
        ]
      },
      vapt: {
        title: "⚔️ VAPT Penetration Testing",
        text: "<b>How Our VAPT Process Works:</b><br>" +
              "1. <b>Scoping &amp; Threat Modeling:</b> Define testing targets across Web, Cloud, APIs, Network, and Mobile.<br>" +
              "2. <b>Active Ethical Hacking:</b> Manual and tool-assisted exploitation simulating real-world adversary attacks.<br>" +
              "3. <b>Business-Ranked Fix Guide:</b> Proof-of-concept exploits with clear code-level remediation steps.<br>" +
              "4. <b>Free Re-Testing:</b> We verify and certify your fixes once your developers deploy patches.",
        serviceVal: "VAPT Penetration Testing",
        followUps: [
          { label: '🌐 Web Development', topic: 'web' },
          { label: '🛡️ GRC Compliance', topic: 'grc' },
          { label: '📩 Book Penetration Test', topic: 'lead', highlight: true }
        ]
      },
      process: {
        title: "🔄 How We Work (4-Stage Engagement)",
        text: "<b>Our 4-Stage Methodology:</b><br>" +
              "• <b>01 Assess:</b> Attack surface discovery, compliance baseline, and executive risk register.<br>" +
              "• <b>02 Defend:</b> Patch critical exposures, configure SIEM, and activate 24/7 SOC monitoring.<br>" +
              "• <b>03 Automate:</b> Deploy GRC evidence sync and autonomous AI agent triage workflows.<br>" +
              "• <b>04 Evolve:</b> Continuous red-team tests, adaptive AI detection rules, and compounding security scale.",
        serviceVal: "Custom Scope / Not Sure Yet",
        followUps: [
          { label: '👁️ SOC Operations', topic: 'soc' },
          { label: '🤖 AI Automation', topic: 'ai' },
          { label: '📩 Schedule Scoping Call', topic: 'lead', highlight: true }
        ]
      },
      contact_info: {
        title: "📞 Direct Contact & Scheduling",
        text: "You can reach our engineering team directly at:<br>" +
              "• <b>Email:</b> <a href='mailto:riskecurity@gmail.com'>riskecurity@gmail.com</a><br>" +
              "• <b>Phone:</b> <a href='tel:+923423717545'>+92 342 3717545</a><br>" +
              "• <b>Response Time:</b> Within 24 hours for all scoped proposals.",
        serviceVal: "Custom Scope / Not Sure Yet",
        followUps: [
          { label: '📩 Send Message via Riskmate', topic: 'lead', highlight: true },
          { label: '🌐 Explore Web Dev', topic: 'web' },
          { label: '🤖 Explore AI Agents', topic: 'ai' }
        ]
      },
      lead: {
        title: "📩 Direct Team Contact",
        text: "I can forward your project details or question straight to our engineering team at <b>riskecurity@gmail.com</b>! Please type your project description or question below.",
        serviceVal: "Custom Scope / Not Sure Yet",
        followUps: []
      }
    };

    function appendMessage(text, sender, chips) {
      var msgDiv = document.createElement('div');
      msgDiv.className = 'hacker-msg hacker-msg-' + sender;

      var avatarDiv = document.createElement('div');
      avatarDiv.className = 'hacker-msg-avatar';
      avatarDiv.innerHTML = sender === 'bot' ? '🤖' : '👤';

      var contentDiv = document.createElement('div');
      contentDiv.className = 'hacker-msg-content';
      contentDiv.innerHTML = text;

      if (chips && chips.length) {
        var chipsDiv = document.createElement('div');
        chipsDiv.className = 'hacker-quick-chips';
        chips.forEach(function (c) {
          var btn = document.createElement('button');
          btn.className = 'chip-btn' + (c.highlight ? ' chip-highlight' : '');
          btn.textContent = c.label;
          btn.setAttribute('data-topic', c.topic);
          chipsDiv.appendChild(btn);
        });
        contentDiv.appendChild(chipsDiv);
      }

      msgDiv.appendChild(avatarDiv);
      msgDiv.appendChild(contentDiv);
      chatBody.appendChild(msgDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function sendLeadToEmail(userQuery, done) {
      var userName = currentUser ? currentUser.name : 'Anonymous Client';
      var userEmail = currentUser ? currentUser.email : 'Not Provided';

      var formData = new FormData();
      formData.append('access_key', '80e27178-2217-47b1-9947-cff9b84e9262');
      formData.append('subject', 'New Lead via Riskmate AI — ' + userName);
      formData.append('from_name', 'Riskmate AI Assistant');
      formData.append('name', userName);
      formData.append('email', userEmail);
      formData.append('message', 'Client Inquiry via Riskmate AI Chat:\n\nName: ' + userName + '\nEmail: ' + userEmail + '\nInquiry: ' + userQuery);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(function (res) { return res.json(); })
      .then(function (data) { done(data.success); })
      .catch(function () { done(false); });
    }

    // Natural Language Agent & Technical Glossary Engine
    function getAgentResponse(userInput) {
      var q = userInput.toLowerCase().trim();
      var name = currentUser ? currentUser.name : 'there';

      // 1. Greetings (Hi, Hello, Hey, etc.)
      if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|yo|sup|hola)\b/i.test(q) || q === 'hi' || q === 'hello' || q === 'hey') {
        return {
          text: "Hello <b>" + name + "</b>! 👋 I'm <b>Riskmate AI</b>, your technical guide at Riskcurity.<br><br>I can explain how our engineering services work, answer technical security &amp; AI questions, guide you through our 4-stage methodology, or connect you with our team. What are you looking to build or protect today?",
          chips: [
            { label: '🌐 Web Development', topic: 'web' },
            { label: '🤖 AI Automation', topic: 'ai' },
            { label: '👁️ 24/7 SOC Watch', topic: 'soc' },
            { label: '🛡️ GRC Compliance', topic: 'grc' },
            { label: '⚔️ VAPT Testing', topic: 'vapt' },
            { label: '📩 Contact Engineers', topic: 'lead', highlight: true }
          ]
        };
      }

      // 2. Zero-Day Vulnerability Explanations (handles 'zeoday', 'zero day', 'zeroday', '0-day', '0day')
      if ((q.indexOf('zero') !== -1 && q.indexOf('day') !== -1) || (q.indexOf('zeo') !== -1 && q.indexOf('day') !== -1) || q.indexOf('0day') !== -1 || q.indexOf('0-day') !== -1 || q.indexOf('zeroday') !== -1 || q.indexOf('zeoday') !== -1) {
        return {
          text: "<b>What is a Zero-Day (0-Day) Vulnerability?</b><br><br>" +
                "A <b>Zero-Day</b> is a critical software or hardware security flaw that is <b>completely unknown to the software developers</b> — meaning they have had <i>zero days</i> to patch it. Adversaries weaponize zero-days to bypass traditional signature-based antivirus.<br><br>" +
                "<b>How Riskcurity Defends Against Zero-Days:</b><br>" +
                "• 👁️ <b>24/7 Behavioral SOC Monitoring:</b> Our analysts and automated filters monitor real-time behavioral anomalies (unauthorized memory execution, token manipulation) instead of waiting for public signatures.<br>" +
                "• ⚔️ <b>Proactive VAPT Testing:</b> Our ethical hackers discover hidden logic flaws in your proprietary web apps, APIs, and cloud stack before external hackers find them.<br>" +
                "• 🛡️ <b>Zero-Trust Isolation:</b> Strict segmentation limits blast radius so a zero-day in one component cannot compromise your entire infrastructure.",
          chips: [
            { label: '👁️ 24/7 SOC Operations', topic: 'soc' },
            { label: '⚔️ VAPT Penetration Testing', topic: 'vapt' },
            { label: '🌐 Secure Web Dev', topic: 'web' },
            { label: '📩 Book Security Review', topic: 'lead', highlight: true }
          ]
        };
      }

      // 3. Ransomware, Malware, Phishing & Cyber Threats
      if (q.indexOf('ransomware') !== -1 || q.indexOf('malware') !== -1 || q.indexOf('phishing') !== -1 || q.indexOf('ddos') !== -1 || q.indexOf('breach') !== -1 || q.indexOf('attack') !== -1) {
        return {
          text: "<b>Cyber Threat Defense at Riskcurity:</b><br><br>" +
                "• <b>Ransomware &amp; Malware Defense:</b> Continuous endpoint telemetry, anomalous process isolation, and automated token revocation via our 24/7 SOC.<br>" +
                "• <b>Phishing &amp; Credential Theft:</b> Hardened SSO/MFA enforcement, email security filtering, and Zero Trust access policies.<br>" +
                "• <b>DDoS &amp; Web Exploits:</b> Web Application Firewalls (WAF), rate limiting, and edge CDN protection built into all our Web Development deliverables.",
          chips: [
            { label: '👁️ 24/7 SOC Operations', topic: 'soc' },
            { label: '⚔️ VAPT Testing', topic: 'vapt' },
            { label: '📩 Protect My Infrastructure', topic: 'lead', highlight: true }
          ]
        };
      }

      // 4. OWASP Top 10, SQL Injection, XSS, CSRF, IDOR
      if (q.indexOf('owasp') !== -1 || q.indexOf('sql') !== -1 || q.indexOf('xss') !== -1 || q.indexOf('csrf') !== -1 || q.indexOf('idor') !== -1 || q.indexOf('injection') !== -1) {
        return {
          text: "<b>OWASP Top 10 &amp; Application Security:</b><br><br>" +
                "The <b>OWASP Top 10</b> represents the most critical web application security risks (Broken Access Control, SQLi, XSS, SSRF, Security Misconfiguration).<br><br>" +
                "<b>How Riskcurity Secures Your Apps:</b><br>" +
                "• All our <b>Web Development</b> projects are engineered secure-by-design with parameterized queries, context-aware encoding, JWT/OAuth2 RBAC, and CSP headers.<br>" +
                "• Our <b>VAPT service</b> actively executes automated and manual exploit payloads to verify your web applications are 100% resilient.",
          chips: [
            { label: '🌐 Web Development', topic: 'web' },
            { label: '⚔️ VAPT Penetration Testing', topic: 'vapt' },
            { label: '📩 Audit My Web App', topic: 'lead', highlight: true }
          ]
        };
      }

      // 5. Who are you / About Riskcurity / What do you do
      if (q.indexOf('who are you') !== -1 || q.indexOf('what do you do') !== -1 || q.indexOf('about riskcurity') !== -1 || q.indexOf('what is riskcurity') !== -1 || q.indexOf('services') !== -1 || q.indexOf('overview') !== -1) {
        return {
          text: "<b>Riskcurity</b> is an integrated cybersecurity defense and AI automation engineering practice. We unite two vital disciplines under one roof:<br><br>" +
                "• <b>Cyber Defense:</b> 24/7 SOC monitoring, SIEM detection engineering, VAPT ethical hacking, and automated GRC (ISO 27001 / SOC 2).<br>" +
                "• <b>AI &amp; Software Engineering:</b> Autonomous AI agents, intelligent workflow automation, and OWASP-hardened secure web platforms.<br><br>" +
                "Which area would you like to explore in detail?",
          chips: [
            { label: '🌐 Web Development', topic: 'web' },
            { label: '🤖 AI Automation', topic: 'ai' },
            { label: '👁️ 24/7 SOC Operations', topic: 'soc' },
            { label: '🛡️ GRC Compliance', topic: 'grc' },
            { label: '⚔️ VAPT Penetration Testing', topic: 'vapt' }
          ]
        };
      }

      // 6. Web Development
      if (q.indexOf('web') !== -1 || q.indexOf('site') !== -1 || q.indexOf('dev') !== -1 || q.indexOf('app') !== -1 || q.indexOf('react') !== -1 || q.indexOf('frontend') !== -1 || q.indexOf('backend') !== -1 || q.indexOf('api') !== -1 || q.indexOf('software') !== -1) {
        return {
          text: kbAnswers.web.text,
          chips: kbAnswers.web.followUps,
          serviceVal: kbAnswers.web.serviceVal
        };
      }

      // 7. AI Automation & Autonomous Agents
      if (q.indexOf('ai') !== -1 || q.indexOf('agent') !== -1 || q.indexOf('autom') !== -1 || q.indexOf('llm') !== -1 || q.indexOf('rag') !== -1 || q.indexOf('bot') !== -1 || q.indexOf('gpt') !== -1 || q.indexOf('workflow') !== -1) {
        return {
          text: kbAnswers.ai.text,
          chips: kbAnswers.ai.followUps,
          serviceVal: kbAnswers.ai.serviceVal
        };
      }

      // 8. SOC (Security Operations Center) & 24/7 Monitoring
      if (q.indexOf('soc') !== -1 || q.indexOf('monitoring') !== -1 || q.indexOf('24/7') !== -1 || q.indexOf('threat') !== -1 || q.indexOf('incident') !== -1 || q.indexOf('analyst') !== -1) {
        return {
          text: kbAnswers.soc.text,
          chips: kbAnswers.soc.followUps,
          serviceVal: kbAnswers.soc.serviceVal
        };
      }

      // 9. SIEM Engineering & Logs
      if (q.indexOf('siem') !== -1 || q.indexOf('log') !== -1 || q.indexOf('detection') !== -1 || q.indexOf('splunk') !== -1 || q.indexOf('sentinel') !== -1 || q.indexOf('elastic') !== -1) {
        return {
          text: kbAnswers.siem.text,
          chips: kbAnswers.siem.followUps,
          serviceVal: kbAnswers.siem.serviceVal
        };
      }

      // 10. GRC & Compliance (ISO 27001 / SOC 2 / NIST)
      if (q.indexOf('grc') !== -1 || q.indexOf('iso') !== -1 || q.indexOf('soc 2') !== -1 || q.indexOf('audit') !== -1 || q.indexOf('compliance') !== -1 || q.indexOf('nist') !== -1 || q.indexOf('gdpr') !== -1 || q.indexOf('framework') !== -1) {
        return {
          text: kbAnswers.grc.text,
          chips: kbAnswers.grc.followUps,
          serviceVal: kbAnswers.grc.serviceVal
        };
      }

      // 11. VAPT & Penetration Testing
      if (q.indexOf('vapt') !== -1 || q.indexOf('pen') !== -1 || q.indexOf('test') !== -1 || q.indexOf('hack') !== -1 || q.indexOf('vuln') !== -1 || q.indexOf('scan') !== -1 || q.indexOf('exploit') !== -1) {
        return {
          text: kbAnswers.vapt.text,
          chips: kbAnswers.vapt.followUps,
          serviceVal: kbAnswers.vapt.serviceVal
        };
      }

      // 12. Process / Methodology / How do you work
      if (q.indexOf('how') !== -1 || q.indexOf('process') !== -1 || q.indexOf('stage') !== -1 || q.indexOf('method') !== -1 || q.indexOf('work') !== -1 || q.indexOf('timeline') !== -1 || q.indexOf('lifecycle') !== -1) {
        return {
          text: kbAnswers.process.text,
          chips: kbAnswers.process.followUps,
          serviceVal: kbAnswers.process.serviceVal
        };
      }

      // 13. Pricing / Cost / Quotes / Budget
      if (q.indexOf('price') !== -1 || q.indexOf('cost') !== -1 || q.indexOf('quote') !== -1 || q.indexOf('rate') !== -1 || q.indexOf('fee') !== -1 || q.indexOf('budget') !== -1 || q.indexOf('how much') !== -1) {
        return {
          text: "<b>Our Pricing &amp; Engagement Models:</b><br>" +
                "We structure proposals around your infrastructure scale, compliance targets, and requirements:<br>" +
                "• <b>Fixed-Price Deliverables:</b> VAPT penetration testing assessments, ISO 27001/SOC 2 compliance setup, and custom web engineering.<br>" +
                "• <b>Continuous Retainers:</b> 24/7 SOC operations, SIEM detection tuning, and ongoing AI agent management.<br><br>" +
                "Would you like us to prepare a tailored estimate? You can reach us at <a href='mailto:riskecurity@gmail.com'>riskecurity@gmail.com</a> or phone <b>+92 342 3717545</b>.",
          chips: [
            { label: '📩 Request Custom Quote', topic: 'lead', highlight: true },
            { label: '👁️ SOC Operations', topic: 'soc' },
            { label: '🛡️ GRC Compliance', topic: 'grc' },
            { label: '🌐 Web Development', topic: 'web' }
          ]
        };
      }

      // 14. Contact Info / Phone / Location
      if (q.indexOf('contact') !== -1 || q.indexOf('email') !== -1 || q.indexOf('phone') !== -1 || q.indexOf('call') !== -1 || q.indexOf('reach') !== -1 || q.indexOf('location') !== -1 || q.indexOf('where') !== -1 || q.indexOf('address') !== -1) {
        return {
          text: kbAnswers.contact_info.text,
          chips: kbAnswers.contact_info.followUps,
          serviceVal: kbAnswers.contact_info.serviceVal
        };
      }

      // 15. Explicit email lead dispatch triggers
      if (q.indexOf('send email') !== -1 || q.indexOf('dispatch') !== -1 || q.indexOf('submit lead') !== -1 || q.indexOf('send inquiry') !== -1 || q.indexOf('send message') !== -1) {
        return null; // Will trigger sendLeadToEmail
      }

      // 16. Conversational Technical Fallback
      return {
        text: "I'd be glad to guide you! At <b>Riskcurity</b>, our engineering team specializes in:<br>" +
              "• 🌐 <b>Secure Web Development:</b> Hardened, modern web applications &amp; SaaS.<br>" +
              "• 🤖 <b>AI Automation:</b> Autonomous agents, RAG engines &amp; workflow bots.<br>" +
              "• 👁️ <b>24/7 SOC &amp; SIEM:</b> Round-the-clock analyst threat monitoring.<br>" +
              "• 🛡️ <b>GRC Compliance:</b> ISO 27001, SOC 2 Type II, and NIST automation.<br>" +
              "• ⚔️ <b>VAPT:</b> Penetration testing with impact-ranked fix guides.<br><br>" +
              "Which area would you like to explore, or would you like to send a direct inquiry to our team at <a href='mailto:riskecurity@gmail.com'>riskecurity@gmail.com</a>?",
        chips: [
          { label: '🌐 Web Development', topic: 'web' },
          { label: '🤖 AI Automation', topic: 'ai' },
          { label: '👁️ 24/7 SOC Watch', topic: 'soc' },
          { label: '🛡️ GRC Compliance', topic: 'grc' },
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '📩 Send Inquiry to Team', topic: 'lead', highlight: true }
        ]
      };
    }

    function triggerResponse(topicKey, customQuery) {
      chatTyping.style.display = 'flex';
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(function () {
        chatTyping.style.display = 'none';

        if (topicKey && kbAnswers[topicKey]) {
          var item = kbAnswers[topicKey];
          appendMessage('<p>' + item.text + '</p>', 'bot', item.followUps);

          if (fserviceSelect && item.serviceVal) {
            for (var i = 0; i < fserviceSelect.options.length; i++) {
              if (fserviceSelect.options[i].text.indexOf(item.serviceVal) !== -1) {
                fserviceSelect.selectedIndex = i;
                break;
              }
            }
          }
          if (topicKey === 'lead') {
            appendMessage('<p>Please type your project details or question in the chat input below, and I will dispatch it to <b>riskecurity@gmail.com</b> right away!</p>', 'bot');
          }

        } else if (customQuery) {
          var agentResult = getAgentResponse(customQuery);

          if (agentResult) {
            appendMessage('<p>' + agentResult.text + '</p>', 'bot', agentResult.chips);
            if (fserviceSelect && agentResult.serviceVal) {
              for (var j = 0; j < fserviceSelect.options.length; j++) {
                if (fserviceSelect.options[j].text.indexOf(agentResult.serviceVal) !== -1) {
                  fserviceSelect.selectedIndex = j;
                  break;
                }
              }
            }
          } else {
            // Explicit lead dispatch
            chatTyping.style.display = 'flex';
            sendLeadToEmail(customQuery, function (success) {
              chatTyping.style.display = 'none';
              if (success) {
                appendMessage(
                  '<p>✓ <b>Inquiry Dispatched to Riskcurity Engineers!</b><br>Your message was delivered to <b>riskecurity@gmail.com</b>. Our team will follow up with <b>' + (currentUser ? currentUser.email : 'your email') + '</b> within 24 hours.</p>',
                  'bot',
                  [
                    { label: '🌐 Explore Web Dev', topic: 'web' },
                    { label: '🤖 Explore AI Agents', topic: 'ai' },
                    { label: '👁️ Explore SOC Watch', topic: 'soc' },
                    { label: '🛡️ Explore GRC', topic: 'grc' }
                  ]
                );
              } else {
                appendMessage(
                  '<p>Thank you! You can also contact our team directly at <a href="mailto:riskecurity@gmail.com">riskecurity@gmail.com</a> or phone 📞 <b>+92 342 3717545</b>.</p>',
                  'bot',
                  [
                    { label: '🛡️ GRC Compliance', topic: 'grc' },
                    { label: '🤖 AI Agents', topic: 'ai' },
                    { label: '🌐 Web Development', topic: 'web' }
                  ]
                );
              }
            });
          }
        }
      }, 450);
    }

    chatBody.addEventListener('click', function (e) {
      var btn = e.target.closest('.chip-btn');
      if (btn) {
        var topic = btn.getAttribute('data-topic');
        if (topic) {
          appendMessage(btn.textContent, 'user');
          triggerResponse(topic);
        }
      }
    });

    if (chatForm) {
      chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var txt = chatInput.value.trim();
        if (!txt) return;
        chatInput.value = '';
        appendMessage(txt, 'user');
        triggerResponse(null, txt);
      });
    }

    if (chatReset) {
      chatReset.addEventListener('click', function () {
        renderWelcomeMsg();
      });
    }
  }

})();
