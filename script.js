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

  /* ---------- direct email button handler ---------- */
  var sendEmailBtn = document.getElementById('sendEmailBtn');
  var fname = document.getElementById('fname');
  var femail = document.getElementById('femail');
  var fservice = document.getElementById('fservice');
  var fmsg = document.getElementById('fmsg');

  function updateMailto(){
    if(!sendEmailBtn) return;
    var nameVal = fname ? fname.value.trim() : '';
    var emailVal = femail ? femail.value.trim() : '';
    var serviceVal = fservice ? fservice.value : '';
    var msgVal = fmsg ? fmsg.value.trim() : '';

    var subject = encodeURIComponent('Booking Inquiry' + (nameVal ? ' from ' + nameVal : ' — Riskcurity'));
    var body = encodeURIComponent(
      'Client Name: ' + (nameVal || 'N/A') + '\n' +
      'Client Email: ' + (emailVal || 'N/A') + '\n' +
      'Service Required: ' + (serviceVal || 'N/A') + '\n\n' +
      'Message / Project Details:\n' + (msgVal || 'N/A')
    );

    sendEmailBtn.href = 'mailto:riskecurity@gmail.com?subject=' + subject + '&body=' + body;
  }

  [fname, femail, fservice, fmsg].forEach(function(el){
    if(el){
      el.addEventListener('input', updateMailto);
      el.addEventListener('change', updateMailto);
    }
  });

  if(sendEmailBtn){
    sendEmailBtn.addEventListener('click', updateMailto);
  }

})();
