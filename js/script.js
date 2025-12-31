import "./core/events.js";

const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll("nav a[data-nav], nav > div > a");

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (
    currentPath.endsWith(href) ||
    currentPath.includes(href.replace(/^\//, ""))
  ) {
    link.classList.add("bg-blue-100", "text-black");

    const submenu = link.closest(".sidebar-submenu");
    if (submenu) {
      submenu.classList.remove("hidden");
      const parentButton = submenu.previousElementSibling;
      if (parentButton && parentButton.classList.contains("has-submenu")) {
        parentButton.classList.add("bg-indigo-100");
        const icon = parentButton.querySelector(".sidebar-submenu-icon");
        if (icon) icon.classList.add("rotate-90");
      }
    }
  }
});
