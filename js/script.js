// ============================================================================
// Theme Toggle - Dark/Light Mode
// ============================================================================

/**
 * Initializes theme preference from localStorage and applies it
 * Watches for system color scheme preference if no user preference is set
 */
function initializeTheme() {
  const html = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");

  // Get saved theme preference from localStorage
  const savedTheme = localStorage.getItem("theme");

  // Determine initial theme
  let isDarkMode;
  if (savedTheme) {
    isDarkMode = savedTheme === "dark";
  } else {
    // Check system preference
    isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // Apply theme
  applyTheme(isDarkMode);

  // Set up toggle button listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentMode = html.classList.contains("dark");
      applyTheme(!currentMode);
    });
  }
}

/**
 * Applies theme to the document and saves preference
 * @param {boolean} isDarkMode - True for dark mode, false for light mode
 */
function applyTheme(isDarkMode) {
  const html = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");

  if (isDarkMode) {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }

  // Update theme toggle button icon/text
  if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector("svg");
    if (icon) {
      icon.setAttribute(
        "aria-label",
        isDarkMode ? "Switch to light mode" : "Switch to dark mode",
      );
    }
  }
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

  const toggleVisibility = () => {
    if (window.scrollY > 240) {
      scrollBtn.classList.remove("hidden");
    } else {
      scrollBtn.classList.add("hidden");
    }
  };

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  scrollBtn.dataset.initialized = "true";
  toggleVisibility();
}

// ============================================================================
// Initialize on DOM Ready
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  setActiveNavLink();
  initializeSmoothScroll();
  initializeScrollToTop();
});

document.addEventListener("componentsLoaded", () => {
  initializeTheme();
  setActiveNavLink();
  initializeScrollToTop();
});
