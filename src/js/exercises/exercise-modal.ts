import { coreOpenModal, coreCloseModal } from '../modal-core';

const refs = {
  // change to consts
  modal: document.querySelector<HTMLElement>('.js-modal-exercise'),
  closeBtn: document.querySelector<HTMLButtonElement>('.js-modal-close'),
};

export function openExerciseModal(exerciseId: string): void {
  coreOpenModal(refs.modal!, closeExerciseModal);

  refs.closeBtn?.addEventListener('click', closeExerciseModal);
  refs.modal?.removeAttribute('hidden');

}

export function closeExerciseModal(): void {
  coreCloseModal(refs.modal!);
  refs.closeBtn?.removeEventListener('click', closeExerciseModal);
}
