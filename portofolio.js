// =============================
// PT Tunas Tumbur Sejahtera — Portfolio page (clean)
// =============================
document.addEventListener('DOMContentLoaded', () => {
  // Helpers
  const $  = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
  const escapeHtml = s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
                                 .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
                                 .replace(/'/g,'&#039;');

  // Mobile nav
  (function(){
    const btn=$('#menuToggle'), dd=$('#navDropdown');
    if(!btn||!dd) return;
    const close=()=>{ dd.hidden=true; btn.setAttribute('aria-expanded','false'); };
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      dd.hidden=!dd.hidden;
      btn.setAttribute('aria-expanded', String(!dd.hidden));
    });
    document.addEventListener('click',e=>{
      if(!dd.hidden && !dd.contains(e.target) && e.target!==btn) close();
    });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&!dd.hidden) close(); });
  })();

  // Data gambar dengan i18n support
  const items = {
    id: [
      { title:'Pengiriman Box – Proyek 1',          tags:['Box Truck','Logistik'],      categories:['box','all'],        img:'asset/portofolio/portofolio1.jpg' },
      { title:'Proyek Khusus – Muatan Berat',       tags:['Special Project'],           categories:['special','all'],    img:'asset/portofolio/portofolio2.jpg' },
      { title:'Pengiriman Bak – Armada Truk Besar', tags:['Flatbed','Infrastruktur'],   categories:['flatbed','all'],    img:'asset/portofolio/portofolio3.jpg' },
      { title:'Antarkota – Barang Industri',        tags:['Intercity'],                 categories:['intercity','all'],  img:'asset/portofolio/portofolio4.jpg' },
      { title:'Antarpulau – Ekspedisi Logistik',    tags:['Interisland'],               categories:['interisland','all'],img:'asset/portofolio/portofolio5.jpg' }
    ],
    en: [
      { title:'Box Delivery – Project 1',          tags:['Box Truck','Logistics'],      categories:['box','all'],        img:'asset/portofolio/portofolio1.jpg' },
      { title:'Special Project – Heavy Load',       tags:['Special Project'],           categories:['special','all'],    img:'asset/portofolio/portofolio2.jpg' },
      { title:'Dump Truck Delivery – Large Fleet', tags:['Flatbed','Infrastructure'],   categories:['flatbed','all'],    img:'asset/portofolio/portofolio3.jpg' },
      { title:'Intercity – Industrial Goods',        tags:['Intercity'],                 categories:['intercity','all'],  img:'asset/portofolio/portofolio4.jpg' },
      { title:'Inter-island – Logistics Expedition',    tags:['Interisland'],               categories:['interisland','all'],img:'asset/portofolio/portofolio5.jpg' }
    ]
  };

  const grid = $('#portfolioGrid');

  // Get current language
  function getCurrentLang() {
    const lang = localStorage.getItem('lang') || 'id';
    console.log('Portfolio: Current language detected:', lang);
    return lang;
  }

  // Render
  function render(data){
    if(!grid) return;
    const currentLang = getCurrentLang();
    const currentItems = data[currentLang] || data.id;
    
    grid.innerHTML = currentItems.map(it=>{
      const tags = Array.isArray(it.tags)? it.tags.join(', ') : (it.tags||'');
      const cats = (it.categories||['all']).join(',');
      const title = escapeHtml(it.title);
      return `
        <article class="portfolio-item" data-categories="${cats}">
          <div class="portfolio-thumb-link" onclick="openPortfolioModal('${it.img}', '${title}')">
            <div class="portfolio-image-wrap">
              <img class="portfolio-image" loading="lazy" src="${it.img}" alt="${title}" onerror="this.src='asset/portofolio/portofolio1.jpg'">
              <div class="portfolio-overlay">
                <svg class="zoom-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="21 15 21 21 15 21"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <polyline points="3 9 3 3 9 3"></polyline>
                </svg>
              </div>
            </div>
          </div>
          <div class="portfolio-content">
            <h3 class="portfolio-title">${title}</h3>
            <div class="portfolio-tags">${tags}</div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Filter
  function applyFilter(f){
    $$('.portfolio-item', grid).forEach(el=>{
      const cats = el.getAttribute('data-categories').split(',');
      el.classList.toggle('hidden', !(f==='all'||cats.includes(f)));
    });
    setupReveal(); // refresh observer biar animasi muncul lagi
  }
  function setupFilters(){
    const btns=$$('.filter-btn');
    if(!btns.length) return;
    btns.forEach(b=>b.addEventListener('click',()=>{
      btns.forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      applyFilter(b.getAttribute('data-filter')||'all');
      restartAuto(); // sinkron slide
    }));
  }

  // Horizontal UX
  function enableHorizontalUX(el){
    if(!el) return;
    let down=false, startX=0, sl=0;
    el.addEventListener('mousedown',e=>{
      down=true; startX=e.pageX-el.offsetLeft; sl=el.scrollLeft; el.style.cursor='grabbing'; pauseAuto();
    });
    ['mouseleave','mouseup'].forEach(v=>el.addEventListener(v,()=>{ down=false; el.style.cursor=''; resumeAuto(); }));
    el.addEventListener('mousemove',e=>{
      if(!down) return; e.preventDefault();
      const x=e.pageX-el.offsetLeft; el.scrollLeft = sl - (x-startX)*1.5;
    });
    el.addEventListener('wheel',e=>{
      if(Math.abs(e.deltaX) < Math.abs(e.deltaY)){ el.scrollLeft += e.deltaY; e.preventDefault(); restartAuto(); }
    },{passive:false});
    el.setAttribute('tabindex','0');
    el.addEventListener('keydown',e=>{
      const step = getStep(el);
      if(e.key==='ArrowRight'){ el.scrollBy({left:step,behavior:'smooth'}); restartAuto(); }
      if(e.key==='ArrowLeft'){  el.scrollBy({left:-step,behavior:'smooth'}); restartAuto(); }
    });
    el.addEventListener('mouseenter', pauseAuto);
    el.addEventListener('mouseleave', resumeAuto);
  }

  // Reveal kiri/kanan
  let io;
  function setupReveal(){
    if(!grid) return;
    if(io) io.disconnect();
    let last=grid.scrollLeft, dir='right';
    grid.addEventListener('scroll',()=>{ const n=grid.scrollLeft; dir = n>last?'right':'left'; last=n; },{passive:true});
    io = new IntersectionObserver((ents)=>{
      ents.forEach(en=>{
        const el=en.target;
        if(el.classList.contains('hidden')) return;
        if(en.isIntersecting){
          el.classList.add('in-view', dir==='right'?'from-right':'from-left');
        } else {
          el.classList.remove('in-view','from-right','from-left');
        }
      });
    },{root:grid, threshold:.35});
    grid.querySelectorAll('.portfolio-item').forEach(el=>io.observe(el));
  }

  // Auto slide 1 detik unlimited
  let timer=null;
  const getStep = (el)=>{
    const card = el.querySelector('.portfolio-item:not(.hidden)');
    if(!card) return 320;
    const rect = card.getBoundingClientRect();
    const gap  = parseInt(getComputedStyle(el).gap||'24',10);
    return Math.round(rect.width + (isNaN(gap)?24:gap));
  };
  const startAuto = ()=>{
    stopAuto();
    timer = setInterval(()=>{
      const step = getStep(grid);
      grid.scrollBy({ left: step, behavior:'smooth' });
      // Reset to start when reaching end
      setTimeout(() => {
        if(grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 2) {
          grid.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }, 500);
    }, 3000);
  };
  const stopAuto = ()=>{ if(timer){ clearInterval(timer); timer=null; } };
  const pauseAuto = ()=> stopAuto();
  const resumeAuto = ()=> startAuto();
  const restartAuto = ()=>{ stopAuto(); startAuto(); };

  // Portfolio Modal
  function openPortfolioModal(imgSrc, title) {
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
      <div class="portfolio-modal-content">
        <button class="portfolio-modal-close" onclick="closePortfolioModal()">&times;</button>
        <img src="${imgSrc}" alt="${title}" class="portfolio-modal-image">
        <div class="portfolio-modal-title">${title}</div>
      </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
  }

  function closePortfolioModal() {
    const modal = document.querySelector('.portfolio-modal');
    if (modal) {
      modal.remove();
      document.body.style.overflow = '';
    }
  }

  // Global functions
  window.openPortfolioModal = openPortfolioModal;
  window.closePortfolioModal = closePortfolioModal;

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePortfolioModal();
    }
  });

  // Close modal on outside click
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('portfolio-modal')) {
      closePortfolioModal();
    }
  });

  // Language change handler
  function handleLanguageChange() {
    console.log('Portfolio: Language change detected, re-rendering...');
    render(items);
    setupReveal();
    restartAuto();
  }

  // Listen for language changes
  document.addEventListener('languageChanged', handleLanguageChange);
  
  // Direct event listeners for language toggle buttons
  const langToggle = document.getElementById('langToggle');
  const langToggleDD = document.getElementById('langToggleDD');
  
  if (langToggle) {
    langToggle.addEventListener('click', function() {
      console.log('Portfolio: Language toggle clicked');
      setTimeout(() => {
        console.log('Portfolio: Current lang after click:', localStorage.getItem('lang'));
        handleLanguageChange();
      }, 200);
    });
  }
  
  if (langToggleDD) {
    langToggleDD.addEventListener('click', function() {
      console.log('Portfolio: Language toggle DD clicked');
      setTimeout(() => {
        console.log('Portfolio: Current lang after DD click:', localStorage.getItem('lang'));
        handleLanguageChange();
      }, 200);
    });
  }
  
  // Monitor language changes with interval
  let lastLang = getCurrentLang();
  setInterval(() => {
    const currentLang = getCurrentLang();
    if (currentLang !== lastLang) {
      console.log('Portfolio: Language changed from', lastLang, 'to', currentLang);
      lastLang = currentLang;
      handleLanguageChange();
    }
  }, 1000);
  
  // Force English function
  window.forceEnglish = function() {
    console.log('Forcing English language...');
    localStorage.setItem('lang', 'en');
    handleLanguageChange();
  };
  
  // Force Indonesian function
  window.forceIndonesian = function() {
    console.log('Forcing Indonesian language...');
    localStorage.setItem('lang', 'id');
    handleLanguageChange();
  };
  
  // Debug function for testing language changes
  window.testPortfolioLanguage = function(lang) {
    console.log('Testing portfolio language:', lang);
    localStorage.setItem('lang', lang);
    handleLanguageChange();
  };
  
  // Check if script.js is working
  window.checkScriptJS = function() {
    console.log('=== Checking script.js integration ===');
    console.log('Current localStorage lang:', localStorage.getItem('lang'));
    console.log('langText element:', document.getElementById('langText')?.textContent);
    console.log('langToggle element:', document.getElementById('langToggle'));
    console.log('=====================================');
  };

  // Init
  render(items);
  setupFilters();
  enableHorizontalUX(grid);
  setupReveal();
  startAuto();
});
