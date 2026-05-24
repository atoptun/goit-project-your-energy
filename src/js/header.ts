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
}
