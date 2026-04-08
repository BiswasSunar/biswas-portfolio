/**
 * Load external components (navbar and footer) into the page
 */

async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    const content = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = content;
      if (elementId === "navbar-container") {
        setActiveNavLink();
      }
    }
  } catch (error) {
    console.error(`Error loading component ${filePath}:`, error);
  }
}

// Load components when DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("navbar-container", "navbar.html");
  await loadComponent("footer-container", "footer.html");
  document.dispatchEvent(new Event("componentsLoaded"));
});
