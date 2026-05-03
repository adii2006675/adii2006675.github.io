/* ============================================
   ADI SHARMA PORTFOLIO - script.js
   Shared animations: red lines + nav menu
   ============================================ */

// ─── RED LINES BACKGROUND ───
(function() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, mouse = { x: -999, y: -999 };
  let lines = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initLines();
  }

  function initLines() {
    const count = Math.floor(W / 90);
    lines = [];
    for (let i = 0; i < count; i++) {
      lines.push({
        x: (W / count) * i + (W / count) * 0.5,
        baseX: (W / count) * i + (W / count) * 0.5,
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
        alpha: 0.04 + Math.random() * 0.06,
        width: 0.5 + Math.random() * 0.5,
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    lines.forEach(line => {
      // Slow wave motion
      const wave = Math.sin(t * 0.0003 * line.speed + line.offset) * 8;

      // Mouse repulsion
      const dx = line.x - mouse.x;
      const dist = Math.abs(dx);
      const repulse = dist < 120 ? (120 - dist) * 0.18 * Math.sign(dx) : 0;

      line.x = line.baseX + wave + repulse;

      // Gradient: fade at top and bottom
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.1, `rgba(180,30,20,${line.alpha})`);
      grad.addColorStop(0.5, `rgba(192,57,43,${line.alpha * 1.5})`);
      grad.addColorStop(0.9, `rgba(180,30,20,${line.alpha})`);
      grad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(line.x, 0);
      ctx.lineTo(line.x, H);
      ctx.strokeStyle = grad;
      ctx.lineWidth = line.width;
      ctx.stroke();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  resize();
  requestAnimationFrame(draw);
})();

// ─── NAV MENU ───
(function() {
  const btn = document.getElementById('menu-btn');
  const overlay = document.getElementById('menu-overlay');
  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      btn.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();

// ─── SCROLL REVEAL ───
(function() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
})();
