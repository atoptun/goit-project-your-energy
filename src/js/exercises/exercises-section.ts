import { initFilters } from './filters';
import { renderCategories } from './category-list';

export function initExercisesSection() {
  initFilters({
    onFilterChange: (filter?: string) => renderCategories(filter),
  });

  renderCategories('Muscles');
}