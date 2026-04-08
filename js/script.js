// ============================================================================
// Enforced Dark Theme
// ============================================================================

/**
 * Forces dark mode on all pages.
 */
function initializeTheme() {
  const html = document.documentElement;
  html.classList.add("dark");
  localStorage.setItem("theme", "dark");
}

// ============================================================================
// Active Navigation Link Highlighting
// ============================================================================

/**
 * Highlights the active navigation link based on current page
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav a[data-page]");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("data-page");
    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ============================================================================
// Smooth Scroll for Anchor Links
// ============================================================================

function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// ============================================================================
// Scroll To Top Button
// ============================================================================

function initializeScrollToTop() {
  const scrollBtn = document.getElementById("scroll-to-top");
  if (!scrollBtn || scrollBtn.dataset.initialized === "true") {
    return;
  }

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  scrollBtn.dataset.initialized = "true";
}

// ============================================================================
// Hero Typing Effect (index.html)
// ============================================================================

function initializeHeroTyping() {
  const typedHero = document.getElementById("typed-hero");
  if (!typedHero || typedHero.dataset.initialized === "true") {
    return;
  }

  const fullText = typedHero.dataset.text || "Hi, I'm Biswas";
  let charIndex = 0;

  const tick = () => {
    charIndex += 1;
    typedHero.textContent = fullText.slice(0, charIndex);

    if (charIndex < fullText.length) {
      setTimeout(tick, 95);
      return;
    }
  };

  typedHero.textContent = "";
  typedHero.dataset.initialized = "true";
  tick();
}

// ============================================================================
// Mobile Navigation Menu
// ============================================================================

function initializeMobileMenu() {
  const menuToggleBtn = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (
    !menuToggleBtn ||
    !mobileMenu ||
    menuToggleBtn.dataset.initialized === "true"
  ) {
    return;
  }

  menuToggleBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.hidden;
    mobileMenu.hidden = !isHidden;
    menuToggleBtn.setAttribute("aria-expanded", isHidden ? "true" : "false");
  });

  menuToggleBtn.dataset.initialized = "true";
}

// ============================================================================
// Initialize on DOM Ready
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  setActiveNavLink();
  initializeMobileMenu();
  initializeSmoothScroll();
  initializeScrollToTop();
  initializeHeroTyping();
});

document.addEventListener("componentsLoaded", () => {
  initializeTheme();
  setActiveNavLink();
  initializeMobileMenu();
  initializeScrollToTop();
  initializeHeroTyping();
});
