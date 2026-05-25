function getFilename(pathname: string): string {
  return pathname.split('/').pop() || 'index.html';
}

export function initHeader() {
  const currentFile = getFilename(window.location.pathname);

  document
    .querySelectorAll<HTMLAnchorElement>('.header-nav-link')
    .forEach(link => {
      if (getFilename(link.pathname) === currentFile) {
        link.classList.add('is-active');
      }
    });

  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (!header) return;

    if (window.scrollY > 0) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });
}
