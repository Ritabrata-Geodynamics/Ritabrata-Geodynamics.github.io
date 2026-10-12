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
