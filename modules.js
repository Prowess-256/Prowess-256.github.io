/* modules.js — Shared Interactions for ICT Learning Hub */

/* ===== 1. GLOBAL NAVIGATION (navigation.js) ===== */
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const navMenu = document.querySelector('.global-nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      navMenu.classList.toggle('open');
    });
  }

  // Dropdown functionality (desktop hover + mobile click)
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    const link = item.querySelector('> a');
    const submenu = item.querySelector('.nav-submenu');

    if (submenu) {
      // Prevent default for dropdown toggles on mobile
      if (link && (link.getAttribute('href') === '#' || link.classList.contains('nav-dropdown-toggle'))) {
        link.addEventListener('click', function (e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            item.classList.toggle('open');
          }
        });
      }

      // Desktop: hover behavior
      item.addEventListener('mouseenter', function () {
        if (window.innerWidth > 768) {
          closeOtherDropdowns(item);
          item.classList.add('open');
        }
      });

      item.addEventListener('mouseleave', function () {
        if (window.innerWidth > 768) {
          item.classList.remove('open');
        }
      });
    }
  });

  // Close menu when clicking a submenu link
  const submenuItems = document.querySelectorAll('.submenu-item');
  submenuItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      if (navMenu && window.innerWidth <= 768) {
        navMenu.classList.remove('open');
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (navMenu && navMenu.classList.contains('open')) {
      if (!e.target.closest('.global-nav')) {
        navMenu.classList.remove('open');
      }
    }
  });

  // Helper: close other dropdowns
  function closeOtherDropdowns(currentItem) {
    navItems.forEach(item => {
      if (item !== currentItem && item.querySelector('.nav-submenu')) {
        item.classList.remove('open');
      }
    });
  }

  // Optional: set active nav item based on current page
  setActiveNav();

  function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-item > a');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.includes(currentPage)) {
        navItems.forEach(item => item.classList.remove('active'));
        link.closest('.nav-item').classList.add('active');
      }
    });
  }
});

