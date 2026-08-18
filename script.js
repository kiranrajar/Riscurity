/* =========================================================
   RISKCURITY — INTERACTIVE CLIENT LOGIC & ENGINES
   - Particle Network Canvas Animation
   - IntersectionObserver Scroll Reveals
   - 4-Stage Interactive Methodology Timeline
   - Simulated SOC Live CLI Terminal Engine
   - Contact Form Web3Forms Lead Dispatch
   - Riskmate AI Chatbot & Lead Collection System
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

  /* ---------- 7. RISKMATE AI CHATBOT & LEAD SYSTEM ---------- */
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
        '<p>Hi <b>' + userName + '</b>! 👋 Welcome to <b>Riskcurity</b>.<br>I\'m <b>Riskmate AI</b>, your engineering guide for <b>Web Development, AI Automation, SOC &amp; GRC</b>. How can I assist you today?</p>',
        'bot',
        [
          { label: '🌐 Web Development', topic: 'web' },
          { label: '🤖 AI Automation', topic: 'ai' },
          { label: '👁️ 24/7 SOC Watch', topic: 'soc' },
          { label: '🛡️ GRC Compliance', topic: 'grc' },
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
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

    var kbAnswers = {
      web: {
        title: "🌐 Secure Web Development",
        text: "We engineer <b>secure-by-design web platforms, SaaS applications, and enterprise portals</b> with built-in OWASP vulnerability protection, fast APIs, and modern responsive UI/UX.",
        serviceVal: "Secure Web Development"
      },
      ai: {
        title: "🤖 AI Agents & Automation",
        text: "We design <b>Autonomous AI Agents</b>, LLM RAG engines, automated ticket triage bots, Python/Node process automations, and intelligent workflows that eliminate manual operational toil.",
        serviceVal: "Autonomous AI Agents & Automation"
      },
      soc: {
        title: "👁️ 24/7 SOC Operations",
        text: "Our dedicated <b>Security Operations Center (SOC)</b> provides 24/7 analyst monitoring around the clock, triaging alerts and neutralizing threats before they impact your infrastructure.",
        serviceVal: "24/7 SOC & SIEM Engineering"
      },
      grc: {
        title: "🛡️ GRC Compliance Automation",
        text: "We automate compliance evidence mapping for <b>ISO 27001</b>, <b>SOC 2 Type II</b>, and NIST audit frameworks — replacing spreadsheets with automated audit trails.",
        serviceVal: "GRC Automation (ISO 27001 / SOC 2)"
      },
      vapt: {
        title: "⚔️ VAPT Penetration Testing",
        text: "Our <b>VAPT service</b> tests your web apps, APIs, network, and cloud against real-world attack vectors, delivering impact-ranked remediation reports.",
        serviceVal: "VAPT Penetration Testing"
      },
      lead: {
        title: "📩 Direct Team Contact",
        text: "Would you like to send a direct project inquiry or request a quote for our team? Type your inquiry below and Riskmate will send it straight to <b>riskecurity@gmail.com</b>!",
        serviceVal: "Custom Scope / Not Sure Yet"
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

    function triggerResponse(topicKey, customQuery) {
      chatTyping.style.display = 'flex';
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(function () {
        chatTyping.style.display = 'none';

        if (topicKey && kbAnswers[topicKey]) {
          var item = kbAnswers[topicKey];
          var followUpChips = [
            { label: '📩 Send Inquiry to Team', topic: 'lead', highlight: true },
            { label: '🌐 Web Dev', topic: 'web' },
            { label: '🤖 AI Agents', topic: 'ai' },
            { label: '👁️ SOC Watch', topic: 'soc' },
            { label: '🛡️ GRC Audit', topic: 'grc' }
          ].filter(function (c) { return c.topic !== topicKey; });

          appendMessage('<p>' + item.text + '</p>', 'bot', followUpChips);

          if (fserviceSelect && item.serviceVal) {
            for (var i = 0; i < fserviceSelect.options.length; i++) {
              if (fserviceSelect.options[i].text.indexOf(item.serviceVal) !== -1) {
                fserviceSelect.selectedIndex = i;
                break;
              }
            }
          }
          if (topicKey === 'lead') {
            appendMessage('<p>Please type your project details or question in the box below, and I will dispatch it to riskecurity@gmail.com right away!</p>', 'bot');
          }

        } else if (customQuery) {
          var q = customQuery.toLowerCase();
          var matchedTopic = null;

          if (q.indexOf('web') !== -1 || q.indexOf('site') !== -1 || q.indexOf('dev') !== -1 || q.indexOf('app') !== -1 || q.indexOf('frontend') !== -1 || q.indexOf('backend') !== -1) {
            matchedTopic = 'web';
          } else if (q.indexOf('ai') !== -1 || q.indexOf('agent') !== -1 || q.indexOf('autom') !== -1 || q.indexOf('llm') !== -1 || q.indexOf('bot') !== -1) {
            matchedTopic = 'ai';
          } else if (q.indexOf('soc') !== -1 || q.indexOf('monitoring') !== -1 || q.indexOf('24/7') !== -1 || q.indexOf('threat') !== -1) {
            matchedTopic = 'soc';
          } else if (q.indexOf('grc') !== -1 || q.indexOf('iso') !== -1 || q.indexOf('soc 2') !== -1 || q.indexOf('audit') !== -1 || q.indexOf('compliance') !== -1) {
            matchedTopic = 'grc';
          } else if (q.indexOf('vapt') !== -1 || q.indexOf('pen') !== -1 || q.indexOf('test') !== -1 || q.indexOf('vuln') !== -1) {
            matchedTopic = 'vapt';
          }

          if (matchedTopic) {
            triggerResponse(matchedTopic);
          } else {
            chatTyping.style.display = 'flex';
            sendLeadToEmail(customQuery, function (success) {
              chatTyping.style.display = 'none';
              if (success) {
                appendMessage(
                  '<p>✓ <b>Inquiry Sent to Riskcurity Engineers!</b><br>Your message was delivered to <b>riskecurity@gmail.com</b>. Our team will reply to <b>' + (currentUser ? currentUser.email : 'your email') + '</b> within 1 business day.</p>',
                  'bot',
                  [
                    { label: '🌐 Explore Web Dev', topic: 'web' },
                    { label: '🤖 Explore AI Agents', topic: 'ai' },
                    { label: '👁️ Explore SOC Watch', topic: 'soc' }
                  ]
                );
              } else {
                appendMessage(
                  '<p>I\'ve noted your inquiry! You can also reach our team directly at <a href="mailto:riskecurity@gmail.com">riskecurity@gmail.com</a> or 📞 <b>+92 342 3717545</b>.</p>',
                  'bot',
                  [
                    { label: '🛡️ GRC', topic: 'grc' },
                    { label: '🤖 AI Agents', topic: 'ai' }
                  ]
                );
              }
            });
          }
        }
      }, 500);
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
