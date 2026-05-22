

// change to const
const backdrop = document.querySelector<HTMLElement>('.js-modal-backdrop');

let currentCloseCallback: (() => void) | null = null;

export function coreOpenModal(
  modalElement: HTMLElement,
  onCloseCallback: () => void
): void {
  if (!backdrop || !modalElement) return;

  backdrop.removeAttribute('hidden');
  modalElement.removeAttribute('hidden');
  document.body.classList.add('is-modal-open');

  currentCloseCallback = onCloseCallback;

  backdrop.addEventListener('click', onBackdropClick);
  document.addEventListener('keydown', onKeyPress);
}

export function coreCloseModal(modalElement: HTMLElement): void {
  if (!backdrop || !modalElement) return;

  backdrop.setAttribute('hidden', '');
  modalElement.setAttribute('hidden', '');
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
