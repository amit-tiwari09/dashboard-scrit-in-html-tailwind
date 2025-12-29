let sidebarCollapsed = false;

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const isLargeScreen = window.innerWidth >= 1024;

  if (!isLargeScreen) {
    sidebar.classList.toggle("-translate-x-full");
    sidebar.classList.toggle("translate-x-0");
  } else {
    // Desktop behavior - collapse/expand
    const searchBar = document.getElementById("search-bar");
    const logo = document.getElementById("logo");
    const sidebarTexts = document.querySelectorAll(".sidebar-text");
    const sidebarSubmenus = document.querySelectorAll(".sidebar-submenu");

    sidebarCollapsed = !sidebarCollapsed;

    if (sidebarCollapsed) {
      sidebar.classList.remove("w-64");
      sidebar.classList.add("w-20");
      searchBar.classList.add("hidden");
      logo.classList.add("hidden");
      sidebarTexts.forEach((text) => text.classList.add("hidden"));
      sidebarSubmenus.forEach((submenu) => submenu.classList.add("hidden"));
    } else {
      sidebar.classList.remove("w-20");
      sidebar.classList.add("w-64");
      searchBar.classList.remove("hidden");
      logo.classList.remove("hidden");
      sidebarTexts.forEach((text) => text.classList.remove("hidden"));
    }
  }
}

function handleMenuClick(id) {
  const isLargeScreen = window.innerWidth >= 1024;

  if (isLargeScreen && sidebarCollapsed) {
    toggleSidebar();
    setTimeout(() => {
      toggleSubmenu(id);
    }, 100);
  } else {
    toggleSubmenu(id);
  }
}

function toggleSubmenu(id) {
  const submenu = document.getElementById(id + "-submenu");
  const icon = document.getElementById(id + "-icon");

  submenu.classList.toggle("hidden");
  icon.classList.toggle("rotate-180");
}

export { toggleSidebar, handleMenuClick };
