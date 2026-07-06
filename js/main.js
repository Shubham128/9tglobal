// ===== Year =====
document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());

// ===== Header: transparent -> solid on scroll =====
(function(){
  const header = document.querySelector('header.site-header');
  if(!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

// ===== Drawer menu =====
(function(){
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  const openBtn = document.getElementById('hamburger');
  const closeBtn = document.getElementById('drawerClose');
  if(!drawer) return;
  const open = () => { drawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; };
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
})();

// ===== Hero slider =====
(function(){
  const slider = document.querySelector('.hero-slider');
  if(!slider) return;
  const slides = slider.querySelectorAll('.slide');
  const dotsWrap = slider.querySelector('.slider-dots');
  let idx = 0, timer;

  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Go to slide ' + (i+1));
    if(i === 0) b.classList.add('active');
    b.addEventListener('click', () => { go(i); restart(); });
    dotsWrap.appendChild(b);
  });
  const dots = dotsWrap.querySelectorAll('button');

  function go(i){
    slides[idx].classList.remove('active');
    dots[idx].classList.remove('active');
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add('active');
    dots[idx].classList.add('active');
  }
  function restart(){
    clearInterval(timer);
    timer = setInterval(() => go(idx + 1), 6500);
  }
  const prev = slider.querySelector('.slider-arrow.prev');
  const next = slider.querySelector('.slider-arrow.next');
  if(prev) prev.addEventListener('click', () => { go(idx - 1); restart(); });
  if(next) next.addEventListener('click', () => { go(idx + 1); restart(); });
  restart();
})();

// ===== Floating quick panel =====
(function(){
  const fab = document.getElementById('fabBtn');
  const panel = document.getElementById('floatPanel');
  if(fab && panel){
    fab.addEventListener('click', (e) => { e.stopPropagation(); panel.classList.toggle('open'); });
    document.addEventListener('click', (e) => {
      if(!panel.contains(e.target)) panel.classList.remove('open');
    });
  }
})();

// ===== Contact / demo form =====
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const success = document.getElementById('formSuccess');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(success){ success.style.display = 'block'; }
    form.reset();
  });
})();
