document.getElementById('year').textContent = new Date().getFullYear();

// scroll reveal
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{threshold:.15});
revealEls.forEach(el=>io.observe(el));

// close mobile nav on link click
document.querySelectorAll('.main-nav a').forEach(a=>{
  a.addEventListener('click', ()=>{
    const t = document.getElementById('nav-toggle');
    if(t) t.checked = false;
  });
});

// mobile dropdown toggle (What We Do / Resources)
document.querySelectorAll('.dd-toggle').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    e.stopPropagation();
    const li = btn.closest('.has-drop');
    const isOpen = li.classList.contains('open');
    document.querySelectorAll('.has-drop.open').forEach(el=>{
      el.classList.remove('open');
      const b = el.querySelector('.dd-toggle');
      if(b) b.setAttribute('aria-expanded','false');
    });
    if(!isOpen){
      li.classList.add('open');
      btn.setAttribute('aria-expanded','true');
    }
  });
});
function highlightServiceCard(hash){
  const id = (hash || location.hash).replace('#','');
  const validIds = ['wellness-workshops','hobby-workshops','getaways','career-coaching'];
  if(!validIds.includes(id)) return;
  const card = document.getElementById(id);
  if(!card) return;
  document.querySelectorAll('.service-card.card-highlight').forEach(c=>c.classList.remove('card-highlight'));
  // restart animation even if same card is clicked again
  void card.offsetWidth;
  card.classList.add('card-highlight');
  setTimeout(()=>card.classList.remove('card-highlight'), 1900);
}

window.addEventListener('hashchange', ()=>highlightServiceCard());
window.addEventListener('DOMContentLoaded', ()=>{ if(location.hash) highlightServiceCard(); });
