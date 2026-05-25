import { coreOpenModal, coreCloseModal } from './modal-core';
import { IRatingPayload, sendRating, ApiError } from './services/api';
import { showErrorMessage, showSuccessMessage } from './utils';
import { IExercise } from './types';
import { saveRatingData, getRatingData } from './services/storage';
import { startLoading, stopLoading } from './loaders';

export type SendRatingCloseCallback = (exercise: IExercise) => void;

const CONSTS = {
  container: '.js-modal-rating-container',
  closeBtn: '.js-modal-rating-close',
  content: '.js-modal-rating-content',

  form: '.js-send-rating-form',
  ratingValue: '.js-rating-value',
} as const;

const refs = {
  container: document.querySelector<HTMLElement>(CONSTS.container),
  closeBtn: document.querySelector<HTMLElement>(CONSTS.closeBtn),
  content: document.querySelector<HTMLElement>(CONSTS.content),

  form: document.querySelector<HTMLFormElement>(CONSTS.form),
  ratingValue: document.querySelector<HTMLElement>(CONSTS.ratingValue),
} as const;

let closeCallback: SendRatingCloseCallback | null = null;

initContainer();

export function openRatingModal(
  exerciseId: string,
  onClose?: SendRatingCloseCallback
): void {
  if (!exerciseId || !refs.form || !refs.container) return;

  coreOpenModal(refs.container, closeRatingModal);

  closeCallback = onClose || null;
  refs.closeBtn?.addEventListener('click', closeRatingModal);

  refs.form.reset();
  refs.ratingValue!.textContent = '0.0';
  refs.form.dataset.exerciseId = exerciseId;

  const userData = getRatingData();
  if (userData) {
    refs.form.email.value = userData.email || '';
    refs.form.review.value = userData.message || '';
  }
}

export function closeRatingModal(): void {
  coreCloseModal(refs.container!);
  refs.closeBtn?.removeEventListener('click', closeRatingModal);
  closeCallback = null;
}

function initContainer() {
  refs.form?.addEventListener('change', (e: Event) => {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      if (target.name !== 'rate') return;

      if (target.value && refs.ratingValue) {
        refs.ratingValue.textContent = `${Number(target.value).toFixed(1)}`;
      }
    }
  });

  refs.form?.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();

    async function submitRating(): Promise<void> {
      const exerciseId = refs.form?.dataset.exerciseId;
      if (!exerciseId) return;

      const formData = new FormData(refs.form!);
      const rawData = Object.fromEntries(formData);
      const { rate, email, review } = rawData;
      const ratinPayload: IRatingPayload = {
        email: String(email),
        review: String(review),
        rate: Number(rate),
      };

      startLoading(refs.content, true);
      try {
        const data = await sendRating(exerciseId, ratinPayload);

        saveRatingData({
          email: ratinPayload.email,
          message: ratinPayload.review,
        });
        showSuccessMessage('Rating submitted successfully!');

        closeCallback?.(data);
        closeRatingModal();
      } catch (error) {
        if (error instanceof ApiError) {
          showErrorMessage(error.message);
        } else {
          showErrorMessage('Failed to submit rating. Please try again later.');
        }
      } finally {
        stopLoading(refs.content, true);
      }
    }

    void submitRating();
  });
}
