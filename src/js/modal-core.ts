import { SELECTORS } from './constants';
import { ModalCloseCallback } from './types';

interface IActiveModal {
  element: HTMLElement;
  onCloseCallback: () => void;
}

const backdrop = document.querySelector<HTMLElement>(SELECTORS.modalBackdrop);
const modalStack: IActiveModal[] = [];

export function coreOpenModal(
  modalContainer: HTMLElement,
  onCloseCallback: ModalCloseCallback
): void {
  if (!backdrop || !modalContainer) return;

  if (modalStack.length > 0) {
    const currentTopModal = modalStack[modalStack.length - 1];
    currentTopModal.element.hidden = true;
  } else {
    const scrollbarWidth = getScrollbarWidth();

    backdrop.hidden = false;
    document.body.classList.add('is-modal-open');

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    backdrop.addEventListener('click', onBackdropClick);
    document.addEventListener('keydown', onKeyPress);
  }

  modalStack.push({
    element: modalContainer,
    onCloseCallback,
  });

  modalContainer.hidden = false;
}

export function coreCloseModal(modalContainer: HTMLElement): void {
  if (!backdrop || !modalContainer || modalStack.length === 0) return;

  const topModal = modalStack[modalStack.length - 1];

  if (topModal.element !== modalContainer) return;

  modalStack.pop();
  modalContainer.hidden = true;

  topModal.onCloseCallback();

  if (modalStack.length > 0) {
    const previousModal = modalStack[modalStack.length - 1];
    previousModal.element.hidden = false;
  } else {
    backdrop.hidden = true;
    document.body.classList.remove('is-modal-open');
    document.body.style.paddingRight = '0px';

    backdrop.removeEventListener('click', onBackdropClick);
    document.removeEventListener('keydown', onKeyPress);
  }
}

function onBackdropClick(event: MouseEvent): void {
  if (event.target === backdrop && modalStack.length > 0) {
    const topModal = modalStack[modalStack.length - 1];
    topModal.onCloseCallback();
  }
}

function onKeyPress(event: KeyboardEvent): void {
  if (event.code === 'Escape' && modalStack.length > 0) {
    const topModal = modalStack[modalStack.length - 1];
    topModal.onCloseCallback();
  }
}

function getScrollbarWidth(): number {
  return window.innerWidth - document.documentElement.clientWidth;
}
