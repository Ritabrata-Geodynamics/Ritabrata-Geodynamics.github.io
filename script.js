const menu = document.querySelector(".menu"),
  nav = document.querySelector("#nav");
function closeMenu() {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
}
menu?.addEventListener("click", () => {
  menu.setAttribute("aria-expanded", String(nav.classList.toggle("open")));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav?.classList.contains("open")) {
    closeMenu();
    menu.focus();
  }
});
nav?.addEventListener("click", (e) => {
  if (e.target.closest("a")) closeMenu();
});
const search = document.querySelector("#pub-search"),
  year = document.querySelector("#pub-year");
function filterPublications() {
  let count = 0;
  document.querySelectorAll(".publications .publication").forEach((p) => {
    const show =
      p.textContent.toLowerCase().includes(search.value.trim().toLowerCase()) &&
      (!year.value || p.dataset.year === year.value);
    p.hidden = !show;
    if (show) count++;
  });
  document.querySelector("#pub-status").textContent =
    `${count} publication${count === 1 ? "" : "s"}`;
  document.querySelector("#pub-empty").hidden = count !== 0;
}
search?.addEventListener("input", filterPublications);
year?.addEventListener("change", filterPublications);
const topButton = document.querySelector(".back-top");
window.addEventListener(
  "scroll",
  () => {
    topButton.hidden = window.scrollY < 500;
  },
  { passive: true },
);
topButton?.addEventListener("click", () =>
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  }),
);

const toggle = document.querySelector("#theme-toggle");
function syncTheme() {
  toggle.setAttribute(
    "aria-pressed",
    String(document.documentElement.dataset.theme === "dark"),
  );
}
syncTheme();
toggle.addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme !== "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  try {
    localStorage.setItem("rd-theme", dark ? "dark" : "light");
  } catch (e) {}
  syncTheme();
});

// Research slideshow: change intervalMs to adjust automatic rotation.
document.querySelectorAll('.research-carousel').forEach(carousel=>{
 const slides=[...carousel.querySelectorAll('.research-slide')],dots=[...carousel.querySelectorAll('[data-slide]')],play=carousel.querySelector('[data-play]'),reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let current=0,playing=!reduced.matches,hover=false,focused=false,timer;
 const intervalMs=6000;
 function show(index){current=(index+slides.length)%slides.length;slides.forEach((s,i)=>s.hidden=i!==current);dots.forEach((d,i)=>d.setAttribute('aria-pressed',String(i===current)));carousel.querySelector('.slide-count').textContent=`${current+1} / ${slides.length}`}
 function schedule(){clearInterval(timer);play.textContent=playing?'Pause slideshow':'Play slideshow';if(playing&&!hover&&!focused&&!document.hidden)timer=setInterval(()=>show(current+1),intervalMs)}
 carousel.querySelector('[data-prev]').addEventListener('click',()=>{show(current-1);schedule()});carousel.querySelector('[data-next]').addEventListener('click',()=>{show(current+1);schedule()});
 play.addEventListener('click',()=>{playing=!playing;schedule()});dots.forEach(d=>d.addEventListener('click',()=>{show(Number(d.dataset.slide));schedule()}));
 carousel.addEventListener('mouseenter',()=>{hover=true;schedule()});carousel.addEventListener('mouseleave',()=>{hover=false;schedule()});carousel.addEventListener('focusin',()=>{focused=true;schedule()});carousel.addEventListener('focusout',()=>setTimeout(()=>{focused=carousel.contains(document.activeElement);schedule()},0));
 document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',()=>{if(reduced.matches)playing=false;schedule()});show(0);schedule();
});
