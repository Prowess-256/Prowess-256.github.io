const elYear = document.getElementById('year');
if(elYear) elYear.textContent = new Date().getFullYear();

// Theme toggle (prefers-color-scheme aware)
const themeToggle = document.getElementById('theme-toggle');
const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme');
const theme = saved || (preferDark ? 'dark' : 'light');
document.documentElement.dataset.theme = theme;
if(themeToggle){themeToggle.addEventListener('click',()=>{
  const now = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = now;
  localStorage.setItem('theme', now);
  themeToggle.textContent = now === 'dark' ? '🌙' : '☀️';
});}

// Reveal on scroll
const obs = new IntersectionObserver(entries=>{
  for(const e of entries){
    if(e.isIntersecting){
      e.target.classList.add('in');
      obs.unobserve(e.target);
    }
  }
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(n=>obs.observe(n));

// Simple Web Component for project cards
class ProjectCard extends HTMLElement{
  constructor(){super();this.attachShadow({mode:'open'});}
  connectedCallback(){
    const title=this.getAttribute('title')||'Project';
    const desc=this.getAttribute('desc')||'';
    const tags=this.getAttribute('tags')||'';
    const link=this.getAttribute('link')||'#';
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block}
        .card{background:linear-gradient(180deg,rgba(255,255,255,0.02),transparent);padding:16px;border-radius:10px;min-height:120px;display:flex;flex-direction:column;gap:8px}
        .title{font-weight:700}
        .tags{margin-top:auto;color:var(--muted);font-size:.85rem}
        a{color:inherit;text-decoration:none}
      </style>
      <a href="${link}" class="card" rel="noopener">
        <div class="title">${title}</div>
        <div class="desc">${desc}</div>
        <div class="tags">${tags}</div>
      </a>
    `;
  }
}
customElements.define('project-card',ProjectCard);

// Register service worker for offline and PWA features
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('/sw.js').catch(()=>{});
  });
}
