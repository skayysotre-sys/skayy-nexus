/* Skayy Panel - layar sambutan untuk Pterodactyl
   Muncul sekali per sesi browser. Tes ulang: tambahkan ?welcome ke link. */
(function () {
  var KEY = 'skayy-welcome', TITLE = 'Skayy Panel', SUB = 'Kelola server kamu dengan mudah', LOGO = (window.SKAYY_LOGO || '/skayy/logo.jpg'), AUTO_MS = 4200;
  try { if (sessionStorage.getItem(KEY) && !/[?&]welcome\b/.test(location.search)) return; } catch (e) {}
  var css = '#skw{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 40%,#1b1450,#0b1020 70%);overflow:hidden;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#e8ecff;transition:opacity .6s,transform .6s,filter .6s}' +
    '#skw.o{opacity:0;transform:scale(1.08);filter:blur(10px);pointer-events:none}' +
    '#skw .b{position:absolute;inset:-25%;background:conic-gradient(from 0deg,transparent,rgba(110,231,255,.2),transparent 30%,rgba(244,114,182,.2),transparent 60%,rgba(167,139,250,.22),transparent);animation:skr 12s linear infinite;filter:blur(40px)}' +
    '@keyframes skr{to{transform:rotate(360deg)}}' +
    '#skw .i{position:relative;text-align:center;padding:0 16px;width:min(92vw,460px)}' +
    '#skw img{width:84px;height:84px;border-radius:24px;object-fit:cover;box-shadow:0 0 44px rgba(167,139,250,.6);animation:skp .9s cubic-bezier(.2,1.4,.3,1) both}' +
    '@keyframes skp{from{opacity:0;transform:scale(.3) rotate(-25deg)}}' +
    '#skw .a{margin-top:20px;letter-spacing:.35em;text-transform:uppercase;font-size:.8rem;color:#9fb0ff;opacity:0;animation:skf .8s .5s both}' +
    '@keyframes skf{from{opacity:0;transform:translateY(10px)}to{opacity:1}}' +
    '#skw h1{margin:6px 0 0;font-size:clamp(2.3rem,12vw,3.6rem);line-height:1.1;font-weight:800;display:flex;justify-content:center;flex-wrap:wrap}' +
    '#skw h1 span{display:inline-block;opacity:0;background:linear-gradient(180deg,#fff,#6ee7ff 55%,#a78bfa);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 14px rgba(110,231,255,.5));animation:skl .7s cubic-bezier(.2,1.3,.3,1) both}' +
    '@keyframes skl{from{opacity:0;transform:translateY(40px) scale(.4) rotate(12deg);filter:blur(8px)}to{opacity:1}}' +
    '#skw p.s{margin:10px 0 0;font-size:.92rem;color:#c7d0ff;opacity:0;animation:skf .8s 1.9s both}' +
    '#skw button{margin-top:28px;padding:12px 30px;border:0;border-radius:99px;font-weight:700;font-size:1rem;color:#fff;cursor:pointer;background:linear-gradient(135deg,#2563eb,#7c3aed);box-shadow:0 8px 30px rgba(124,58,237,.45);opacity:0;animation:skf .8s 2.3s both}' +
    '#skw .bar{position:absolute;left:0;bottom:0;height:3px;width:100%;background:linear-gradient(90deg,#6ee7ff,#a78bfa,#f472b6);transform-origin:left;animation:skbar ' + AUTO_MS + 'ms linear both}' +
    '@keyframes skbar{from{transform:scaleX(0)}to{transform:scaleX(1)}}' +
    '@media (prefers-reduced-motion:reduce){#skw .b{animation:none}#skw *{animation-duration:.01s!important;animation-delay:0s!important}}';
  var st = document.createElement('style'); st.textContent = css;
  var w = document.createElement('div'); w.id = 'skw'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-label', 'Welcome to ' + TITLE);
  w.innerHTML = '<div class="b"></div><div class="i"><img alt="" src="' + LOGO + '"><div class="a">Welcome to</div><h1 aria-label="' + TITLE + '"></h1><p class="s"></p><button type="button">Masuk ke panel</button></div><div class="bar"></div>';
  var h = w.querySelector('h1'); TITLE.split('').forEach(function (c, i) { var s = document.createElement('span'); s.textContent = c === ' ' ? ' ' : c; s.style.animationDelay = (0.9 + i * 0.085) + 's'; h.appendChild(s); });
  w.querySelector('.s').textContent = SUB;
  w.querySelector('img').onerror = function () { this.style.display = 'none'; };
  var done = false, prevOverflow;
  function close() {
    if (done) return; done = true;
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    w.classList.add('o'); document.documentElement.style.overflow = prevOverflow || '';
    setTimeout(function () { if (w.parentNode) w.parentNode.removeChild(w); if (st.parentNode) st.parentNode.removeChild(st); }, 700);
  }
  function show() {
    var root = document.documentElement; prevOverflow = root.style.overflow; root.style.overflow = 'hidden';
    root.appendChild(st); root.appendChild(w);
    w.querySelector('button').onclick = close; w.onclick = function (e) { if (e.target === w) close(); };
    setTimeout(close, AUTO_MS);
  }
  show();
})();
