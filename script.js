/* =========================================================
   RISKCURITY — CLIENT ENGINES & RISKMATE AI ASSISTANT
   - Responsive Navigation Toggle
   - Contact Form Web3Forms Lead Dispatch
   - Riskmate AI Technical Guide & Silent Lead Sync
   ========================================================= */

(function () {
  'use strict';

  /* ---------- 1. NAVBAR SCROLL & MOBILE TOGGLE ---------- */
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
        navLinks.style.background = '#0e1320';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid var(--line)';
        navLinks.style.gap = '16px';
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

  /* ---------- 2. CONTACT FORM SUBMIT (WEB3FORMS) ---------- */
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
        formResult.style.background = 'var(--accent-subtle)';
        formResult.style.border = '1px solid var(--accent-border)';
        formResult.style.color = 'var(--text-main)';
        formResult.innerHTML = "Request noted! You can also reach our engineering leadership directly at <a href='mailto:hello@riskcurity.com' style='color:var(--accent); text-decoration:underline;'>hello@riskcurity.com</a>.";
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "<span>Book a Risk Assessment</span> <span class='btn-arrow'>→</span>";
        }
      });
    });
  }

  /* ---------- 3. RISKMATE AI CONVERSATIONAL AGENT & SILENT BACKEND LEAD SYNC ---------- */
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
        '<p>Hello <b>' + userName + '</b>! 👋 Welcome to <b>Riskcurity</b>.<br>I\'m <b>Riskmate AI</b>, your technical guide for <b>Offensive Security, VAPT, SOC 2 Audits, and AI Engineering</b>.<br><br>I can answer any technical question about penetration testing, compliance, or our engineering scopes. What would you like to explore?</p>',
        'bot',
        [
          { label: '⚔️ VAPT & Penetration Testing', topic: 'vapt' },
          { label: '🛡️ SOC 2 & ISO 27001 Audits', topic: 'grc' },
          { label: '🤖 AI Automation & Agents', topic: 'ai' },
          { label: '👁️ 24/7 SOC Threat Watch', topic: 'soc' },
          { label: '🔄 Engagement Methodology', topic: 'process' },
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
        text: "<b>Our VAPT Engagement Model for Startups:</b><br>" +
              "1. <b>Threat Modeling &amp; Scoping:</b> We map your web applications, cloud APIs, and auth boundaries (5–7 day turnaround).<br>" +
              "2. <b>Manual Adversarial Exploitation:</b> Certified ethical hackers simulate OWASP Top 10 and business-logic bypass attacks.<br>" +
              "3. <b>Developer Code Fixes:</b> Impact-ranked report with exact code snippets and Slack collaboration with your engineers.<br>" +
              "4. <b>Attestation Sign-Off:</b> Free re-testing and an executive Letter of Attestation accepted by enterprise buyers and SOC 2 auditors.",
        serviceVal: "VAPT Penetration Testing (Web / API / Cloud)",
        followUps: [
          { label: '🛡️ SOC 2 & ISO 27001', topic: 'grc' },
          { label: '🤖 AI Automation', topic: 'ai' },
          { label: '📩 Book VAPT Assessment', topic: 'lead', highlight: true }
        ]
      },
      grc: {
        title: "🛡️ GRC Compliance Automation",
        text: "<b>How We Automate SOC 2 &amp; ISO 27001 Compliance:</b><br>" +
              "1. <b>Control Mapping:</b> Map controls across ISO 27001, SOC 2 Type II, and NIST CSF without spreadsheet chaos.<br>" +
              "2. <b>Automated Evidence Sync:</b> Continuous API scrapers gather compliance proof from AWS, Azure, GitHub, and Okta.<br>" +
              "3. <b>Audit Attestation:</b> Real-time audit readiness dashboards and pre-packaged evidence bundles for auditors.",
        serviceVal: "SOC 2 / ISO 27001 Technical Audit Clearance",
        followUps: [
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '🔄 Methodology', topic: 'process' },
          { label: '📩 Book Compliance Review', topic: 'lead', highlight: true }
        ]
      },
      ai: {
        title: "🤖 AI Agents & Workflow Automation",
        text: "<b>Our AI Engineering &amp; Automation Discipline:</b><br>" +
              "1. <b>Workflow Auditing:</b> We identify high-toil operational bottlenecks, ticket queues, and data extraction tasks.<br>" +
              "2. <b>Agent Swarm Architecture:</b> Autonomous LLM agents, RAG vector pipelines, and Python/Node automated workflows.<br>" +
              "3. <b>Supervised Guardrails:</b> Strict human-in-the-loop validation checkpoints with zero unreviewed destructive runs.",
        serviceVal: "Autonomous AI Agent Security & Automation",
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
        serviceVal: "24/7 SOC Threat Monitoring",
        followUps: [
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '🛡️ GRC Compliance', topic: 'grc' }
        ]
      },
      web: {
        title: "🌐 Secure Web Development",
        text: "<b>Secure-by-Design Web Development:</b><br>" +
              "We engineer high-performance SaaS platforms, client portals, and APIs with built-in OWASP Top 10 defenses, parameterized queries, strict CSP headers, and JWT/OAuth2 RBAC authentication.",
        serviceVal: "Custom Scope / Not Sure Yet",
        followUps: [
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '🤖 AI Automation', topic: 'ai' }
        ]
      },
      process: {
        title: "🔄 4-Step Engagement Lifecycle",
        text: "<b>Our 4-Step Methodology:</b><br>" +
              "• <b>01 Threat Modeling &amp; Scoping:</b> Define attack surface, API endpoints, and compliance goals.<br>" +
              "• <b>02 Adversarial Exploitation:</b> Manual and tool-assisted penetration testing.<br>" +
              "• <b>03 Developer Remediation:</b> Line-by-line code fix snippets and direct Slack collaboration.<br>" +
              "• <b>04 Attestation Sign-Off:</b> Free re-testing and executive Letter of Attestation for enterprise buyers.",
        serviceVal: "Custom Scope / Not Sure Yet",
        followUps: [
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '📩 Book Assessment', topic: 'lead', highlight: true }
        ]
      },
      contact_info: {
        title: "📞 Direct Contact & Scheduling",
        text: "You can reach our engineering team directly at:<br>" +
              "• <b>Email:</b> <a href='mailto:hello@riskcurity.com' style='color:var(--accent); text-decoration:underline;'>hello@riskcurity.com</a><br>" +
              "• <b>Turnaround:</b> Fixed proposal delivered within 24 business hours.",
        serviceVal: "Custom Scope / Not Sure Yet",
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
          { label: '🛡️ SOC 2 Compliance', topic: 'grc' }
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
          text: "Hello <b>" + name + "</b>! 👋 I'm <b>Riskmate AI</b>, your technical guide at Riskcurity.<br><br>I can explain our VAPT penetration testing methodology, SOC 2 / ISO 27001 audit clearance, AI automation engineering, or answer any technical security questions. What are you looking to test or protect?",
          chips: [
            { label: '⚔️ VAPT Penetration Testing', topic: 'vapt' },
            { label: '🛡️ SOC 2 & ISO 27001', topic: 'grc' },
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
            { label: '🛡️ SOC 2 Audits', topic: 'grc' },
            { label: '📩 Book a Risk Assessment', topic: 'lead', highlight: true }
          ]
        };
      }

      // 2. Zero-Day Vulnerabilities
      if ((q.indexOf('zero') !== -1 && q.indexOf('day') !== -1) || (q.indexOf('zeo') !== -1 && q.indexOf('day') !== -1) || q.indexOf('0day') !== -1 || q.indexOf('0-day') !== -1 || q.indexOf('zeroday') !== -1 || q.indexOf('zeoday') !== -1) {
        return {
          text: "<b>What is a Zero-Day (0-Day) Vulnerability?</b><br><br>" +
                "A <b>Zero-Day</b> is a security vulnerability completely unknown to the software vendor — meaning developers have had <i>zero days</i> to release a patch.<br><br>" +
                "<b>How Riskcurity Protects Startups:</b><br>" +
                "• ⚔️ <b>Proactive VAPT Testing:</b> Our ethical hackers find undiscovered business-logic flaws and auth bypasses in your proprietary code before external adversaries do.<br>" +
                "• 🛡️ <b>Zero-Trust Segmentation:</b> Limits blast radius so an isolated zero-day cannot compromise your entire cloud infrastructure.",
          chips: [
            { label: '⚔️ VAPT Penetration Testing', topic: 'vapt' },
            { label: '🛡️ SOC 2 Compliance', topic: 'grc' },
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

      // 4. GRC, SOC 2, ISO 27001 & Compliance
      if (q.indexOf('grc') !== -1 || q.indexOf('iso') !== -1 || q.indexOf('soc 2') !== -1 || q.indexOf('soc2') !== -1 || q.indexOf('audit') !== -1 || q.indexOf('compliance') !== -1 || q.indexOf('nist') !== -1 || q.indexOf('gdpr') !== -1 || q.indexOf('hipaa') !== -1) {
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
                "• <b>SOC 2 / ISO 27001 Technical Audit Clearance:</b> Full technical compliance prep and auditor-ready deliverables.<br><br>" +
                "Would you like us to prepare a tailored estimate? You can email us directly at <a href='mailto:hello@riskcurity.com' style='color:var(--accent); text-decoration:underline;'>hello@riskcurity.com</a>.",
          chips: [
            { label: '📩 Book a Risk Assessment', topic: 'lead', highlight: true },
            { label: '⚔️ VAPT Testing', topic: 'vapt' },
            { label: '🛡️ SOC 2 Compliance', topic: 'grc' }
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
              "• ⚔️ <b>Offensive Security &amp; VAPT:</b> Uncovering critical flaws in Web, Cloud, and APIs before enterprise buyers do.<br>" +
              "• 🛡️ <b>SOC 2 &amp; ISO 27001 Clearance:</b> Technical penetration testing and audit attestation letters.<br>" +
              "• 🤖 <b>AI Engineering &amp; Automation:</b> Supervised LLM agents and workflow automations.<br><br>" +
              "Which area would you like to explore, or would you like to discuss your specific scope?",
        chips: [
          { label: '⚔️ VAPT Testing', topic: 'vapt' },
          { label: '🛡️ SOC 2 Compliance', topic: 'grc' },
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
