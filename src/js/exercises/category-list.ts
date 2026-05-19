import { fetchFilters } from '../services/api';

interface CategoryListOptions {
  onSelect?: (category: string) => void;
}

export function initCategoryList({ onSelect }: CategoryListOptions = {}) {}

export function renderCategories(filter?: string) {
  fetchFilters({ filter }).then(data => console.log(data));
}