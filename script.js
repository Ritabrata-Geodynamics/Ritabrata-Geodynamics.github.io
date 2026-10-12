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

// Research slideshow: automatically advances every five seconds.
document.querySelectorAll('.research-carousel').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('.research-slide')];
  const dots = [...carousel.querySelectorAll('[data-slide]')];
  const play = carousel.querySelector('[data-play]');
  if (!slides.length) return;
  let current = 0, playing = true, timer;
  const intervalMs = 5000;
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== current;
      slide.classList.toggle('slide-visible', i === current);
    });
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === current)));
    carousel.querySelector('.slide-count').textContent = `${current + 1} / ${slides.length}`;
  }
  function schedule() {
    clearInterval(timer);
    play.textContent = playing ? 'Pause slideshow' : 'Play slideshow';
    play.setAttribute('aria-label', playing ? 'Pause automatic slideshow' : 'Start automatic slideshow');
    if (playing && !document.hidden) timer = setInterval(() => show(current + 1), intervalMs);
  }
  carousel.querySelector('[data-prev]').addEventListener('click', () => { show(current - 1); schedule(); });
  carousel.querySelector('[data-next]').addEventListener('click', () => { show(current + 1); schedule(); });
  play.addEventListener('click', () => { playing = !playing; schedule(); });
  dots.forEach(dot => dot.addEventListener('click', () => { show(Number(dot.dataset.slide)); schedule(); }));
  document.addEventListener('visibilitychange', schedule);
  show(0);
  schedule();
});
