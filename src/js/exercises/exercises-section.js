import { initFilters } from './filters.js';
import { renderCategories } from './category-list.js';

export function initExercisesSection() {
  initFilters({
    onFilterChange: filter => renderCategories(filter),
  });

  renderCategories('Muscles');
}