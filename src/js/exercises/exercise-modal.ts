import { coreOpenModal, coreCloseModal } from '../modal-core';
import { SELECTORS } from '../constants';

const refs = {
  modal: document.querySelector<HTMLElement>(SELECTORS.modalExercise),
  closeBtn: document.querySelector<HTMLButtonElement>(SELECTORS.modalCloseBtn),
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
