// ===== 1. DARK / LIGHT MODE =====
const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

// Load saved theme (try/catch in case storage is unavailable)
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
} catch (e) {}
updateThemeIcon();

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
  updateThemeIcon();
});

function updateThemeIcon() {
  themeBtn.textContent = root.getAttribute("data-theme") === "dark" ? "🌙" : "☀️";
}

// ===== 2. MOBILE MENU =====
const menuBtn = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuBtn.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
});

// Close the menu after tapping a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

// ===== 3. SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== 4. ACTIVE NAV LINK =====
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let current = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}

// ===== 5. BACK TO TOP BUTTON =====
const backTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 400);
  setActiveLink();
});
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
setActiveLink();

// ===== 6. MISSING IMAGE FALLBACK =====
// If an image file is not found, hide it so the gradient placeholder shows
document.querySelectorAll(".img-box img").forEach((img) => {
  img.addEventListener("error", () => img.classList.add("missing"));
});

// ===== 7. FOOTER YEAR =====
document.getElementById("year").textContent = new Date().getFullYear();