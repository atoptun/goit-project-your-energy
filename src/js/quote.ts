import { getDailyQuote } from './services/quoteService';
import { IQuote } from './types';

function renderQuote({ quote, author }: IQuote): void {
  const quoteTextEl = document.querySelector<HTMLElement>('[data-quote-text]');
  const quoteAuthorEl = document.querySelector<HTMLElement>(
    '[data-quote-author]'
  );

  if (!quoteTextEl || !quoteAuthorEl) return;

  quoteTextEl.textContent = quote;
  quoteAuthorEl.textContent = author;
}

export async function initQuote(): Promise<void> {
  const quoteTextEl = document.querySelector<HTMLElement>('[data-quote-text]');

  if (!quoteTextEl) return;

  try {
    const quote = await getDailyQuote();
    renderQuote(quote);
  } catch {
    renderQuote({
      quote: 'The body achieves what the mind believes.',
      author: 'Unknown',
    });
  }
}