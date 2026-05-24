import { coreOpenModal, coreCloseModal } from '../modal-core';
import { fetchExerciseById } from '../services/api';
import { IExercise, ModalCloseCallback } from '../types';
import { isFavorite, addFavorite, removeFavorite } from '../services/storage';
import { openRatingModal } from '../rating-modal';
import iconsUrl from '../../images/icons.svg?url';

const CONSTS = {
  container: '.js-modal-exercise-container',
  closeBtn: '.js-modal-exercise-close',
  content: '.js-modal-exercise-content',

  // Modal content elements
  image: '.js-mcard-image',
  name: '.js-mcard-name',
  rating: '.js-mcard-rating',
  stars: '.js-mcard-star',
  target: '.js-mcard-target',
  bodyPart: '.js-mcard-body-part',
  equipment: '.js-mcard-equipment',
  popularity: '.js-mcard-popularity',
  burnedCalories: '.js-mcard-burned-calories',
  description: '.js-mcard-description',

  // Action buttons
  favBtn: '.js-btn-favorites',
  favBtnText: '.js-fav-btn-text',
  favBtnIcon: '.js-fav-icon',
  ratingBtn: '.js-btn-rating',
  isFavoriteClass: 'is-favorite',
} as const;

const refs = {
  container: document.querySelector<HTMLElement>(CONSTS.container),
  closeBtn: document.querySelector<HTMLElement>(CONSTS.closeBtn),
  content: document.querySelector<HTMLElement>(CONSTS.content),
} as const;

let closeCallback: ModalCloseCallback | null = null;

initContainer();

export function openExerciseModal(
  exerciseId: string,
  onClose?: ModalCloseCallback
): void {
  showLoader();
  coreOpenModal(refs.container!, closeExerciseModal);

  closeCallback = onClose || null;
  refs.closeBtn?.addEventListener('click', closeExerciseModal);

  async function loadData() {
    try {
      const data = await fetchExerciseById(exerciseId);
      refs.content!.dataset.exerciseId = data._id;
      fillContent(data);

      hideLoader();
    } catch {
      showErrorState();
    }
  }

  void loadData();
}

export function closeExerciseModal(): void {
  coreCloseModal(refs.container!);
  refs.closeBtn?.removeEventListener('click', closeExerciseModal);
  if (closeCallback) {
    closeCallback();
  }
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
      handleRatingBtnClick();
      return;
    }
  });
}

function showLoader() {
  refs.content?.classList.add('is-loading');
  refs.content?.classList.remove('is-error');
}

function hideLoader() {
  refs.content?.classList.remove('is-loading');
}

function showErrorState() {
  refs.content?.classList.add('is-error');
  hideLoader();
}

function handleFavoriteBtnClick(btn: HTMLElement) {
  if (!refs.content?.dataset.exerciseId) return;

  const isFavorite = btn.classList.contains(CONSTS.isFavoriteClass);

  if (isFavorite) {
    removeFavorite(refs.content?.dataset.exerciseId);
  } else {
    addFavorite(refs.content?.dataset.exerciseId);
  }
  updateFavoriteBtn(!isFavorite);
}

function handleRatingBtnClick() {
  if (!refs.content?.dataset.exerciseId) return;

  openRatingModal(refs.content?.dataset.exerciseId, updatedExercise => {
    fillContent(updatedExercise);
  });
}

function fillContent(data: IExercise) {
  const imageEl = refs.content?.querySelector<HTMLImageElement>(CONSTS.image);
  const nameEl = refs.content?.querySelector<HTMLElement>(CONSTS.name);
  const ratingEl = refs.content?.querySelector<HTMLElement>(CONSTS.rating);
  const targetEl = refs.content?.querySelector<HTMLElement>(CONSTS.target);
  const bodyPartEl = refs.content?.querySelector<HTMLElement>(CONSTS.bodyPart);
  const equipmentEl = refs.content?.querySelector<HTMLElement>(
    CONSTS.equipment
  );
  const popularityEl = refs.content?.querySelector<HTMLElement>(
    CONSTS.popularity
  );
  const burnedCaloriesEl = refs.content?.querySelector<HTMLElement>(
    CONSTS.burnedCalories
  );
  const descriptionEl = refs.content?.querySelector<HTMLElement>(
    CONSTS.description
  );

  if (imageEl) {
    imageEl.src = data.gifUrl;
    imageEl.alt = data.name;
  }
  if (nameEl) nameEl.textContent = data.name;
  if (ratingEl) ratingEl.textContent = data.rating.toFixed(2);
  fillRatingStars(data.rating);
  if (targetEl) targetEl.textContent = data.target;
  if (bodyPartEl) bodyPartEl.textContent = data.bodyPart;
  if (equipmentEl) equipmentEl.textContent = data.equipment;
  if (popularityEl) popularityEl.textContent = data.popularity.toFixed(0);
  if (burnedCaloriesEl)
    burnedCaloriesEl.textContent = `${data.burnedCalories.toFixed(0)}/${data.time.toFixed(0)} min`;
  if (descriptionEl) descriptionEl.textContent = data.description;

  updateFavoriteBtn(isFavorite(data._id));
}

function fillRatingStars(rating: number) {
  const stars = refs.content?.querySelectorAll<HTMLOrSVGImageElement>(
    CONSTS.stars
  );
  if (!stars) return;

  const fullStars = Math.round(rating);
  stars.forEach((star, index) => {
    if (index < fullStars) {
      star.classList.add('is-active');
    } else {
      star.classList.remove('is-active');
    }
  });
}

function updateFavoriteBtn(isFavorite: boolean): void {
  const favBtn = refs.content?.querySelector<HTMLElement>(CONSTS.favBtn);
  const btnTextEl = favBtn?.querySelector<HTMLElement>(CONSTS.favBtnText);
  const iconEl = favBtn?.querySelector<HTMLElement>(CONSTS.favBtnIcon);

  if (!favBtn || !btnTextEl || !iconEl) return;

  if (isFavorite) {
    favBtn.classList.add(CONSTS.isFavoriteClass);
    btnTextEl.textContent = 'Remove from favorites';
    iconEl.setAttribute('href', `${iconsUrl}#icon-trash`);
  } else {
    favBtn.classList.remove(CONSTS.isFavoriteClass);
    btnTextEl.textContent = 'Add to favorites';
    iconEl.setAttribute('href', `${iconsUrl}#icon-heart`);
  }
}
