/* =========================================================
   RISKCURITY — DYNAMIC CLIENT ENGINES & RISKMATE AI
   - Interactive Cyber Particle Canvas (Neon Green/Cyan)
   - IntersectionObserver Staggered Scroll Reveals
   - Responsive Navigation & Micro-Interactions
   - Contact Form Web3Forms Lead Dispatch to riskecurity@gmail.com
   - Riskmate AI Technical Guide & Silent Lead Sync
   ========================================================= */

(function () {
  'use strict';

  /* ---------- 1. INTERACTIVE CYBER PARTICLE CANVAS ---------- */
  var canvas = document.getElementById('cyberCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = window.innerWidth < 768 ? 30 : 65;
    var mouse = { x: null, y: null, maxDist: 130 };

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
      this.vx = (Math.random() - 0.5) * 0.75;
      this.vy = (Math.random() - 0.5) * 0.75;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.35 ? 'rgba(0, 255, 136, ' : 'rgba(56, 189, 248, ';
    }

    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

      // Mouse proximity interaction
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
      ctx.fillStyle = this.color + '0.75)';
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
            var opacity = (1 - dist / 130) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 255, 136, ' + opacity + ')';
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
      if (window.scrollY > 30) {
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
        navLinks.style.background = '#0a0e20';
        navLinks.style.padding = '24px';
        navLinks.style.borderBottom = '1px solid var(--line)';
        navLinks.style.gap = '16px';
        navLinks.style.boxShadow = '0 16px 36px rgba(0,0,0,0.6)';
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
    }, { threshold: 0.1 });

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add('active');
    });
  }

  /* ---------- 4. CONTACT FORM SUBMIT (WEB3FORMS) ---------- */
  var contactForm = document.getElementById('contactForm');
  var formResult = document.getElementById('formResult');
  var submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(contactForm);
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "<span>Transmitting Assessment Scope...</span>";
      }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          formResult.style.display = 'block';
          formResult.style.background = 'var(--success-bg)';
          formResult.style.border = '1px solid var(--success-border)';
          formResult.style.color = 'var(--success-text)';
          formResult.innerHTML = "✓ <b>Assessment Request Received!</b> A senior offensive security engineer will review your scope and follow up with a proposal within 24 hours.";
          contactForm.reset();
        } else {
          throw new Error('Submission returned error');
        }
      })
      .catch(function () {
        formResult.style.display = 'block';
        formResult.style.background = 'var(--neon-subtle)';
        formResult.style.border = '1px solid var(--neon-border)';
        formResult.style.color = 'var(--text-main)';
        formResult.innerHTML = "Request noted! You can also reach our engineering leadership directly at <a href='mailto:riskecurity@gmail.com' style='color:var(--neon); text-decoration:underline;'>riskecurity@gmail.com</a>.";
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "<span>Book a Risk Assessment</span> <span class='btn-arrow'>→</span>";
        }
      });
    });
  }

  /* ---------- 5. RISKMATE AI CONVERSATIONAL AGENT & SILENT BACKEND LEAD SYNC ---------- */
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
        '<p>Hello <b>' + userName + '</b>! 👋 Welcome to <b>Riskcurity</b>.<br>I\'m <b>Riskmate AI</b>, your technical guide for <b>Offensive Security, VAPT, ISO 27001 / SOC 2 / PCI DSS Audits, and AI Engineering</b>.<br><br>I can answer any technical question about penetration testing, compliance, or our engineering scopes. What would you like to explore?</p>',
        'bot',
        [
          { label: '⚔️ VAPT & Penetration Testing', topic: 'vapt' },
          { label: '🛡️ ISO 27001 & SOC 2 & PCI DSS', topic: 'grc' },
          { label: '🤖 AI Automation & Agents', topic: 'ai' },
          { label: '👁️ 24/7 SOC Threat Watch', topic: 'soc' },
          { label: '🔄 4-Stage Lifecycle', topic: 'process' },
          { label: '📩 Book a Risk Assessment', topic: 'lead', highlight: true }
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
      vapt: {
        title: "⚔️ VAPT Penetration Testing",
        text: "<b>Our VAPT Engagement Model for Enterprises:</b><br>" +
              "1. <b>Threat Modeling &amp; Scoping:</b> We map your web applications, cloud APIs, and auth boundaries (5–7 day turnaround).<br>" +
              "2. <b>Manual Adversarial Exploitation:</b> Certified ethical hackers simulate OWASP Top 10, business-logic bypass attacks, and cloud misconfigurations.<br>" +
              "3. <b>Developer Code Fixes:</b> Impact-ranked report with exact code snippets and Slack collaboration with your engineers.<br>" +
              "4. <b>Attestation Sign-Off:</b> Free re-testing and an executive Letter of Attestation accepted by enterprise buyers, PCI QSAs, and SOC 2 auditors.",
        serviceVal: "VAPT Penetration Testing (Web / API / Cloud)",
        followUps: [
          { label: '🛡️ ISO 27001 & SOC 2 & PCI DSS', topic: 'grc' },
          { label: '🤖 AI Automation', topic: 'ai' },
          { label: '📩 Book VAPT Assessment', topic: 'lead', highlight: true }
        ]
      },
      grc: {
        title: "🛡️ GRC Compliance Automation",
        text: "<b>How We Automate ISO 27001, SOC 2 &amp; PCI DSS:</b><br>" +
              "1. <b>Control Mapping:</b> Map controls across ISO 27001, SOC 2 Type II, PCI DSS Level 1, and NIST CSF without spreadsheet chaos.<br>" +
              "2. <b>Automated Evidence Sync:</b> Continuous API scrapers gather compliance proof from AWS, Azure, GitHub, and Okta.<br>" +
              "3. <b>Audit Attestation:</b> Real-time audit readiness dashboards and pre-packaged evidence bundles for auditors.",
        serviceVal: "ISO 27001 / SOC 2 / PCI DSS Compliance Automation",
        followUps: [
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '🔄 4-Stage Lifecycle', topic: 'process' },
          { label: '📩 Book Compliance Review', topic: 'lead', highlight: true }
        ]
      },
      ai: {
        title: "🤖 AI Agents & Workflow Automation",
        text: "<b>Our AI Engineering &amp; Automation Discipline:</b><br>" +
              "1. <b>Workflow Auditing:</b> We identify high-toil operational bottlenecks, ticket queues, and data extraction tasks.<br>" +
              "2. <b>Agent Swarm Architecture:</b> Autonomous LLM agents, RAG vector pipelines, and Python/Node automated workflows.<br>" +
              "3. <b>Supervised Guardrails:</b> Strict human-in-the-loop validation checkpoints with zero unreviewed destructive runs.",
        serviceVal: "Autonomous AI Agent Swarms & Automation",
        followUps: [
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '👁️ 24/7 SOC Watch', topic: 'soc' },
          { label: '📩 Build an AI Workflow', topic: 'lead', highlight: true }
        ]
      },
      soc: {
        title: "👁️ 24/7 SOC Operations",
        text: "<b>Continuous 24/7 Security Operations:</b><br>" +
              "1. <b>Log Ingestion:</b> Connects cloud infrastructure (AWS/GCP), identity providers (Okta), and servers.<br>" +
              "2. <b>Real-Time Analyst Triage:</b> Security analysts and AI filters investigate alerts, cutting through 99% of false alarms.<br>" +
              "3. <b>Active Containment:</b> Anomaly isolation, token revocation, and guided incident response.",
        serviceVal: "24/7 SOC Threat Monitoring & Incident Response",
        followUps: [
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '🛡️ GRC Compliance', topic: 'grc' }
        ]
      },
      web: {
        title: "🌐 Secure Web Development",
        text: "<b>Secure-by-Design Web Development:</b><br>" +
              "We engineer high-performance SaaS platforms, client portals, and APIs with built-in OWASP Top 10 defenses, parameterized queries, strict CSP headers, and JWT/OAuth2 RBAC authentication.",
        serviceVal: "Secure Web Application Development",
        followUps: [
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '🤖 AI Automation', topic: 'ai' }
        ]
      },
      process: {
        title: "🔄 4-Stage Security & Automation Lifecycle",
        text: "<b>Our 4-Stage Lifecycle:</b><br>" +
              "• <b>Stage 01 Assess:</b> Threat modeling, cloud configuration audits, and attack surface discovery.<br>" +
              "• <b>Stage 02 Defend:</b> Adversarial penetration testing, 24/7 SOC deployment, and zero-trust boundaries.<br>" +
              "• <b>Stage 03 Automate:</b> Continuous GRC evidence pipelines and autonomous AI agent workflows.<br>" +
              "• <b>Stage 04 Evolve:</b> Continuous red teaming and executive Letter of Attestation audit sign-offs.",
        serviceVal: "Comprehensive Full-Stack Assessment",
        followUps: [
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '📩 Book Assessment', topic: 'lead', highlight: true }
        ]
      },
      contact_info: {
        title: "📞 Direct Contact & Scheduling",
        text: "You can reach our engineering team directly at:<br>" +
              "• <b>Email:</b> <a href='mailto:riskecurity@gmail.com' style='color:var(--neon); text-decoration:underline;'>riskecurity@gmail.com</a><br>" +
              "• <b>Phone / WhatsApp:</b> <a href='tel:+923423717545' style='color:var(--neon); text-decoration:underline;'>+92 342 3717545</a><br>" +
              "• <b>Turnaround:</b> Fixed proposal delivered within 24 business hours.",
        serviceVal: "Comprehensive Full-Stack Assessment",
        followUps: [
          { label: '📩 Book a Risk Assessment', topic: 'lead', highlight: true }
        ]
      },
      lead: {
        title: "📩 Risk Assessment Booking",
        text: "Please share what you're looking to test or build in the chat below. A senior offensive security engineer will review your requirements and provide a tailored scope.",
        serviceVal: "VAPT Penetration Testing (Web / API / Cloud)",
        followUps: [
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '🛡️ ISO 27001 & SOC 2', topic: 'grc' }
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
          text: "Hello <b>" + name + "</b>! 👋 I'm <b>Riskmate AI</b>, your technical guide at Riskcurity.<br><br>I can explain our VAPT penetration testing, ISO 27001 / SOC 2 / PCI DSS compliance automation, 24/7 SOC operations, or AI agent engineering. What are you looking to test or protect?",
          chips: [
            { label: '⚔️ VAPT Penetration Testing', topic: 'vapt' },
            { label: '🛡️ ISO 27001 & SOC 2 & PCI DSS', topic: 'grc' },
            { label: '🤖 AI Automation', topic: 'ai' },
            { label: '👁️ 24/7 SOC Watch', topic: 'soc' },
            { label: '📩 Book a Risk Assessment', topic: 'lead', highlight: true }
          ]
        };
      }

      if (q.indexOf('thank') !== -1 || q.indexOf('thx') !== -1 || q.indexOf('appreciate') !== -1) {
        return {
          text: "You're very welcome, <b>" + name + "</b>! 😊 Feel free to ask any other questions regarding VAPT, cloud audits, compliance, or AI engineering whenever you're ready.",
          chips: [
            { label: '⚔️ VAPT Testing', topic: 'vapt' },
            { label: '🛡️ ISO 27001 Audits', topic: 'grc' },
            { label: '📩 Book a Risk Assessment', topic: 'lead', highlight: true }
          ]
        };
      }

      // 2. Zero-Day Vulnerabilities
      if ((q.indexOf('zero') !== -1 && q.indexOf('day') !== -1) || (q.indexOf('zeo') !== -1 && q.indexOf('day') !== -1) || q.indexOf('0day') !== -1 || q.indexOf('0-day') !== -1 || q.indexOf('zeroday') !== -1 || q.indexOf('zeoday') !== -1) {
        return {
          text: "<b>What is a Zero-Day (0-Day) Vulnerability?</b><br><br>" +
                "A <b>Zero-Day</b> is a security vulnerability completely unknown to the software vendor — meaning developers have had <i>zero days</i> to release a patch.<br><br>" +
                "<b>How Riskcurity Protects Your Infrastructure:</b><br>" +
                "• ⚔️ <b>Proactive VAPT Testing:</b> Our ethical hackers uncover undiscovered business-logic flaws and auth bypasses in your proprietary code before adversaries do.<br>" +
                "• 🛡️ <b>Zero-Trust Segmentation:</b> Limits blast radius so an isolated zero-day cannot compromise your entire cloud infrastructure.",
          chips: [
            { label: '⚔️ VAPT Penetration Testing', topic: 'vapt' },
            { label: '🛡️ ISO 27001 & SOC 2', topic: 'grc' },
            { label: '📩 Book a Risk Assessment', topic: 'lead', highlight: true }
          ]
        };
      }

      // 3. VAPT & Penetration Testing Questions
      if (q.indexOf('vapt') !== -1 || q.indexOf('pen') !== -1 || q.indexOf('test') !== -1 || q.indexOf('hack') !== -1 || q.indexOf('vuln') !== -1 || q.indexOf('scan') !== -1 || q.indexOf('exploit') !== -1) {
        return {
          text: kbAnswers.vapt.text,
          chips: kbAnswers.vapt.followUps,
          serviceVal: kbAnswers.vapt.serviceVal
        };
      }

      // 4. GRC, ISO 27001, SOC 2, PCI DSS & Compliance
      if (q.indexOf('grc') !== -1 || q.indexOf('iso') !== -1 || q.indexOf('soc 2') !== -1 || q.indexOf('soc2') !== -1 || q.indexOf('pci') !== -1 || q.indexOf('audit') !== -1 || q.indexOf('compliance') !== -1 || q.indexOf('nist') !== -1 || q.indexOf('gdpr') !== -1 || q.indexOf('hipaa') !== -1) {
        return {
          text: kbAnswers.grc.text,
          chips: kbAnswers.grc.followUps,
          serviceVal: kbAnswers.grc.serviceVal
        };
      }

      // 5. AI Automation & Autonomous Agents
      if (q.indexOf('ai') !== -1 || q.indexOf('agent') !== -1 || q.indexOf('autom') !== -1 || q.indexOf('llm') !== -1 || q.indexOf('rag') !== -1 || q.indexOf('bot') !== -1 || q.indexOf('gpt') !== -1 || q.indexOf('workflow') !== -1) {
        return {
          text: kbAnswers.ai.text,
          chips: kbAnswers.ai.followUps,
          serviceVal: kbAnswers.ai.serviceVal
        };
      }

      // 6. SOC & 24/7 Monitoring
      if (q.indexOf('soc') !== -1 || q.indexOf('monitoring') !== -1 || q.indexOf('24/7') !== -1 || q.indexOf('threat') !== -1 || q.indexOf('siem') !== -1) {
        return {
          text: kbAnswers.soc.text,
          chips: kbAnswers.soc.followUps,
          serviceVal: kbAnswers.soc.serviceVal
        };
      }

      // 7. Pricing & Quotes
      if (q.indexOf('price') !== -1 || q.indexOf('cost') !== -1 || q.indexOf('quote') !== -1 || q.indexOf('rate') !== -1 || q.indexOf('fee') !== -1 || q.indexOf('budget') !== -1 || q.indexOf('how much') !== -1) {
        return {
          text: "<b>Predictable Fixed-Fee Project Pricing:</b><br>" +
                "We provide transparent fixed-fee project scopes with complimentary re-testing included:<br>" +
                "• <b>VAPT Penetration Assessments:</b> Fixed turnaround (5–7 days) with Letter of Attestation.<br>" +
                "• <b>ISO 27001 / SOC 2 / PCI DSS Compliance Prep:</b> Full automated evidence mapping and audit clearance.<br><br>" +
                "Would you like us to prepare a tailored estimate? You can email us directly at <a href='mailto:riskecurity@gmail.com' style='color:var(--neon); text-decoration:underline;'>riskecurity@gmail.com</a> or WhatsApp <a href='tel:+923423717545' style='color:var(--neon); text-decoration:underline;'>+92 342 3717545</a>.",
          chips: [
            { label: '📩 Book a Risk Assessment', topic: 'lead', highlight: true },
            { label: '⚔️ VAPT Testing', topic: 'vapt' },
            { label: '🛡️ ISO 27001 Compliance', topic: 'grc' }
          ]
        };
      }

      // 8. Contact Info
      if (q.indexOf('contact') !== -1 || q.indexOf('email') !== -1 || q.indexOf('phone') !== -1 || q.indexOf('call') !== -1 || q.indexOf('reach') !== -1 || q.indexOf('location') !== -1 || q.indexOf('where') !== -1) {
        return {
          text: kbAnswers.contact_info.text,
          chips: kbAnswers.contact_info.followUps,
          serviceVal: kbAnswers.contact_info.serviceVal
        };
      }

      // 9. Process / Methodology
      if (q.indexOf('how') !== -1 || q.indexOf('process') !== -1 || q.indexOf('stage') !== -1 || q.indexOf('method') !== -1 || q.indexOf('work') !== -1 || q.indexOf('timeline') !== -1) {
        return {
          text: kbAnswers.process.text,
          chips: kbAnswers.process.followUps,
          serviceVal: kbAnswers.process.serviceVal
        };
      }

      // 10. Intelligent Fallback
      return {
        text: "I'd be glad to guide you, <b>" + name + "</b>! At <b>Riskcurity</b>, our engineers specialize in:<br><br>" +
              "• ⚔️ <b>Offensive Security &amp; VAPT:</b> Uncovering critical flaws in Web, Cloud, and APIs.<br>" +
              "• 🛡️ <b>ISO 27001, SOC 2 &amp; PCI DSS:</b> Continuous compliance evidence automation.<br>" +
              "• 👁️ <b>24/7 SOC &amp; SIEM:</b> Real-time threat detection and incident triage.<br>" +
              "• 🤖 <b>AI Engineering &amp; Automation:</b> Supervised LLM agents and workflows.<br><br>" +
              "Which area would you like to explore, or would you like to discuss your specific scope?",
        chips: [
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '🛡️ ISO 27001 & SOC 2', topic: 'grc' },
          { label: '🤖 AI Automation', topic: 'ai' },
          { label: '📩 Book a Risk Assessment', topic: 'lead', highlight: true }
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
