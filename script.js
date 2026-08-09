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

})();
