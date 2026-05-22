export function initMobileMenu() {
  const refs = {
    openBtn: document.querySelector('.js-mobile-menu-btn'),
    closeBtn: document.querySelector('.js-mobile-menu-close-btn'),
    menu: document.querySelector('.js-mobile-menu'),
  };

  refs.openBtn?.addEventListener('click', toggleMobileMenu);
  refs.closeBtn?.addEventListener('click', toggleMobileMenu);

  function toggleMobileMenu() {
    refs.menu?.classList.toggle('is-open');
    document.body.classList.toggle('is-menu-open');
  }

  mediaChangeObserver();
}

function mediaChangeObserver() {
  function handleTabletChange(e: MediaQueryListEvent | MediaQueryList) {
    if (e.matches) {
      document.body.classList.remove('is-menu-open');

      const mobileMenu = document.querySelector('.js-mobile-menu');
      if (mobileMenu) {
        mobileMenu.classList.remove('is-open');
      }
    }
  }

  const mediaQuery = window.matchMedia('(min-width: 768px)');
  mediaQuery.addEventListener('change', handleTabletChange);
  handleTabletChange(mediaQuery);
}
