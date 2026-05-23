import { SELECTORS } from './constants';

const backdrop = document.querySelector<HTMLElement>(SELECTORS.modalBackdrop);

let currentCloseCallback: (() => void) | null = null;

export function coreOpenModal(
  modalContainer: HTMLElement,
  onCloseCallback: () => void
): void {
  if (!backdrop || !modalContainer) return;

  backdrop.removeAttribute('hidden');
  modalContainer.removeAttribute('hidden');
  document.body.classList.add('is-modal-open');

  currentCloseCallback = onCloseCallback;

  backdrop.addEventListener('click', onBackdropClick);
  document.addEventListener('keydown', onKeyPress);
}

export function coreCloseModal(modalContainer: HTMLElement): void {
  if (!backdrop || !modalContainer) return;

  backdrop.setAttribute('hidden', '');
  modalContainer.setAttribute('hidden', '');
  document.body.classList.remove('is-modal-open');

  backdrop.removeEventListener('click', onBackdropClick);
  document.removeEventListener('keydown', onKeyPress);

  currentCloseCallback = null;
}

function onBackdropClick(event: MouseEvent): void {
  if (event.target === backdrop && currentCloseCallback) {
    currentCloseCallback();
  }
}

function onKeyPress(event: KeyboardEvent): void {
  if (event.code === 'Escape' && currentCloseCallback) {
    currentCloseCallback();
  }
}