/* ===== 2. REVEAL ON SCROLL (index.html) ===== */
(function initReveal() {
  const obs = new IntersectionObserver(
    entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(n => obs.observe(n));
})();

/* ===== 3. WEB COMPONENT: PROJECT CARD ===== */
class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    const title = this.getAttribute('title') || 'Project';
    const desc = this.getAttribute('desc') || '';
    const tags = this.getAttribute('tags') || '';
    const link = this.getAttribute('link') || '#';
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block}
        .card{background:linear-gradient(180deg,rgba(255,255,255,0.02),transparent);padding:16px;border-radius:10px;min-height:120px;display:flex;flex-direction:column;gap:8px}
        .title{font-weight:700}
        .tags{margin-top:auto;color:var(--muted, #9ca3af);font-size:.85rem}
        a{color:inherit;text-decoration:none}
      </style>
      <a href="${link}" class="card" rel="noopener">
        <div class="title">${escapeHtml(title)}</div>
        <div class="desc">${escapeHtml(desc)}</div>
        <div class="tags">${escapeHtml(tags)}</div>
      </a>
    `;
  }
}
customElements.define('project-card', ProjectCard);

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function (m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

/* ===== 4. THEME TOGGLE & SERVICE WORKER (optional) ===== */
(function initTheme() {
  const elYear = document.getElementById('year');
  if (elYear) elYear.textContent = new Date().getFullYear();

  const themeToggle = document.getElementById('theme-toggle');
  const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  const theme = saved || (preferDark ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const now = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = now;
      localStorage.setItem('theme', now);
      themeToggle.textContent = now === 'dark' ? '🌙' : '☀️';
    });
  }
})();

/* ===== 5. MODULE PROGRESS TRACKING (for modules with .progress-fill) ===== */
function bindProgressTracking() {
  const progressFill = document.getElementById('progressFill');
  if (!progressFill) return;

  function updateProgress() {
    const sections = document.querySelectorAll('.section, .activity');
    const scrollPosition = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;

    progressFill.style.width = `${scrollPercentage}%`;

    let visibleSection = 0;
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight / 2) visibleSection = index + 1;
    });

    const progressText = document.querySelector('.progress-text');
    if (progressText) {
      const totalSections = sections.length;
      progressText.innerHTML = `<span>${Math.round(scrollPercentage)}% Complete</span><span>${visibleSection} of ${totalSections} Sections</span>`;
    }
  }

  window.addEventListener('scroll', updateProgress);
  window.addEventListener('load', updateProgress);
}
bindProgressTracking();

/* ===== 6. MODULE QUIZ HANDLER (generic) ===== */
function initModuleQuizzes() {
  document.querySelectorAll('.quiz-option').forEach(option => {
    if (option.hasAttribute('data-quiz-bound')) return;
    option.setAttribute('data-quiz-bound', 'true');

    option.addEventListener('click', function (e) {
      const container = this.closest('.quiz');
      if (!container) return;

      const options = container.querySelectorAll('.quiz-option');
      const feedback = container.querySelector('.quiz-feedback');

      options.forEach(opt => opt.classList.remove('selected'));
      this.classList.add('selected');

      const isCorrect = this.getAttribute('data-correct') === 'true';
      if (feedback) {
        feedback.textContent = isCorrect ? '✓ Correct! Well done.' : '✗ Incorrect. Review the material and try again.';
        feedback.className = isCorrect ? 'quiz-feedback correct' : 'quiz-feedback incorrect';
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', initModuleQuizzes);

/* ===== 7. SMOOTH SCROLLING (local anchors) ===== */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
        // close mobile menu if open
        const mobileMenu = document.querySelector('.global-nav-menu');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
        }
      }
    });
  });
});

/* ===== 8. TICKING TIMER MODULE (isolated, only if elements exist) ===== */
function initTickingTimer() {
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const muteBtn = document.getElementById('muteBtn');
  const bpmEl = document.getElementById('bpm');
  const volumeEl = document.getElementById('volume');
  const bpmDisplay = document.getElementById('bpmDisplay');
  const pulseEl = document.getElementById('pulse');
  const accentEl = document.getElementById('accent');

  if (!startBtn) return;

  let audioCtx = null;
  let masterGain = null;
  let isRunning = false;
  let nextNoteTime = 0;
  let schedulerTimerID = null;
  let currentBeat = 0;
  let wasMuted = false;

  function ensureAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = parseFloat(volumeEl.value);
      masterGain.connect(audioCtx.destination);
    }
  }

  function scheduleTick(time, strong = false) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.value = strong ? 1400 : 1000;
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(0.9, time + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.065);
    osc.connect(g);

    const bufferSize = 0.1 * audioCtx.sampleRate;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (strong ? 0.4 : 0.25);
    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(strong ? 0.6 : 0.4, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.06);
    const lp = audioCtx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = strong ? 4000 : 3500;
    noise.connect(noiseGain);
    noiseGain.connect(lp);
    lp.connect(g);
    g.connect(masterGain);

    osc.start(time);
    osc.stop(time + 0.08);
    noise.start(time);
    noise.stop(time + 0.08);
  }

  function doVisualPulse() {
    if (!pulseEl) return;
    pulseEl.style.transition = 'none';
    pulseEl.style.opacity = '1';
    pulseEl.style.transform = 'scale(1)';
    setTimeout(() => {
      pulseEl.style.transition = 'opacity 420ms ease-out, transform 420ms ease-out';
      pulseEl.style.opacity = '0';
      pulseEl.style.transform = 'scale(2)';
    }, 10);
  }

  function scheduler() {
    if (!isRunning) return;
    const currentTime = audioCtx.currentTime;
    while (nextNoteTime < currentTime + 0.1) {
      const bpm = parseFloat(bpmEl.value);
      const secondsPerBeat = 60.0 / bpm;
      const strong = accentEl.checked && currentBeat % 4 === 0;
      scheduleTick(nextNoteTime, strong);
      const msDelay = Math.max(0, (nextNoteTime - currentTime) * 1000);
      setTimeout(doVisualPulse, msDelay);
      nextNoteTime += secondsPerBeat;
      currentBeat = (currentBeat + 1) % 64;
    }
  }

  function start() {
    ensureAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    isRunning = true;
    nextNoteTime = audioCtx.currentTime + 0.05;
    currentBeat = 0;
    if (schedulerTimerID) clearInterval(schedulerTimerID);
    schedulerTimerID = setInterval(scheduler, 25);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }

  function stop() {
    isRunning = false;
    if (schedulerTimerID) {
      clearInterval(schedulerTimerID);
      schedulerTimerID = null;
    }
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }

  function toggleMute() {
    if (!audioCtx) ensureAudio();
    wasMuted = !wasMuted;
    masterGain.gain.value = wasMuted ? 0.0 : parseFloat(volumeEl.value);
    muteBtn.textContent = wasMuted ? 'Unmute' : 'Mute';
  }

  volumeEl.addEventListener('input', () => {
    if (!audioCtx) return;
    if (!wasMuted) masterGain.gain.value = parseFloat(volumeEl.value);
  });
  bpmEl.addEventListener('input', () => {
    if (bpmDisplay) bpmDisplay.textContent = bpmEl.value;
  });

  startBtn.addEventListener('click', () => {
    ensureAudio();
    start();
  });
  stopBtn.addEventListener('click', stop);
  muteBtn.addEventListener('click', toggleMute);

  document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!isRunning) {
        ensureAudio();
        start();
      } else {
        stop();
      }
    }
  });
  stopBtn.disabled = true;
  if (bpmDisplay) bpmDisplay.textContent = bpmEl.value;
}
initTickingTimer();
