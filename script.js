(function(){
  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- nav scroll state ---------- */
  var nav = document.getElementById('nav');
  var onScroll = function(){
    if(window.scrollY > 24){ nav.classList.add('scrolled'); }
    else{ nav.classList.remove('scrolled'); }
  };
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- mobile nav toggle ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function(){
    var open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.12, rootMargin:'0px 0px -60px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-in'); });
  }

  /* ---------- SOC console typing effect ---------- */
  var lines = [
    { html:'<span class="muted">$</span> riskcurity scan --target <span class="path">prod-cluster-03</span>', pause:500 },
    { html:'<span class="ok">✓</span> asset discovery complete <span class="muted">— 214 hosts</span>', pause:400 },
    { html:'<span class="ok">✓</span> SIEM correlation rules <span class="muted">loaded (312)</span>', pause:400 },
    { html:'<span class="muted">⋯</span> running VAPT baseline<span class="muted">...</span>', pause:600 },
    { html:'<span class="ok">✓</span> 3 findings triaged <span class="muted">→ 1 critical patched</span>', pause:500 },
    { html:'<span class="muted">$</span> agent.status <span class="path">grc-automation</span>', pause:450 },
    { html:'<span class="ok">✓</span> evidence mapped <span class="muted">— ISO 27001 · 98% coverage</span>', pause:900 }
  ];

  var consoleBody = document.getElementById('consoleBody');

  function typeLine(text, el, speed, done){
    var i = 0;
    var raw = text; // contains simple html spans; type char-by-char safely via a temp container
    var tmp = document.createElement('div');
    tmp.innerHTML = text;
    var full = tmp.textContent;
    var htmlSoFar = '';
    var tagBuffer = '';
    var inTag = false;
    var idx = 0;

    function step(){
      if(idx >= text.length){ done && done(); return; }
      var ch = text[idx];
      if(ch === '<'){ inTag = true; }
      htmlSoFar += ch;
      if(inTag){
        if(ch === '>'){ inTag = false; }
        idx++;
        step();
        return;
      }
      el.innerHTML = htmlSoFar;
      idx++;
      setTimeout(step, speed);
    }
    step();
  }

  function runConsole(){
    if(!consoleBody) return;
    consoleBody.innerHTML = '';
    var lineIndex = 0;

    function nextLine(){
      if(lineIndex >= lines.length){
        var caret = document.createElement('div');
        caret.innerHTML = '<span class="ok">$</span> <span class="caret"></span>';
        consoleBody.appendChild(caret);
        return;
      }
      var lineDef = lines[lineIndex];
      var row = document.createElement('div');
      consoleBody.appendChild(row);

      if(reduceMotion){
        row.innerHTML = lineDef.html;
        lineIndex++;
        setTimeout(nextLine, 60);
        return;
      }

      typeLine(lineDef.html, row, 16, function(){
        lineIndex++;
        setTimeout(nextLine, lineDef.pause);
      });
    }
    nextLine();
  }

  if(consoleBody){
    if('IntersectionObserver' in window){
      var ranOnce = false;
      var cio = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting && !ranOnce){
            ranOnce = true;
            runConsole();
            cio.unobserve(entry.target);
          }
        });
      }, { threshold:0.3 });
      cio.observe(consoleBody);
    } else {
      runConsole();
    }
  }

  /* ---------- contact form — Web3Forms direct inbox delivery ---------- */
  var form = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var formResult = document.getElementById('formResult');

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.75';
      formResult.style.display = 'none';

      var formData = new FormData(form);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(function(res){ return res.json(); })
      .then(function(data){
        if(data.success){
          formResult.textContent = '✓ Message sent! We will respond within one business day.';
          formResult.style.background = 'rgba(34,229,168,.1)';
          formResult.style.border = '1px solid rgba(34,229,168,.35)';
          formResult.style.color = '#22E5A8';
          formResult.style.display = 'block';
          submitBtn.textContent = 'Message Sent ✓';
          form.reset();
          setTimeout(function(){
            submitBtn.textContent = 'Send Message →';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            formResult.style.display = 'none';
          }, 5000);
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      })
      .catch(function(err){
        formResult.textContent = '✗ Failed to send. Please email us directly at riskecurity@gmail.com';
        formResult.style.background = 'rgba(229,84,75,.1)';
        formResult.style.border = '1px solid rgba(229,84,75,.35)';
        formResult.style.color = '#E5544B';
        formResult.style.display = 'block';
        submitBtn.textContent = 'Send Message →';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      });
    });
  }

  /* ---------- CUTE MINI HACKER AI CHATBOT LOGIC ---------- */
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

  if(chatToggle && chatWindow){
    var chatOpen = false;

    // Toggle Chat
    function toggleChat(state){
      chatOpen = typeof state === 'boolean' ? state : !chatOpen;
      chatWindow.classList.toggle('active', chatOpen);
      chatWindow.setAttribute('aria-hidden', chatOpen ? 'false' : 'true');
      if(bubble) bubble.classList.add('closed');
      if(badge) badge.style.display = 'none';
      if(chatOpen && chatInput){
        setTimeout(function(){ chatInput.focus(); }, 300);
      }
    }

    chatToggle.addEventListener('click', function(){ toggleChat(); });
    if(chatClose) chatClose.addEventListener('click', function(){ toggleChat(false); });
    if(bubbleClose) bubbleClose.addEventListener('click', function(e){ e.stopPropagation(); bubble.classList.add('closed'); });
    if(bubble) bubble.addEventListener('click', function(){ toggleChat(true); });

    // Show bubble after 3.5 seconds automatically
    setTimeout(function(){
      if(!chatOpen && bubble && !bubble.classList.contains('closed')){
        bubble.style.opacity = '1';
      }
    }, 3500);

    // Knowledge Base Answers
    var kbAnswers = {
      grc: {
        title: "🛡️ GRC Automation",
        text: "Our <b>GRC Automation</b> platform collects and maps compliance evidence automatically for <b>ISO 27001</b>, <b>SOC 2</b>, and NIST frameworks. Say goodbye to audit spreadsheet chaos!",
        serviceVal: "GRC Automation"
      },
      soc: {
        title: "👁️ SOC (24/7 Security Operations)",
        text: "Our <b>24/7 SOC team</b> provides round-the-clock analyst monitoring to triage alerts, filter out false positives, and neutralize cyber threats before they disrupt your business.",
        serviceVal: "SOC & SIEM"
      },
      siem: {
        title: "📡 SIEM Engineering",
        text: "We design custom <b>SIEM log pipelines</b>, correlation rules, and detection dashboards tuned to your environment so real threats stand out immediately.",
        serviceVal: "SOC & SIEM"
      },
      vapt: {
        title: "⚔️ VAPT (Penetration Testing)",
        text: "Our <b>VAPT assessment</b> identifies vulnerabilities across Web, Network, Cloud, and Mobile. You get clear, business-impact ranked reports with actionable fix steps — no raw scanner dumps.",
        serviceVal: "VAPT"
      },
      ai: {
        title: "🤖 AI Agents & Automation",
        text: "We engineer <b>Autonomous AI Agents</b> and intelligent workflow automation that investigate alerts, handle repetitive security tickets, and execute SOC playbooks securely.",
        serviceVal: "AI Agents & Automation"
      },
      web: {
        title: "🌐 Secure Web Development",
        text: "We build modern, <b>secure-by-design web platforms</b> and APIs built from day one to defend against OWASP Top 10 vulnerabilities, data leaks, and cyber exploits.",
        serviceVal: "Web Development"
      },
      contact: {
        title: "📅 Book a Security Review",
        text: "Ready to elevate your defense? You can book a consultation directly below or contact us at <a href='mailto:riskecurity@gmail.com'>riskecurity@gmail.com</a> or phone <b>+92 342 3717545</b>.",
        serviceVal: "Not sure yet"
      }
    };

    function appendMessage(text, sender, chips){
      var msgDiv = document.createElement('div');
      msgDiv.className = 'hacker-msg hacker-msg-' + sender;

      var avatarDiv = document.createElement('div');
      avatarDiv.className = 'hacker-msg-avatar';
      avatarDiv.innerHTML = sender === 'bot' ? '🤖' : '👤';

      var contentDiv = document.createElement('div');
      contentDiv.className = 'hacker-msg-content';
      contentDiv.innerHTML = text;

      if(chips && chips.length){
        var chipsDiv = document.createElement('div');
        chipsDiv.className = 'hacker-quick-chips';
        chips.forEach(function(c){
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

    function triggerResponse(topicKey, customQuery){
      chatTyping.style.display = 'flex';
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(function(){
        chatTyping.style.display = 'none';

        if(topicKey && kbAnswers[topicKey]){
          var item = kbAnswers[topicKey];
          var followUpChips = [
            { label: '📅 Book Review', topic: 'contact', highlight: true },
            { label: '🛡️ GRC', topic: 'grc' },
            { label: '⚔️ VAPT', topic: 'vapt' },
            { label: '🤖 AI Agents', topic: 'ai' }
          ].filter(function(c){ return c.topic !== topicKey; });

          appendMessage('<p>' + item.text + '</p>', 'bot', followUpChips);

          // If topic matches contact or service, update form dropdown
          if(fserviceSelect && item.serviceVal){
            for(var i=0; i<fserviceSelect.options.length; i++){
              if(fserviceSelect.options[i].text.indexOf(item.serviceVal) !== -1){
                fserviceSelect.selectedIndex = i;
                break;
              }
            }
          }
          if(topicKey === 'contact'){
            var contactSec = document.getElementById('contact');
            if(contactSec) contactSec.scrollIntoView({ behavior:'smooth' });
          }

        } else if(customQuery){
          var q = customQuery.toLowerCase();
          var reply = "";
          var matchedTopic = null;

          if(q.indexOf('grc') !== -1 || q.indexOf('iso') !== -1 || q.indexOf('soc 2') !== -1 || q.indexOf('audit') !== -1 || q.indexOf('compliance') !== -1){
            matchedTopic = 'grc';
          } else if(q.indexOf('soc') !== -1 || q.indexOf('monitoring') !== -1 || q.indexOf('24/7') !== -1){
            matchedTopic = 'soc';
          } else if(q.indexOf('siem') !== -1 || q.indexOf('log') !== -1 || q.indexOf('detection') !== -1){
            matchedTopic = 'siem';
          } else if(q.indexOf('vapt') !== -1 || q.indexOf('pen') !== -1 || q.indexOf('test') !== -1 || q.indexOf('hack') !== -1 || q.indexOf('vuln') !== -1){
            matchedTopic = 'vapt';
          } else if(q.indexOf('ai') !== -1 || q.indexOf('agent') !== -1 || q.indexOf('autom') !== -1 || q.indexOf('bot') !== -1){
            matchedTopic = 'ai';
          } else if(q.indexOf('web') !== -1 || q.indexOf('site') !== -1 || q.indexOf('dev') !== -1 || q.indexOf('app') !== -1){
            matchedTopic = 'web';
          } else if(q.indexOf('cost') !== -1 || q.indexOf('price') !== -1 || q.indexOf('quote') !== -1 || q.indexOf('fee') !== -1){
            reply = "We offer customized proposals based on your scope &amp; system architecture. Contact us for a free estimate! 📧 <a href='mailto:riskecurity@gmail.com'>riskecurity@gmail.com</a> or 📞 <b>+92 342 3717545</b>.";
          } else if(q.indexOf('contact') !== -1 || q.indexOf('phone') !== -1 || q.indexOf('email') !== -1 || q.indexOf('call') !== -1 || q.indexOf('book') !== -1 || q.indexOf('address') !== -1){
            matchedTopic = 'contact';
          } else if(q.indexOf('hi') !== -1 || q.indexOf('hello') !== -1 || q.indexOf('hey') !== -1){
            reply = "Hello there! 👋 How can I help you secure your systems or automate your workflows today?";
          } else {
            reply = "I'd be happy to guide you! Riskcurity specializes in <b>GRC Automation, 24/7 SOC, SIEM Engineering, VAPT, AI Agents,</b> and <b>Secure Web Development</b>. Which service would you like to explore?";
          }

          if(matchedTopic){
            triggerResponse(matchedTopic);
          } else {
            appendMessage('<p>' + reply + '</p>', 'bot', [
              { label: '🛡️ GRC', topic: 'grc' },
              { label: '👁️ SOC 24/7', topic: 'soc' },
              { label: '⚔️ VAPT', topic: 'vapt' },
              { label: '🤖 AI Agents', topic: 'ai' },
              { label: '📅 Book Review', topic: 'contact', highlight: true }
            ]);
          }
        }
      }, 600);
    }

    // Handle Quick Chip Clicks
    chatBody.addEventListener('click', function(e){
      var btn = e.target.closest('.chip-btn');
      if(btn){
        var topic = btn.getAttribute('data-topic');
        if(topic){
          appendMessage(btn.textContent, 'user');
          triggerResponse(topic);
        }
      }
    });

    // Handle User Text Input
    if(chatForm){
      chatForm.addEventListener('submit', function(e){
        e.preventDefault();
        var txt = chatInput.value.trim();
        if(!txt) return;
        chatInput.value = '';
        appendMessage(txt, 'user');
        triggerResponse(null, txt);
      });
    }

    // Reset Chat
    if(chatReset){
      chatReset.addEventListener('click', function(){
        chatBody.innerHTML = '<div class="hacker-msg hacker-msg-bot"><div class="hacker-msg-avatar">🤖</div><div class="hacker-msg-content"><p>Welcome to <b>Riskcurity</b>! 🛡️<br>I\'m your <b>Mini Hacker AI</b> guide. How can I assist you with our cyber defense &amp; AI services today?</p><div class="hacker-quick-chips"><button class="chip-btn" data-topic="grc">🛡️ GRC Automation</button><button class="chip-btn" data-topic="soc">👁️ SOC 24/7</button><button class="chip-btn" data-topic="siem">📡 SIEM Engineering</button><button class="chip-btn" data-topic="vapt">⚔️ VAPT Assessment</button><button class="chip-btn" data-topic="ai">🤖 AI Agents</button><button class="chip-btn" data-topic="web">🌐 Secure Web Dev</button><button class="chip-btn chip-highlight" data-topic="contact">📅 Book Review</button></div></div></div>';
      });
    }
  }

  /* ---------- ENTERPRISE HUD TABS LOGIC ---------- */
  var hudTabs = document.getElementById('hudTabs');
  var hudTelemetry = document.getElementById('hudTelemetry');

  if(hudTabs && hudTelemetry){
    var hudData = {
      soc: [
        { lbl: "ACTIVE DEFENSE", val: "100% OPERATIONAL", class: "val-green", fill: "fill-100" },
        { lbl: "AI TRIAGE RESPONSE", val: "< 1.2s INSTANT", class: "val-cyan", fill: "fill-95" },
        { lbl: "SOC COVERAGE", val: "214 NODES WATCHED", class: "val-green", fill: "fill-98" }
      ],
      grc: [
        { lbl: "AUDIT READINESS", val: "98% COMPLIANT", class: "val-green", fill: "fill-98" },
        { lbl: "FRAMEWORKS", val: "ISO 27001 / SOC 2", class: "val-cyan", fill: "fill-100" },
        { lbl: "EVIDENCE COLLECTION", val: "100% AUTOMATED", class: "val-green", fill: "fill-100" }
      ],
      ai: [
        { lbl: "AUTONOMOUS PLAYBOOKS", val: "14 AGENTS ONLINE", class: "val-cyan", fill: "fill-95" },
        { lbl: "TICKET TRIAGE RATE", val: "99.4% AUTOMATED", class: "val-green", fill: "fill-98" },
        { lbl: "HUMAN SUPERVISION", val: "ZERO UNVETTED RUNS", class: "val-green", fill: "fill-100" }
      ],
      vapt: [
        { lbl: "DEFENSIVE RATING", val: "GRADE A+ ENTERPRISE", class: "val-green", fill: "fill-100" },
        { lbl: "CRITICAL EXPOSURES", val: "0 ZERO-DAYS", class: "val-cyan", fill: "fill-100" },
        { lbl: "REMEDIATION VERIFIED", val: "100% PATCHED", class: "val-green", fill: "fill-100" }
      ]
    };

    hudTabs.addEventListener('click', function(e){
      var btn = e.target.closest('.hud-tab-btn');
      if(btn){
        hudTabs.querySelectorAll('.hud-tab-btn').forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var key = btn.getAttribute('data-hud');
        if(key && hudData[key]){
          var items = hudData[key];
          hudTelemetry.innerHTML = items.map(function(item){
            return '<div class="telemetry-item">' +
                     '<div class="telemetry-lbl">' + item.lbl + '</div>' +
                     '<div class="telemetry-val ' + item.class + '">' + item.val + '</div>' +
                     '<div class="telemetry-bar"><div class="bar-fill ' + item.fill + '"></div></div>' +
                   '</div>';
          }).join('');
        }
      }
    });
  }

})();


