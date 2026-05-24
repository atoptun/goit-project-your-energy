import { fetchDailyQuote } from './api';
import { IQuote, IStoredQuote } from '../types';

const QUOTE_KEY = 'dailyQuote';

function getTodayDate(): string {
  return new Date().toLocaleDateString('en-CA');
}

function getSavedQuote(): IQuote | null {
  const rawQuote = localStorage.getItem(QUOTE_KEY);

  if (!rawQuote) return null;

  try {
    const storedQuote = JSON.parse(rawQuote) as IStoredQuote;

    if (storedQuote.date !== getTodayDate()) {
      localStorage.removeItem(QUOTE_KEY);
      return null;
    }
    return storedQuote;
  } catch {
    localStorage.removeItem(QUOTE_KEY);
    return null;
  }
}

function saveQuote(quote: IQuote): void {
  const quoteToSave: IStoredQuote = { ...quote, date: getTodayDate() };
  localStorage.setItem(QUOTE_KEY, JSON.stringify(quoteToSave));
}

export async function getDailyQuote(): Promise<IQuote> {
  const saved = getSavedQuote();
  if (saved) return saved;

  const quote = await fetchDailyQuote();
  saveQuote(quote);
  return quote;
}