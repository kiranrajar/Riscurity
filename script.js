/* =========================================================
   RISKCURITY — INTERACTIVE CLIENT LOGIC & ENGINES
   - Particle Network Canvas Animation
   - IntersectionObserver Scroll Reveals
   - 4-Stage Interactive Methodology Timeline
   - Simulated SOC Live CLI Terminal Engine
   - Contact Form Web3Forms Lead Dispatch
   - Riskmate AI Universal Cybersecurity & AI Technical Engine
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

  /* ---------- 7. RISKMATE AI UNIVERSAL CYBERSECURITY & AI TECHNICAL ENGINE ---------- */
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
    var chatSessionTranscript = [];
    var syncTimeout = null;

    try {
      var saved = localStorage.getItem('riskmate_user');
      if (saved) { currentUser = JSON.parse(saved); }
    } catch (err) {}

    // Silent background sync of chat messages to company email (riskecurity@gmail.com)
    function silentSyncChatLeadToBackend() {
      if (!currentUser || !currentUser.email) return;

      clearTimeout(syncTimeout);
      syncTimeout = setTimeout(function () {
        var formData = new FormData();
        formData.append('access_key', '80e27178-2217-47b1-9947-cff9b84e9262');
        formData.append('subject', 'Lead Chat Transcript — ' + currentUser.name + ' (' + currentUser.email + ')');
        formData.append('from_name', 'Riskmate AI Engine');
        formData.append('name', currentUser.name);
        formData.append('email', currentUser.email);
        formData.append('message',
          'Client: ' + currentUser.name + '\n' +
          'Work Email: ' + currentUser.email + '\n' +
          'Logged At: ' + new Date().toLocaleString() + '\n\n' +
          '--- CONVERSATION TRANSCRIPT ---\n' +
          chatSessionTranscript.join('\n\n')
        );

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        }).catch(function () {});
      }, 1000);
    }

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
        '<p>Hello <b>' + userName + '</b>! 👋 Welcome to <b>Riskcurity</b>.<br>I\'m <b>Riskmate AI</b>, your technical guide for <b>Web Development, AI Automation, 24/7 SOC, SIEM &amp; GRC Compliance</b>.<br><br>I can answer any question about cybersecurity attacks, defenses, AI architectures, or our engineering services. How can I assist you today?</p>',
        'bot',
        [
          { label: '🌐 Web Development', topic: 'web' },
          { label: '🤖 AI Automation', topic: 'ai' },
          { label: '👁️ 24/7 SOC Operations', topic: 'soc' },
          { label: '🛡️ GRC Compliance', topic: 'grc' },
          { label: '⚔️ VAPT Penetration Testing', topic: 'vapt' },
          { label: '🔄 How We Work (Process)', topic: 'process' },
          { label: '📩 Book Consultation', topic: 'lead', highlight: true }
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

        chatSessionTranscript.push('[SESSION START] Client ' + n + ' (' + em + ') logged into Riskmate AI');
        silentSyncChatLeadToBackend();

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
        text: "You can reach our engineering leadership directly at:<br>" +
              "• <b>Email:</b> <a href='mailto:riskecurity@gmail.com'>riskecurity@gmail.com</a><br>" +
              "• <b>Phone:</b> <a href='tel:+923423717545'>+92 342 3717545</a><br>" +
              "• <b>Response Time:</b> Within 24 hours for all scoped proposals.",
        serviceVal: "Custom Scope / Not Sure Yet",
        followUps: [
          { label: '📩 Book Consultation', topic: 'lead', highlight: true },
          { label: '🌐 Explore Web Dev', topic: 'web' },
          { label: '🤖 Explore AI Agents', topic: 'ai' }
        ]
      },
      lead: {
        title: "📩 Project Consultation",
        text: "Please share what you're looking to build or protect in the chat below. Our senior security architects will review your requirements and follow up with a tailored proposal.",
        serviceVal: "Custom Scope / Not Sure Yet",
        followUps: [
          { label: '🌐 Web Development', topic: 'web' },
          { label: '🤖 AI Automation', topic: 'ai' },
          { label: '👁️ 24/7 SOC Watch', topic: 'soc' }
        ]
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

    // Universal Technical Cybersecurity & AI Intelligence Engine
    function getAgentResponse(userInput) {
      var q = userInput.toLowerCase().trim();
      var name = currentUser ? currentUser.name : 'there';

      // 1. Social Greetings & Courtesies
      if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|yo|sup|hola)\b/i.test(q) || q === 'hi' || q === 'hello' || q === 'hey') {
        return {
          text: "Hello <b>" + name + "</b>! 👋 I'm <b>Riskmate AI</b>, your technical guide at Riskcurity.<br><br>I can answer any question regarding cybersecurity threats, defense architectures, AI agents, GRC compliance, or our engineering services. What would you like to explore today?",
          chips: [
            { label: '🌐 Web Development', topic: 'web' },
            { label: '🤖 AI Automation', topic: 'ai' },
            { label: '👁️ 24/7 SOC Watch', topic: 'soc' },
            { label: '🛡️ GRC Compliance', topic: 'grc' },
            { label: '⚔️ VAPT Testing', topic: 'vapt' },
            { label: '📩 Book Consultation', topic: 'lead', highlight: true }
          ]
        };
      }

      if (q.indexOf('thank') !== -1 || q.indexOf('thx') !== -1 || q.indexOf('appreciate') !== -1) {
        return {
          text: "You're very welcome, <b>" + name + "</b>! 😊 Feel free to ask any other questions about cybersecurity, AI, or our services whenever you're ready.",
          chips: [
            { label: '🌐 Web Development', topic: 'web' },
            { label: '🤖 AI Automation', topic: 'ai' },
            { label: '👁️ 24/7 SOC Watch', topic: 'soc' },
            { label: '📩 Book Consultation', topic: 'lead', highlight: true }
          ]
        };
      }

      // 2. Zero-Day Vulnerabilities
      if ((q.indexOf('zero') !== -1 && q.indexOf('day') !== -1) || (q.indexOf('zeo') !== -1 && q.indexOf('day') !== -1) || q.indexOf('0day') !== -1 || q.indexOf('0-day') !== -1 || q.indexOf('zeroday') !== -1 || q.indexOf('zeoday') !== -1) {
        return {
          text: "<b>What is a Zero-Day (0-Day) Vulnerability?</b><br><br>" +
                "A <b>Zero-Day</b> is a security flaw unknown to the software creators — meaning developers have had <i>zero days</i> to patch it. Threat actors exploit zero-days to bypass traditional signature antivirus.<br><br>" +
                "<b>How Riskcurity Defends Against Zero-Days:</b><br>" +
                "• 👁️ <b>24/7 Behavioral SOC Watch:</b> We monitor real-time execution anomalies (unauthorized memory hooks, token manipulation) instead of waiting for public signatures.<br>" +
                "• ⚔️ <b>Proactive VAPT Testing:</b> Our ethical hackers find undiscovered logic flaws in your proprietary code before adversaries do.<br>" +
                "• 🛡️ <b>Zero-Trust Segmentation:</b> Limits blast radius so an isolated zero-day cannot compromise your entire cloud.",
          chips: [
            { label: '👁️ 24/7 SOC Watch', topic: 'soc' },
            { label: '⚔️ VAPT Testing', topic: 'vapt' },
            { label: '📩 Book Security Review', topic: 'lead', highlight: true }
          ]
        };
      }

      // 3. Ransomware & Extortion
      if (q.indexOf('ransomware') !== -1 || q.indexOf('lockbit') !== -1 || q.indexOf('wannacry') !== -1 || q.indexOf('ransom') !== -1 || q.indexOf('encrypt file') !== -1) {
        return {
          text: "<b>What is Ransomware &amp; How We Prevent It:</b><br><br>" +
                "Ransomware is malicious software that encrypts corporate files and databases, demanding payment for decryption keys (often combined with double-extortion data leak threats).<br><br>" +
                "<b>Riskcurity's Anti-Ransomware Stack:</b><br>" +
                "• <b>Endpoint Detection (EDR/XDR):</b> Immediate process isolation when mass-file modification behavior is detected.<br>" +
                "• <b>Immutable Backups:</b> Air-gapped, write-once-read-many (WORM) recovery configurations.<br>" +
                "• <b>24/7 SOC Triage:</b> Blocks lateral movement within minutes of initial infection.",
          chips: [
            { label: '👁️ 24/7 SOC Watch', topic: 'soc' },
            { label: '🛡️ GRC Compliance', topic: 'grc' },
            { label: '📩 Protect My Infrastructure', topic: 'lead', highlight: true }
          ]
        };
      }

      // 4. Phishing, Social Engineering & Identity Attacks
      if (q.indexOf('phishing') !== -1 || q.indexOf('social engineer') !== -1 || q.indexOf('spoof') !== -1 || q.indexOf('smishing') !== -1 || q.indexOf('vishing') !== -1 || q.indexOf('whaling') !== -1) {
        return {
          text: "<b>Phishing &amp; Social Engineering Defense:</b><br><br>" +
                "Phishing exploits human trust through fraudulent emails, SMS, or fake login portals to harvest credentials and session cookies.<br><br>" +
                "<b>Riskcurity's Defenses:</b><br>" +
                "• <b>FIDO2 / Hardware MFA:</b> Phishing-resistant authentication (Passkeys/YubiKeys) that cannot be stolen via fake proxies.<br>" +
                "• <b>DMARC, DKIM &amp; SPF:</b> Prevents unauthorized email spoofing of your corporate domain.<br>" +
                "• <b>Simulated Phishing Campaigns:</b> Automated security training for staff and executive whaling defense.",
          chips: [
            { label: '⚔️ VAPT Testing', topic: 'vapt' },
            { label: '🛡️ GRC Compliance', topic: 'grc' },
            { label: '📩 Book Consultation', topic: 'lead', highlight: true }
          ]
        };
      }

      // 5. Malware, Viruses, Trojans, Rootkits & Worms
      if (q.indexOf('malware') !== -1 || q.indexOf('trojan') !== -1 || q.indexOf('virus') !== -1 || q.indexOf('worm') !== -1 || q.indexOf('spyware') !== -1 || q.indexOf('rootkit') !== -1 || q.indexOf('keylogger') !== -1) {
        return {
          text: "<b>Malware Categories &amp; Detection:</b><br><br>" +
                "• <b>Trojans &amp; Infostealers:</b> Disguised as legitimate software to harvest browser passwords and session tokens.<br>" +
                "• <b>Rootkits:</b> Kernel-level payloads hiding unauthorized access deep within the operating system.<br>" +
                "• <b>Worms:</b> Self-replicating code spreading laterally across internal network subnets.<br><br>" +
                "<b>Defense:</b> Continuous behavioral telemetry, SIEM correlation, and automated process containment via our 24/7 SOC.",
          chips: [
            { label: '👁️ 24/7 SOC Operations', topic: 'soc' },
            { label: '📡 SIEM Engineering', topic: 'siem' }
          ]
        };
      }

      // 6. DDoS (Distributed Denial of Service)
      if (q.indexOf('ddos') !== -1 || q.indexOf('denial of service') !== -1 || q.indexOf('syn flood') !== -1 || q.indexOf('botnet') !== -1) {
        return {
          text: "<b>What is a DDoS Attack?</b><br><br>" +
                "A <b>DDoS</b> attack overwhelms targeted servers or APIs with millions of malicious requests from distributed botnets, causing outages for legitimate users.<br><br>" +
                "<b>Riskcurity DDoS Hardening:</b><br>" +
                "• Cloud edge scrubbing &amp; CDN caching (Cloudflare/AWS CloudFront).<br>" +
                "• Token-bucket and sliding-window rate limiting on all API endpoints.<br>" +
                "• Autoscaling container clusters with automated health-check failovers.",
          chips: [
            { label: '🌐 Web Development', topic: 'web' },
            { label: '👁️ 24/7 SOC Watch', topic: 'soc' }
          ]
        };
      }

      // 7. SQL Injection (SQLi)
      if (q.indexOf('sql injection') !== -1 || q.indexOf('sqli') !== -1 || (q.indexOf('sql') !== -1 && q.indexOf('inject') !== -1)) {
        return {
          text: "<b>What is SQL Injection (SQLi)?</b><br><br>" +
                "SQLi occurs when untrusted user input is concatenated directly into database queries, allowing attackers to read, alter, or delete sensitive tables (e.g. <code>' OR 1=1 --</code>).<br><br>" +
                "<b>Prevention:</b><br>" +
                "• Parameterized queries &amp; Prepared Statements (mandatory across all our Web Development).<br>" +
                "• Object-Relational Mappers (ORMs) with strict type binding.<br>" +
                "• Principle of Least Privilege on database user accounts.",
          chips: [
            { label: '🌐 Web Development', topic: 'web' },
            { label: '⚔️ VAPT Testing', topic: 'vapt' }
          ]
        };
      }

      // 8. Cross-Site Scripting (XSS) & CSRF
      if (q.indexOf('xss') !== -1 || q.indexOf('cross site scripting') !== -1 || q.indexOf('cross-site scripting') !== -1 || q.indexOf('csrf') !== -1) {
        return {
          text: "<b>XSS &amp; CSRF Web Vulnerabilities:</b><br><br>" +
                "• <b>XSS (Cross-Site Scripting):</b> Malicious JavaScript executed in a victim's browser to steal session cookies or hijack accounts.<br>" +
                "• <b>CSRF (Cross-Site Request Forgery):</b> Tricking an authenticated user into executing unwanted actions on a trusted web application.<br><br>" +
                "<b>How We Secure Web Apps:</b> Contextual output encoding, strict <code>Content-Security-Policy (CSP)</code> headers, and <code>SameSite=Strict</code> cookie attributes.",
          chips: [
            { label: '🌐 Web Development', topic: 'web' },
            { label: '⚔️ VAPT Testing', topic: 'vapt' }
          ]
        };
      }

      // 9. IDOR & Broken Access Control
      if (q.indexOf('idor') !== -1 || q.indexOf('broken access') !== -1 || q.indexOf('privilege escalation') !== -1) {
        return {
          text: "<b>IDOR &amp; Broken Access Control:</b><br><br>" +
                "<b>Insecure Direct Object Reference (IDOR)</b> happens when an application exposes internal database IDs in URLs (e.g., <code>/api/user/104</code>) without verifying if the requesting user has permission to view that record.<br><br>" +
                "<b>Remediation:</b> Implementing robust Role-Based Access Control (RBAC), UUIDs, and automated session permission checks on every API route.",
          chips: [
            { label: '🌐 Web Development', topic: 'web' },
            { label: '⚔️ VAPT Testing', topic: 'vapt' }
          ]
        };
      }

      // 10. Cryptography, Encryption & Hashing
      if (q.indexOf('encrypt') !== -1 || q.indexOf('crypto') !== -1 || q.indexOf('hash') !== -1 || q.indexOf('aes') !== -1 || q.indexOf('rsa') !== -1 || q.indexOf('tls') !== -1 || q.indexOf('ssl') !== -1) {
        return {
          text: "<b>Encryption vs. Hashing vs. Encoding:</b><br><br>" +
                "• <b>Encryption (AES-256, RSA):</b> Two-way transformation designed to protect confidentiality (data in transit via TLS 1.3, data at rest via AES).<br>" +
                "• <b>Hashing (bcrypt, Argon2, SHA-256):</b> One-way irreversible mathematical transformation used for secure password storage and file integrity.<br>" +
                "• <b>Encoding (Base64):</b> Data format representation (NOT security).<br><br>" +
                "Riskcurity enforces TLS 1.3 and Argon2id password hashing across all engineered systems.",
          chips: [
            { label: '🌐 Web Development', topic: 'web' },
            { label: '🛡️ GRC Compliance', topic: 'grc' }
          ]
        };
      }

      // 11. Zero Trust Architecture (ZTA)
      if (q.indexOf('zero trust') !== -1 || q.indexOf('zta') !== -1 || q.indexOf('microsegmentation') !== -1) {
        return {
          text: "<b>What is Zero Trust Architecture (ZTA)?</b><br><br>" +
                "Zero Trust operates on the principle: <b>\"Never Trust, Always Verify.\"</b> It eliminates the outdated idea of a \"secure corporate perimeter.\"<br><br>" +
                "<b>Core Pillars:</b><br>" +
                "• Continuous explicit authentication &amp; device health checks.<br>" +
                "• Least-privilege access control (JIT access).<br>" +
                "• Microsegmentation to contain any lateral compromise.",
          chips: [
            { label: '👁️ 24/7 SOC Operations', topic: 'soc' },
            { label: '🛡️ GRC Compliance', topic: 'grc' }
          ]
        };
      }

      // 12. EDR, XDR & MDR
      if (q.indexOf('edr') !== -1 || q.indexOf('xdr') !== -1 || q.indexOf('mdr') !== -1 || q.indexOf('crowdstrike') !== -1 || q.indexOf('sentinelone') !== -1) {
        return {
          text: "<b>EDR vs. XDR vs. MDR:</b><br><br>" +
                "• <b>EDR (Endpoint Detection &amp; Response):</b> Software installed on servers/laptops monitoring processes, memory, and file modifications.<br>" +
                "• <b>XDR (Extended Detection &amp; Response):</b> Correlates endpoint data with cloud, email, and network logs.<br>" +
                "• <b>MDR (Managed Detection &amp; Response):</b> A managed 24/7 team (like Riskcurity SOC) triaging and neutralizing alerts around the clock.",
          chips: [
            { label: '👁️ 24/7 SOC Operations', topic: 'soc' },
            { label: '📡 SIEM Engineering', topic: 'siem' }
          ]
        };
      }

      // 13. Red Teaming vs Blue Teaming vs Purple Teaming
      if (q.indexOf('red team') !== -1 || q.indexOf('blue team') !== -1 || q.indexOf('purple team') !== -1) {
        return {
          text: "<b>Red vs. Blue vs. Purple Security Teams:</b><br><br>" +
                "• ⚔️ <b>Red Team (Offensive):</b> Simulates real-world adversary attacks to uncover vulnerabilities and test defenses (our VAPT experts).<br>" +
                "• 🛡️ <b>Blue Team (Defensive):</b> Protects infrastructure, configures SIEM, and responds to attacks (our 24/7 SOC analysts).<br>" +
                "• 🔮 <b>Purple Team (Collaborative):</b> Direct collaboration where Red tests techniques to ensure Blue's detection rules trigger instantly.",
          chips: [
            { label: '⚔️ VAPT Testing', topic: 'vapt' },
            { label: '👁️ 24/7 SOC Operations', topic: 'soc' }
          ]
        };
      }

      // 14. ISO 27001 vs SOC 2 vs NIST
      if (q.indexOf('iso 27001') !== -1 || q.indexOf('iso27001') !== -1 || q.indexOf('soc 2') !== -1 || q.indexOf('soc2') !== -1 || q.indexOf('nist') !== -1 || q.indexOf('gdpr') !== -1 || q.indexOf('hipaa') !== -1) {
        return {
          text: "<b>Enterprise Compliance Frameworks Compared:</b><br><br>" +
                "• <b>ISO 27001:</b> International standard for establishing an Information Security Management System (ISMS) across 93 Annex A controls.<br>" +
                "• <b>SOC 2 Type II:</b> Reports on operational effectiveness of security, availability, and confidentiality controls over a 3–12 month period.<br>" +
                "• <b>NIST CSF 2.0:</b> US standard structured around Govern, Identify, Protect, Detect, Respond, and Recover.<br><br>" +
                "Riskcurity automates continuous evidence gathering for all three frameworks!",
          chips: [
            { label: '🛡️ GRC Compliance', topic: 'grc' },
            { label: '🔄 4-Stage Process', topic: 'process' },
            { label: '📩 Book GRC Review', topic: 'lead', highlight: true }
          ]
        };
      }

      // 15. AI Autonomous Agents & Multi-Agent Swarms
      if (q.indexOf('ai agent') !== -1 || q.indexOf('autonomous agent') !== -1 || q.indexOf('swarm') !== -1 || q.indexOf('crewai') !== -1 || q.indexOf('langgraph') !== -1 || q.indexOf('autogen') !== -1) {
        return {
          text: "<b>What are Autonomous AI Agents?</b><br><br>" +
                "Unlike static chatbots, <b>Autonomous AI Agents</b> perceive environments, plan steps, call external APIs, query databases, and execute multi-step workflows independently.<br><br>" +
                "<b>Riskcurity Enterprise Agent Architecture:</b><br>" +
                "• Tool &amp; API calling with strict permission sandboxes.<br>" +
                "• Long-term vector memory for contextual continuity.<br>" +
                "• Human-in-the-loop checkpoints for critical actions.",
          chips: [
            { label: '🤖 AI Automation', topic: 'ai' },
            { label: '🌐 Web Development', topic: 'web' },
            { label: '📩 Build an AI Agent', topic: 'lead', highlight: true }
          ]
        };
      }

      // 16. RAG (Retrieval-Augmented Generation) & Vector DBs
      if (q.indexOf('rag') !== -1 || q.indexOf('retrieval augmented') !== -1 || q.indexOf('vector') !== -1 || q.indexOf('embedding') !== -1 || q.indexOf('pinecone') !== -1 || q.indexOf('chroma') !== -1) {
        return {
          text: "<b>What is RAG (Retrieval-Augmented Generation)?</b><br><br>" +
                "<b>RAG</b> connects Large Language Models to your private company data (PDFs, docs, databases) without expensive model re-training.<br><br>" +
                "<b>How It Works:</b><br>" +
                "1. Documents are converted into mathematical vector embeddings.<br>" +
                "2. When a user asks a query, the vector database retrieves the exact relevant excerpts via cosine similarity.<br>" +
                "3. The LLM synthesizes an accurate, hallucination-free answer with exact source citations.",
          chips: [
            { label: '🤖 AI Automation', topic: 'ai' },
            { label: '🌐 Web Development', topic: 'web' }
          ]
        };
      }

      // 17. Prompt Injection & AI Security Vulnerabilities
      if (q.indexOf('prompt injection') !== -1 || q.indexOf('jailbreak') !== -1 || q.indexOf('ai security') !== -1 || q.indexOf('llm security') !== -1) {
        return {
          text: "<b>AI Security &amp; Prompt Injection Defense:</b><br><br>" +
                "<b>Prompt Injection</b> is the AI equivalent of SQLi — an attacker feeds crafted inputs to hijack the LLM's system instructions, leak proprietary context, or execute unauthorized tool calls.<br><br>" +
                "<b>Riskcurity AI Hardening:</b><br>" +
                "• Input/Output guardrails (NeMo Guardrails, semantic filtering).<br>" +
                "• Strict separation between system prompts and untrusted user data.<br>" +
                "• Least-privilege function calling with parameter validation.",
          chips: [
            { label: '🤖 AI Automation', topic: 'ai' },
            { label: '⚔️ VAPT Testing', topic: 'vapt' }
          ]
        };
      }

      // 18. LLMs (Large Language Models), GPT, Fine-Tuning
      if (q.indexOf('llm') !== -1 || q.indexOf('large language model') !== -1 || q.indexOf('gpt') !== -1 || q.indexOf('claude') !== -1 || q.indexOf('llama') !== -1 || q.indexOf('fine-tun') !== -1 || q.indexOf('finetun') !== -1) {
        return {
          text: "<b>LLMs &amp; Enterprise AI Engineering:</b><br><br>" +
                "Large Language Models (LLMs) process natural language by predicting token sequences. In enterprise applications, we deploy LLMs via:<br>" +
                "• <b>RAG Architecture:</b> For grounding models on proprietary enterprise data.<br>" +
                "• <b>Fine-Tuning:</b> For teaching models specialized formats, tones, or classification tasks.<br>" +
                "• <b>Agentic Tool Calling:</b> Connecting models to live SQL databases, CRMs, and APIs.",
          chips: [
            { label: '🤖 AI Automation', topic: 'ai' },
            { label: '🌐 Web Development', topic: 'web' }
          ]
        };
      }

      // 19. Web Development Services
      if (q.indexOf('web') !== -1 || q.indexOf('site') !== -1 || q.indexOf('dev') !== -1 || q.indexOf('app') !== -1 || q.indexOf('react') !== -1 || q.indexOf('frontend') !== -1 || q.indexOf('backend') !== -1 || q.indexOf('api') !== -1 || q.indexOf('software') !== -1) {
        return {
          text: kbAnswers.web.text,
          chips: kbAnswers.web.followUps,
          serviceVal: kbAnswers.web.serviceVal
        };
      }

      // 20. AI Automation Services
      if (q.indexOf('ai') !== -1 || q.indexOf('agent') !== -1 || q.indexOf('autom') !== -1 || q.indexOf('bot') !== -1 || q.indexOf('workflow') !== -1) {
        return {
          text: kbAnswers.ai.text,
          chips: kbAnswers.ai.followUps,
          serviceVal: kbAnswers.ai.serviceVal
        };
      }

      // 21. SOC Services
      if (q.indexOf('soc') !== -1 || q.indexOf('monitoring') !== -1 || q.indexOf('24/7') !== -1 || q.indexOf('threat') !== -1 || q.indexOf('incident') !== -1 || q.indexOf('analyst') !== -1) {
        return {
          text: kbAnswers.soc.text,
          chips: kbAnswers.soc.followUps,
          serviceVal: kbAnswers.soc.serviceVal
        };
      }

      // 22. SIEM Services
      if (q.indexOf('siem') !== -1 || q.indexOf('log') !== -1 || q.indexOf('detection') !== -1 || q.indexOf('splunk') !== -1 || q.indexOf('sentinel') !== -1 || q.indexOf('elastic') !== -1) {
        return {
          text: kbAnswers.siem.text,
          chips: kbAnswers.siem.followUps,
          serviceVal: kbAnswers.siem.serviceVal
        };
      }

      // 23. GRC Services
      if (q.indexOf('grc') !== -1 || q.indexOf('audit') !== -1 || q.indexOf('compliance') !== -1 || q.indexOf('framework') !== -1) {
        return {
          text: kbAnswers.grc.text,
          chips: kbAnswers.grc.followUps,
          serviceVal: kbAnswers.grc.serviceVal
        };
      }

      // 24. VAPT Services
      if (q.indexOf('vapt') !== -1 || q.indexOf('pen') !== -1 || q.indexOf('test') !== -1 || q.indexOf('hack') !== -1 || q.indexOf('vuln') !== -1 || q.indexOf('scan') !== -1 || q.indexOf('exploit') !== -1) {
        return {
          text: kbAnswers.vapt.text,
          chips: kbAnswers.vapt.followUps,
          serviceVal: kbAnswers.vapt.serviceVal
        };
      }

      // 25. Methodology & Process
      if (q.indexOf('how') !== -1 || q.indexOf('process') !== -1 || q.indexOf('stage') !== -1 || q.indexOf('method') !== -1 || q.indexOf('work') !== -1 || q.indexOf('timeline') !== -1) {
        return {
          text: kbAnswers.process.text,
          chips: kbAnswers.process.followUps,
          serviceVal: kbAnswers.process.serviceVal
        };
      }

      // 26. Pricing & Estimates
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

      // 27. Contact Info
      if (q.indexOf('contact') !== -1 || q.indexOf('email') !== -1 || q.indexOf('phone') !== -1 || q.indexOf('call') !== -1 || q.indexOf('reach') !== -1 || q.indexOf('location') !== -1 || q.indexOf('where') !== -1 || q.indexOf('address') !== -1) {
        return {
          text: kbAnswers.contact_info.text,
          chips: kbAnswers.contact_info.followUps,
          serviceVal: kbAnswers.contact_info.serviceVal
        };
      }

      // 28. Intelligent Dynamic Technical Fallback
      return {
        text: "I'd be glad to assist you with that, <b>" + name + "</b>! At <b>Riskcurity</b>, our engineering team unites deep technical expertise across:<br><br>" +
              "• 🌐 <b>Secure Web Development:</b> Hardened SaaS platforms, microservices &amp; OWASP Top 10 defense.<br>" +
              "• 🤖 <b>AI Agents &amp; Automation:</b> Autonomous LLM workflows, RAG pipelines &amp; operational bots.<br>" +
              "• 👁️ <b>24/7 SOC &amp; SIEM:</b> Continuous threat monitoring, triage &amp; incident response.<br>" +
              "• 🛡️ <b>GRC Compliance:</b> ISO 27001, SOC 2 Type II, and NIST automated evidence.<br>" +
              "• ⚔️ <b>VAPT:</b> Ethical hacking across web, network, cloud &amp; API vectors.<br><br>" +
              "Which area would you like to explore, or would you like to discuss your specific requirements?",
        chips: [
          { label: '🌐 Web Development', topic: 'web' },
          { label: '🤖 AI Automation', topic: 'ai' },
          { label: '👁️ 24/7 SOC Watch', topic: 'soc' },
          { label: '🛡️ GRC Compliance', topic: 'grc' },
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '📩 Book Consultation', topic: 'lead', highlight: true }
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

          chatSessionTranscript.push('Riskmate: [' + item.title + '] ' + item.text.replace(/<[^>]*>/g, ' '));
          silentSyncChatLeadToBackend();

          if (fserviceSelect && item.serviceVal) {
            for (var i = 0; i < fserviceSelect.options.length; i++) {
              if (fserviceSelect.options[i].text.indexOf(item.serviceVal) !== -1) {
                fserviceSelect.selectedIndex = i;
                break;
              }
            }
          }

        } else if (customQuery) {
          var agentResult = getAgentResponse(customQuery);

          if (agentResult) {
            appendMessage('<p>' + agentResult.text + '</p>', 'bot', agentResult.chips);

            chatSessionTranscript.push('Riskmate: ' + agentResult.text.replace(/<[^>]*>/g, ' '));
            silentSyncChatLeadToBackend();

            if (fserviceSelect && agentResult.serviceVal) {
              for (var j = 0; j < fserviceSelect.options.length; j++) {
                if (fserviceSelect.options[j].text.indexOf(agentResult.serviceVal) !== -1) {
                  fserviceSelect.selectedIndex = j;
                  break;
                }
              }
            }
          }
        }
      }, 400);
    }

    chatBody.addEventListener('click', function (e) {
      var btn = e.target.closest('.chip-btn');
      if (btn) {
        var topic = btn.getAttribute('data-topic');
        if (topic) {
          appendMessage(btn.textContent, 'user');
          chatSessionTranscript.push('Client (Selected): ' + btn.textContent);
          silentSyncChatLeadToBackend();
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
        chatSessionTranscript.push('Client: ' + txt);
        silentSyncChatLeadToBackend();
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
