import { isAxiosError } from 'axios';
import { subscribeNewsletter } from './services/api';
import { SELECTORS } from './constants';
import { showErrorMessage, showSuccessMessage, showWarningMessage } from './utils';

const EMAIL_PATTERN = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export function initFooter(): void {
  const yearEl = document.querySelector<HTMLElement>(SELECTORS.footerYear);
  if (yearEl) {
    yearEl.textContent = `©${new Date().getFullYear()}`;
  }

  const form = document.querySelector<HTMLFormElement>(SELECTORS.subscriptionForm);
  if (!form) return;

  form.addEventListener('submit', async (e: SubmitEvent) => {
    e.preventDefault();

    const input = form.elements.namedItem('email') as HTMLInputElement;
    const email = input.value.trim();
    if (!EMAIL_PATTERN.test(email)) {
      showErrorMessage('Please enter a valid email address.');
      return;
    }

    const btn = form.querySelector<HTMLButtonElement>(SELECTORS.subscriptionBtn);
    if (btn) btn.disabled = true;

    try {
      const res = await subscribeNewsletter(email);
      showSuccessMessage(res.message || 'You have successfully subscribed!');
      form.reset();
    } catch (err) {
      let message = 'Something went wrong. Please try again.';
      if (isAxiosError(err)) {
        message = err.response?.data?.message ?? message;
        if (err.response?.status === 409) {
          showWarningMessage(message);
          return;
        }
      }
      showErrorMessage(message);
    } finally {
      if (btn) btn.disabled = false;
    }
  });
}
