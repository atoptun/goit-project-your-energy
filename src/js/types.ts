import { FILTER_CATEGORIES } from './constants';

export type TFilterCategory = typeof FILTER_CATEGORIES[keyof typeof FILTER_CATEGORIES];

export interface ICategory {
  filter: TFilterCategory;
  name: string;
  imgURL: string;
}

export interface IExercise {
  _id: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  name: string;
  target: string;
  description: string;
  rating: number;
  burnedCalories: number;
  time: number;
  popularity: number;
}

export interface IQuote {
  quote: string;
  author: string;
}

export interface IStoredQuote extends IQuote {
  date: string;
}
