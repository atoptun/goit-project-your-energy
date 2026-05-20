export function initHeader() {
  const currentPath = window.location.pathname;

  const navLinks =
    document.querySelectorAll<HTMLAnchorElement>('.header-nav-link');

  navLinks.forEach(link => {
    const linkPath = link.pathname;

    if (!linkPath) return;

    if (currentPath.endsWith(linkPath)) {
      link.classList.add('is-active');
    }
  });
}
