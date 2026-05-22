import { FILTER_CATEGORIES } from './constants';

export type TFilterCategory = typeof FILTER_CATEGORIES[keyof typeof FILTER_CATEGORIES];

export interface ICategory {
    "filter": TFilterCategory;
    "name": string;
    "imgURL": string;
}

export interface IQuote {
  quote: string;
  author: string;
}

export interface IStoredQuote extends IQuote {
  date: string;
}