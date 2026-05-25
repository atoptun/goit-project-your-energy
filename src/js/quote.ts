import { getDailyQuote } from './services/quote-service';
import { IQuote } from './types';
import { startLoading, stopLoading } from './loaders';
import { SELECTORS } from './constants';

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
  const quoteCard = document.querySelector<HTMLElement>(SELECTORS.quoteCard);

  const quoteTextEl = document.querySelector<HTMLElement>('[data-quote-text]');

  if (!quoteTextEl) return;

  startLoading(quoteCard, true);
  try {
    const quote = await getDailyQuote();
    renderQuote(quote);
  } catch {
    renderQuote({
      quote: 'The body achieves what the mind believes.',
      author: 'Unknown',
    });
  } finally {
    stopLoading(quoteCard, true);
  }
}