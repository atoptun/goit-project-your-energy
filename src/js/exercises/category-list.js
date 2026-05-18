import { fetchFilters } from '../services/api.js';

export function initCategoryList({ onSelect } = {}) {}

export function renderCategories(filter) {
  fetchFilters({ filter }).then(data => console.log(data));
}