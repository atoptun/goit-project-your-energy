import { coreOpenModal, coreCloseModal } from '../modal-core';
import { SELECTORS } from '../constants';
import { fetchExerciseById } from '../services/api';
import { createExerciseModalCardMarkup } from './exercise-card';
import { IExercise } from '../types';
import { showErrorMessage } from '../utils';

const CONSTS = {
  container: '.js-modal-exercise-container',
  content: '.js-modal-exercise-content',
  favBtn: '.js-btn-favorites',
  favBtnText: '.js-fav-btn-text',
  favBtnIcon: '.js-fav-icon',

}

const refs = {
  container: document.querySelector<HTMLElement>(CONSTS.container),
  closeBtn: document.querySelector<HTMLButtonElement>(SELECTORS.modalCloseBtn),
  content: document.querySelector<HTMLElement>(CONSTS.content),

};


export function openExerciseModal(exerciseId: string): void {
  coreOpenModal(refs.container!, closeExerciseModal);

  refs.closeBtn?.addEventListener('click', closeExerciseModal);
  refs.container?.removeAttribute('hidden');

  fetchExerciseById(exerciseId)
    .then(data => {
      renderExerciseCard(data);
    })
    .catch(() => {
      showErrorMessage('Unable to load exercise data. Please try again.');
    });
}

export function closeExerciseModal(): void {
  coreCloseModal(refs.container!);
  refs.closeBtn?.removeEventListener('click', closeExerciseModal);
}

function renderExerciseCard(data: IExercise): void {
  refs.content!.innerHTML = createExerciseModalCardMarkup(data);

  const favBtn = refs.content?.querySelector<HTMLButtonElement>(CONSTS.favBtn);

  updateFavoriteBtn(favBtn!, false);

}

function updateFavoriteBtn(btn: HTMLButtonElement, isFavorite: boolean): void { 
  
}
