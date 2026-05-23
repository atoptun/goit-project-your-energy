import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { subscribeExercises } from './services/api';
import { SELECTORS } from './constants';

const EMAIL_PATTERN = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

iziToast.settings({ maxWidth: 360 });

export function initFooter(): void {
  const form = document.querySelector<HTMLFormElement>(
    SELECTORS.subscriptionForm
  );
  if (!form) return;

  form.addEventListener('submit', async (e: SubmitEvent) => {
    e.preventDefault();

    const input = form.elements.namedItem('email') as HTMLInputElement;
    const email = input.value.trim();
    if (!EMAIL_PATTERN.test(email)) {
      iziToast.error({
        message: 'Please enter a valid email address.',
        position: 'topRight',
      });
      return;
    }

    const btn = form.querySelector<HTMLButtonElement>(
      SELECTORS.subscriptionBtn
    );
    if (btn) btn.disabled = true;

    try {
      const res = await subscribeExercises(email);
      iziToast.success({
        message: res.message || 'You have successfully subscribed!',
        position: 'topRight',
      });
      form.reset();
    } catch (err) {
      let message = 'Something went wrong. Please try again.';
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message ?? message;
        if (err.response?.status === 409) {
          iziToast.warning({ message, position: 'topRight' });
          return;
        }
      }
      iziToast.error({ message, position: 'topRight' });
    } finally {
      if (btn) btn.disabled = false;
    }
  });
}
