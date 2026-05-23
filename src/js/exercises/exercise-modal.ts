import { coreOpenModal, coreCloseModal } from '../modal-core';
import { fetchExerciseById } from '../services/api';
import { createExerciseModalCardMarkup } from './exercise-card';
import { showErrorMessage } from '../utils';

const CONSTS = {
  container: '.js-modal-exercise-container',
  closeBtn: '.js-modal-exercise-close',
  content: '.js-modal-exercise-content',

  favBtn: '.js-btn-favorites',
  favBtnText: '.js-fav-btn-text',
  favBtnIcon: '.js-fav-icon',
  ratingBtn: '.js-btn-rating',

} as const;

const refs = {
  container: document.querySelector<HTMLElement>(CONSTS.container),
  closeBtn: document.querySelector<HTMLElement>(CONSTS.closeBtn),
  content: document.querySelector<HTMLElement>(CONSTS.content),
} as const;

initContainer();

export function openExerciseModal(exerciseId: string): void {
  coreOpenModal(refs.container!, closeExerciseModal);

  refs.closeBtn?.addEventListener('click', closeExerciseModal);
  refs.container?.removeAttribute('hidden');

  fetchExerciseById(exerciseId)
    .then(data => {
      refs.content!.dataset.exerciseId = data._id;
      refs.content!.innerHTML = createExerciseModalCardMarkup(data);

      updateFavoriteBtn(false);
    })
    .catch(() => {
      showErrorMessage('Unable to load exercise data. Please try again.');
    });
}

export function closeExerciseModal(): void {
  coreCloseModal(refs.container!);
  refs.closeBtn?.removeEventListener('click', closeExerciseModal);
}

function initContainer() {
  refs.content?.addEventListener('click', event => {
    const target = event.target as HTMLElement;
    const favBtn = target.closest<HTMLElement>(CONSTS.favBtn);

    if (favBtn) {
      handleFavoriteBtnClick(favBtn);
      return;
    }

    const ratingBtn = target.closest<HTMLElement>(CONSTS.ratingBtn);
    if (ratingBtn) {
      handleRatingBtnClick(ratingBtn);
      return;
    }
  });
}

function handleFavoriteBtnClick(btn: HTMLElement) {
  // Get data from localStorage
  const isFavorite = btn.classList.contains('is-favorite');

  if (isFavorite) {
    // Remove from favorites logic here
    updateFavoriteBtn(false);
  } else {
    // Add to favorites logic here
    updateFavoriteBtn(true);
  }
}

function handleRatingBtnClick(btn: HTMLElement) {
  showErrorMessage('Rating feature is not implemented yet.');
}

function updateFavoriteBtn(isFavorite: boolean): void {
  const favBtn = refs.content?.querySelector<HTMLElement>(CONSTS.favBtn);
  const btnTextEl = favBtn?.querySelector<HTMLElement>(CONSTS.favBtnText);
  const iconEl = favBtn?.querySelector<HTMLElement>(CONSTS.favBtnIcon);

  if (!favBtn || !btnTextEl || !iconEl) return;

  let iconUrl = iconEl?.getAttribute('href') || '';

  if (isFavorite) {
    favBtn.classList.add('is-favorite');
    btnTextEl.textContent = 'Remove from favorites';
    iconUrl = iconUrl.replace(/#icon-(\w+)?/, '#icon-trash');
    iconEl.setAttribute('href', iconUrl);
  } else {
    favBtn.classList.remove('is-favorite');
    btnTextEl.textContent = 'Add to favorites';
    iconUrl = iconUrl.replace(/#icon-(\w+)?/, '#icon-heart');
    iconEl.setAttribute('href', iconUrl);
  }
}
