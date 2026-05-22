import { fetchDailyQuote } from './services/api';
import { IQuote, IStoredQuote } from './types';

const QUOTE_KEY = 'dailyQuote';

function getTodayDate(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function isQuote(data: unknown): data is IQuote {
  if (!data || typeof data !== 'object') return false;

  const quoteData = data as IQuote;

  return (
    typeof quoteData.quote === 'string' &&
    typeof quoteData.author === 'string'
  );
}

function getSavedQuote(): IStoredQuote | null {
  const savedQuote = localStorage.getItem(QUOTE_KEY);

  if (!savedQuote) return null;
  try {
    const parsedQuote: unknown = JSON.parse(savedQuote);
    if (
      !parsedQuote ||
      typeof parsedQuote !== 'object' ||
      !('quote' in parsedQuote) ||
      !('author' in parsedQuote) ||
      !('date' in parsedQuote)
    ) {
      localStorage.removeItem(QUOTE_KEY);
      return null;
    }

    return parsedQuote as IStoredQuote;
  } catch {
    localStorage.removeItem(QUOTE_KEY);
    return null;
  }

}

function saveQuote(quote: IQuote): void {
  const quoteToSave: IStoredQuote = {
    ...quote,
    date: getTodayDate(),
  };

  try {
    localStorage.setItem(QUOTE_KEY, JSON.stringify(quoteToSave));
  } catch {
    // localStorage may be unavailable
  }
}

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

  const savedQuote = getSavedQuote();
  const today = getTodayDate();

  if (savedQuote && savedQuote.date === today) {
    renderQuote(savedQuote);
    return;
  }

  try {
    const quote = await fetchDailyQuote();

    if (!isQuote(quote)) {
      throw new Error('Invalid quote data');
    }

    renderQuote(quote);
    saveQuote(quote);
  } catch {
    renderQuote({
      quote: 'The body achieves what the mind believes.',
      author: 'Unknown',
    });
  }
}