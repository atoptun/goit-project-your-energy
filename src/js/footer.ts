import { SELECTORS } from './constants';

export function initFooter(): void {
  const yearEl = document.querySelector<HTMLElement>(SELECTORS.footerYear);
  if (yearEl) {
    yearEl.textContent = `©${new Date().getFullYear()}`;
  }
}