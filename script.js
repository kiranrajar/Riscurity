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

  /* ---------- RISKMATE AI CHATBOT & LEAD CAPTURE SYSTEM ---------- */
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

  // Login Elements
  var loginOverlay = document.getElementById('riskmateLoginOverlay');
  var loginForm = document.getElementById('riskmateLoginForm');
  var inputName = document.getElementById('riskmateName');
  var inputEmail = document.getElementById('riskmateEmail');
  var userStatusEl = document.getElementById('riskmateUserStatus');

  if(chatToggle && chatWindow){
    var chatOpen = false;
    var currentUser = null;

    // Check existing login in localStorage
    try {
      var saved = localStorage.getItem('riskmate_user');
      if(saved){ currentUser = JSON.parse(saved); }
    } catch(err){}

    function initChatView(){
      if(currentUser && currentUser.name){
        if(loginOverlay) loginOverlay.classList.add('hidden');
        if(userStatusEl) userStatusEl.textContent = 'Active · ' + currentUser.name;
        
        if(!chatBody.children.length){
          renderWelcomeMsg();
        }
      } else {
        if(loginOverlay) loginOverlay.classList.remove('hidden');
      }
    }

    function renderWelcomeMsg(){
      var userName = currentUser ? currentUser.name : 'there';
      chatBody.innerHTML = '';
      appendMessage(
        '<p>Hi <b>' + userName + '</b>! 👋 Welcome to <b>Riskcurity</b>.<br>I\'m <b>Riskmate AI</b>, your guide for <b>Web Development, AI Automation, SOC &amp; GRC</b>. Ask me anything or choose a topic below!</p>',
        'bot',
        [
          { label: '🌐 Web Development', topic: 'web' },
          { label: '🤖 AI Automation', topic: 'ai' },
          { label: '👁️ SOC 24/7 Watch', topic: 'soc' },
          { label: '🛡️ GRC Compliance', topic: 'grc' },
          { label: '⚔️ VAPT Audit', topic: 'vapt' },
          { label: '📩 Send Inquiry to Team', topic: 'lead', highlight: true }
        ]
      );
    }

    // Toggle Chat
    function toggleChat(state){
      chatOpen = typeof state === 'boolean' ? state : !chatOpen;
      chatWindow.classList.toggle('active', chatOpen);
      chatWindow.setAttribute('aria-hidden', chatOpen ? 'false' : 'true');
      if(bubble) bubble.classList.add('closed');
      if(badge) badge.style.display = 'none';

      if(chatOpen){
        initChatView();
        if(currentUser && chatInput){
          setTimeout(function(){ chatInput.focus(); }, 300);
        }
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

    // Login Form Submission
    if(loginForm){
      loginForm.addEventListener('submit', function(e){
        e.preventDefault();
        var n = inputName.value.trim();
        var em = inputEmail.value.trim();
        if(!n || !em) return;

        currentUser = { name: n, email: em };
        try {
          localStorage.setItem('riskmate_user', JSON.stringify(currentUser));
        } catch(err){}

        // Pre-fill website contact form if empty
        var fname = document.getElementById('fname');
        var femail = document.getElementById('femail');
        if(fname && !fname.value) fname.value = n;
        if(femail && !femail.value) femail.value = em;

        initChatView();
      });
    }

    // Comprehensive Service Knowledge Answers
    var kbAnswers = {
      web: {
        title: "🌐 Secure Web Development",
        text: "We build modern, <b>secure-by-design web applications, SaaS platforms, and enterprise portals</b> with built-in OWASP vulnerability protection, fast APIs, and modern responsive UI/UX.",
        serviceVal: "Web Development"
      },
      ai: {
        title: "🤖 AI Agents & Automation",
        text: "We design <b>Autonomous AI Agents</b>, LLM RAG engines, automated ticket triage, Python/Node process automation, and intelligent workflows that eliminate manual operational toil.",
        serviceVal: "AI Agents & Automation"
      },
      soc: {
        title: "👁️ 24/7 SOC Operations",
        text: "Our dedicated <b>Security Operations Center (SOC)</b> provides 24/7 analyst monitoring around the clock, triaging alerts and neutralizing threats before they impact your infrastructure.",
        serviceVal: "SOC & SIEM"
      },
      siem: {
        title: "📡 SIEM Engineering",
        text: "We tune custom <b>SIEM log pipelines</b>, correlation rules, and detection dashboards so real security threats surface instantly without noise.",
        serviceVal: "SOC & SIEM"
      },
      grc: {
        title: "🛡️ GRC Compliance Automation",
        text: "We automate compliance evidence mapping for <b>ISO 27001</b>, <b>SOC 2 Type II</b>, and NIST audit frameworks — replacing spreadsheets with automated audit trails.",
        serviceVal: "GRC Automation"
      },
      vapt: {
        title: "⚔️ VAPT Penetration Testing",
        text: "Our <b>VAPT service</b> tests your web apps, APIs, network, and cloud against real-world attack vectors, delivering impact-ranked remediation reports.",
        serviceVal: "VAPT"
      },
      lead: {
        title: "📩 Direct Team Contact",
        text: "Would you like to send a direct project inquiry or request a quote for our team? Type your inquiry below and Riskmate will send it straight to <b>riskecurity@gmail.com</b>!",
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

    // Lead Dispatch Function via Web3Forms API to riskecurity@gmail.com
    function sendLeadToEmail(userQuery, done){
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
      .then(function(res){ return res.json(); })
      .then(function(data){
        if(data.success){
          done(true);
        } else {
          done(false);
        }
      })
      .catch(function(err){ done(false); });
    }

    function triggerResponse(topicKey, customQuery){
      chatTyping.style.display = 'flex';
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(function(){
        chatTyping.style.display = 'none';

        if(topicKey && kbAnswers[topicKey]){
          var item = kbAnswers[topicKey];
          var followUpChips = [
            { label: '📩 Send Inquiry to Team', topic: 'lead', highlight: true },
            { label: '🌐 Web Dev', topic: 'web' },
            { label: '🤖 AI Agents', topic: 'ai' },
            { label: '👁️ SOC Watch', topic: 'soc' },
            { label: '🛡️ GRC Audit', topic: 'grc' }
          ].filter(function(c){ return c.topic !== topicKey; });

          appendMessage('<p>' + item.text + '</p>', 'bot', followUpChips);

          if(fserviceSelect && item.serviceVal){
            for(var i=0; i<fserviceSelect.options.length; i++){
              if(fserviceSelect.options[i].text.indexOf(item.serviceVal) !== -1){
                fserviceSelect.selectedIndex = i;
                break;
              }
            }
          }
          if(topicKey === 'lead'){
            appendMessage('<p>Please type your project details or question in the box below, and I will dispatch it to riskecurity@gmail.com right away!</p>', 'bot');
          }

        } else if(customQuery){
          var q = customQuery.toLowerCase();
          var matchedTopic = null;

          if(q.indexOf('web') !== -1 || q.indexOf('site') !== -1 || q.indexOf('dev') !== -1 || q.indexOf('app') !== -1 || q.indexOf('frontend') !== -1 || q.indexOf('backend') !== -1){
            matchedTopic = 'web';
          } else if(q.indexOf('ai') !== -1 || q.indexOf('agent') !== -1 || q.indexOf('autom') !== -1 || q.indexOf('llm') !== -1 || q.indexOf('bot') !== -1){
            matchedTopic = 'ai';
          } else if(q.indexOf('soc') !== -1 || q.indexOf('monitoring') !== -1 || q.indexOf('24/7') !== -1 || q.indexOf('threat') !== -1){
            matchedTopic = 'soc';
          } else if(q.indexOf('siem') !== -1 || q.indexOf('log') !== -1){
            matchedTopic = 'siem';
          } else if(q.indexOf('grc') !== -1 || q.indexOf('iso') !== -1 || q.indexOf('soc 2') !== -1 || q.indexOf('audit') !== -1 || q.indexOf('compliance') !== -1){
            matchedTopic = 'grc';
          } else if(q.indexOf('vapt') !== -1 || q.indexOf('pen') !== -1 || q.indexOf('test') !== -1 || q.indexOf('vuln') !== -1){
            matchedTopic = 'vapt';
          }

          if(matchedTopic){
            triggerResponse(matchedTopic);
          } else {
            // Treat as custom inquiry lead to dispatch to riskecurity@gmail.com
            chatTyping.style.display = 'flex';
            sendLeadToEmail(customQuery, function(success){
              chatTyping.style.display = 'none';
              if(success){
                appendMessage(
                  '<p>✓ <b>Inquiry Sent to Riskcurity Team!</b><br>Your message was delivered to <b>riskecurity@gmail.com</b>. Our engineers will reply to <b>' + (currentUser ? currentUser.email : 'your email') + '</b> within 1 business day!</p>',
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
        renderWelcomeMsg();
      });
    }
  }

})();



